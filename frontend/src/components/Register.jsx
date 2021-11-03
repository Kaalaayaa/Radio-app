import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import "./Login.css";
import axios from "axios"
import Login from "./Login.jsx";

export default function Register(props)  {

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
        < Login setUser={props.setUser}/>)
  }

  return (
    <form  className="loginForm" onSubmit={registerUser} onSubmit={handleSubmit(onSubmit)}  >
        <h2>Register</h2>
      <input 
        className="inputName"
        type="text" 
        placeholder="Name"
        onChange={e => setName(e.target.value)}
        value={name}
        required={true}
        minLength={3}
        maxLength={28}
      />
      <p>{errors.name?.message}</p>

      <input 
        className="inputEmail" 
        type="email" 
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required={true}
        minLength={3}
        maxLength={28}
        // pattern= {/^\S+@\S+$/i}
      />
      <p>{errors.email?.message}</p>

      <input 
        className="inputPassword" 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required={true}
        minLength={3}
        maxLength={28}
        // pattern= {/^\S+@\S+$/i}
      />
      <p>{errors.password?.message}</p>

      <input type="submit" onClick={registerUser} />
      <p onClick={showLogin}>Already a member? Log In!</p>
    </form>
  );
}