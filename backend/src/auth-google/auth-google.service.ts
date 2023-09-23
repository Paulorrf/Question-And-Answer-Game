import { Injectable } from "@nestjs/common";
import { CreateAuthGoogleDto } from "./dto/create-auth-google.dto";
import { UpdateAuthGoogleDto } from "./dto/update-auth-google.dto";

@Injectable()
export class AuthGoogleService {
  create(createAuthGoogleDto: CreateAuthGoogleDto) {
    return "This action adds a new authGoogle";
  }

  login(req) {
    if (!req.user) {
      return "no user from google";
    }

    return {
      message: "user info from google",
      user: req.user,
    };
  }

  findAll() {
    return `This action returns all authGoogle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authGoogle`;
  }

  update(id: number, updateAuthGoogleDto: UpdateAuthGoogleDto) {
    return `This action updates a #${id} authGoogle`;
  }

  remove(id: number) {
    return `This action removes a #${id} authGoogle`;
  }
}
