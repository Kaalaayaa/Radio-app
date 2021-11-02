import { useState } from "react";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Radio from "./components/Radio.jsx";
import DeleteAccount from "./components/DeleteAccount.jsx";
import Comments from "./components/Comments.jsx";
import Heading from "./components/Heading.jsx";

import "./App.css";


export default function App() {
  const [user, setUser] = useState(false);
  
  return (
    <div className="App">
      <Register />
      <DeleteAccount />
      <Heading /> 
      <Radio />
      {user ?  <Comments /> : null}
    </div>
  );
}
