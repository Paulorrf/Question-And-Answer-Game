import React from "react";

const Step1 = ({
  formData,
  onChange,
  onNext,
}: {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="-mt-32">
        <h2 className="mb-4 text-center text-2xl">CRIAR CONTA</h2>
        <form className="w-full max-w-md" onSubmit={onNext}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nome"
              id="name"
              name="name"
              className="w-full rounded-md border border-gray-300 p-2 text-black"
              value={formData.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-300 p-2 text-black"
              value={formData.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Senha"
              id="password"
              name="password"
              className="w-full rounded-md border border-gray-300 p-2 text-black"
              value={formData.password}
              onChange={onChange}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={!formData.name || !formData.email || !formData.password}
              className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step1;
