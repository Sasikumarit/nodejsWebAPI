import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

const CustomDataGrid=({columns,rows,title,user,buttonText,OnButtonClickHandler,isAddButton})=> {
  return (
    <Box sx={{ height: 400, width: '95%' }}>
      <h1>{title}</h1>
     {isAddButton &&( <div>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={()=>OnButtonClickHandler()}>
           {buttonText}
          </Button>
          </div>)}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
         
    </Box>
  );
}

export default CustomDataGrid;