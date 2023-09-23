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
    console.log("ta local fi");
    try {
      const portals = await this.prisma.portal.findMany({});
      console.log("entrou");

      return portals;
    } catch (error) {
      console.log("procurou portal erro");
      console.log(error);
    }
  }

  async findAllSpecific(names: string) {
    try {
      const upperNames = names.toUpperCase().split(",");

      // const upperNames = names2.map((name) => name.toUpperCase());
      const portalId = await this.prisma.portal.findMany({
        where: {
          name: { in: upperNames },
        },
        select: {
          id: true,
        },
      });

      console.log("names");
      console.log(portalId);
      console.log("names");

      const portalIds = portalId.map((portal) => portal.id);

      const portals = await this.prisma.portal_spec.findMany({
        where: {
          portal_id: {
            in: portalIds,
          },
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
      const genericNames = generic.split(",");
      const genericNamesUpperCase = genericNames.map((value) =>
        value.toUpperCase()
      );

      const genericIds = await this.prisma.portal.findMany({
        where: {
          name: {
            in: genericNamesUpperCase,
          },
        },
        select: {
          id: true,
        },
      });

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
