import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import Extra from "./Extra";
import Settings from "./Settings";
import Faqs from "./Faqs";
import Blog from "./Blog";
import Courses from "./Courses";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

function Header() {
  const [isSignupOpen, setSignupOpen] = useState(0);
  const [isLoginOpen, setLoginOpen] = useState(0);

  function signupclick() {
    setSignupOpen(1);
  }
  function loginclick() {
    setLoginOpen(1);
  }

  function Otpscreen() {
    return (
      <>
        <div className="blankscreen" onClick={stopClick}></div>
        <div className="signuppopup">
          <h3 className="credent">Enter OTP</h3>
          <p>OTP</p>
          {/* <input className='credinp' type='number' id='inp' maxLength={5}></input> */}
          <div className="otp-container">
            {[...Array(5)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-input"
                onChange={(e) => {
                  const { value } = e.target;
                  if (value.length === 1 && index < 4)
                    e.target.nextSibling?.focus();
                  if (value.length === 0 && index > 0)
                    e.target.previousSibling?.focus();
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" &&
                    e.target.value === "" &&
                    index > 0
                  ) {
                    e.target.previousSibling?.focus();
                  }
                }}
              />
            ))}
          </div>

          <button
            className="credbut"
            type="sumbit"
            onClick={async () => {
              const inp = document.getElementsByClassName("otp-input");
              const inpu =
                inp[0].value + inp[1].value + inp[2].value + inp[3].value;
              const date = new Date();
              alert(inpu);
              const otp = inpu;
              const password = "";

              const sessionId = localStorage.getItem("sessionId");
              console.log("Session ID:", sessionId);

              try {
                const response = await fetch(
                  "http://localhost:3030/otp-check",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ otp, sessionId, date }),
                  }
                );

                const data = await response.text();
                console.log(data);
                alert("Registration successful");
              } catch (error) {
                console.error("Error:", error);
              }
            }}
          >
            Done
          </button>
          <p className="credtc">
            By signing up, you agree to our Terms & Conditions & Privacy Policy
          </p>
        </div>
      </>
    );
  }

  function stopClick() {
    setSignupOpen(0);
    setLoginOpen(0);
  }

  function Signup() {
    return (
      <>
        <div className="blankscreen" onClick={stopClick}></div>
        <div className="signuppopup">
          <h3 className="credent">Enter Your Email Id To Register</h3>
          <p>Phone number/Email ID</p>
          <input className="credinp" type="email" id="inp"></input>
          {/* <p>Password</p> */}
          {/* <input className='credinp' type='email' id='inpp'></input> */}
          <button
            className="credbut"
            type="sumbit"
            onClick={async () => {
              const inp = document.getElementById("inp");
              // const inpp = document.getElementById('inpp')
              const date = new Date();
              const email = inp.value;
              // const password = inpp.value
              // const password = "maihupassword"

              setSignupOpen(2);

              try {
                const response = await fetch("http://localhost:3030/register", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email, date }),
                });

                const data = await response.text();
                console.log(data);

                if (data == "1") {
                }
                if (data == "2") {
                }

                localStorage.setItem("sessionId", data);
                alert("Registration successful");
              } catch (error) {
                console.error("Error:", error);
              }
            }}
          >
            Next
          </button>
          <p className="credtc">
            By signing up, you agree to our Terms & Conditions & Privacy Policy
          </p>
        </div>
      </>
    );
  }

  function Login() {
    return (
      <>
        <div className="blankscreen" onClick={stopClick}></div>
        <div className="signuppopup">
          <h3 className="credent">Enter email/phone number</h3>
          <p>Phone number/Email ID</p>
          <input className="credinp" type="email" id="inp2"></input>
          <button
            className="credbut"
            type="sumbit"
            onClick={async () => {
              const inp2 = document.getElementById("inp2");
              const email = inp2.value;
              const date = new Date();
              const password = "";
              try {
                const response = await fetch("http://localhost:3030/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email, password, date }),
                });

                const data = await response.json();
                console.log(data);
                alert("Login successful");
              } catch (error) {
                console.error("Error:", error);
              }
            }}
          >
            Next
          </button>

          <p className="credtc">
            By signing up, you agree to our Terms & Conditions & Privacy Policy
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="header">
      {isSignupOpen == 1 && <Signup />}
      {isLoginOpen == 1 && <Login />}
      {isSignupOpen == 2 && <Otpscreen />}
      {isLoginOpen == 2 && <Otpscreen />}

      <img src={logo} className="logo" />
      <div className="searchWrap">
        <input
          className="searchInput"
          type="text"
          placeholder="  Type here to search.."
        />
        <button className="searchButton">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="magnifying-glass"
            className="searchIcon"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            ></path>
          </svg>
        </button>
      </div>
      <button className="signupBtn" onClick={signupclick}>
        &nbsp;&nbsp;Signup&nbsp;&nbsp;
      </button>
      <button className="loginBtn" onClick={loginclick}>
        &nbsp;&nbsp;Login&nbsp;&nbsp;
      </button>
      {/* <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-user" className="userPfp" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"></path></svg> */}
    </div>
  );
}

