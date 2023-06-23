import React, { useState, useRef } from "react";
import SlideShow from "@/components/SlideShow";
import SignIn from "@/components/SignIn";

const Register = () => {
  const [proximo, setProximo] = useState(0);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  //eslint-disable-next-line
  const components = [<SignIn buttonRef={buttonRef} />, <SlideShow />];

  const handleClickButton1 = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
    setProximo((prev) => prev + 1);
  };

  return (
    <div className="absolute left-2/4 top-1/4 -translate-x-2/4 -translate-y-1/4 text-white">
      <h2 className="mb-4 text-center text-2xl font-bold">CRIAR CONTA</h2>

      {proximo === 0 ? components[proximo] : components[proximo]}

      {proximo === 0 && (
        <button className="btn-primary mt-8" onClick={handleClickButton1}>
          Proximo
        </button>
      )}
    </div>
  );
};

export default Register;
