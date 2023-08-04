import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, Box, Button, CircularProgress } from '@mui/material';
import AdvanceSearch from '../components/AdvanceSearchModal';
import { DocumentView } from '../actions';
import Header from '../layout/header';
import ArrowLeft from './../assets/img/Icons/arrowLeft.svg'
import RingDiagram from './../components/RingDiagram';
import TypesOfAwards from './../components/TypesOfAwards';
import Location from './../components/Location';
import QuickFacts from './../components/QuickFacts';


const FileView = (upload) => {
  const theme = useTheme();
  const { state } = useLocation();
  // const [open, setOpen] = useState(false);  
  const [detail, setDetail] = useState();
  const [file, setFile] = useState();
  // const [fileDetail, setFileDetail] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setDetail(state.details || state);
  }, [state]);

  useEffect(
    () => async () => {
      setStatus('loading');
      const document = await DocumentView(state?.details?.id || state.id, {
        version: state?.details?.version || state.version
      });
      setStatus('idle');
      setFile(document);
    },
    [detail, state?.details?.id, state?.details?.version, state.id, state.version]
  );
  let title="file";
  let fileType=null;
  useEffect(()=>{console.log("File type is "+fileType);},[fileType]);
  if (file !== undefined) { // file will be set with the response from the view API.
    if (file.hasOwnProperty('body-json')) {
      if ((file['body-json']).hasOwnProperty('title')) title=file['body-json'].title;
    }
    // console.log("renderable="+file['body-json'].renderableURL);
    // fileType=file['body-json'].type;
    // console.log("fileType="+fileType);
  }
  console.log("title="+title);
  console.log("status="+status);
  if (status==="loading") {
    return(<Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
       <CircularProgress />
     </Box>);
  }
  let errorMessage=null;
  let renderSegment=null;
  const errorDivStyle = {
    backgroundColor: "white",
    width: 300,
    border: "15px solid LightSteelBlue",
    padding: 50,
    margin: 20,
    textAlign: "center",
    fontFamily: "copperplate,helvetica"
  };
  // if (file) {
  //   const renderableURL=file['body-json'].renderableURL;
  //   if (fileType==='pdf') {
  //     renderSegment=<object data={renderableURL} type="application/pdf" width="100%" height={700}>
  //         <embed src={renderableURL} type="application/pdf" width="100%" height={700}/>
  //       </object>;
  //   } else if (fileType==='image') {
  //     renderSegment=<img src={renderableURL} alt=""/>;
  //   } else if (fileType==='html') {
  //     renderSegment=<iframe height={700} width="100%" src={renderableURL} title="{title}"/>;
  //   } else if (fileType==='audio') {
  //     renderSegment=<audio src={renderableURL} type="audio/mpeg" controls>Browser does not support HTML5 <code>audio</code>.</audio>;
  //   } else if (fileType==='video') {
  //     renderSegment=<video width="640" height="480" src={renderableURL} controls>Browser does not support HTML5 <code>video</code>.</video>;
  //   } else {
  //     console.log("ERROR: Cannot render type "+fileType);
  //     errorMessage="CANNOT RENDER "+title.toUpperCase()+" OF TYPE "+fileType.toUpperCase()+" FOR VIEWING";
  //   }
  // } else {
  //   console.log("ERROR: Cannot render file--nothing was returned by API call.");
  //   errorMessage="CANNOT ACCESS "+title.toUpperCase();
  // }
  if (renderSegment==null) {
    if (errorMessage==null) {
      errorMessage="CANNOT RENDER "+title.toUpperCase()+" FOR VIEWING";
    }
    renderSegment=<div style={errorDivStyle}>{errorMessage}</div>;
  }
  // error
  // const renderInfo = (arr) => {
  //   return (
  //     arr.map((item, index) => {
  //       return <div key={index} style={{padding: '5px 0'}}>{item}</div>
  //     })
  //   )
  // }
  const progress = 75;
  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
  // const handleDrawerOpen = (data) => {
  //   setFileDetail(data);
  //   setOpen(true);
  // };
  return (
      <Grid container spacing={2} sx={{ marginTop: '120px', gap: '16px'}}>  
        <Header title='Match Statistics' column>
          <Link to="/" style={{textDecoration: 'none'}}>
            <Button sx={theme.button.back}>
              <img src={ArrowLeft} alt="" style={{textTransform: 'none'}}/>
              Back to matches
            </Button>
          </Link>  
        </Header>
        <Grid item md={12} sx={{display: 'flex', gap: '16px'}}>
          <Grid item sm={4} md={8}>
            <QuickFacts/>
            <AdvanceSearch upload={upload} />            
            <AdvanceSearch upload={upload} />      
          </Grid>
          <Grid item md={4} >
            <Grid mb={2} sx={[theme.position.center,
              {background: theme.palette.dark.blockBackground, borderRadius: '16px', height: '394px'}]}>            
              <RingDiagram progress={progress} />
            </Grid>
            <Grid mb={2} sx={[theme.position.center,
              {background: theme.palette.dark.blockBackground, borderRadius: '16px', height: '331px'}]}>            
              <Location />
            </Grid>
            <Grid mb={2} sx={[theme.position.center,
                            {background: theme.palette.dark.blockBackground, 
                            borderRadius: '16px', height: '353px'}]}>            
              <TypesOfAwards Reviewed={170} Choose={99} Won={77}/>
            </Grid>
          </Grid>
        </Grid> 
      </Grid>
      
  );
};
export default FileView;