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
      console.log("entrou");

      return portals;
    } catch (error) {
      console.log("procurou portal erro");
      console.log(error);
    }
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

  async getPortalStatusRequirement(portal: string) {
    //portal = BIOLOGIA

    try {
      const portalStatus = await this.prisma.portal_requirements.findMany({
        where: {
          portal_name: portal,
        },
      });

      return portalStatus;
    } catch (error) {}
  }

  async availableDifficulties(status: any) {
    try {
      const portalStatus = await this.getPortalStatusRequirement(
        status.portal_name
      );

      //arr_availables = ['easy', 'normal']

      let arr_availables: string[] = [];

      portalStatus.map((portal) => {
        if (
          status.userStatus.strength >= portal.strength_required &&
          status.userStatus.agility >= portal.agility_required &&
          status.userStatus.luck >= portal.luck_required &&
          status.userStatus.intelligence >= portal.intelligence_required
        ) {
          arr_availables.push(portal.difficulty);
        }
      });

      return { availables: arr_availables, portalStatus };
    } catch (error) {
      console.log(error);
      return "errou";
    }
  }

  update(id: number, updatePortalDto: UpdatePortalDto) {
    return `This action updates a #${id} portal`;
  }

  remove(id: number) {
    return `This action removes a #${id} portal`;
  }
}
