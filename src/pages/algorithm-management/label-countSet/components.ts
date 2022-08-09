import { Popover } from '@mui/material'
import styled from '@emotion/styled'

export const popoverWidth = 480
export const MyPopover = styled(Popover)({
  '& .MuiPaper-root': {
    background:
      'linear-gradient(180deg, rgba(132,153,191,0.4000) 0%, rgba(126,152,200,0.6000) 15%, rgba(174,189,216,0.4000) 100%)',
    boxShadow: '0px 0px 8px 0px rgba(26,28,37,0.5000)',
    backdropFilter: 'blur(4px)',
    width: `${popoverWidth}px`
  },
})
