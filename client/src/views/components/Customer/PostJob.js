import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";
import axios from "axios";
import { Roles } from "../../util/Utils";
import UpdateIcon from "@mui/icons-material/Update";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PostJob = ({ user, OncloseHandler,data }) => {
  const initialState = {
    jobdescription: "",
    location: "",
    fromdate: dayjs(new Date()),
    todate: dayjs(new Date()),
    wageperday: "",
    mobileno: "",
    userid: user.id,
  };

  const [state, setState] = useState(data?.isEditMode===true ? data.editData:initialState);
  const config = {
    headers:{
        Authorization: user?.token,
    }
  };

  const onChangeHandler = (event, controlid, controlvalue) => {
    if (controlid === "fromdate" || controlid === "todate") {
      setState({ ...state, [controlid]: controlvalue });
    } else {
      const { id, value } = event.target;
      setState({ ...state, [id]: value });
    }
  };

  const onSubmitHandler = () => {
    if (
      _.isEmpty(state.jobdescription) ||
      _.isEmpty(state.location) ||
      _.isEmpty(state.wageperday) ||
      _.isEmpty(state.fromdate) ||
      _.isEmpty(state.todate)
    ) {
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
    } else {
      document.getElementById("btn_save").disabled = true;

      if (data?.isEditMode === true){
        axios
        .put(process.env.REACT_APP_ServerHost + `jobs/${state.id}`, {
          ...state,
          fromdate: dayjs(state.fromdate).format("YYYY-MM-DD"),
          todate: dayjs(state.todate).format("YYYY-MM-DD"),
        },config)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Job Updated Successfully.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setState(initialState);
            OncloseHandler("Job Details");
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
      axios
        .post(process.env.REACT_APP_ServerHost + `jobs`, {
          ...state,
          fromdate: dayjs(state.fromdate).format("YYYY-MM-DD"),
          todate: dayjs(state.todate).format("YYYY-MM-DD"),
        },config)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Job Saved Successfully.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setState(initialState);
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
  };
  return (
    <>    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ display: "flex" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TextField
            required
            id="jobdescription"
            label="Job's Description"
            value={state.jobdescription}
            onChange={onChangeHandler}
          />
          <TextField
            required
            id="location"
            label="Location"
            value={state.location}
            onChange={onChangeHandler}
          />
          <DatePicker
            disableFuture
            label="From Date"
            openTo="day"
            views={["year", "month", "day"]}
            value={state.fromdate}
            onChange={(newValue) => {
              onChangeHandler("", "fromdate", newValue);
            }}
            id="fromdate"
            renderInput={(params) => (
              <TextField id="fromdate_textField" {...params} />
            )}
          />
          <DatePicker
            label="To Date"
            openTo="day"
            views={["year", "month", "day"]}
            value={state.todate}
            onChange={(newValue) => {
              onChangeHandler("", "todate", newValue);
            }}
            id="todate"
            renderInput={(params) => (
              <TextField id="todate_textField" {...params} />
            )}
          />

          <TextField
            required
            id="wageperday"
            label="Wage/Pay (per day)"
            value={state.wageperday}
            onChange={onChangeHandler}
          />

          <div style={{ marginTop: "1rem", padding: "5px" }}>
            <Button
              name="save"
              value={data?.isEditMode === true?'Update':"Save"}
              id="btn_save"
              onClick={() => onSubmitHandler()}
              variant="contained"
              color="primary"
              startIcon={data?.isEditMode ===true ? <UpdateIcon />:<SaveIcon />}
            >
             {data?.isEditMode ===true ?'Update':'Save'}
            </Button>
          </div>
          {user?.userrole.toLowerCase() === Roles.Admin.toLocaleLowerCase() && (
            <div style={{ marginTop: "1rem", padding: "5px" }}>
              <Button
                name="cancel"
                value="Cancel"
                onClick={() => OncloseHandler("Job Details")}
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
            </div>
          )}
        </LocalizationProvider>
      </div>
    </Box>
</>

  );
};

export default PostJob;
