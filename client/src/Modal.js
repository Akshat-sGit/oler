import React from 'react'
import './css/Modal.css'


function Modal ({showModal, setShowModal, call, src, dest, car}) {
    
  return (
    <>
        <div className='modal-container'>
            <div>Congratulations!! Your Ride has been Booked Succesfully</div>
            <div>It will be from {src} to {dest}</div>
            <div>It will take shortest time of : {call?.distance} minuites</div>
            <div>You have to pay : Rs. {call?.distance*car}</div>
            <div>We have sent you a copy on your email</div>
            <div>Thank You !!!</div>
            <button className='modal-btn' onClick={() => setShowModal(false)} >Close</button>
        </div>
    </>
  )
}

export default Modal;
