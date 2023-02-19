import "./App.css";
import { Home } from "./components/Home";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { Member } from "./components/Member";
import { Coupon } from "./components/Coupon";
import { Report } from "./components/Report";


function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          Codigo Test
        </h3>


        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>       
              <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/member"
              >
                Member List
              </NavLink>
            </li>    
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/coupon"
              >
                Coupon List
              </NavLink>
            </li>    
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/report"
              >
                Report List
              </NavLink>
            </li> 
          </ul>
        </nav>

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/member" component={Member} />
          <Route path="/coupon" component={Coupon} />
          <Route path="/report" component={Report} />


        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