// function signupclick(){
//     return(
//      <div style={{zIndex:4,backgroundColor:"green",width:"500px",height:"600px"}}>jjjjjlkjaj;fa</div>
//     )
//     //  alert("chl gya")
// }

function Sidebar() {
  return (
    <div className="sidebar">
      <h5 className="mainmenutext">MAIN MENU</h5>

      <div className="clickables">
        <ul className="home opts">
          <a href="/" style={{ textDecoration: "none" }}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="house"
              className="homeImage"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
              ></path>
            </svg>
            Home
          </a>
        </ul>
        <ul className="courses opts">
          <a href="/Courses" style={{ textDecoration: "none" }}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="graduation-cap"
              className="coursesImage"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9l0 28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5l0-24.6c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"
              ></path>
            </svg>
            Courses
          </a>
        </ul>
        {/* <ul className="extra opts">
      <a href='/Extra' style={{ textDecoration: 'none' }}>
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book-atlas" className="extraImage" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 96C0 43 43 0 96 0L384 0l32 0c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32l0 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0L96 512c-53 0-96-43-96-96L0 96zM64 416c0 17.7 14.3 32 32 32l256 0 0-64L96 384c-17.7 0-32 14.3-32 32zM247.4 283.8c-3.7 3.7-6.2 4.2-7.4 4.2s-3.7-.5-7.4-4.2c-3.8-3.7-8-10-11.8-18.9c-6.2-14.5-10.8-34.3-12.2-56.9l63 0c-1.5 22.6-6 42.4-12.2 56.9c-3.8 8.9-8 15.2-11.8 18.9zm42.7-9.9c7.3-18.3 12-41.1 13.4-65.9l31.1 0c-4.7 27.9-21.4 51.7-44.5 65.9zm0-163.8c23.2 14.2 39.9 38 44.5 65.9l-31.1 0c-1.4-24.7-6.1-47.5-13.4-65.9zM368 192a128 128 0 1 0 -256 0 128 128 0 1 0 256 0zM145.3 208l31.1 0c1.4 24.7 6.1 47.5 13.4 65.9c-23.2-14.2-39.9-38-44.5-65.9zm31.1-32l-31.1 0c4.7-27.9 21.4-51.7 44.5-65.9c-7.3 18.3-12 41.1-13.4 65.9zm56.1-75.8c3.7-3.7 6.2-4.2 7.4-4.2s3.7 .5 7.4 4.2c3.8 3.7 8 10 11.8 18.9c6.2 14.5 10.8 34.3 12.2 56.9l-63 0c1.5-22.6 6-42.4 12.2-56.9c3.8-8.9 8-15.2 11.8-18.9z"></path></svg>
        Extra
        </a>

      </ul>
      <ul className="faqs opts">
      <a href='/Faqs' style={{ textDecoration: 'none' }}>

      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-invoice" className="faqsImage" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM80 64l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L80 96c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 352c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32zm0 32l0 64 192 0 0-64L96 256zM240 416l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"></path></svg>
        FAQ's
        </a>

      </ul>
      <ul className="blog opts">
      <a href='/Blog' style={{ textDecoration: 'none' }}>

      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="blog" className="blogImage" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144L0 368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144l-16 0 0 96 16 0c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48l0-224z"></path></svg>
        Blog
        </a>

      </ul>

      <ul className="settings opts">
      <a href='/Settings' style={{ textDecoration: 'none' }}>
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gear" className="settingsImage" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"></path></svg>
        Settings
      </a>
      </ul> */}
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="mainContent">
      <Sidebar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Courses" element={<Courses />} />
          {/* <Route path="/Extra" element={<Extra />} />
      <Route path="/Faqs" element={<Faqs />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/Blog" element={<Blog />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

const NotFound = () => (
  <div>
    <h1>404 - Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a to="/">Go back to Home</a>
  </div>
);

function App() {
  return (
    <>
      <Header />
      {/* <Sidebar/> */}
      <Content />
    </>
  );
}

export default App;
