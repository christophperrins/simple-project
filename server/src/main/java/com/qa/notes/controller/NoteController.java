package com.qa.notes.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.qa.notes.dto.NoteDto;
import com.qa.notes.service.NoteService;

/**
 * Note controller. Microservice for retrieving and posting notes.
 *
 */

@RestController
@CrossOrigin("*")
public class NoteController {
	
	@Autowired
	private NoteService service;

	@RequestMapping(path = "/api/note", method = {RequestMethod.GET})
	@ResponseStatus(code = HttpStatus.OK)
	public List<NoteDto> getNotes(){
		return new ArrayList<NoteDto>(service.getNotes());
	}
	
	@RequestMapping(path = "/api/note", method = {RequestMethod.POST})
	@ResponseStatus(code = HttpStatus.CREATED)
	public NoteDto createNote(@RequestBody NoteDto note){
		return service.createNote(note);
	}
	
	@RequestMapping(path = "/api/note", method = {RequestMethod.PUT})
	@ResponseStatus(code = HttpStatus.OK)
	public NoteDto updateNote(@RequestBody NoteDto note) throws NotFoundException{
		return service.updateNote(note);
	}
	
	@RequestMapping(path = "/api/note/{id}", method = {RequestMethod.DELETE})
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public NoteDto deleteNote(@PathVariable("id") Long id) throws NotFoundException{
		return service.deleteNote(id);
	}
}
