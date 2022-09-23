package net.javaguides.springboot.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.model.Contact;
import net.javaguides.springboot.service.ContactService;

@CrossOrigin(origins = "http://localhost:3002")
@RestController
@RequestMapping("/contacts")
public class ContactController {
	
	private ContactService contactService;

	public ContactController(ContactService contactService) {
		super();

		this.contactService = contactService;
	}
	
	
	@PostMapping()
	public ResponseEntity<Contact> saveContact(@RequestBody Contact contact){
		System.out.println("hiiiiiii");

		return new ResponseEntity<Contact>(contactService.saveContact(contact), HttpStatus.CREATED);
	}
	
	@GetMapping
	public List<Contact> getAllContacts(){
		return contactService.getAllContacts();
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Contact> getContactById(@PathVariable("id") long contactId){
		return new ResponseEntity<Contact>(contactService.getContactById(contactId), HttpStatus.OK);
	}
	

	@PutMapping("{id}")
	public ResponseEntity<Contact> updateContact(@PathVariable("id") long id
												  ,@RequestBody Contact contact){
		return new ResponseEntity<Contact>(contactService.updateContact(contact, id), HttpStatus.OK);
	}
	
	
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteContact(@PathVariable("id") long id){
		
		contactService.deleteContact(id);
		
		return new ResponseEntity<String>("Contact deleted successfully!.", HttpStatus.OK);
	}
	
}
