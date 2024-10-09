/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import CustomDataGrid from "../../components/CustomDataGrid/CustomDataGrid";
import Axios from "axios";

const AppliedCandidates = ({user}) => {

  const [state, setState] = React.useState({ columns: [], rows: [] });
  const config = {
    headers:{
        Authorization: user?.token,
    }
  };

  React.useEffect(() => {
    const columns = [
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
    ];

    async function fetch() {
        await Axios.get(process.env.REACT_APP_ServerHost + `jobseeker/findAppliedCandidate/${user.id}`,config).then((res) => {
          if (res.status === 200) {
            setState({ columns: columns, rows: res.data.response });
            return res.data.response;
          }
          return res;
        });
      }
    fetch();
  }, []);

  return (
    <div style={{ width: "65%", margin: "2%" }}>
      <CustomDataGrid columns={state.columns} rows={state.rows} />
    </div>
  );
};

export default AppliedCandidates;
