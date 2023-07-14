import React, { useState } from "react";

const Filtro = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-4 flex items-center">
        <label htmlFor="portal" className="flex items-center">
          <input
            type="checkbox"
            id="portal"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <span>Portal</span>
        </label>
      </div>
      <div>
        <label
          htmlFor="checkmark"
          className={`inline-block h-6 w-6 rounded-full ${
            isChecked ? "bg-green-500" : "bg-gray-400"
          }`}
        ></label>
      </div>
    </div>
  );
};

export default Filtro;
