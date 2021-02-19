// Core Functions
import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';
import Map from './components/Map';
import Permalink from './components/Permalink';

import './App.scss';

const useStyles = makeStyles(() => ({
  container: { height: '100%' },
  mapLeft: { position: 'relative', borderRight: '1px solid lightgray' },
  mapRight: { position: 'relative', borderleft: '1px solid lightgray' },
}));

const App = () => {
  const classes = useStyles();
  const mapLeft = useSelector((state) => state.mapLeft);
  // const mapRight = useSelector((state) => state.mapRight);

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.mapLeft}>
          <Map permalinkParam="left" map={mapLeft} />
        </Grid>
        {/* <Grid item xs={6} className={classes.mapRight}>
          <Map permalinkParam="right" map={mapRight} />
        </Grid> */}
      </Grid>
      <Permalink map={mapLeft} />
    </>
  );
};

export default App;
