import React, { useState, useEffect } from 'react'
import axios from 'axios'
import schema from './schema'
import * as yup from 'yup'
import User from './RegistrationCheck'
import { Button, Typography, InputLabel }from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Textfield from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'

//BEGINNING OF STYLE//


const useStyles = makeStyles({
mainContainer: {
    display: 'Grid',
    justifyContent: 'center',
    position: 'relative',
    },

formContainer: {
    display: 'Grid'

},

inputFields: {
    marginBottom: '2rem', 
    width: '50%',
},

submitBtn: {
    backgroundColor: '#00ffff',
    padding: '1rem',
    width: '50%'
}

})


//BEGINNING OF LOGIC//


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
  password: '',
  terms: false
}

const initialDisabled = true;
const initialRender = []


export default function Registration(props) {
const classes = useStyles()

const [render, setRender] = useState(initialRender)
const [formValues, setFormValues] = useState(initialFormValues)
const [errors, setErrors] = useState(initialFormErrors)
const [disabled, setDisabled] = useState(initialDisabled)

const postUsers = (newUser) => {
   axios
     .post('https://pintereach-app-api.herokuapp.com/register', newUser)
     .then(res => {
   setRender([res.data, ...render])
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
  schema.isValid(formValues).then((valid) => {
    setDisabled(!valid)
  })
}, [formValues])


return (

<div>
    <Typography 
    variant='h4'
    style={{ color: 'darkgrey', textAlign: 'center'}}
    >
    Registration Form
    </Typography>

    <div>
        <form className='classes' onSubmit={onSubmit}>

            <Textfield
            className={classes.inputFields}
            variant='standard'
            label='Name'
            id='name'
            type='text'
            required
            defaultValue={formValues.name}
            onChange={onChange}
            error={Boolean(errors.name ? errors.name : '')}
            helperText={errors.name}
            /><br />

            <Textfield
            className={classes.inputFields}
            variant='standard'
            id='username'
            label='Username'
            type='text'
            required
            defaultValue={formValues.username}
            onChange={onChange}
            helperText={errors.username}
            /><br />

            <Textfield
            className={classes.inputFields}
            variant='standard'
            id='email'
            label='Email'
            type='email'
            required
            defaultValue={formValues.email}
            onChange={onChange}
            helperText={errors.email}
            /><br />

            <Textfield
            className={classes.inputFields}
            variant='standard'
            id='password'
            label='Password'
            type='password'
            required
            defaultValue={formValues.password}
            onChange={onChange}
            helperText={errors.password}
            /><br />


            <InputLabel> Terms of Service </InputLabel>
            <Checkbox id='standard-basic'
            className={classes.inputFields}
            variant='standard'
            label='Terms of Service'
            name='terms'
            type='checkbox'
            required
            value={formValues.terms}
            onChange={onChange}
            />
            <br />

        <Button 
        className={classes.submitBtn}
        variant='contained'
        type='submit'
        disabled={disabled}
        onClick={formSubmit}>
        Submit!
        </Button>


        </form>

    </div>

    {/* <Textfield id='standard-basic'>
    <Error className='error'>{errors.username}</Error>
    <label> Username: <br />
        <input
        inputProps={{}}
        name='username'
        type='text'
        value={formValues.username}
        onChange={onChange}
        />
    </label>
    </Textfield>


    <Textfield id='standard-basic'>
    <Error className='error'>{errors.email}</Error>
    <label>Email: <br />
        <input
        name='email'
        type='email'
        value={formValues.email}
        onChange={onChange}
        />
    </label>
    </Textfield>


    <Textfield id='standard-basic'>
    <Error className='error'>{errors.password}</Error>
    <label> Password: <br />
        <input
        name='password'
        type='password'
        value={formValues.password}
        onChange={onChange}
        />
    </label>
    </Textfield>


    <Textfield id='standard-basic'>
    <Error className='error'>{errors.terms}</Error>
    <label> Terms of Service:
        <input
        name='terms'
        type='checkbox'
        value={formValues.terms}
        onChange={onChange}
        />
    </label>
    </Textfield> */}


    {render.map((user)=> {
     return <User key={user.id} details={user}/>
    })}


</div>


    )
}

