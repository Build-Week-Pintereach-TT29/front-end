import React from 'react'

export default function User(props) {

const { details } = props

    if(!details) {
        return <h3>Register today to begin pinning articles!</h3>
    }


    return(

        <div>
        <h2>You're now registered with the following: </h2>

            <div>
                <h3>{details.name}</h3>
                <p>Email: {details.email}</p>
                <p>Username: {details.username}</p>
            </div>
        </div>

    )
}