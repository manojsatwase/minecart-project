import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ size = '3rem', position = 'center', className = '' }) => {
  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return { top: '0', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { bottom: '0', left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { top: '50%', left: '0', transform: 'translateY(-50%)' };
      case 'right':
        return { top: '50%', right: '0', transform: 'translateY(-50%)' };
      default:
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  return (
    <div className={`position-fixed ${className}`} style={{ zIndex: 9999, ...getPositionStyle() }}>
      <Spinner animation="border" role="status" style={{ width: size, height: size }}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
