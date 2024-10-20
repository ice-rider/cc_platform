import { useEffect, createContext, useState } from "react"

import axios from 'axios';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './desktop/components/Header';
import MainPage from './desktop/pages/MainPage';
import Account from './desktop/pages/Account';
import Subscription from "./desktop/pages/Subscription";
import Support from "./desktop/pages/Support";
import AboutUs from "./desktop/pages/AboutUs";
import SignIn from "./desktop/pages/SignIn";
import SignUp from "./desktop/pages/SignUp";
import SignOut from "./desktop/pages/SignOut";

import MobileHeader from "./mobile/components/MobileHeader";
import MobileMainPage from "./mobile/pages/MobileMainPage";
import MobileAccount from "./mobile/pages/MobileAccount";
import MobileAboutUs from "./mobile/pages/MobileAboutUs";
import MobileSignIn from "./mobile/pages/MobileSignIn";
import MobileSignUp from "./mobile/pages/MobileSignUp";
import MobileSubscription from "./mobile/pages/MobileSubscription";
import MobileSupport from "./mobile/pages/MobileSupport";
import { createTheme, ThemeProvider } from "@mui/material";


const Data = createContext(null);

const theme = createTheme({
  palette: {
    primary: {
      main: "#55b76b",
      dark: "#46a65c",
      light: "#6bc17d",
      contrastText: "white",
    }
  }
})

function App() {
  const [data, setData] = useState({
    auth:              localStorage.getItem("auth") === "true",
    access_token:      localStorage.getItem("access_token"),
    user_id:           localStorage.getItem('user_id'),
    username:          localStorage.getItem("username"),
    email:             localStorage.getItem("email"),
    avatar:            localStorage.getItem("avatar"),
    role:              localStorage.getItem("role") || "USER",
    subscription_end:  localStorage.getItem("subscription_end"),
  })

  // axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;  for deploy with docker
  axios.defaults.baseURL = "https://bug-free-space-orbit-66v6p9wq6rjfxx4p-5000.app.github.dev/api";
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
  }, [data])

  const setterWithObserver = (data) => {
    setData({...data});
    console.log("Observer updates: ")
    console.table(data);
    // set values into localstorage for load them after re-open site.
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserView>
          <BrowserRouter>
            {/* desktop version */}
            <Data.Provider value={{user: data, setter: setterWithObserver}}>
              <Header />
              <Routes>
                <Route path='/*' element={<MainPage />} />
                <Route path='/account' element={<Account />} />
                <Route path='/subscription' element={<Subscription/>} />
                <Route path='/support' element={<Support/>} />
                <Route path='/about' element={<AboutUs/>} />
                <Route path='/sign-in' element={<SignIn/>} />
                <Route path='/sign-up' element={<SignUp/>} />
                <Route path='/sign-out' element={<SignOut/>} />
              </Routes>
            </Data.Provider>
          </BrowserRouter>
        </BrowserView>

        <MobileView>
          <BrowserRouter>
            {/* Mobile version */}
            <Data.Provider value={{ user: data, setter: setterWithObserver }}>
              <MobileHeader />
              <Routes>
                <Route path='/' element={<MobileMainPage />} />
                <Route path='/account' element={<MobileAccount />} />
                <Route path='/about' element={<MobileAboutUs/>} />
                <Route path='/subscription' element={<MobileSubscription />} />
                <Route path='/support' element={<MobileSupport />} />
                <Route path='/sign-in' element={<MobileSignIn/>} />
                <Route path='/sign-up' element={<MobileSignUp/>} />
                <Route path='/sign-out' element={<SignOut/>} />
              </Routes>
            </Data.Provider>
          </BrowserRouter>
        </MobileView>
        
        {/* toastify container for notifications */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
      </ThemeProvider>
    </>
  );
}

export default App;
export {Data};
