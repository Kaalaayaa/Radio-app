import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useState } from "react";
import "./Login.css";

export default function Login() {
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
    const PORT = process.env.PORT || 9127;
    dotenv.config();
    const url = `http://localhost:${PORT}/login`;
    const data= { email, password };
    const headers= { "Content-Type": "application/json" };

    axios.post(url, data, headers)
       .then((response) => {
         if (response.data.message) {
           setLoginStatus(response.data.message);
          } else {

            setLoginStatus(response.data[0].name);
        
          }     
        });
      }     
             
      
  return (
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>

      <input 
            className="inputEmail" 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            {...register("Email", {
              required: true,
              min: 3,
              pattern: /^\S+@\S+$/i,
            })}
            />
     
      <input
        className="inputPassword"
        type="password"
        placeholder="Password"
        value={password} 
        {...register("Password", {
          required: true,
          min: 3,
          pattern: /^\S+@\S+$/i,
        })}
      />

      {/* <button type="submit" onClick= {() => props.login(email, password)}>Login</button> */}
      <input type="submit" onClick={loginUser} />
      <p onClick={showRegistration}>New here? then Sign up!</p>
    </form>
  );
}
