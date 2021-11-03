import React from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import { useForm } from "react-hook-form";
import { useState } from "react";
import Register from "./Register.jsx";
import "./Login.css";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    


    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    
    const showRegistration = () => {
      setLoginStatus(!loginStatus)
    }
    
    
    const loginUser = () => {
    console.log("User is logged in");
    dotenv.config();
    const PORT = process.env.PORT || 9127;
    const url = `http://localhost:${PORT}/login`;
    const data= { email, password };
    const headers= { "Content-Type": "application/json" };

    axios.post(url, data, headers)
       .then((response) => {
         if (response.data.error) {
           setLoginStatus(response.data.status);
          } else {

            // setLoginStatus(response.data.name);
            props.setUser(response.data)
        
          }     
        });
      } 
          
      if(loginStatus && loginStatus !== "error") {
        return ( 
          < Register />)
    }         
      
  return (
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      {loginStatus === "error" && <p>Error!</p>}
      <input 
            className="inputEmail" 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            // {...register("email", {
            //   required: true,
            //   min: 3,
            //   pattern: /^\S+@\S+$/i,
            // })}
            />
          <p>{errors.email?.message}</p>

     
      <input
        className="inputPassword"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // {...register("password", {
        //   required: true,
        //   min: 3,
        //   pattern: /^\S+\S+$/i,
        // })}
      />
      <p>{errors.password?.message}</p>


      {/* <button type="submit" onClick= {() => props.login(email, password)}>Login</button> */}
      <input type="submit" onClick={loginUser} />
      <p onClick={showRegistration}>New here? then Sign up!</p>
    </form>
  );
}
