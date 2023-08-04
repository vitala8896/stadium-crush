import { Box, useTheme } from "@mui/material"

const dataAwards = [
  {name: 'Big Mac', value: 2.2},
  {name: 'McNuggets', value: 1.2},
  {name: 'Cheese Burger', value: 0.9},
  {name: 'Medium Fries', value: 1.7}
]
  

const SponsorsTable = ({rightAbsolute}) => {
  const theme = useTheme()
  const handleWidth = (num) => {
    return (num*100/2.8)
  }  
  return (
    <Box sx={[theme.position.centerCol, {width: '367px', height: '292px', position: 'absolute', 
              top: '50px', right: `${rightAbsolute}px`, borderRadius: '16px',
              border: `1px solid ${theme.palette.blue.border}`,
              background: theme.palette.blue.backgroundNav, zIndex: 99999}]}>
      <Box sx={[theme.position.centerCol, {width: '90%'}]}>
        <Box sx={[theme.typography.title, {marginBottom: '16px', textAlign: 'center'}]}>McDonalds awards</Box>
        {dataAwards.map((row, ind)=> {
          return (
            <Box key={ind} sx={{display: 'flex', width: '100%', justifyContent: 'end', 
                            alignItems: 'center', margin: '16px 0'}}>
              <Box sx={{color: theme.typography.popup, textAlign: 'center'}}>{row.name}</Box>
              <Box sx={{background: theme.palette.blue.border, width: '177px', height: '20px', 
                        borderRadius: '15px', margin: '0 12px'}}>
                          <Box sx={{width: handleWidth(row.value), height: '100%', 
                            background: theme.palette.blue.active, borderRadius: '15px', 
                            color: '#fff', textAlign: 'end', paddingRight: '5px'}}>
                            {row.value+'k'}
                          </Box>
              </Box>
              <Box sx={{width: '28px', color: theme.typography.popup}}>2.8k</Box>
            </Box>
          )
        })}
      </Box>      
    </Box>
  )
}
export default SponsorsTable