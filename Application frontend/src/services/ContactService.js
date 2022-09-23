import axios from "axios";

export class ContactService {
  static serverURL = `http://localhost:8080`;

  static getAllContacts() {
    let dataURL = `${this.serverURL}/contacts`;
    return axios.get(dataURL);
  }
  static getContact(contactId) {
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
    return axios.get(dataURL);
  }
  static createContact(contact) {
    let dataURL = `${this.serverURL}/contacts`;
    return axios.post(dataURL, contact);
  }
  static updateContact(contact, contactId) {
    console.log(contact);
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
    console.log(dataURL);
    return axios.put(dataURL, contact);
  }
  static deleteContact(contactId) {
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
    return axios.delete(dataURL);
  }
}
// const ContactService=axios.create({
//     baseURL:"http://localhost:9002",
// });

// ContactService.get('/contacts');

// export default ContactService;
