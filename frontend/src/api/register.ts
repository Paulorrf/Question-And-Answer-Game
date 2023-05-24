import axios from "axios";

interface IRegister {
  email: String;
  password: String;
  name: String;
}

export async function createUserFn({ email, password, name }: IRegister) {
  const user = await axios({
    method: "post",
    url: "http://localhost:5000/auth/signin",
    data: {
      email,
      password,
      name,
    },
  });
  return user.data;
}
