import { usePathname } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  function createAccount(event: SyntheticEvent) {
    event.preventDefault();
    const email = (event?.target as any).email.value;
    const password = (event?.target as any).senha.value;

    console.log(email, password);
  }

  return (
    <div className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">
      <h2 className="mb-4 text-center text-2xl font-bold">ENTRAR</h2>
      <form className="flex flex-col" onSubmit={createAccount}>
        <input
          className="input-primary"
          type="text"
          placeholder="email"
          name="email"
        />
        <input
          className="input-primary"
          type={showPass ? "text" : "password"}
          placeholder="senha"
          name="senha"
        />

        <div className="mb-2 flex items-center">
          <input className="mr-2" type="checkbox" id="pass" name="pass" />
          <label htmlFor="pass" onClick={() => setShowPass((prev) => !prev)}>
            Mostrar Senha
          </label>
        </div>
        <button className="btn-primary">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
