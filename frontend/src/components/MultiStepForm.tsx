// MultiStepForm.tsx

import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Layout from "./Layout";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleNext = () => {
    if (step === 1 && formData.name && formData.email && formData.password) {
      setStep(2);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can perform further actions like API calls or validation here
  };

  return (
    <Layout>
      <div className="flex h-screen items-center justify-center text-white">
        {step === 1 && (
          <Step1
            formData={formData}
            onChange={handleFormChange}
            onNext={handleNext}
          />
        )}
        {step === 2 && (
          <Step2
            formData={formData}
            onChange={handleFormChange}
            onPrev={handlePrev}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </Layout>
  );
};

export default MultiStepForm;
