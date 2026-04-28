import { Grid, Paper } from '@mui/material'
import React from 'react'

const DashBoard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>Dashboard Overview</Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>Recent Activities</Paper>
      </Grid>
    </Grid>
  )
}

export default DashBoard