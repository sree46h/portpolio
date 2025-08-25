import React,{useState} from 'react'
import { FormField, Button, Checkbox, Form } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
const ContactForm = () => {
    const [name,setName]=useState("")
const [lastName,setLastname]=useState("")
const [email,setEmail]=useState("")
const [message,setMessage]=useState("")
const submitHandler=()=>{
if(!lastName){
    toast.warning("Are you sure you want to submit without lastname")
}
if(!name || !email || !message){
    toast.error("Mandatory fields should not be empty")
}
else{
    toast.success("Email Sent Successfully")
}

}
    return (
  <Form className='contact-form-container'>
    <FormField>
      <input placeholder='First Name*' onChange={(e)=>setName(e.target.value)}/>
    </FormField>
    <FormField>
      <input placeholder='Last Name' onChange={(e)=>setLastname(e.target.value)}/>
    </FormField>
    <FormField>
   
    <input placeholder='Email*' type='email' onChange={((e)=>setEmail(e.target.value))}/>
    </FormField>
    <FormField>
        <textarea placeholder='message*' onChange={(e)=>setMessage(e.target.value)}/>
    </FormField>
    <Button type='submit' onClick={submitHandler}>Submit</Button>
  </Form>
)
}

export default ContactForm