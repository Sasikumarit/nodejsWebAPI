/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import {toast} from 'react-toastify'

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useHistory } from "react-router-dom";
import CustomDataGrid from "../../components/CustomDataGrid/CustomDataGrid";
import Axios from "axios";
import { DateTime } from "luxon";
import { Roles, Navbar } from "../../util/Utils";

const PostJobs = lazy(() => import("../../components/Customer/PostJob"));
const AppliedCandidates = lazy(() =>
  import("../../components/Customer/AppliedCandidates")
);
const AppliedJobs = lazy(() =>
  import("../../components/JobSeeker/AppliedJobs")
);
const JobsPosted = lazy(() =>
import('../../components/Admin/JobsPosted')
);
const ApplicationForm =lazy(() =>
import("../../components/JobSeeker/ApplicationForm")
);
const AddApplicant=lazy(() =>
import('../../components/Admin/AddApplicant')
);

const adminPages = ["Job Details", "Applicant Details"];
const customerPages = ["Dashboard", "Post Jobs", "Applied Candidates"];
const jobseekerPages = ["Dashboard", "Applied Jobs"];
const settings = ["Profile", "Logout"];


const reducer = (state, action) => {
  switch (action.type) {
    case "setGridRowData":
      return { ...state,rows:action.payload };
    case "setNavBarTitle":
      return { ...state, navBarTitle: action.payload };
    case "setSelectedJobData":
        return {...state,selectedJobData: action.payload}
    case "setEditMode":
        return {...state,...action.payload}
    default:
      return state;
  }
};


