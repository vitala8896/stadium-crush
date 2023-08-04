import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { queryAPI,upDownAPI } from '../actions/axios_instance';

import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import ClickAwayListener from '@mui/base/ClickAwayListener';

const fileTypes = ['JPG', 'PNG', 'GIF', 'PDF', 'ZIP', 'JPEG', 'SVG'];

const UploadExport = ({ uploadexports, handleExports, setOpen, handleUploads }) => {
  console.log("UploadExport uploadexports="+uploadexports);
  const [filename, setFilename] = useState(null);
  const { exportData } = useSelector((state) => {
    return state.facet;
  });
  const queryItems = useSelector((state) => (uploadexports===1?state.facet.clickedItems:undefined));

  const handleExportQuery=()=>{
    console.log('UploadExport handleExportQuery Exporting query: ',queryItems);
    queryAPI
    .post('/export',{queryItems})
    .then((res)=> {
    })
    .catch((error)=>{
      console.log("UploadExport handleExportQuery error: "+error);
    });
  };

  const uploadData = async (filename) => {
    const formData = new FormData();
    formData.append('File', filename);
    console.log("Uploading file "+filename);
    const response=await upDownAPI.post(
          `/upload?fileName=${filename.name}`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          })
        .then((res) => res)
        .catch((err) => {
          console.log("ERROR Failed to upload. "+err);
          return err;
        });
  };
  const handleChange = (e) => {
    uploadData(e);
    setFilename(e.name);
  };
  const handleClickAway = () => {
    setOpen(false);
  };
  const zipfiledata = exportData;
  let uploadElement=null;
  let exportElement=null;
  if (uploadexports===0) {
    uploadElement=<ClickAwayListener onClickAway={handleExports}>
        <Box className="manageExport" sx={{position: 'absolute',
        top: '180px', right: '100px', zIndex: 10, background: 'white'}}>
          <div className="upload-model">
            <div className="upload-heading">
              <h4>{' '}<u>Uploads</u>{' '}</h4>
              <CloseIcon onClick={handleUploads} style={{ marginTop: '10px', cursor: 'pointer' }} />
            </div>
          </div>
          {filename ? <>
              <p style={{marginLeft:"10px", marginTop:"10px", color:"green"}}>
                {filename} Uploaded Successfully!
              </p>
            </> : 
            <p style={{marginLeft:"10px", marginTop:"10px", color:"black", background: 'white'}}>
              No file upload
            </p>
          }
          <Box
            display="flex"
            justifyContent="center"
            alignSelf="center"
            style={{ paddingTop: '100px', background: 'white' }}>
            <p style={{ fontSize: '20px',  }}>
              {' '}Drag and Drop<br />
              <p style={{ marginLeft: '35px', marginTop: '13px' }}>Here</p>
            </p>
          </Box>
          <FileUploader
            handleChange={(e) => handleChange(e)}
            name="file"
            types={fileTypes}
            className="file-upload"
            sx={{height: '38px', background: 'white' }}
          />
          <Box display="flex" justifyContent="center" alignSelf="center" sx={{background: 'white'}}>
            <AddIcon style={{ marginTop: '50px', fontSize: '90px' }} />
          </Box>
        </Box>
    </ClickAwayListener>
  }
  if (uploadexports===1) {
    exportElement=<ClickAwayListener onClickAway={handleExports}>
        <Box className="manageExport">
          <div className="export-model">
            <div className=" head-export">
              <h4>{' '}<u>Export Packages</u>{' '}</h4>
              <CloseIcon color="black" onClick={handleExportQuery} />
            </div>

            <div className="export-name">
              <p>Name</p>
              <p>Created</p>
              <p>Size</p>
            </div>
          </div>

          {zipfiledata.length == 0 ? (
            <p>...loading</p>
          ) : (
            zipfiledata?.map((ele) => (
                <p className="export-value">
                  <a href={ele.url}>
                    <p> {ele.name} &nbsp; &nbsp;</p>
                    <p> {ele.created} &nbsp; &nbsp;</p>
                    <p> {ele.size} MB </p>
                  </a>
                </p>
            ))
          )}
        </Box>
    </ClickAwayListener>
  }
  return <>
      {uploadElement}
      {exportElement}
    </>
};

export default UploadExport;
