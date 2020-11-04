// Core Functions
import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Map from './components/Map';

import './App.css';

const useStyles = makeStyles(() => ({
  container: { height: '100%' },
  mapLeft: { position: 'relative', borderRight: '5px solid black' },
  mapRight: { position: 'relative', borderleft: '5px solid black' },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={6} className={classes.mapLeft}>
        <Map permalinkParam="left" />
      </Grid>
      <Grid item xs={6} className={classes.mapRight}>
        <Map permalinkParam="right" />
      </Grid>
    </Grid>
  );
}
