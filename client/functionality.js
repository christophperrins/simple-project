/**
 * 
 * @typedef Note 
 * @type {Object}
 * @property {Number} id
 * @property {String} text
 */

 /**
  * Sends a get request to the notes handler
  */
function getData() {
    noteRequestHandler("GET");
}

/**
 * Posts a note to the backend by collecting data from the user
 */
function postNote(event) {
    event.preventDefault();
    let data = document.getElementById("textInput");
    if(data.value){
        noteRequestHandler("POST", {"text": data.value});
    } 
    data.value = "";
    return false;
}

/**
 * Takes in a note and sends an update to the backend
 * @param {Note} body 
 */
function updateNote(body){
    noteRequestHandler("PUT", body);
}

/**
 * Sends an id to the notes request handler
 * @param {Number} id 
 */
function deleteNote(id){
    noteRequestHandler("DELETE", "", id);
}

/**
 * Displays the notes information to the screen
 * @param {XMLHttpRequest} request 
 */
function render(request) {
    let notes = JSON.parse(request.response);
    let holder = document.getElementById("notesHolder");
    holder.innerHTML= "";

    /**
     * Takes each note and displays it
     * @param {Note} note 
     */
    let makeNote = (note) => {
        let col = document.createElement("div");
        col.setAttribute("class", "col-sm-12 col-md-6 col-lg-4");

        let card = document.createElement("div");
        card.setAttribute("class", "card p-3 m-2");

        let title = document.createElement("h2");
        title.innerText = note.text;

        /**
         * Changes the title element to an input element to take in a change of data
         * @param {HTMLElement} title 
         */
        let changeToInput = (title) => {
            let input = document.createElement("input");
            input.setAttribute("class", "form-control");
            input.addEventListener("keypress", (event) => {
                if(event.key === "Enter"){
                    let noteBody = {
                        id: note.id,
                        text: input.value
                    }
                    updateNote(noteBody);
                }
            });
            input.value = title.innerText;
            title.parentNode.prepend(input);
            title.parentNode.removeChild(title);
        }

        title.addEventListener("click", () => changeToInput(title))

        let button = document.createElement("button");
        button.setAttribute("class", "btn btn-danger");
        button.addEventListener("click", () => deleteNote(note.id));
        button.innerText = "Delete";

        card.appendChild(title);
        card.appendChild(button);

        col.appendChild(card);
        holder.appendChild(col);

    }
    notes.forEach(note => makeNote(note));
}

/**
 * A note request handler which will handle all http request events
 * @param {('GET'|'POST'|'PUT'|'DELETE')} method 
 * @param {Note} body 
 * @param {String} extension 
 */
function noteRequestHandler(method, body, extension) {
    if (!extension){
        extension = "";
    } 
    let endpoint = "api/note/" + extension;
    method = method.toUpperCase();
    let callback;
    method === "GET" ? callback = render : callback = getData; 
    let headers = {
        "Content-Type": "application/json"
    }

    body ? body = JSON.stringify(body) : body = undefined;

    httpRequest(method, endpoint, callback, headers, body);
}



/**
 * A http request handler which will be used by all access requests
 * @param {('GET'|'POST'|'PUT'|'DELETE')} method 
 * @param {String} endpoint 
 * @param {Function} callback 
 * @param {Object} headers 
 * @param {Note} body 
 */
function httpRequest(method, endpoint, callback, headers, body){
    let URL = "";
    let request = new XMLHttpRequest();
    request.open(method, URL + endpoint);
    request.onload = () => {
        callback(request);
    }
    
    for(let key in headers){
        request.setRequestHeader(key, headers[key]);
    }

    body ? request.send(body) : request.send();
}

getData();
