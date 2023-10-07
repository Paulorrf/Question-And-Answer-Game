// import axios from "axios";

import axios from "@/axios";

interface Login {
  email: String;
  password: String;
}

export async function logoutUser(sessionID: string) {
  const user = await axios({
    method: "post",
    url: "authentication/logout",
    data: JSON.stringify(sessionID),
  });
  return user.data;
}
