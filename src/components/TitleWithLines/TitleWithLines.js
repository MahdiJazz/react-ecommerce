import React from 'react';
import './TitleWithLines.css'; 

function TitleWithLines({ text }) {
  return (
    <div className="section-title">
      <div className="line"></div>
      <h2>{text}</h2>
      <div className="line"></div>
    </div>
  );
}

export default TitleWithLines;
