import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import OLMap from 'ol/Map';
import { MapboxLayer } from 'mobility-toolbox-js/ol';
import BasicMap from 'react-spatial/components/BasicMap';
import { FormLabel, TextField, makeStyles } from '@material-ui/core';
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
    padding: 15,
    background: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    margin: 'auto',
  },
  label: {
    paddingLeft: '5px',
  },
  input: {
    width: '100%',
  },
}));

const Map = ({ map, permalinkParam }) => {
  // Store
  const center = useSelector((state) => state.center);
  const zoom = useSelector((state) => state.zoom);
  const [focused, onFocused] = useState(false);
  const [tilesUrl, setTilesUrl] = useState(
    qs.parse(window.location.search)[permalinkParam] || '',
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
          dispatch(setCenter(evt.map.getView().getCenter()));
          dispatch(setZoom(evt.map.getView().getZoom()));
        }}
      />
      <div className={classes.inputWrapper}>
        <FormLabel focused={focused} className={classes.label}>
          GL Style URL
        </FormLabel>
        <TextField
          className={classes.input}
          onFocus={() => onFocused(true)}
          onBlur={() => onFocused(false)}
          placeholder="Paste the URL to a GL Style JSON here"
          variant="outlined"
          value={tilesUrl}
          onChange={(evt) => {
            setTilesUrl(evt.target.value);
          }}
        />
      </div>
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
