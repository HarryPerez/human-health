/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { string, number, bool, shape, oneOf, any } from 'prop-types';
import Lottie from 'react-lottie';

import { getOptions, SPINNER_TYPES } from './constants';
import styles from './styles.module.scss';

function Loading({ className, height, width, type, loop, autoplay, rendererSettings }) {
  return (
    <div className={`row center middle ${styles.spinnerContainer} ${className}`}>
      <Lottie
        width={width}
        height={height}
        options={getOptions({ type, loop, autoplay, rendererSettings })}
      />
    </div>
  );
}

Loading.propTypes = {
  autoplay: bool,
  className: string,
  height: number,
  loop: bool,
  rendererSettings: shape({
    preserveAspectRatio: string,
    progressiveLoad: bool,
    context: any,
    clearCanvas: bool,
    className: any,
    id: number,
    hideOnTransparent: bool,
    viewBoxOnly: bool,
    viewBoxSize: number,
    imagePreserveAspectRatio: string,
    focusable: string,
    filterSize: shape({ width: string, height: string, x: string, y: string })
  }),
  type: oneOf(Object.keys(SPINNER_TYPES)),
  width: number
};

Loading.defaultProps = {
  height: 124.5,
  width: 150
};

export default Loading;
