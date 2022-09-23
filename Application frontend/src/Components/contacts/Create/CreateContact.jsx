import { Link } from "@mui/material";
import React, { useState } from "react";

import ContactList from "../List/ContactList";

import { Routes, Route, useNavigate } from "react-router-dom";

import { ContactService } from "../../../services/ContactService";

import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../Components/firebase/firebase";



// import 'semantic-ui-css/semantic.min.css'

let CreateContact = () => {
  
  const [files, setFiles] = useState(null);
  const{register,handleSubmit,formState: {errors}} = useForm();




//   let [state, setState] = useState({

//     loading: false,

//     contact: {

//       name: "",

//       mobile: "",

//       photo: "",

//       email: "",

//     },

//     errorMessage: "",

//   });

  const CancelButton = () => {

    navigate("/contacts/list");

  };

//   let updateInput = (event) => {

//     setState({

//       ...state,

//       contact: {

//         ...state.contact,

//         [event.target.name]: event.target.value,

//       },

//     });

//   };

  const navigate = useNavigate();

 
  const formHandler = async (e) => {
//event.preventDefault()
    let file = e[0];
//console.log(e)

    setFiles(file);

  };
  let submitForm = async (data) => {

   // event.preventDefault();
    try{
      console.log(data)
      console.log(files)

      if (!files) return;


      const fileRef = ref(

        storage,

        `files/${new Date().getTime()}-${data.name}-${files.name}`

      );



      const uploadTask = uploadBytesResumable(fileRef, files);

      uploadTask.on(

        "state_changedawait",

        async (snapshot) => {

          const prog = Math.round(

            (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          );

        },

        (error) => console.log(error),

        () => {

          getDownloadURL(uploadTask.snapshot.ref)

            .then((downloadURL) => {
              
console.log(data)
console.log(downloadURL)
              let newData = {

                name: data.name,

                mobile: data.mobile,

                photo: downloadURL,

                email: data.email,

              };

              let response = ContactService.createContact(newData).then((res) => {

                navigate("/contacts/list", { replace: true });

              });

            })

            .then((res) => {

              console.log(res);

              

            });

        }

      );









  }catch (err) {

    //   setState({

    //     ...state,

    //     errorMessage: err.message,

    //   });

      navigate("/contacts/create", { replace: false });

    }

  };

 

//   let { loading, contact, errorMessage } = state;

 

  return (    

    <React.Fragment>

      <section className='add p-2 ms-1'>

        <div className='container'>

          <div className='row'>

            <div className='col'>

              <p className='h3 text-success p-3'>Create New Contact</p>

            </div>

          </div>

          <div className='row'>

            <div className='col-md-3'>

            

               <form onSubmit={handleSubmit(submitForm)}>

                 <div className='mb-2'>

                 
                  <input

                    // required={true}

                    name='name'

                  //  defaultValue="name"
                    // value={contact.name}
                    // onChange={updateInput}

                    type='text'

                    className='form-control'
                    // onChange={()=>{console.log(contact.name)}}

                    {...register("name",

                    {

                      required:true,

                      maxLength:20

                      })}

 

                    placeholder='Name'

                  />

                  {errors.name && <p>Enter a Valid name(20 letters max)</p>}

                </div>

                <div className='mb-2'>

                  <input
                    // required={true}
                    // value={contact.mobile}
                    
                    // onChange={updateInput}

                   // defaultValue="mobile"
 

                    name='mobile'

                    type='number'

                    {...register("mobile", {

 

                      required: true,

 

                     // value: {first_name},

 

 

                      minLength:10,

 

                      maxLength: 10

 

                    })}

                    className='form-control'

                    placeholder='Phone Number'

                  />

                  {errors.mobile && <p>Enter a Valid Phone Number</p>}

                </div>

                <div className='mb-2'>

                  <input

                    name='email'

                    // required={true}

                    // onChange={updateInput}

                    // value={contact.email}
                    // required={true}
                    // type='email'

                    {...register("email", {

 

                    //   required: true,

 

                      // value: {first_name}

 

                    //   value: contact.email,

 

                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    
 

                    })}

                    className='form-control'

                    placeholder='Email id'

                  />

                  {errors.email && <p>Enter a Valid Email id</p>}

                </div>

 

                <div className='mb-2'>
                    <label>Choose Profile Picture</label>

                    <input
                      name='photo'
                      onChange={(e) => {
                      formHandler(e.target.files);
                      }}
                      // value={contact.photo}
                      type='file'
                      className='form-control'
                      // placeholder='Image URL'
                      />
                 </div>

                 

                

 

                {/* // // <div className="mb-2">

                //                     <div className="row md-2">

                //                         <p className="h5 text-success p-3">Upload Profile picture</p>

                //                         <input type="file" multiple accept="image/*" />

                //                     </div>

                //                </div>  */}

                <div className='mb-2 mt-5'>

                  <input

                    type='submit'

                    className='btn btn-success'

                    value='Create'

                  />

                  <Button onClick={CancelButton} className='btn btn-dark ms-2'>

                    Cancel

                  </Button>

                </div>

              </form> 

            </div>

          </div>

        </div>

      </section>

    </React.Fragment>

  );

};

 

export default CreateContact;

 



















