import React from 'react'
import { Skeleton, Grid } from '@mui/material'

// 骨架
export default function MySkeleton({ size = 3 }: { size?: number }) {
  return (
    <>
      <Grid
        sx={{
          marginTop: '35px',
          paddingLeft: '50px',
        }}
        container
        spacing={5}
      >
        {[...Array(size)].map(() => {
          return (
            <Grid xs={4} lg={3}>
              <Skeleton width="200px" height="112px" variant="rectangular"></Skeleton>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
