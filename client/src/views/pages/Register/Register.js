import React, { useState } from "react";
import Axios from "axios";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import _ from "lodash";
import { useHistory } from "react-router-dom";

import Select
//, { SelectChangeEvent } 
from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from '@mui/material/FormControl';

import "../../../styles/styles.css";

const Register = () => {
  const history= useHistory();
  const initialState={ email: "", password: "", userrole: "",confirmpassword:"",username:"",mobileno:"" }
  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    const {id,name, value}=event.target;
    setState({...state, [id||name]:value });
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
      Axios.post(process.env.REACT_APP_ServerHost + `users`, state)
        .then((res) => {
          if (res?.data?.response) {
            toast.success(res.data.response+'.Please Login.',
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
            setState(initialState);
            history.push('/')
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
    <div className="Register">
      <div className="form">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="userrole">Enter admin/customer/cook</InputLabel>
        <Select
          labelId="userrole"
          id="userrole"
          name="userrole"
          value={state.userrole}
          onChange={handleChange}
          label="Enter admin/customer/cook"
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"customer"}>Customer</MenuItem>
          <MenuItem value={"cook"}>Cook</MenuItem>
        </Select>
        </FormControl>

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
          labelText="Enter Username"
          id="username"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type="text"
          value={state.username}
        />
        <CustomInput
          labelText="Enter Mobilenumber"
          id="mobileno"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type="number"
          value={state.mobileno}
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
        <CustomInput
          labelText="ConfirmPassword"
          id="confirmpassword"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleChange}
          type="password"
          value={state.confirmpassword}
        />
        <Button type="button" color="primary" id="btn_login" className="form__custom-button" onClick={onSubmitHandler}>
          Register
        </Button>
        <p>
          Already a user?<a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
