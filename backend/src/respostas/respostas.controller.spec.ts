import { Test, TestingModule } from '@nestjs/testing';
import { RespostasController } from './respostas.controller';
import { RespostasService } from './respostas.service';

describe('RespostasController', () => {
  let controller: RespostasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RespostasController],
      providers: [RespostasService],
    }).compile();

    controller = module.get<RespostasController>(RespostasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
