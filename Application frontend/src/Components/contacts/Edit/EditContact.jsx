import React, { useEffect,useState } from "react";
import ContactList from "../List/ContactList";
import {Routes, Route, useNavigate,useParams} from 'react-router-dom';
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";
import { Link } from "@mui/material";
import Button from '@mui/material/Button';
let EditContact=()=>
{
    const navigate = useNavigate();
    const EditButton = () => {
        navigate('/contacts/list');
      };
    const CancelButton = () => {
        navigate('/contacts/list');
      };
   let {contactId}=useParams();
    let [state,setState]=useState({
        loading:false,
        contact:{
            name:'',
            photo:'',
            email:'',
            mobile:''
        },
        errorMessage:''
    });
    useEffect(()=>{
    async function fetchData(){
        try{
            setState({
                ...state,
                loading:true
            })
            let response=await ContactService.getContact(contactId);
            setState({
                ...state,
                loading:false,
                contact:response.data
            })
        }catch(error){
            setState({
                ...state,
                loading:false,
                errorMessage:error.message
            })
        }
    }
    fetchData();
    },[contactId]); 
    let updateInput=(event)=>{
        setState({
            ...state,
            contact:{
                ...state.contact,
                [event.target.name]:event.target.value
            }
        });
    };
    let submitForm= async(event)=>{
        event.preventDefault();
        try{
            let response=await ContactService.updateContact(state.contact,contactId);
            if(response){
                navigate('/contacts/list',{replace:true})
            }
        }catch(err){
            setState({
                ...state,
                errorMessage:err.message
            })
            navigate(`/contacts/edit/${contactId}`,{replace:false});
        }
    }

   let {loading,contact,errorMessage}=state;
    
    return(
        <React.Fragment>
            {
                loading?<Spinner/>:<React.Fragment>
                    <section className="add p-2 ms-1">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-primary p-3">
                                Edit Contact
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                           <form onSubmit={submitForm}>
                               <div className="mb-2">
                                   <label>
                                       Name 
                                   </label>
                                   <input
                                   name="name"
                                   value={contact.name}
                                   onChange={updateInput}
                                    type="text" className="form-control" placeholder="Name"/>
                               </div>
                               <div className="mb-2">
                                   <label>
                                       Phone Number
                                   </label>
                                   <input 
                                   name="mobile"
                                   value={contact.mobile}
                                   onChange={updateInput}
                                   type="text" className="form-control" placeholder="Phone Number"/>
                               </div>
                               <div className="mb-2">
                                   <label>
                                       Email Id 
                                   </label>
                                   <input
                                   name="email"
                                   value={contact.email}
                                   onChange={updateInput}
                                    type="text" className="form-control" placeholder="Email id"/>
                               </div>
                              
                               {/* <div className="mb-2">
                                    <div className="row md-2">
                                        <p className="h5 text-success p-3">Change Profile picture</p>
                                        <input type="file" multiple accept="image/*" />
                                    </div>
                               </div> */}
                               <div className="mb-2 mt-5">
                                    <input type="submit" className="btn btn-success" value="Edit"/>
                                    <Button onClick={CancelButton} className="btn btn-dark ms-2" >Cancel</Button>
                               </div>
                               {/* <div className="mb-2 mt-5">
                                    <input type="submit" className="btn btn-success" value="Edit" onClick={EditButton}/>
                                    <input type="submit" className="btn btn-danger ms-3" value="Cancel"  onClick={CancelButton} />
                               </div> */}
                               
                           </form>
                        </div>
                    </div>
                </div>
            </section>
                </React.Fragment>
            }
        </React.Fragment>
    )
};

export default EditContact;