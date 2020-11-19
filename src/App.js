// Core Functions
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';
import Permalink from 'react-spatial/components/Permalink';
import qs from 'query-string';
import Map from './components/Map';
import { setCenter, setZoom } from './store/actions';

import './App.scss';

const useStyles = makeStyles(() => ({
  container: { height: '100%' },
  mapLeft: { position: 'relative', borderRight: '5px solid black' },
  mapRight: { position: 'relative', borderleft: '5px solid black' },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const mapLeft = useSelector((state) => state.mapLeft);
  const mapRight = useSelector((state) => state.mapRight);

  useEffect(() => {
    const parameters = {
      ...qs.parse(window.location.search),
    };

    const z = parseFloat(parameters.z);
    const x = parseFloat(parameters.x);
    const y = parseFloat(parameters.y);

    if (x && y) {
      dispatch(setCenter([x, y]));
    }

    if (z) {
      dispatch(setZoom(z));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={6} className={classes.mapLeft}>
          <Map permalinkParam="left" map={mapLeft} />
        </Grid>
        <Grid item xs={6} className={classes.mapRight}>
          <Map permalinkParam="right" map={mapRight} />
        </Grid>
      </Grid>
      <Permalink map={mapLeft} />
    </>
  );
};

export default App;
