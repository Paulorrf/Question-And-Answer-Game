import axios from "axios";

interface IRegister {
  email: string;
  password: string;
  name: string;
}

interface CharacterState {
  race: string;
  status: {
    strength: number;
    intelligence: number;
    agility: number;
    luck: number;
  };
}

export async function createUserFn({
  data,
  character,
}: {
  data: IRegister;
  character: CharacterState;
}) {
  const user = await axios({
    method: "post",
    url: "https://question-and-answer-game-production.up.railway.app/auth/signin",
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
      status: character.status,
      race: character.race,
    },
  });
  return user.data;
}
