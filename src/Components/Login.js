import React, {useState, useEffect, useContext} from "react";
import { Formik , Form , Field , ErrorMessage} from 'formik';
import * as Yup from 'yup'; //validation
import './style.css';
import { SessionInfoContext } from "../App";
import { useNavigate } from "react-router-dom";  //redirect

const Login = () => {
  const [role, setRole] = useState('user');
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  const setSessionInfo = useContext(SessionInfoContext).setSessionInfo; //consume

  useEffect(() => {
    const fetchData = async (url, setData) => {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
    }
    fetchData(`http://localhost:3030/user`, setUsers);
    fetchData(`http://localhost:3030/admin`, setAdmins);
  }, [])


  const getAccountId = (accountData) => {
    const getId = (accounts) => {
      let accountList = accounts.filter((account) => account.email===accountData.email 
      && account.password===accountData.password);
      return accountList.length>0?accountList[0].id:-1;
    }

    return role==='user'?getId(users):getId(admins);
  }

  const handleChange = () => {
    if(role==='admin') {
      setRole('user')
    }
    else {
      setRole('admin')
    }
  }

  
  return (
    <div className="container">
    <Formik
    initialValues={{
      email: "",
      password: "",
      role: "user"
    }}

    validationSchema={
      Yup.object({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password is required')
        .min(6, 'Password should be more than 6 character')
        .max(15, 'Password should not be more than 15 characters')
      })
    }
    
    onSubmit={(data) => {
      var idField = getAccountId(data);
      if(idField!==-1) {
        setLoginSuccess(true);
        var newSessionInfo = {
          role: role,
          id: idField
        };
        setSessionInfo(newSessionInfo);
        navigate(`/`);
      }
      else {
        setLoginSuccess(false);
      }
    }}
    >
      <Form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <Field type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <ErrorMessage name = "email" component="div"/>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <Field type="password" name="password" className="form-control" id="exampleInputPassword1"/>
          <ErrorMessage name = "password" component="div"/>
        </div>
        <div className="mb-3">

        </div>
        <div className="form-check">
        <input className="form-check-input" type="radio" name="role" id="admin" checked = {role==='admin'} 
        onChange={handleChange}/>
        <label className="form-check-label" htmlFor="admin">
            Login as admin
        </label>
        </div>
        <div className="form-check">
        <input className="form-check-input" type="radio" name="role" id="user" checked = {role==='user'} 
        onChange={handleChange}/>
        <label className="form-check-label" htmlFor="user">
            Login as user
        </label>
        </div>
        <div>
          {(loginSuccess===false) && (<p className="h6" id="login-alert">Invalid email address or password!</p>)}
        </div>
        <div>
        <p className="h6">Don't have an account! <span><a href="/register">Register here!</a></span></p>
        </div>
          <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
    </Formik>
    </div>
  )
};

export default Login;
