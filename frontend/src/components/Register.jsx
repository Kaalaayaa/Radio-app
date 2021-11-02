import React from 'react';
import { useForm } from 'react-hook-form';
import "./Login.css";

export default function Register()  {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form  className="loginForm" onSubmit={handleSubmit(onSubmit)}  >
        <h2>Register</h2>
      <input className="inputName" type="text" placeholder="Name" {...register("Name", {required: true, min: 3, pattern: /^\S+@\S+$/i})} />
      <input className="inputEmail" type="email" placeholder="Email" {...register("Email", {required: true, min: 3, pattern: /^\S+@\S+$/i})} />
      <input className="inputPassword" type="password" placeholder="Password" {...register("Password", {required: true, min: 3, pattern: /^\S+@\S+$/i})} />
     
      <input type="submit" />
      <p>Already a member? Log In!</p>
    </form>
  );
}