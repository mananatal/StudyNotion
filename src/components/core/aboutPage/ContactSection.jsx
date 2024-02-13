import React from 'react'
import ContactUsForm from '../../contact/ContactUsForm'

function ContactSection() {
  return (
    <div className='flex flex-col items-center justify-center gap-12'>
        <div className='flex flex-col gap-4 items-center'>
            <h2 className='text-white font-semibold text-4xl'>Get in Touch</h2>
            <p className='text-richblack-300'>We'd love to here for you, Please fill out this form.</p>
        </div>
        <ContactUsForm/>
    </div>
  )
}

export default ContactSection