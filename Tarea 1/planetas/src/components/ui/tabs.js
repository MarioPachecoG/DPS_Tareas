import React from 'react';

export const Tabs = ({ children }) => {
  return <div className="tabs">{children}</div>;
};

export const Tab = ({ label, children }) => {
  return (
    <div className="tab">
      <h3>{label}</h3>
      {children}
    </div>
  );
};
