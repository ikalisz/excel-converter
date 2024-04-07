import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import * as XLSX from 'xlsx';
import Box from '@mui/material/Box';
import JsonViewer from 'components/JsonViewer';

function App() {
  const [file, setFile] = useState({});
  const [json, setJson] = useState({});
  const [csvFile, setCsvFile] = useState({});

  const fileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'


  const fileOnChange = (e) => {
    const targetFile = e.target.files[0];
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(targetFile);
      reader.onload = (event) => {
        if (!event?.target?.result) {
          return;
        }
        const bufferArray = event.target.result;
        
        const wb = XLSX.read(bufferArray, { type: 'buffer'});
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);
        const csv = XLSX.utils.sheet_to_csv(ws);
        resolve({data, file: targetFile, csv})
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((res) => {
      const {data, file, csv} = res;
      setFile(file);
      setJson(data);
      setCsvFile(csv);
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <label>Selected File Name: {get(file, 'name', '')}</label>
        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadFileIcon />}
          sx={{ marginRight: "1rem", my: 2}}
        >
          Upload Excel Worksheet
          <input type="file" accept={fileTypes} hidden onChange={fileOnChange} />
        </Button>
        <div style={{ display: 'flex', width: '200'}}>
          {/* { !isEmpty(json) && 
            <Box
              sx={{
                whiteSpace: 'normal',
                my: 2,
                p: 1,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
            >
              <pre>
                {json}
              </pre>
            </Box>
          } */}
        </div>
        <JsonViewer json={JSON.stringify(json, null, 2)} csv={csvFile}/>
      </header>
    </div>
  );
}

export default App;
