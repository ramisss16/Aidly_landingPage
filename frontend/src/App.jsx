
import { Outlet } from "react-router-dom";
import Loginpage from "./pages/Common/LoginPage";
import Navbar from "../Component/Navbar";

function App(){
  return(
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}


export default App;
