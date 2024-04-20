import { CiUser } from "react-icons/ci";
import { IoMailOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
function Login({ theme, setTheme }) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const pasRef = useRef(null);

  const toggle_mode = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };
  const dispatch = useDispatch();
  const validate = () => {
    if (!nameRef.current.value.trim()) {
      alert("Enter your full name!");
      return false;
    }

    if (nameRef.current.value.length == 3) {
      alert("The number of characters must be at least 4!");
      return false;
    }

    if (!emailRef.current.value.trim()) {
      alert("Enter your full email!");
      return false;
    }

    if (emailRef.current.value.length == 3) {
      alert("The number of characters must be at least 4!");
      return false;
    }

    if (!pasRef.current.value.trim()) {
      alert("Enter your full password!");
      return false;
    }

    if (pasRef.current.value.length == 3) {
      alert("The number of characters must be at least 4!");
      return false;
    }
    return true;
  };
  const navigate = useNavigate();
  function handleSave(e) {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      const user = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: pasRef.current.value,
      };
      dispatch(addUser(user));
      (nameRef.current.value = null),
        (emailRef.current.value = null),
        (pasRef.current.value = null);
      navigate("/login");
    }
  }

  return (
    <>
      <div className={`${theme == "light" ? 'conteiner bg-[#272935]' : 'bg-[#fff] '} ${'conteiner '}`}>
        <div className="class"><h2 className={`${theme == "light" ? 'title' : 'titleDark'} ${'title'}`}>
          Let’s go!
        </h2>{" "}
        <MdDarkMode
          onClick={() => {
            toggle_mode();
          }}
        /></div>
        <form className={`${theme == "light" ? 'form' : 'formDark'} ${'form'}`}>
          <label className="label">Full Name</label>
          <div className="cont_form">
            <CiUser className="icon" />
            <input type="text" placeholder="John Doe" ref={nameRef} />
          </div>

          <label className="label">Full Name</label>
          <div className="cont_form">
            <IoMailOutline className="icon" />
            <input type="email" placeholder="example@site.com" ref={emailRef} />
          </div>

          <label className="label">Choose Password</label>
          <div className="cont_form">
            <CiLock className="icon" />
            <input
              type="password"
              placeholder="Minimum 8 characters"
              ref={pasRef}
            />
          </div>
          <button className="button" onClick={handleSave}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
