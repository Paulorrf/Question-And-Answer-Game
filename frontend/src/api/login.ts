// import axios from "axios";

import axios from "@/axios";

interface Login {
  email: String;
  password: String;
}

export async function loginUserFn({ email, password }: Login) {
  const user = await axios({
    method: "post",
    url: "auth/login",
    data: {
      email,
      password,
    },
  });
  return user.data;
}
