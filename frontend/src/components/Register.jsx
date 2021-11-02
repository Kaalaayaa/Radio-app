import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import "./Login.css";
import axios from "axios"
import Login from "./Login.jsx";

export default function Register()  {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(false)


  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  


  const showLogin = () => {
    setIsLogin(!isLogin)
  }

  const registerUser = () => {
      console.log("New cs added")
      axios.post("http://localhost:9127/register", {
          name: name,
          email: email,
          password: password
      }).then((response) => {
          console.log(response)
      })
  }
  
  if(isLogin) {
      return ( 
        < Login />)
  }

  return (
    <form  className="loginForm" onSubmit={registerUser} onSubmit={handleSubmit(onSubmit)}  >
        <h2>Register</h2>
      <input 
        className="inputName"
        type="text" 
        placeholder="Name"
        onChange={e => setName(e.target.value)}
        {...register("Name", {required: true, min: 3, pattern: /^\S+@\S+$/i})}
      />
      <input 
        className="inputEmail" 
        type="email" 
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        {...register("Email", {required: true, min: 3, pattern: /^\S+@\S+$/i})}
      />
      <input 
        className="inputPassword" 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // {...register("Password", {required: true, min: 3, pattern: /^\S+@\S+$/i})}
      />
     
      <input type="submit" onClick={registerUser} />
      <p onClick={showLogin}>Already a member? Log In!</p>
    </form>
  );
}