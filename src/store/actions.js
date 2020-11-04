export const SET_CENTER = 'SET_CENTER';
export const SET_ZOOM = 'SET_ZOOM';

export const setCenter = (data) => {
  return { type: SET_CENTER, data };
};

export const setZoom = (data) => {
  return { type: SET_ZOOM, data };
};
