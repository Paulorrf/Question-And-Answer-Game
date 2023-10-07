export class CreateUserDto {
  email: string;
  name: string;
  // access_tk: string;
  refresh_tk: string;
  race?: "humano" | "elfo" | "orc";
  status?: {
    strength: number;
    intelligence: number;
    agility: number;
    luck: number;
  };
}
