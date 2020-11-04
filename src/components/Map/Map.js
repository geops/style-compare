import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MapboxLayer } from 'mobility-toolbox-js/ol';
import BasicMap from 'react-spatial/components/BasicMap';
import { TextField, makeStyles } from '@material-ui/core';
import qs from 'query-string';
import { setCenter, setZoom } from '../../store/actions';

// Styles
import './Map.sass';
import 'react-spatial/themes/default/index.scss';
import 'ol/ol.css';

const useStyles = makeStyles(() => ({
  map: {
    width: '100%',
    height: '100%',
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    background: 'white',
    padding: 15,
  },
}));

const Map = ({ permalinkParam }) => {
  // Store
  const center = useSelector((state) => state.center);
  const zoom = useSelector((state) => state.zoom);
  const [tilesUrl, setTilesUrl] = useState(
    qs.parse(window.location.search)[permalinkParam] ||
      `https://maps.geops.io/styles/base_bright_v2/style.json?key=5cc87b12d7c5370001c1d655352830d2fef24680ae3a1cda54418cb8`,
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
        className={classes.map}
        layers={[baseLayer]}
        center={center}
        zoom={zoom}
        onMapMoved={(evt) => {
          dispatch(setCenter(evt.map.getView().getCenter()));
          dispatch(setZoom(evt.map.getView().getZoom()));
        }}
      />
      <TextField
        label="Tiles url"
        className={classes.input}
        variant="outlined"
        value={tilesUrl}
        onChange={(evt) => {
          setTilesUrl(evt.target.value);
        }}
      />
    </>
  );
};

Map.propTypes = {
  permalinkParam: PropTypes.string,
};

Map.defaultProps = { permalinkParam: 'left' };

export default Map;
