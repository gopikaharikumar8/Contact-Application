package net.javaguides.springboot.service;

import java.util.List;

import net.javaguides.springboot.model.Contact;

public interface ContactService {
	Contact saveContact(Contact contact);
	List<Contact> getAllContacts();
	Contact getContactById(long id);
	Contact updateContact(Contact contact, long id);
	void deleteContact(long id);
}
