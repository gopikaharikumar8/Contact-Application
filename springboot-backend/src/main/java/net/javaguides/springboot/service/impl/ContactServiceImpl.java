package net.javaguides.springboot.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Contact;
import net.javaguides.springboot.repository.ContactRepository;
import net.javaguides.springboot.service.ContactService;

@Service
public class ContactServiceImpl implements ContactService{

	private ContactRepository contactRepository;
	
	public ContactServiceImpl(ContactRepository contactRepository) {
		super();
		this.contactRepository = contactRepository;
	}

	@Override
	public Contact saveContact(Contact contact) {
		return contactRepository.save(contact);
	}

	@Override
	public List<Contact> getAllContacts() {
		return contactRepository.findAll();
	}

	@Override
	public Contact getContactById(long id) {

		return contactRepository.findById(id).orElseThrow(() -> 
						new ResourceNotFoundException("Contact", "Id", id));
		
	}

	@Override
	public Contact updateContact(Contact contact, long id) {
		
		// we need to check whether contact with given id is exist in DB or not
		Contact existingContact = contactRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Contact", "Id", id)); 
		
		existingContact.setName(contact.getName());
		existingContact.setEmail(contact.getEmail());
		existingContact.setMobile(contact.getMobile());
		existingContact.setPhoto(contact.getPhoto());
		// save existing contact to DB
		contactRepository.save(existingContact);
		return existingContact;
	}

	@Override
	public void deleteContact(long id) {
		
		// check whether a contact exist in a DB or not
		contactRepository.findById(id).orElseThrow(() -> 
								new ResourceNotFoundException("Contact", "Id", id));
								contactRepository.deleteById(id);
	}
	
}
