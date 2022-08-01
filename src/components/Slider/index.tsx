import { styled } from '@mui/material/styles'
import { Slider } from '@mui/material'

const MySlider = styled(Slider)({
  '& .MuiSlider-rail': {
    background: '#232734',
    borderRadius: '1px',
    opacity: '0.6',
  },
  '& .MuiSlider-thumb': {
    borderRadius: '2px',
    width: '10px',
    height: '10px',
    background: 'linear-gradient(180deg, #AEBDD8 0%, #7E98C8 85%, #8499BF 100%)',
    boxShadow: '0px 0px 8px 0px rgba(43,48,63,0.5000)',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `none`,
    },
    '&.Mui-active': {
      boxShadow: `none`,
    },
  },
})

export default MySlider
