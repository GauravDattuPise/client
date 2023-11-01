

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import './App.css';
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import NavbarComponent from "./components/layout/NavbarComponent";
import AddPlace from "./components/pages/addPlace/AddPlace";
import GetAllPlaces from "./components/pages/addPlace/GetAllPlaces";
import { createContext, useCallback, useEffect, useState } from "react";
import UpdatePlace from "./components/pages/addPlace/UpdatePlace";

export const GlobalLoginState = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();

  function loginStateHandle(value) {
    setIsLogin(value)
  }

  const login = useCallback(() => {
    loginStateHandle(true);
    if (isLogin) {
      history.push("/getAllPlaces");
    }
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.token) {
      login();
    } else {
      // if not logged in
      history.push("/");
    }
  }, [isLogin, history]);

  useEffect(() => {
    let logoutTimer;

    if (isLogin) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {
        const expirationDate = new Date(userData.expiration);
        const currentTime = new Date().getTime();
        const remainingTime = expirationDate.getTime() - currentTime;

        if (remainingTime > 0) {
          logoutTimer = setTimeout(() => {
            logout();
          }, remainingTime);
        }
      }
    }
    return () => {
      clearTimeout(logoutTimer);
    };
  }, [isLogin]);

  // logout function 
  const logout = () => {
    loginStateHandle(false);
    localStorage.removeItem("userData");
    
    history.push("/");
  };

  return (
    <GlobalLoginState.Provider value={{ isLogin, loginStateHandle }}>
      <div className="App">
        <NavbarComponent />
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/addPlace">
            <AddPlace />
          </Route>
          <Route path="/getAllPlaces">
            <GetAllPlaces />
          </Route>
          <Route path="/updatePlace/:placeId">
            <UpdatePlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </GlobalLoginState.Provider>
  );
}

export default App;
