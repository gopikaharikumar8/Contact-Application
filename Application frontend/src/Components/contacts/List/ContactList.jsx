import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

let ContactList = () => {
  let [search, setSearch] = useState({
    text: "",
  });

  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filter: [],
    errorMessage: "",
  });
  useEffect(() => {
    // async function fetchData(){
    //     const request=await axios.get();
    //     console.log(request);
    // }
    // fetchData();
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        console.log(response.data);
        // console.log('helliooiioiio');
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filter: response.data,
        });
        // console.log("ooooo");
        // console.log(JSON.stringify(contacts));
      } catch (error) {
        setState({
          ...state,
          loading: true,
          errorMessage: error.message,
        });
      }
    }
    fetchData();
  }, []);

  let deleteButton=(contactId)=>{

    //console.log('sdfghjkl');

    console.log(contactId);

    confirmAlert({

        title: 'Confirm to Delete',

        message: 'Are you sure?',

        buttons: [

          {

            label: 'Yes',

            onClick:()=>{

                clickDelete(contactId)}

          },

          {

            label: 'No',

           // onClick: () => alert('Click No')

          }

        ]

      });

}

  let clickDelete = async (contactId) => {
    try {
      console.log('byee');
      let response =  ContactService.deleteContact(contactId);
      console.log('hello');
      if (response) {

        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        // console.log(response.data);
        // console.log('helliooiioiio');
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filter: response.data,
        
        });
        window.location.reload();
      }
    } catch (error) {}
  };

  let searchContacts = (e) => {
    setState({
      ...search,
      text: e.target.value,
    });
    let filterContacts = state.contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setState({
      ...state,
      filter: filterContacts,
    });
  };

  let { loading, contacts, filter, errorMessage } = state;

  return (
    <React.Fragment>
      <pre>{search.text}</pre>
      <div className='row'>
        <section>
          <div className='row'>
            <div className='col mt-2 ms-3'>
              <Link to={"/contacts/create"} className='btn btn-success'>
                {" "}
                <i className='fa-sharp fa-solid fa-plus' /> Create New Contact
              </Link>
            </div>
            <div className='col mr-2 text-right'>
              <Link
                to={"/authentication/login"}
                className='btn btn-info float-end mr-1'
              >
                {" "}
                Logout
              </Link>
            </div>
          </div>

          <div className='row mt-3 ms-1'>
            <div className='input-group'>
              <div className='form-outline'>
                <input
                  type='text'
                  name='text'
                  // value={search.text}
                  onChange={searchContacts}
                  id='form1'
                  className='form-control'
                  placeholder='Search Contacts'
                />
              </div>
              <button type='button' className='btn btn-primary'>
                <i className='fas fa-search'></i>
              </button>
            </div>
          </div>
        </section>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <section className='contact-list'>
              <div className='container'>
                <div className='row'>
                  {filter.length > 0 &&
                    filter.map((contact) => {
                      return (
                        <div className='col md-6 mt-3 md-1'>
                          <div className='card my-2'>
                            <div className='card-body'>
                              <div className='row align-items-center'>
                                <div className='col-4'>
                                  <img
                                    src={contact.photo}
                                    className='image-fluid contact-img'
                                  />
                                </div>
                                <div className='col-7'>
                                  <ul className='list-group'>
                                    <li className='list-group-item list-group-item-action'>
                                      Name:{" "}
                                      <span className='fw-bold'>
                                        {contact.name}
                                      </span>
                                    </li>
                                    <li className='list-group-item list-group-item-action'>
                                      Phone Number:{" "}
                                      <span className='fw-bold'>
                                        {contact.mobile}
                                      </span>
                                    </li>
                                    <li className='list-group-item list-group-item-action'>
                                      Email id:{" "}
                                      <span className='fw-bold'>
                                        {contact.email}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <div className='col-1 d-flex flex-column align-items-center'>
                                  <Link
                                    to={`/contacts/view/${contact.id}`}
                                    className='btn btn-success mb-1'
                                  >
                                    <i className='fa fa-eye' />
                                  </Link>
                                  <Link
                                    to={`/contacts/edit/${contact.id}`}
                                    className='btn btn-primary mb-1'
                                  >
                                    <i className='fa fa-pen' />
                                  </Link>
                                  <button
                                    onClick={() => {

                                     deleteButton(contact.id)
                                    }}
                                    className='btn btn-danger'
                                  >
                                    <i className='fa fa-trash' />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default ContactList;
