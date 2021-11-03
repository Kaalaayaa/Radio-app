import "./App.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Radio from "./components/Radio.jsx";
import DeleteAccount from "./components/DeleteAccount.jsx";
import Comments from "./components/Comments.jsx";
import Heading from "./components/Heading.jsx";
import { CommentsContextProvider } from "./contexts/CommentsContext.jsx";


export default function App() {
  
  return (
    <div className="App">
      <CommentsContextProvider>
      {/* <Login /> */}
      <Register />
      <DeleteAccount />
      <Heading /> 
      <Radio />
      <Comments />
      </CommentsContextProvider>
    </div>
  );
}
