import { useEffect, createContext, useState } from "react"

import axios from 'axios';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './desktop/components/Header';
import MainPage from './desktop/pages/MainPage';
import Account from './desktop/pages/Account';

const Data = createContext(null);

function App() {
  const [data, setData] = useState({
    auth:          localStorage.getItem("auth") === "true" || false,
    access_token:  localStorage.getItem("access_token"),
    avatar:        localStorage.getItem("avatar"),
    username:      localStorage.getItem("username"),
    user_id:       localStorage.getItem('user_id')
  })

  // axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;  for deploy with docker
  axios.defaults.baseURL = "/";
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
      <BrowserView>
        <BrowserRouter>
          {/* desktop version */}
          <Data.Provider value={{user: data, setter: setterWithObserver}}>
            <Header />
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/account' element={<Account />} />
            </Routes>
          </Data.Provider>
        </BrowserRouter>
      </BrowserView>

      <MobileView>
        <h1> челы на мобилках сосут</h1>
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