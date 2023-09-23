import { Test, TestingModule } from '@nestjs/testing';
import { SessionStoresService } from './session-stores.service';

describe('SessionStoresService', () => {
  let service: SessionStoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionStoresService],
    }).compile();

    service = module.get<SessionStoresService>(SessionStoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
