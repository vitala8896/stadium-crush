import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled // , useTheme 
} from '@mui/material/styles';
import { Box, Drawer, Button, ListItemText, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// Icons
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import Close from '@mui/icons-material/CancelOutlined';

const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({    
    width: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginRight: 0
    })
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  background: "gray",
  borderRadius: '5px 5px 0 0',  
  '*': {
    color: "gray"
  }
}));

const CloseIconBox = styled(Box)({
  cursor: 'pointer'
});

const FileDetailDrawer = ({ children, open, handleDrawerClose, fileDetail }) => {
  const [moreDetail, setMoreDetail] = useState(false);
  // const theme = useTheme();
  const navigate = useNavigate();  
  return (
    <Box sx={{ display: 'flex', height: '80vh', width: '100%'}}>
      <Main open={open}>{children}</Main>
      <Drawer
        sx={{
          position: 'absolute',
          top: '-500px',
          right: '20px',
          zIndex: 10,
          width: drawerWidth,
          height: 'calc(100vh - 350px)',
          // flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth
          },
          '& .MuiPaper-root': {
            margin: '80px 15px 0 0',
          }
        }}
        variant="persistent"
        anchor="right"
        open={open}>
        <DrawerHeader>
          
          <ListItemText>{fileDetail && fileDetail.details.title}</ListItemText>
          <CloseIconBox onClick={handleDrawerClose}>
            <Close />
          </CloseIconBox>
        </DrawerHeader>

        <Box sx={{ padding: '20px 15px' }}>
          <Typography variant="bold" component="p" color={"gray"}>
            Author:
          </Typography>

          <Typography variant="bold" component="p" sx={{ padding: '15px 0 20px' }}>
            {fileDetail && fileDetail.details.author}
          </Typography>

          <Typography variant="bold" component="p" color={"gray"}>
            FileName:
          </Typography>

          <Typography variant="bold" component="p" sx={{ padding: '15px 0 20px' }}>
            {fileDetail && fileDetail.details.fileName}
          </Typography>

          <Typography variant="bold" component="p" color={"gray"}>
            Path:
          </Typography>

          <Typography
            variant="bold"
            component="p"
            sx={{ padding: '15px 0 20px', wordWrap: 'break-word', lineHeight: '20px' }}>
            {fileDetail && fileDetail.details.path}
          </Typography>

          <Typography variant="bold" component="p" color={"gray"}>
            Type:
          </Typography>

          <Typography variant="bold" component="p" sx={{ padding: '15px 0 20px' }}>
            {fileDetail && fileDetail.details.type}
          </Typography>

          <Typography variant="bold" component="p" color={"gray"}>
            Created At:
          </Typography>

          <Typography variant="bold" component="p" sx={{ padding: '15px 0' }}>
            {fileDetail && fileDetail.details.dateCreated}
          </Typography>

          {moreDetail && (
            <>
              <Typography variant="bold" component="p" color={"gray"}>
                Title:
              </Typography>

              <Typography variant="bold" component="p" sx={{ padding: '15px 0 20px' }}>
                {fileDetail && fileDetail.details.title}
              </Typography>

              <Typography variant="bold" component="p" color={"gray"}>
                Hidden:
              </Typography>

              <Typography variant="bold" component="p" sx={{ padding: '15px 0' }}>
                {fileDetail && String(fileDetail.details.hidden)}
              </Typography>

              <Typography variant="bold" component="p" color={"gray"}>
                Size:
              </Typography>

              <Typography variant="bold" component="p" sx={{ padding: '15px 0 20px' }}>
                {fileDetail && fileDetail.details.size}
              </Typography>

              <Typography variant="bold" component="p" color={"gray"}>
                Detail Type:
              </Typography>

              <Typography variant="bold" component="p" sx={{ padding: '15px 0' }}>
                {fileDetail && fileDetail.details.detailedType}
              </Typography>
            </>
          )}
        </Box>

        <Stack direction="row" sx={{ padding: '0 15px' }}>
          {moreDetail ? (
            <Button variant="outlined" size="small" onClick={() => setMoreDetail(false)}>
              less Detail
            </Button>
          ) : (
            <Button variant="outlined" size="small" onClick={() => setMoreDetail(true)}>
              More Detail
            </Button>
          )}

          <Button
            variant="contained"
            size="small"
            onClick={() => navigate('file', { state: fileDetail })}>
            View File
          </Button>
        </Stack>

        {/* <Box sx={{ padding: '20px 15px' }}>
          <Typography variant="bold" component="h5">
            Version History
          </Typography>
        </Box> */}
      </Drawer>
    </Box>
  );
};

export default FileDetailDrawer;

FileDetailDrawer.defaultProps = {
  open: false,
  fileDetail: {},
  handleDrawerClose: () => {},
  children: null
};

FileDetailDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  children: PropTypes.node,
  fileDetail: PropTypes.oneOfType(PropTypes.object)
};