const Dashboard = () => {
  const history = useHistory();

  const [user, setUser] = React.useState(history?.location?.state);

  React.useEffect(() => {
    if (!history?.location?.state) {
      history.push("/");
    } else {
      setUser(history.location.state);
    }
  }, []);

  const jobGridColumns = [
    { field: "sno", headerName: "S.No", width: 90 },
    {
      field: "jobdescription",
      headerName: "Job Description",
      width: 150,
      editable: true,
    },
    {
      field: "wageperday",
      headerName: "Wage Per Day",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      editable: true,
    },
    {
      field: "fromdate",
      headerName: "From Date",
      width: 150,
      editable: true,
      valueGetter: (params) =>
        `${DateTime.fromISO(params.row.fromdate).toFormat("dd-MM-yyyy")}`,
    },
    {
      field: "todate",
      headerName: "To Date",
      width: 110,
      editable: true,
      valueGetter: (params) =>
        `${DateTime.fromISO(params.row.todate).toFormat("dd-MM-yyyy")}`,
    },
  
    {
      field: "username",
      headerName: "User Name",
      width: 110,
      editable: true,
    }
  ];
  
  const adminGridColumns = [
    { field: "sno", headerName: "S.No", width: 90 },
    {
      field: "jobdescription",
      headerName: "Job Description",
      width: 150,
      editable: true,
    },
    {
      field: "wageperday",
      headerName: "Wage Per Day",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      editable: true,
    },
    {
      field: "fromdate",
      headerName: "From Date",
      width: 150,
      editable: true,
      valueGetter: (params) =>
        `${DateTime.fromISO(params.row.fromdate).toFormat("dd-MM-yyyy")}`,
    },
    {
      field: "todate",
      headerName: "To Date",
      width: 110,
      editable: true,
      valueGetter: (params) =>
        `${DateTime.fromISO(params.row.todate).toFormat("dd-MM-yyyy")}`,
    },
  
    {
      field: "username",
      headerName: "User Name",
      width: 110,
      editable: true,
    },
    {
        field: "Edit",
        width: 110,
        headerName: "",
        renderCell: (cellValues) => {
          return (
              <Button variant="outlined" startIcon={<EditIcon />} onClick={()=>handleGridEditButton("Post Jobs",cellValues?.row)}>
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
  ];

const cookGridColumns = [
    { field: "sno", headerName: "S.No", width: 90 },
    {
      field: "jobdescription",
      headerName: "Job Description",
      width: 150,
      editable: true,
    },
    {
      field: "wageperday",
      headerName: "Wage Per Day",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      editable: true,
    },
    {
      field: "fromdate",
      headerName: "From Date",
      width: 150,
      editable: true,
      valueGetter: (params) =>
        `${DateTime.fromISO(params.row.fromdate).toFormat("dd-MM-yyyy")}`,
    },
    {
      field: "todate",
      headerName: "To Date",
      width: 110,
      editable: true,
      valueGetter: (params) =>
        `${DateTime.fromISO(params.row.todate).toFormat("dd-MM-yyyy")}`,
    },
  
    {
      field: "username",
      headerName: "User Name",
      width: 110,
      editable: true,
    },
          {
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                 dispatch({ type: "setNavBarTitle", payload: 'ApplicationForm' })
                 dispatch({type:'setSelectedJobData',payload:cellValues.row})
              }}
            >
              Apply
            </Button>
          );
        },
      },
  ];

    const initialState = {
        jobGridColumns: jobGridColumns,
        cookGridColumns: cookGridColumns,
        adminGridColumns: adminGridColumns,
        rows: [],
        navBarTitle: user?.userrole.toLowerCase() === Roles.Admin.toLocaleLowerCase()?'Job Details' :"Dashboard",
        selectedJobData:null,
      };

    

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const [state, dispatch] = React.useReducer(reducer, initialState);

  let config = {
    headers:{
        Authorization: user?.token,
    }
  };

  React.useEffect(() => {

    async function fetch(){
        config = {
            headers:{
                Authorization: user?.token,
            }
          };

        await Axios.get(process.env.REACT_APP_ServerHost + `${user?.userrole.toLowerCase() === Roles.Cook.toLocaleLowerCase()? 'jobs/findJobByUser/'+user.id : user?.userrole.toLowerCase() === Roles.Customer.toLocaleLowerCase()? 'jobs/findUser/'+user.id :'jobs'}`,config).then((res) => {
            if (res.status === 200) {
              dispatch({
                type: "setGridRowData",
                payload: res.data.response,
              });
              return res.data.response;
            }
            return res
          }).catch((err)=>{
            toast.error(err?.response?.data?.error, {
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
    }
      user&& fetch()     
  }, [user,state.navBarTitle]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (title) => {
    setAnchorElNav(null);
    if (title) dispatch({ type: "setNavBarTitle", payload: title });
  };

  const handlePostJobClose = (title) => {
    if (title) dispatch({ type: "setNavBarTitle", payload: title });
    dispatch({ type:  "setEditMode", payload: {isEditMode:false,editData:null}});
  };

  const handleGridEditButton = (title,row) => {
    dispatch({ type:  "setEditMode", payload: {isEditMode:true,editData:row}});
    dispatch({ type: "setNavBarTitle", payload: title });
 
  };

  const handleCloseUserMenu = (title) => {
    setAnchorElUser(null);

    if (title === "Logout") {
      history.push("/");
    }
  };

async function handleGridDeleteButton(data){
  let choice = window.confirm(
    `Are you sure you want to delete ${data.jobdescription}'s record?`
  );

  if(choice){
    await Axios.delete(process.env.REACT_APP_ServerHost + `jobs/${data?.id}`,config).then((res) => {
        if (res.status === 200) {
            toast.success("Job Successfully Deleted.", {
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
      }).catch((err)=>{
        toast.error(err?.response?.data?.error, {
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
  };
}

  useEffect(() => {
    if(user){
     conditionalRenderComponent();
    }
  }, [user,state.navBarTitle]);

  const conditionalRenderComponent = () => {

    if (state.navBarTitle === Navbar.JobDetails || state.navBarTitle === Navbar.Dashboard) {
      return <CustomDataGrid columns={getDatagridColumn()} rows={state.rows} buttonText={'Add Job'} user={user} OnButtonClickHandler={()=>handleCloseNavMenu('Post Jobs')} isAddButton={user?.userrole.toLowerCase() === Roles.Admin.toLocaleLowerCase()?true:false}/>;
    }
    if (state.navBarTitle === Navbar.PostJobs) {
      return <PostJobs user={user} OncloseHandler={handlePostJobClose} data={state}/>;
    }
    if (state.navBarTitle === Navbar.AppliedCandidates) {
      return <AppliedCandidates user={user}/>;
    }
    if (state.navBarTitle === Navbar.AppliedJobs) {
      return <AppliedJobs user={user}/>;
    }
    if (state.navBarTitle === Navbar.JobsPosted) {
        return <JobsPosted user={user}/>;
      }
      if (state.navBarTitle === Navbar.ApplicationForm) {
        return <ApplicationForm user={user} data={state} handleCloseNavMenu={handleCloseNavMenu} selectedJobData={state.selectedJobData}/>;
      }
      if(state.navBarTitle === Navbar.ApplicantDetails){
        return <AddApplicant user={user} handleGridEditButton={handleGridEditButton}/>;
      }
    return <div></div>;
  };

  function getDatagridColumn() {
    const DatagridColumn =
      user?.userrole.toLowerCase() === Roles.Admin.toLowerCase()
        ? state.adminGridColumns
        : user?.userrole.toLowerCase() === Roles.Cook.toLowerCase()
        ? state.cookGridColumns
        : jobGridColumns;
    return DatagridColumn;
  }

  return (
    <>
      <div className="dashboard">
        <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Cook Hiring
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={() => handleCloseNavMenu()}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {user?.userrole.toLowerCase() ===
                      Roles.Admin.toLowerCase() &&
                      adminPages.map((page) => (
                        <MenuItem
                          key={page}
                          onClick={() => handleCloseNavMenu(page)}
                        >
                          <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                      ))}

                    {user?.userrole.toLowerCase() ===
                      Roles.Cook.toLowerCase() &&
                      jobseekerPages.map((page) => (
                        <MenuItem
                          key={page}
                          onClick={() => handleCloseNavMenu(page)}
                        >
                          <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                      ))}

                    {user?.userrole.toLowerCase() ===
                      Roles.Customer.toLowerCase() &&
                      customerPages.map((page) => (
                        <MenuItem
                          key={page}
                          onClick={() => handleCloseNavMenu(page)}
                        >
                          <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                      ))}
                  </Menu>
                </Box>

                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Cook Hiring
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {user?.userrole.toLowerCase() === Roles.Admin.toLowerCase() &&
                    adminPages.map((page) => (
                      <Button
                        key={page}
                        onClick={() => handleCloseNavMenu(page)}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page}
                      </Button>
                    ))}

                  {user?.userrole.toLowerCase() === Roles.Cook.toLowerCase() &&
                    jobseekerPages.map((page) => (
                      <Button
                        key={page}
                        onClick={() => handleCloseNavMenu(page)}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page}
                      </Button>
                    ))}

                  {user?.userrole.toLowerCase() ===
                    Roles.Customer.toLowerCase() &&
                    customerPages.map((page) => (
                      <Button
                        key={page}
                        onClick={() => handleCloseNavMenu(page)}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page}
                      </Button>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                     <MenuItem
                        key={'Username'}
                      >
                        <Typography textAlign="center">{'Username: '+user?.username}</Typography>
                      </MenuItem>
                      <MenuItem
                        key={'Role'}
                      >
                        <Typography textAlign="center">{'Role: '+user?.userrole.toUpperCase()}</Typography>
                      </MenuItem>
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => handleCloseUserMenu(setting)}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          <Box sx={{ flexGrow: 0 }}>
            <div style={{ margin: "2%" }}>{user && conditionalRenderComponent()}</div>
          </Box>
        </Box>
      </div>
    </>
  );
};
export default Dashboard;
