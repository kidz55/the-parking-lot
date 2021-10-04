import propTypes from 'prop-types';

const IconClose = ({ size, color, style }) => (
  <svg
    style={style}
    width={size}
    height={size}
    preserveAspectRatio="xMinYMid"
    version="1.1"
    viewBox="0 0 24 24"
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M12.094 9.972l5.886-5.886a1 1 0 0 1 1.415 0l.707.707a1 1 0 0 1 0 1.414l-5.887 5.887 5.887 5.886a1 1 0 0 1 0 1.415l-.707.707a1 1 0 0 1-1.415 0l-5.886-5.887-5.887 5.887a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 0-1.415l5.886-5.886-5.886-5.887a1 1 0 0 1 0-1.414l.707-.707a1 1 0 0 1 1.414 0l5.887 5.886z"
    />
  </svg>
);

IconClose.defaultProps = {
  size: 24,
  color: 'black',
  style: {},
};

IconClose.propTypes = {
  size: propTypes.number,
  color: propTypes.string,
};

export default IconClose;
