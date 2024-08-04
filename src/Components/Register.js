import React, {useState, useEffect} from "react"
import { Formik , Form , Field , ErrorMessage} from 'formik'
import * as Yup from 'yup'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Register = () => {
  const [role, setRole] = useState('user');
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setData) => {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
    }
    fetchData(`${backendUrl}/user`, setUsers);
    fetchData(`${backendUrl}/admin`, setAdmins);
    fetchData(`${backendUrl}/cart`, setCarts);
  }, [])

  const addAccount = async(accountData) => {
    const add = async (accounts, url, setAccounts) => {
        const maxId = accounts.length > 0 ? Math.max(...accounts.map(account=>account.id)):0;
        const newAccount = {...accountData, id: JSON.stringify(maxId+1)};
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newAccount)
        });
        const result = await response.json();
        setAccounts([...accounts, result]);
        if(role==='user') {
            createCart(JSON.stringify(maxId+1));
        }
    }

    role==='user'?add(users, `${backendUrl}/user`, setUsers)
    :add(admins, `${backendUrl}/admin`, setAdmins);
  }

  const handleChange = () => {
    if(role==='admin') {
        setRole('user')
    }
    else {
        setRole('admin')
    }
  }

  const createCart = async (cartId) => {
    const newCart = {id: cartId};
    const response = await fetch(`${backendUrl}/cart`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newCart)
    });
    const result = await response.json();
    setCarts([...carts, result]);
  }

  return (
    <>
      <div className="container">
        <Formik

        initialValues={{
            name: "",
            email: "",
            mobile: "",
            password: "",
            confirm_password: "",
            role: "user"
        }}

        validationSchema={
            Yup.object({
                name: Yup.string().required('Provide name')
                .min(1, 'Name should be more than 1 character')
                .max(50, 'Name should not be more than 50 characters'),

                mobile: Yup.number().required('Mobile number should be a number'),

                email: Yup.string().email().required('Email is required'),

                password: Yup.string().required('Password is required')
                .min(6, 'Password should be more than 6 character')
                .max(15, 'Password should not be more than 15 characters'),
                
                confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
            })
        }

        onSubmit={(data, {resetForm})=>{
            data.role = role;
            delete data.confirm_password;
            addAccount(data);
            resetForm();
        }}
        >
        <Form>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">
                Name
            </label>
            <Field type="text" name="name" className="form-control" id="exampleInputName1" aria-describedby="nameHelp"/>
            <ErrorMessage name = "name" component="div"/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">
                Email address
            </label>
            <Field type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <ErrorMessage name = "email" component="div"/>
        </div>
        <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
                Mobile
            </label>
            <Field type="tel" name="mobile" className="form-control" id="exampleInputMobile1" aria-describedby="mobileHelp"/>
            <ErrorMessage name = "mobile" component="div"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">
                Password
            </label>
            <Field type="password" name="password" className="form-control" id="exampleInputPassword1"/>
            <ErrorMessage name = "password" component="div"/>
        </div>
        <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
                Confirm password
            </label>
            <Field type="password" name="confirm_password" className="form-control" id="exampleInputPassword2"/>
            <ErrorMessage name = "confirm_password" component="div"/>
        </div>

        <div className="form-check">
        <input className="form-check-input" type="radio" name="role" id="admin" checked = {role==='admin'} 
        onChange={handleChange}/>
        <label className="form-check-label" htmlFor="admin">
            Register as admin
        </label>
        </div>
        <div className="form-check">
        <input className="form-check-input" type="radio" name="role" id="user" checked = {role==='user'} 
        onChange={handleChange}/>
        <label className="form-check-label" htmlFor="user">
            Register as user
        </label>
        </div>
        <div>
        <p className="h6">Already have an account! <span><a href="/login">Login here!</a></span></p>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
        </Formik>
    </div>
    </>
  )
};

export default Register;
