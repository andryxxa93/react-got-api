import React from 'react';
import './errorMessage.css';
import img from './error.jpg';


const ErrorMessage = () => {
    return (
        <div className='random-block'>
            <img src={img} alt='error'></img>
            <span>
                Something goes wrong
            </span>

        </div>
    )
} 

export default ErrorMessage;