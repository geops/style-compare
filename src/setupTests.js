// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
import 'jest-canvas-mock';

global.URL.createObjectURL = jest.fn(() => 'fooblob');

/* eslint-disable */
global.ResizeObserver = class ResizeObserver {
  constructor(onResize) {
    ResizeObserver.onResize = onResize;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};
