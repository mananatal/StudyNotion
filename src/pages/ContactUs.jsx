import React from 'react'
import ContactUsForm from '../components/contact/ContactUsForm'
import ContactDetails from '../components/contact/ContactDetails'
import Footer from '../components/common/footer/Footer'

function ContactUs() {
  return (
    <div>
        <div  className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
            {/* contactdetails */}
            <div>
                <ContactDetails/>
            </div>
            {/* contact form */}
            <div >
                <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
                    <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
                    Got a Idea? We&apos;ve got the skills. Let&apos;s team up
                    </h1>
                    <p className="">
                        Tell us more about yourself and what you&apos;re got in mind.
                    </p>
                    <div className='mt-7'>
                        <ContactUsForm/>
                    </div>
                </div>                
            </div>
        </div>

        {/* footer */}
        <div className='bg-richblack-800'>
            <Footer/>
        </div>
    </div>
  )
}

export default ContactUs