import {useState} from 'react';
import styles from './styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import ContentCopy from '@mui/icons-material/ContentCopy'
import clone from 'lodash/clone';
import set from 'lodash/set';

function JsonViewer(props) {
    const {
        json,
        csv
    } = props;

    const [tabValue, setTabValue] = useState('json')
    const jsonToJs = (json) => {
        const newString = clone(json);
        return newString.split(',').map((str) => {
            const newArr = str.split(':');
            set(newArr, '0', newArr[0].replaceAll('\"', ""));
            return newArr.join(':');
        }).join(',');
    }

    const tabStyles = {
        py: 1,
        px: 1,
        fontSize: '.97rem',
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(json);
    }

    const saveFile = () => {
        const csvContent = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv);
        const a = document.createElement('a');
        a.setAttribute('href', csvContent);
        a.setAttribute('download', `upload_data${new Date().getTime()}.csv`)
        a.click();
    }

    const handleTabChange = (_, value) => {
        setTabValue(value);
    };

    return (
        <Box
            sx={{
                minWidth: '30%',
                minHeight: '40vh',
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab sx={tabStyles} value="json" label="JSON"/>
                    <Tab sx={tabStyles} value="javascript" label="Javascript"/>
                </Tabs>
                <div>
                    <Button onClick={copyToClipboard}>
                        <ContentCopy color="primary"/>
                    </Button>
                    <Button
                        onClick={saveFile}
                        sx={{
                            py: 1
                        }}
                    >Export as CSV</Button>
                </div>
            </div>
            <Box
                sx={{
                whiteSpace: 'pre-line',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'start',
                mt: 1,
                
                overflowY: 'auto',
                px: 3,
                bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
                color: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                borderRadius: 2,
                fontSize: '0.975rem',
                fontWeight: '400',
                }}
            >
                
                <pre>
                    {tabValue === 'json' ? json : jsonToJs(json)}
                </pre>
            </Box>
        </Box>
    )

    // return (
    //     <div style={{display: 'flex', width: '100%', backgroundColor: 'grey', justifyContent: 'center'}}>
    //         <pre style={styles.pre}>
    //             {JSON.stringify(json, null, 2)}
    //         </pre>
    //     </div>
    // )
}

export default JsonViewer;