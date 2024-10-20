import { useEffect, createContext, useState } from "react"

import axios from 'axios';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MobileHeader from "./mobile/components/MobileHeader";
import MobileMainPage from "./mobile/pages/MobileMainPage";
import MobileAccount from "./mobile/pages/MobileAccount";
import MobileAboutUs from "./mobile/pages/MobileAboutUs";
import MobileSignIn from "./mobile/pages/MobileSignIn";
import MobileSignUp from "./mobile/pages/MobileSignUp";
import MobileSubscription from "./mobile/pages/MobileSubscription";
import MobileSupport from "./mobile/pages/MobileSupport";


const Data = createContext(null);

function App() {
  const [data, setData] = useState({
    auth:              localStorage.getItem("auth") === "true" || false,
    access_token:      localStorage.getItem("access_token") || null,
    user_id:           localStorage.getItem('user_id'),
    username:          localStorage.getItem("username"),
    role:              localStorage.getItem("role") || "USER",
    subscription_end:  localStorage.getItem("subscription_end") || null,
  })

  // axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;  for deploy with docker
  axios.defaults.baseURL = "https://upgraded-halibut-66v6p9wq657crrvv-5000.app.github.dev/api";
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
  }, [data])

  const setterWithObserver = (data) => {
    setData({...data});
    console.log("Observer: ", data);  // TODO: Remove debug logs

    // set values into localstorage for load them after re-open site.
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }

  return (
    <>
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
    </>
  );
}

export default App;
export {Data};