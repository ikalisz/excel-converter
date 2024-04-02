import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import get from 'lodash/get';

function App() {
  const [file, setFile] = useState({})

  const fileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

  const fileOnChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.files)
    const file = e.target.files[0];
    setFile(e.target.files[0])
    console.log(file)
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event?.target?.result) {
        return;
      }
       const {result} = event.target;
       
    };
    const test = reader.readAsText(file);
    console.log('test', test);
  };

  return (
    <div className="App">
      <header className="App-header">
        <label>Selected File Name: {get(file, 'name', '')}</label>
        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadFileIcon />}
          sx={{ marginRight: "1rem" }}
        >
          Upload CSV
          <input type="file" accept={fileTypes} hidden onChange={fileOnChange} />
        </Button>
        {/* <Button onClick={fileOnChange} >
          <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" hidden/>
        </Button>
        <TextField type="file" id="fileinput" onChange={fileOnChange} inputProps={{accept:fileTypes}}/> */}
      </header>
    </div>
  );
}

export default App;
