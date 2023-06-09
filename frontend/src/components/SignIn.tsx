import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserFn } from "@/api/register";
import signInStore from "@/store/signInStore";
import registerErrorStore from "@/store/registerErrorStore";

interface IRegister {
  email: string;
  password: string;
  name: string;
}

interface ChildComponentProps {
  buttonRef: React.RefObject<HTMLButtonElement> | null;
  onFormSubmit: (data: IRegister) => void;
  changeFormValidity: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<ChildComponentProps> = ({
  buttonRef,
  onFormSubmit,
  changeFormValidity,
}) => {
  const [showPass, setShowPass] = useState(false);

  const changeData = signInStore((state) => state.changeData);
  const dataStore = signInStore((state) => state.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  const onSubmit: SubmitHandler<IRegister> = (data) => {
    changeData(data);
    onFormSubmit(data);
  };

  useEffect(() => {
    changeFormValidity(Object.keys(errors).length === 0);
  }, [errors, changeFormValidity]);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="flex flex-col text-black">
            {errors.name && (
              <p className="mb-2 text-yellow-400">Preencha o campo Nome</p>
            )}
            <input
              className="mb-4 rounded border p-2"
              placeholder="Nome"
              type="text"
              {...register("name", { required: true })}
            />

            {errors.email && (
              <p className="mb-2 text-yellow-400">Preencha o campo Email</p>
            )}
            <input
              className="mb-4 rounded border p-2"
              placeholder="Email"
              type="email"
              {...register("email", { required: true })}
            />

            {errors.password && (
              <p className="mb-2 text-yellow-400">Preencha o campo Senha</p>
            )}
            <input
              className="rounded border p-2"
              placeholder="Senha"
              type={showPass ? "text" : "password"}
              {...register("password", { required: true })}
            />

            <div className="mb-2 flex items-center text-white">
              <input className="mr-2" type="checkbox" id="pass" name="pass" />
              <label
                htmlFor="pass"
                onClick={() => setShowPass((prev) => !prev)}
              >
                Mostrar Senha
              </label>
            </div>

            <button ref={buttonRef} style={{ display: "none" }} type="submit">
              Button 2
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
