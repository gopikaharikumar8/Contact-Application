import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
let ViewContact = () => {
  const navigate = useNavigate();
  let { contactId } = useParams();
  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: "",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });

        let response = await ContactService.getContact(contactId);
        setState({
          ...state,
          loading: false,
          contact: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    }
    fetchData();
  }, [contactId]);
  let deleteButton=(contactId)=>{

    console.log('sdfghjkl');

    console.log(contactId);

    confirmAlert({

        title: 'Confirm to Delete',

        message: 'Are you sure?.',

        buttons: [

          {

            label: 'Yes',

            onClick:()=>{

                clickDelete(contactId)}

          },

          {

            label: 'No',

            //onClick: () => alert('Click No')

          }

        ]

      });

}
  let clickDelete = async (contactId) => {
    try {
      let response = ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        // console.log(response.data);
        // console.log("helliooiioiio");
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filter: response.data,
        });
        navigate('/contacts/list',{replace:true})

                window.location.reload();
      }
    } catch (error) {}
  };

  let { loading, contact, errorMessage } = state;
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(contact).length > 0 && (
            <section>
              <section className='view-contact p-3'>
                <div className='container'>
                  <div className='row'>
                    <div className='col'>
                      <p className='h3 text-primary p-3'>View Contact</p>
                    </div>
                  </div>
                </div>
              </section>
              <section className='view-contact p-3'>
                <div className='container'>
                  <div className='row align-items-center'>
                    <div className='col-md-4'>
                      <img src={contact.photo} className='contact-img' />
                    </div>
                    <div className='col-md-8'>
                      <ul className='list-group'>
                        <li className='list-group-item list-group-item-action'>
                          Name: <span className='fw-bold'>{contact.name}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Phone Number:{" "}
                          <span className='fw-bold'>{contact.mobile}</span>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                          Email id:{" "}
                          <span className='fw-bold'>{contact.email}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='row mt-5'>
                    <div className='col'>
                      <Link
                        to={"/contacts/list"}
                        className='btn btn-dark'
                        style={{ marginRight: "10px" }}
                      >
                        Back
                      </Link>

                      <Link
                        to={`/contacts/edit/${contactId}`}
                        className='btn btn-primary'
                        style={{ marginRight: "10px" }}
                      >
                        <i className='fa fa-pen' />
                      </Link>
                      <button
                        onClick={() => {
                         deleteButton(contact.id);
                        }}
                        className='btn btn-danger'
                        
                      >
                        <i className='fa fa-trash' />
                      </button>
                      {/* <button className="btn btn-danger">
                                            <i className="fa fa-trash"/>
                                       </button>      */}
                    </div>
                  </div>
                </div>
              </section>
            </section>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default ViewContact;
