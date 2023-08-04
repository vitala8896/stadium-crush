// import { useEffect } from 'react';
import { Card, CardContent, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// redux
import { getNavigateData, addQueryPath } from '../redux/facet';

// Icons
import AudioIcon from '../assets/img/Icons/audioIcon.svg';
import ContactIcon from '../assets/img/Icons/contactIcon.svg';
import CsvIcon from '../assets/img/Icons/csvIcon.svg';
import EmailIcon from '../assets/img/Icons/emailIcon.svg';
import ExcelIcon from '../assets/img/Icons/excel.svg';
import ExeIcon from '../assets/img/Icons/exeIcon.svg';
import HtmlIcon from '../assets/img/Icons/htmlIcon.svg';
import ImageIcon from '../assets/img/Icons/imageIcon.svg';
import LinkIcon from '../assets/img/Icons/linkIcon.png';
import PdfIcon from '../assets/img/Icons/pdfIcon.svg';
import PowerPointIcon from '../assets/img/Icons/powerPointIcon.svg';
import TxtIcon from '../assets/img/Icons/txtIcon.svg';
import WordIcon from '../assets/img/Icons/wordIcon.svg';
import VideoIcon from '../assets/img/Icons/videoIcon.svg';
import DefaultIcons from '../assets/img/Icons/document.svg'; // Use to be file.svg
import Folder from '../assets/img/Icons/folderIcon.png';

const FileIconImg = styled('img')({
  display: 'inline-block',
  marginRight: '10px'
});

const renderFileIcon = (value) => {
  const data = value.toLowerCase();

  switch (data) {
    case 'spreadsheet':
    case 'xls':
    case 'xlsx':
      return <FileIconImg width="60px" height="60px" src={ExcelIcon} alt="File icon" />;
    case 'email':
    case 'email-message':
    case 'message':
      return <FileIconImg width="30px" height="30px" src={EmailIcon} alt="File icon" />;
    case 'document':
    case 'doc':
    case 'docx':
      return <FileIconImg width="60px" height="60px" src={WordIcon} alt="File icon" />;
    case 'presentation':
    case 'ppt':
    case 'pptx':
      return <FileIconImg width="60px" height="60px" src={PowerPointIcon} alt="File icon" />;
    case 'pdf':
      return <FileIconImg width="60px" height="60px" src={PdfIcon} alt="File icon" />;
    case 'csv':
      return <FileIconImg width="60px" height="60px" src={CsvIcon} alt="File icon" />;
    case 'text':
    case 'rtf':
    case 'txt':
      return <FileIconImg width="60px" height="60px" src={TxtIcon} alt="File icon" />;
    case 'executable':
      return <FileIconImg width="60px" height="60px" src={ExeIcon} alt="File icon" />;
    case 'image':
      return <FileIconImg width="60px" height="60px" src={ImageIcon} alt="File icon" />;
    case 'audio':
      return <FileIconImg width="60px" height="60px" src={AudioIcon} alt="File icon" />;
    case 'video':
      return <FileIconImg width="60px" height="60px" src={VideoIcon} alt="File icon" />;
    case 'url':
      return <FileIconImg width="60px" height="60px" src={LinkIcon} alt="File icon" />;
    case 'webpage':
      return <FileIconImg width="60px" height="60px" src={HtmlIcon} alt="File icon" />;
    case 'contact':
      return <FileIconImg width="60px" height="60px" src={ContactIcon} alt="File icon" />;
    case 'other':
    default: {
      return <FileIconImg width="60px" height="60px" src={DefaultIcons} alt="File icon" />;
    }
  }
};

export default function BasicCard({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clickedItems } = useSelector((state) => state.facet);

  const handleClick = (item) => {
    if (item.type === 'folder') {
      if (item.path) {
        dispatch(
          getNavigateData({
            body: {
              queryItems: clickedItems.length > 0 ? [...clickedItems] : []
            },
            urlParam: {
              path: item.path
            }
          })
        );
        dispatch(addQueryPath(item.path));
      } else {
        dispatch(
          getNavigateData({
             body: {
               queryItems: clickedItems.length > 0 ? [...clickedItems] : []
             }
           })
        );
      }
    } else {
      navigate('/file', { state: item });
    }
  };

  return (
    <Card
      sx={{ width: '100%', height: '200px', wordWrap: 'break-word', cursor: 'pointer' }}
      onClick={() => handleClick(item)}>
      <CardContent sx={{ textAlign: 'center' }}>
        {item.type === 'folder' ? (
          <img style={{ height: 60, width: 60, margin: '0 auto' }} src={Folder} alt="folder Icon" />
        ) : (
          renderFileIcon(item.detailedType)
        )}

        <Typography variant="h6" component="div">
          {item.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
