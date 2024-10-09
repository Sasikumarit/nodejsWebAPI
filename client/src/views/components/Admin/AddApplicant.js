/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import CustomDataGrid from "../CustomDataGrid/CustomDataGrid";
import Axios from "axios";
import { Roles } from "../../util/Utils";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {toast} from 'react-toastify'

const AddApplicant = ({user,handleGridEditButton}) => {
  
  const [state, setState] = React.useState({
     columns:[
    { field: "sno", headerName: "S.No", width: 90 },
    {
      field: "jobseekername",
      headerName: "Name of Candidates",
      width: 150,
      editable: false,
    },
    {
      field: "location",
      headerName: "Location",
      type: "number",
      width: 110,
      editable: false,
    },
    {
      field: "mobileno",
      headerName: "Mobile Number",
      width: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 150,
      editable: false,
    },
    {
      field: "yearofxp",
      headerName: "Year(s) of Experience",
      width: 110,
      editable: false,
    },

    {
      field: "username",
      headerName: "User",
      width: 110,
      editable: false,
    },
    {
      field: "jobdescription",
      headerName: "Job Description",
      width: 110,
      editable: false,
      
    },
    {
      field: "Edit",
      width: 110,
      headerName: "",
      renderCell: (cellValues) => {
        return (
            <Button variant="outlined" startIcon={<EditIcon />} onClick={()=>handleGridEditButton('ApplicationForm',cellValues?.row)}>
              Edit
            </Button>
        );
      },
    },
    {
      field: "Delete",
      width: 110,
      headerName: "",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleGridDeleteButton(cellValues?.row)
            }}
            startIcon={<DeleteIcon />}
            fullWidth={true}
          >
            Delete
          </Button>
        );
      },
    },
  ] , rows: [] });

  const config = {
    headers:{
        Authorization: user?.token,
    }
  };

 
async function handleGridDeleteButton(data){
  let choice = window.confirm(
    `Are you sure you want to delete ${data.jobseekername}'s record?`
  );
  if(choice){
  await Axios.delete(process.env.REACT_APP_ServerHost + `jobseeker/${data?.id}`, config).then((res) => {
      if (res.status === 200) {
          toast.success("Applicant Successfully Deleted.", {
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
          toast.error("Failed to delete.", {
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
      return res;
    });
  }
}

  React.useEffect(() => {
    async function fetch() {
      await Axios.get(process.env.REACT_APP_ServerHost + `${user?.userrole.toLowerCase() === Roles.Admin.toLowerCase()?'jobseeker/findAllAppliedCandidate/1':'jobs/findAppliedUser/'+ user.id}`,config).then((res) => {
        if (res.status === 200) {
          setState({...state, rows: res.data.response });
          return res.data.response;
        }
        return res;
      });
    }
    fetch();
  }, []);

  return (
    <div style={{ width: "95%" }}>
      <CustomDataGrid columns={state.columns} rows={state.rows} user={user} isAddButton={false} />
    </div>
  );
};

export default AddApplicant;
