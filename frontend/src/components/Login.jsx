import React from 'react';
import { useForm } from 'react-hook-form';
import "./Login.css";

export default function Login()  {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form  className="loginForm" onSubmit={handleSubmit(onSubmit)}  >
        <h2>Login</h2>
      <input className="inputEmail" type="email" placeholder="Email" {...register("Email", {required: true, min: 3, pattern: /^\S+@\S+$/i})} />
      <input className="inputPassword" type="password" placeholder="Password" {...register("Password", {required: true, min: 3, pattern: /^\S+@\S+$/i})} />
     
      <input type="submit" />
      <p>New here? then Sign up!</p>
    </form>
  );
}