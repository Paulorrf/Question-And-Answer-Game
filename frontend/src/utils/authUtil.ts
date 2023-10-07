import axios from "@/axios";

export async function checkAuthentication(sessionCookie: string | undefined) {
  if (sessionCookie === undefined) return false;

  try {
    const response = await axios({
      method: "post",
      url: "authentication/check-auth",
      withCredentials: true,
      data: JSON.stringify(sessionCookie),
    });
    console.log("aeadsad", sessionCookie);
    return response.data;
  } catch (error) {
    console.error("Authentication check failed", error);
    return false;
  }
}
