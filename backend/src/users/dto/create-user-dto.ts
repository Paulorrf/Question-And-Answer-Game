export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  race: "humano" | "elfo" | "orc";
  status: {
    strength: number;
    intelligence: number;
    agility: number;
    luck: number;
  };
}
