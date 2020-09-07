import React,{useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialFormValues={
    username:"",
    password:"",
    department:""
}
const Login=()=> {
    const history = useHistory();
    const [inputs, setInputs ] = useState(initialFormValues);

    const changeInputs = e => {
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value,
        })
    };

    const submitLogin = e => {
        e.preventDefault();
        axios   
            .post("http://localhost:6000/api/login",inputs)
            .then(res => {
                console.log("this is from the register call", res.data)
              //  history.push("/protected")
            })
            .catch( err => console.log("error registering user",err))
    };

    return (
        <>
        <h2>Welcome to the login part of my stretch</h2>
        <form onSubmit={submitLogin}>
            <label htmlFor="username">Username</label>
            <input 
                name="username"
                type="text"
                value={inputs.username}
                onChange={changeInputs}
                />

            <label htmlFor="password">Password</label>
            <input 
                name="password"
                type="text"
                value={inputs.password}
                onChange={changeInputs}
                />

                <label htmlFor="department">Department</label>
                <input
                    name="department"
                    type="text"
                    value={inputs.department}
                    onChange={changeInputs}
                    />

            <button>Register</button>
        </form>
        </>
    )
};

export default Login;