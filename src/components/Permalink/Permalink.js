import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import OLMap from "ol/Map";
import qs from "query-string";
import RSPermalink from "react-spatial/components/Permalink";
import { setCenter, setZoom } from "../../store/actions";

function Permalink({ map }) {
  const dispatch = useDispatch();

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

  return <RSPermalink map={map} />;
}

Permalink.propTypes = {
  map: PropTypes.instanceOf(OLMap).isRequired,
};

export default Permalink;
