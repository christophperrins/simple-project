# Demo project
This project is to show you how you can build a project in an agile manner

# Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisite
You will need to download and install the following pieces of software:
* [Java](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) - version 8 is recommended
* [Maven](https://www.baeldung.com/install-maven-on-windows-linux-mac)
* Some kind of web server. I would recommend downloading [Visual Studio Code](https://code.visualstudio.com/). Download the LiveServer Extension, Open the folder at simple-project/client/ and then right click the index.html and run live-server from this location

## Installation
To run the application backend you will need to run the following lines of code
```sh
git clone https://github.com/christophperrins/simple-project
cd simple-project/server
mvn spring-boot:run
```

To check that it is running you should navigate to:
http://localhost:8081/swagger-ui.html

## Running the Backend Tests
Inside the server folder:

To run JUnit tests on the controller and service classes:
```sh
mvn test -Dtest=ControllerAndServiceSuite
```

To run integration tests run:
```sh
mvn test -Dtest=IntegrationSuite
```

To run end-to-end tests with selenium:
```sh
mvn test -Dtest=SeleniumSuite
``` 

## Built with
* [SpringBoot](https://spring.io/projects/spring-boot)

## Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.

## Authors
* Chris Perrins - Project lead

## License
This project is licensed under the GPL-v3 License - see the LICENSE file for details

# Notes (DO NOT INCLUDE in your projects)

### Jenkins pipeline
Jenkins pipelines offer slightly more flexibility than freestyle projects - they also allow for multibranch pipelines so that pull requests can be automatically tested.

You can configure it to run a secret script everytime, or place the Jenkinsfile in your repository.

The Jenkinsfile tests, stages and deploys your application.

---


## Server

### com.qa.config
A config file exists in here. It tells the java project how to create a particular bean. A bean is a managed class which can be injected into other locations later.

### com.qa.controller
This is where the endpoints are located

### com.qa.persistence
The persistence region is broken down into two:

#### com.qa.persistence.model
These are where the models for the database lie.

#### com.qa.persitence.repository
These are interfaces which extend from JpaRepository.

Feeling a bit weird that its a respository? And later we @Autowired that repository - almost like we are creating an instance of a interface which is just not possible? Well this is due to Dependency Injection and it is all handled by springboot. It searches for something which can act as a concretion for the interface we have created - and injects it in its place. The methods to get, read, update and delete are all automatically generated from springboot. 

Can we include anything in this interface? Well yes but really only methods springboot will know how to create a method for it.
In my case we could have a method:
- public Note FindByText(String text);
And the noteRepository would be able to use that method.

Table 2.3 in the following link is quite useful: https://docs.spring.io/spring-data/jpa/docs/1.5.0.RELEASE/reference/html/jpa.repositories.html

### com.qa.service
These are where our services exist - essentially where the logic takes place

### com.qa.dto
Dto stands for Data transfer object.

We should really only be interacting with the "entity" when we want to change something in the database. 

Why? Well lets look at the following:
@Entity
public class user {
    @Id
    private String username;
    private String password; 
}

If I were to return a list of users who have starred this repository I might return something like this List<User>. 
Whats going to be in that list? Well not only all the usernames of the people who have liked my page which I want to display - but also all the passwords of those users... Not realistically something we would want to be doing.

Theres many other reasons to use DTO's.

When you manipulate an entity it will try to persist those changes through to the database. However if its not part of any transaction - you might get a whole swarm of errors such as detachedEntity etc. So it is actually easier (but longer) to just turn the entities into objects and manipulate the objects instead.

On much bigger projects - you would find an automatic "mapper" which maps between the Object being received/sent (the DTO) and the entity being persisted. 