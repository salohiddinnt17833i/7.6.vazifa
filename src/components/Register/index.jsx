import { CiUser } from "react-icons/ci";
import { IoMailOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import google from "../../assets/google.png";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { add } from "../../redux/tokenSlice";
import { Link, useNavigate } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
function Register({ theme, setTheme }) {
  const emailRef = useRef(null);
  const pasRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.value);
  const handleSubmit = (e) => {
    e.preventDefault()
    let user = users.find((el) => {
        return el.email === emailRef.current.value && el.password === pasRef.current.value
    })
    if (user) {
        dispatch(add(user.email))
        navigate('/')
    } else {
        alert('Noto\'g\'ri elektron pochta yoki parol kiritildi!')
    }
}
const toggle_mode = () => {
  theme == "light" ? setTheme("dark") : setTheme("light");
};
  return (
    <>
     <div className={`${theme == "light" ? 'conteiner bg-[#272935]' : 'bg-[#fff]'} ${'conteiner'}`}>
        <div className="class"><h2 className={`${theme == "light" ? 'title' : 'titleDark'} ${'title'}`}>
        Welcome back!
        </h2>{" "}
        <MdDarkMode
          onClick={() => {
            toggle_mode();
          }}
        /></div>
        <form className={`${theme == "light" ? 'form' : 'formDark'} ${'form'}`}>
          
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
          <button className="button" onClick={handleSubmit}>
          Log in
          </button>
          <Link to="/register" className="link">Register</Link>
        </form>
      </div>
    </>

  );
}

export default Register;
