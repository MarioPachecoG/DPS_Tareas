import React from 'react';

export const Card = ({ children, onClick, className }) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};
