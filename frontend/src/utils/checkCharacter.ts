import axios from "@/axios";

export async function checkCharacter(sessionCookie: string | undefined) {
  if (sessionCookie === undefined) return false;

  try {
    const response: { data: boolean } = await axios({
      method: "get",
      url: `races/characterExist/${sessionCookie}`,
      withCredentials: true,
    });
    // console.log("aeadsad", sessionCookie);
    return response.data;
  } catch (error) {
    console.error("Authentication check failed", error);
    return false;
  }
}
