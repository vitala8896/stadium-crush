import styled from 'styled-components'
import { useTheme } from '@mui/material';

const Scroll = ({children, scw, style}) => {
  const theme = useTheme();
  return (
    <ListStyled theme={theme} scw={scw} style={style}>{children}</ListStyled>
  )  
}
export default Scroll

const ListStyled = styled('div')(({ theme, scw }) => ({
  overflowY: 'scroll',
  scrollbarWidth: 'thin',
  scrollbarColor: 'gray lightgray',  
  '&::-webkit-scrollbar': {
    width: `${scw ? scw: 6}px`,
    height: `0px`
  },
  '&::-webkit-scrollbar-track': {
    background: "transparent"
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.scroll.thumb,
    borderRadius: '15px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'darkgray'
  }
}))