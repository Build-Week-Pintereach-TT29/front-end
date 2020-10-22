import React from 'react'
import LogIn from './Login'
import { AppBar, Toolbar, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'


const useStyles = makeStyles({


  root: {
    display: 'flex',
    },

  header:{
    display: 'flex',
    backgroundColor: 'lightblue',
    color: 'black',
},

  buffer:{
    flexGrow: 1,
  },

  links:{
    marginLeft: '15%',
    alignContent: 'space-between'
},


})

function NavBar(){

const classes = useStyles();


return(

    <div className={classes.root}>
        <AppBar position='sticky' className={classes.header}>
            <Toolbar className={classes.header}>
            <div>
              <Link to='/'>Home</Link>
              <Link to='/Registration' className={classes.links}>Registration</Link>
            </div>
            <div className={classes.buffer} />
             <LogIn/>
            </Toolbar>
        </AppBar>
    </div>
    )          
}

export default NavBar 