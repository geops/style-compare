/* eslint-disable default-param-last */
import OLMap from "ol/Map";
import { defaults as defaultInteractions } from "ol/interaction";

import { SET_CENTER, SET_ZOOM } from "./actions";

const reducers = (
  state = {
    mapLeft: new OLMap({
      controls: [],
      interactions: defaultInteractions({
        altShiftDragRotate: false,
        pinchRotate: false,
      }),
    }),
    mapRight: new OLMap({
      controls: [],
      interactions: defaultInteractions({
        altShiftDragRotate: false,
        pinchRotate: false,
      }),
    }),
  },
  action,
) => {
  const { data } = action;
  switch (action.type) {
    case SET_CENTER:
      return { ...state, center: data };
    case SET_ZOOM:
      return { ...state, zoom: data };
    default:
      return state;
  }
};
export default reducers;
