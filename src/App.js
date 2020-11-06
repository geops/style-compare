// Core Functions
import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import OLMap from 'ol/Map';
import { defaults as defaultInteractions } from 'ol/interaction';
import Zoom from 'react-spatial/components/Zoom';
import Map from './components/Map';

import './App.sass';

const useStyles = makeStyles(() => ({
  container: { height: '100%' },
  mapLeft: { position: 'relative', borderRight: '5px solid black' },
  mapRight: { position: 'relative', borderleft: '5px solid black' },
}));

export default function App() {
  const classes = useStyles();

  const map = new OLMap({
    controls: [],
    interactions: defaultInteractions({
      altShiftDragRotate: false,
      pinchRotate: false,
    }),
  });

  return (
    <Grid container className={classes.container}>
      <Grid item xs={6} className={classes.mapLeft}>
        <Map permalinkParam="left" />
      </Grid>
      <Grid item xs={6} className={classes.mapRight}>
        <Map permalinkParam="right" map={map} />
      </Grid>
      <Zoom map={map} />
    </Grid>
  );
}
