import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    try {
      const savedTag = await this.prisma.tags.create({
        data: {
          name: createTagDto.name,
        },
      });

      return savedTag;
    } catch (error) {
      console.log(error);
      return "erro ao criar a tag";
    }
  }

  async findAll() {
    try {
      const allTags = await this.prisma.tags.findMany({
        select: {
          name: true,
        },
      });

      return allTags;
    } catch (error) {
      console.log(error);
      return "erro ao achar todas as tags";
    }
  }

  async findOne(id: number) {
    try {
      const foundedTag = await this.prisma.tags.findFirst({
        where: {
          id,
        },
        select: {
          name: true,
        },
      });

      return foundedTag;
    } catch (error) {
      console.log(error);
      return `erro ao achar a tag com o id ${id}`;
    }
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    try {
      const updatedTag = await this.prisma.tags.update({
        where: {
          id,
        },
        data: {
          name: updateTagDto.name,
        },
      });

      return updatedTag;
    } catch (error) {
      console.log(error);
      return `não foi possível atualizar a tag com o id ${id}`;
    }
  }

  async remove(id: number) {
    try {
      const removedTag = await this.prisma.tags.delete({
        where: {
          id,
        },
      });

      return removedTag;
    } catch (error) {
      console.log(error);
      return "erro ao achar todas as tags";
    }
  }
}
