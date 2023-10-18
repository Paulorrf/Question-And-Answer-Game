// import axios from "axios";
import axios from "@/axios";

type Data = {
  sessionId: string;
  classeId: number;
};

export async function createCharacterFn(data: Data) {
  const character = await axios({
    method: "post",
    url: "races/create-character",
    data: {
      data,
    },
  });
  return character.data;
}
