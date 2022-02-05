import React, { useState } from "react";
import "./Tooltip.scss";

const Tooltip = ({ children, content }) => {
  const [active, setActive] = useState(false);
  let timeout;

  const showTooltip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, 100);
  };

  const hideTooltip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      className="tooltip-wrapper"
    >
      {children}
      {active && <div className="tooltip-tip arrow">{content}</div>}
    </div>
  );
};

export default Tooltip;
