import { Injectable } from "@nestjs/common";
import { CreatePortalDto } from "./dto/create-portal.dto";
import { UpdatePortalDto } from "./dto/update-portal.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PortalService {
  constructor(private prisma: PrismaService) {}

  create(createPortalDto: CreatePortalDto) {
    return "This action adds a new portal";
  }

  async findAllGeneric() {
    try {
      const portals = await this.prisma.portal.findMany({});

      return portals;
    } catch (error) {}
  }

  async findAllSpecific(name: string) {
    try {
      const portalId = await this.prisma.portal.findFirst({
        where: {
          name: name.toUpperCase(),
        },
      });

      const portals = await this.prisma.portal_spec.findMany({
        where: {
          portal_id: portalId.id,
        },
        take: 10,
      });

      // console.log(portalId);

      return portals;
    } catch (error) {
      console.log("deu ruim");
    }
  }

  async findGenericByLetter(word: string) {
    try {
      const foundPortal = await this.prisma.portal.findMany({
        where: {
          name: {
            startsWith: word,
            mode: "insensitive",
          },
        },
      });

      return foundPortal;
    } catch (error) {
      console.log("deu ruim ao achar pelas letras");
      console.log(error);
      return "deu ruim ao achar pelas letras";
    }
  }

  async findSpecificByLetter(word: string, generic: string) {
    try {
      const names = generic.split(",");
      const names2 = names.map((value) => value.toUpperCase());
      // console.log(names2);

      const genericIds = await this.prisma.portal.findMany({
        where: {
          name: {
            in: names2,
          },
        },
        select: {
          id: true,
        },
      });

      // console.log(genericIds);
      const genericIds2 = genericIds.map((item) => item.id);

      const foundPortal = await this.prisma.portal_spec.findMany({
        where: {
          name: {
            startsWith: word,
            mode: "insensitive",
          },
          portal_id: {
            in: genericIds2,
          },
        },
      });

      return foundPortal;
    } catch (error) {
      console.log("deu ruim ao achar pelas letras");
      console.log(error);
      return "deu ruim ao achar pelas letras";
    }
  }

  update(id: number, updatePortalDto: UpdatePortalDto) {
    return `This action updates a #${id} portal`;
  }

  remove(id: number) {
    return `This action removes a #${id} portal`;
  }
}
