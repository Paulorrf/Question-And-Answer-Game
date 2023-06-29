import React, { useState } from "react";
import { animated, useSpring } from "react-spring";

const Portal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const rotation = useSpring({
    transform: isOpen ? "rotate(360deg)" : "rotate(0deg)",
    config: { tension: 200, friction: 20 },
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="portal-container cursor-pointer rounded-lg bg-black p-8"
        onClick={handleClick}
      >
        <animated.div
          className="portal-content"
          style={{
            ...rotation,
            background: isOpen
              ? "radial-gradient(circle, #000000 10%, #330033 80%)"
              : "radial-gradient(circle, #000000 10%, #111111 80%)",
          }}
        />
      </div>
    </div>
  );
};

export default Portal;
