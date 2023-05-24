import axios from "axios";

interface Login {
  email: String;
  password: String;
}

export async function loginUserFn({ email, password }: Login) {
  const user = await axios({
    method: "post",
    url: "http://localhost:5000/auth/login",
    data: {
      email,
      password,
    },
  });
  return user.data;
}
