import { loginUserFn } from "@/api/login";
import axios from "@/axios";
import Layout from "@/components/Layout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// interface ILoginInput {
//   email: String;
//   password: String;
// }

const Login = () => {
  async function handleGoogleLogin() {
    try {
      //http://localhost:5000/auth-google

      window.location.href = "http://localhost:5000/auth-google";

      // const resp = await axios({
      //   method: "get",
      //   url: "http://localhost:5000/auth-google",
      // });

      // console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className="absolute left-2/4 top-1/4 -translate-x-2/4 -translate-y-1/4 text-white">
        <h2 className="mb-4 text-center text-2xl font-bold">ENTRAR</h2>
        {/* <a className="" href="/login/federated/google">
          Sign in with Google
        </a> */}

        <button onClick={handleGoogleLogin}>logar com o google</button>

        {/* <input
          className="btn-primary mt-2 cursor-pointer text-white"
          value="Entrar"
          type="submit"
        /> */}
      </div>
    </Layout>
  );
};
// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ILoginInput>();
//   const onSubmit: SubmitHandler<ILoginInput> = (data) => {
//     mutation.mutate({
//       email: data.email,
//       password: data.password,
//     });
//   };

//   const router = useRouter();

//   const [showPass, setShowPass] = useState(false);

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: loginUserFn,
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ["login"] });
//       router.push("/");
//     },
//   });

//   useEffect(() => {
//     localStorage.setItem("user", mutation.data);
//   }, [mutation.data]);

//   console.log(mutation.data);

//   return (
//     <Layout>
//       <div className="absolute left-2/4 top-1/4 -translate-x-2/4 -translate-y-1/4 text-white">
//         <h2 className="mb-4 text-center text-2xl font-bold">ENTRAR</h2>
//         {errors.email && <p>Conta não existe</p>}
//         <form
//           className="flex flex-col text-black"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <input
//             className="mb-4 rounded border p-2"
//             placeholder="email"
//             type="email"
//             {...register("email")}
//           />
//           <input
//             className="rounded border p-2"
//             placeholder="senha"
//             type={showPass ? "text" : "password"}
//             {...register("password")}
//           />
//           <div className="mb-2 flex items-center text-white">
//             <input className="mr-2" type="checkbox" id="pass" name="pass" />
//             <label htmlFor="pass" onClick={() => setShowPass((prev) => !prev)}>
//               Mostrar Senha
//             </label>
//           </div>

//           <input
//             className="btn-primary mt-2 cursor-pointer text-white"
//             value="Entrar"
//             type="submit"
//           />
//         </form>
//       </div>
//     </Layout>
//   );
// };

export default Login;
