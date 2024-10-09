import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import _ from 'lodash'
import axios from "axios";
import { toast } from "react-toastify";
import UpdateIcon from "@mui/icons-material/Update";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Roles } from '../../util/Utils';

const ApplicationForm=({user,data,handleCloseNavMenu,selectedJobData})=> {
  const initialState={
    jobseekername:user?.username,
    location:'',
    mobileno:user.mobileno,
    email:user.email,
    yearofxp:'',
    applieduserid:user?.id,
    jobid:selectedJobData?.id
  }

  const [state, setState]=useState(data?.isEditMode===true ? data.editData:initialState);

  const config = {
    headers:{
        Authorization: user?.token,
    }
  };

  const onChangeHandler=(event)=>{
    const {id,value}=event.target;
    setState({...state,[id]:value})
  }

  const onSubmitHandler=()=>{
    if(_.isEmpty(state.jobseekername)||_.isEmpty(state.location)||_.isEmpty(state.mobileno)||_.isEmpty(state.email)||_.isEmpty(state.yearofxp)){
      toast.error("Please enter all manadatory data", {
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
    else{
      document.getElementById("btn_save").disabled = true;
      if (data?.isEditMode === true){

        axios.put(process.env.REACT_APP_ServerHost + `jobseeker/${state.id}`,state,config)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Applicant Updated Successfully.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setState(initialState)
            handleCloseNavMenu("Applicant Details");
          }
        })
        .catch((ex) => {
          toast.error("Failed to Save date.", {
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
          document.getElementById("btn_save").disabled = false;
        });
      }
      else{
     
      axios.post(process.env.REACT_APP_ServerHost + `jobseeker`,state,config)
      .then((res) => {
        if (res.status === 200) {
          toast.success("JobSeeker Saved Successfully.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setState(initialState)
          handleCloseNavMenu("Applied Jobs");
        }
      })
      .catch((ex) => {
        toast.error("Failed to Save date.", {
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
        document.getElementById("btn_save").disabled = false;
      });
    }
  }
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField required id="jobseekername" label="Name" disabled={true} value={state.jobseekername} />
        <TextField required id="location" label="Location" value={state.location} onChange={onChangeHandler} />
        <TextField required id="mobileno" label="Mobile Number" disabled={true} value={state.mobileno} />
        <TextField id="email" label="Email Address"  disabled={true} value={state.email}  />
        <TextField
          id="yearofxp"
          value={state.yearofxp}
          label="Year(s) of Experience"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChangeHandler} 
        />
        
            <Button
              name="save"
              value={data?.isEditMode === true?'Update':"Save"}
              id="btn_save"
              onClick={() => onSubmitHandler()}
              variant="contained"
              color="primary"
              startIcon={data?.isEditMode ===true ? <UpdateIcon />:<SaveIcon />}
              style={{height:'40px',marginTop:'1rem'}}
            >
             {data?.isEditMode ===true ?'Update':'Apply'}
            </Button>
        
          {user?.userrole.toLowerCase() === Roles.Admin.toLocaleLowerCase() && (
              <Button
                name="cancel"
                value="Cancel"
                onClick={() => handleCloseNavMenu("Applicant Details")}
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
                style={{height:'40px',marginTop:'1rem',marginLeft:'1rem'}}
              >
                Back
              </Button>
          
           
          )}
          </div>
    </Box> 
  );
}

export default ApplicationForm;
