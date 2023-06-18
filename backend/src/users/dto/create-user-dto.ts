export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  classe: "humano" | "elfo" | "orc";
}
