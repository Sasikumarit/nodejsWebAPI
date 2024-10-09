import React, { useState } from "react";
import Axios from "axios";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import "../../../styles/styles.css";

const LoginPage = () => {
  const initialState = { email: "", password: "" };
  const [state, setState] = useState(initialState);
  const history= useHistory();

  const handleChange = (e) => {
    setState({ ...state, [e.currentTarget.id]: e.currentTarget.value });
  };
  const validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    const returndata = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    )
      ? true
      : false;
    return returndata;
  };
  const onSubmitHandler = () => {
    if (
      validateEmail(state.email) === true &&
      _.isEmpty(state.password) === false
    ) {
      document.getElementById("btn_login").disabled = true;
      Axios.post(process.env.REACT_APP_ServerHost + `users/login`, state)
        .then((response) => {
          if (response?.data?.response) {
            setState(initialState);
            history.push({pathname:'/dashboard',state:{...response.data.response}})
          
        } else {
            toast.error("Please check Email and Password", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((ex) => {
          toast.error("Failed to Login", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .finally(() => {
          document.getElementById("btn_login").disabled = false;
        });
    } else {
      toast.error("Please enter mandatory data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="Login">
      <div className="form">
        <CustomInput
          labelText="Email"
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type="text"
          value={state.email}
        />
        <CustomInput
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type="password"
          value={state.password}
        />

        <Button
          type="button"
          color="primary"
          className="form__custom-button"
          onClick={onSubmitHandler}
          id="btn_login"
        >
          Log in
        </Button>
        <p>
        Not a user?<a href="/register">Signup</a>
        </p>
      </div>
    </div>
  );
};


export default LoginPage;
