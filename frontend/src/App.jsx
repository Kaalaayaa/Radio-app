import "./App.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Radio from "./components/Radio.jsx";
import DeleteAccount from "./components/DeleteAccount.jsx";
import Comments from "./components/Comments.jsx";

export default function App() {
  const [station, setStation] = useState("");
  const [city, setCity] = useState("");
  const url = `http://localhost:9127/city/${city}`;
  
 

//   function radioChange(city) {
    
//   }


  
  return (
    <div className="App">
      <Login />
      <Register />
      <DeleteAccount />
      <Radio />
      <Comments />
    </div>
  );
}
