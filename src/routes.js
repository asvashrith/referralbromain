import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./authentication/login";
import Mainpage from "./authentication/main";


function Routing() {
  return (
    <Router>
      
      <Routes>
        <Route path="" component={Login} />
        <Route path="/main" component = {Mainpage} />
        <Route path='asv' component={Mainpage}/>

      </Routes>
    </Router>
  );
}

export default Routing;