import { loginUserFn } from "@/api/login";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ILoginInput {
  email: String;
  password: String;
}

const Login = () => {
  const { register, handleSubmit } = useForm<ILoginInput>();
  const onSubmit: SubmitHandler<ILoginInput> = (data) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  const [showPass, setShowPass] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginUserFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });

  useEffect(() => {
    localStorage.setItem("user", mutation.data);
  }, [mutation.data]);

  console.log(mutation.data);

  return (
    <div className="absolute left-2/4 top-1/4 -translate-x-2/4 -translate-y-1/4 text-white">
      <h2 className="mb-4 text-center text-2xl font-bold">ENTRAR</h2>
      <form
        className="flex flex-col text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="mb-4 rounded border p-2"
          placeholder="email"
          type="email"
          {...register("email")}
        />
        <input
          className="rounded border p-2"
          placeholder="senha"
          type={showPass ? "text" : "password"}
          {...register("password")}
        />
        <div className="mb-2 flex items-center text-white">
          <input className="mr-2" type="checkbox" id="pass" name="pass" />
          <label htmlFor="pass" onClick={() => setShowPass((prev) => !prev)}>
            Mostrar Senha
          </label>
        </div>

        <input
          className="btn-primary mt-2 text-white"
          value="Entrar"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Login;
