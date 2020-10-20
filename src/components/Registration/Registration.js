import React, { useState, useEffect } from 'react'
import axios from 'axios'
import schema from './schema'
import * as yup from 'yup'
import User from './RegistrationCheck'

const initialFormValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    terms: false
}

const initialFormErrors = {

  name: '',
  username: '',
  email: '',
  password: ''
}

const initialDisabled = true;
const initialRender = []


export default function Registration() {

const [render, setRender] = useState(initialRender)
const [formValues, setFormValues] = useState(initialFormValues)
const [errors, setErrors] = useState(initialFormErrors)
const [disabled, setDisabled] = useState(initialDisabled)


const getUsers = () => {
    axios
        .get('http://herokuurl.herokuapp.com/users')
        .then(res => {
            setRender(res.data)
        })
        .catch(err => {
            console.log('GET ERR -->', err)
        })
}


const postUsers = (newUser) => {
   axios
     .post('http://herokuurl.herokuapp.com/register', newUser)
     .then(res => {
   setRender([res.data, ...render])
   setFormValues(initialFormValues);
     })
     .catch(err => {
       console.log('POST ERR -->', err)
     })
     .finally(() => {
         setFormValues(initialFormValues)
     })
}


const formSubmit = () => {
  const newUser = {
    name: formValues.name.trim(),
    username: formValues.username.trim(),
    email: formValues.email.trim(),
    password: formValues.password.trim(),
    terms: formValues.terms
  }
  postUsers(newUser);
};


const formUpdate = (name, value) => {
yup
  .reach(schema, name)
  .validate(value)
  .then(() => {
    setErrors({
      ...errors, [name]: '',
    })
  })
  .catch(err => {
    setErrors({
      ...errors, [name]: err.errors[0],
    })
  })
  setFormValues({
    ...formValues, [name]: value,
  })
}


const onSubmit = (evt) => {
    evt.preventDefault()
    formSubmit()
}


const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    formUpdate(name, valueToUse)
}

useEffect(() => {
    getUsers()
}, [])

useEffect(() => {
  schema.isValid(formValues).then((valid) => {
    setDisabled(!valid)
  })
}, [formValues])


return (

    <div>

        <h2 className='title'>Registration Form:</h2>
<form onSubmit={onSubmit}>


    <div className='error'>{errors.name}</div>
    <label> Name: 
        <input
            name='name'
            type='text'
            value={formValues.name}
            onChange={onChange}
        />
    </label>


    <div className='error'>{errors.username}</div>
    <label> Username: 
        <input
        name='username'
        type='text'
        value={formValues.username}
        onChange={onChange}
        />
    </label>


    <div className='error'>{errors.email}</div>
    <label>Email:
        <input
        name='email'
        type='email'
        value={formValues.email}
        onChange={onChange}
        />
    </label>


    <div className='error'>{errors.password}</div>
    <label> Password:
        <input
        name='password'
        type='password'
        value={formValues.password}
        onChange={onChange}
        />
    </label>


        <div className='error'>{errors.terms}</div>
    <label> Terms of Service:
        <input
        name='terms'
        type='checkbox'
        value={formValues.terms}
        onChange={onChange}
        />
    </label>
    <br />

    <button disabled={disabled}>Submit!</button>


    </form>

     <User details={formValues}/>

</div>


    )
}

