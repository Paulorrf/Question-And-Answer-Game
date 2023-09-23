import { Test, TestingModule } from '@nestjs/testing';
import { SessionStoresController } from './session-stores.controller';
import { SessionStoresService } from './session-stores.service';

describe('SessionStoresController', () => {
  let controller: SessionStoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionStoresController],
      providers: [SessionStoresService],
    }).compile();

    controller = module.get<SessionStoresController>(SessionStoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
