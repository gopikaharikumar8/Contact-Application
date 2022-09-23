package net.javaguides.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguides.springboot.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long>{

}
