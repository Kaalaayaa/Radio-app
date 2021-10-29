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
  
   
  useEffect(() => {
      city.length > 1 ? 
        fetch(url)
        .then((response) => response.json())
        .then((station) => {
          setStation(station.station);
        })
        .catch((error) => {
          alert(
            "Oh no! An error happened! Please try again. If the problem persists, contact support at 555-123-456 :)"
          );
          console.error(error);
        }) : null
      }, [city]); 

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
