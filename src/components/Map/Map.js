import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import OLMap from 'ol/Map';
import { MapboxLayer } from 'mobility-toolbox-js/ol';
import BasicMap from 'react-spatial/components/BasicMap';
import { TextField, Grid, makeStyles } from '@material-ui/core';
import Zoom from 'react-spatial/components/Zoom';
import qs from 'query-string';
import { setCenter, setZoom } from '../../store/actions';

// Styles
import 'react-spatial/themes/default/index.scss';
import 'ol/ol.css';

const useStyles = makeStyles(() => ({
  map: {
    width: '100%',
    height: '100%',
  },
  inputWrapper: {
    background: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 15,
    paddingTop: 8,
  },
}));

const Map = ({ map, permalinkParam }) => {
  // Store
  const center = useSelector((state) => state.center);
  const zoom = useSelector((state) => state.zoom);
  const [tilesUrl, setTilesUrl] = useState(
    qs.parse(window.location.search)[permalinkParam] ||
      'https://maps.geops.io/styles/base_bright_v2/style.json',
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const baseLayer = useMemo(() => {
    // Update permalink
    const params = qs.parse(window.location.search);
    params[permalinkParam] = tilesUrl;
    window.history.replaceState(
      undefined,
      undefined,
      `${window.location.pathname}?${qs.stringify(params)}`,
    );

    // Update layer
    return new MapboxLayer({
      url: tilesUrl,
    });
  }, [tilesUrl, permalinkParam]);

  return (
    <>
      <BasicMap
        map={map}
        className={classes.map}
        layers={[baseLayer]}
        center={center}
        zoom={zoom}
        onMapMoved={(evt) => {
          // https://maps.geops.io/styles/base_bright_v2/style.json?key=5cc87b12d7c5370001c1d655352830d2fef24680ae3a1cda54418cb8
          if (baseLayer.mbMap && baseLayer.mbMap.loaded()) {
            baseLayer.mbMap.showCollisionBoxes = true;
          }
          dispatch(setCenter(evt.map.getView().getCenter()));
          dispatch(setZoom(evt.map.getView().getZoom()));
        }}
      />
      <Grid container className={classes.inputWrapper}>
        <Grid item xs={12}>
          <TextField
            id="outlined-full-width"
            label="GL Style URL"
            value={tilesUrl}
            placeholder="Paste the URL to a GL Style JSON here"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(evt) => {
              setTilesUrl(evt.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Zoom map={map} />
    </>
  );
};

Map.propTypes = {
  permalinkParam: PropTypes.string,
  map: PropTypes.instanceOf(OLMap),
};

Map.defaultProps = {
  permalinkParam: 'left',
  map: null,
};

export default Map;
