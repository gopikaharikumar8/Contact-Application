
import React from 'react';
import './App.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HorizontalLabelPositionBelowStepper from './Components/stepper';
import {Routes,Route,Navigate} from 'react-router-dom';
import TopBar from './Components/TopBar/TopBar';
import ContactList from './Components/contacts/List/ContactList';
import CreateContact from './Components/contacts/Create/CreateContact';
import EditContact from './Components/contacts/Edit/EditContact';
import ViewContact from './Components/contacts/View/ViewContact';
import Login from './Components/authentication/Login';
import Signup from './Components/authentication/Signup';


let App=()=>
{
    return(
      <React.Fragment> 
      <TopBar/>
      <Routes>
          <Route path={'/'} element={<Navigate to={'/authentication/login'}/>}/>
          <Route path={'/authentication/login'} element={<Login/>}/>
          <Route path={'/authentication/signup'} element={<Signup/>}/>
          <Route path={'/contacts/list'} element={<ContactList/>}/>
          <Route path={'/contacts/create'} element={<CreateContact/>}/>
          <Route path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
          <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
      </Routes>
    </React.Fragment>
    );
};

export default App;
