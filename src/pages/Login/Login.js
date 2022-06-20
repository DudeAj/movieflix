import React, { useState } from 'react';
import styles from './login.module.css';
import { connect } from 'react-redux';
import { setLoginAsync } from '../../store/actions';
import Message from '../../components/UI/message/Message';
import { CircularProgress } from '@mui/material';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import customeReq from '../../utils/customReq';
import { toast } from 'react-toastify';
import AuthContext from '../../context/auth';

const Login = (props) => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const authCtx = React.useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (email === "" || password === "") {
      toast.warn("Please Fill All the fields")
      setLoading(false)
      return;
    }
    try {
      const user = await customeReq.post('/user/login', {
        email: email,
        password: password,
      });

      if (user.data.status) {

        authCtx.login(user.data.token, user.data.result.name, user.data.result.email);
        props.login(user.data.token);
        setLoading(false);
        toast.success("Login Successful");
        setRedirectToReferrer(true);
        navigate('/');

      } else {
        setLoading(false);
        toast.warn(user.data.message);

      }
    }
    catch (error) {
      toast.error("Something went wrong");
      setLoading(false);

    }


  }

  if (redirectToReferrer === true) {
    return <Navigate to={state || '/'} />
  };

  const handleRegister = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      toast.warn("Please Fill All the fields")

    }
    try {
      const user = await customeReq.post('/user/register',
        {
          name: name,
          email: email,
          password: password
        });
      props.login(user.data.token);
      toast.success("Registered Successfully")

      setLoading(false);

      navigate('/');

    } catch (err) {
      const errorMessage = err.message;
      toast.error(errorMessage);
      toast.error("Something went wrong")
      setLoading(false);
    }
  }


  return (
    <div className={styles.LoginContainer}>
      <div className={styles.formContainer}>
        <form onSubmit={handleLogin}>

          {!loginType && <div className={styles.inputHolder}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>}

          <div className={styles.inputHolder}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className={styles.inputHolder}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {Loading
            ? <div><CircularProgress /></div>
            : loginType
              ? <button className={styles.LoginButton
              } onClick={handleLogin}>Login</button>
              : <button className={styles.LoginButton} onClick={handleRegister} >Register</button>
          }

          <div className={styles.bottomButton}>
            {loginType ? <div onClick={() => setLoginType(!loginType)}>Create Account</div> : <div onClick={() => setLoginType(!loginType)}>Already An Account</div >}
          </div>
        </form>
      </div>

    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (token) => dispatch(setLoginAsync(token))
  }

}
export default connect(null, mapDispatchToProps)(Login);