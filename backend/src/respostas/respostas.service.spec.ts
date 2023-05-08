import { Test, TestingModule } from '@nestjs/testing';
import { RespostasService } from './respostas.service';

describe('RespostasService', () => {
  let service: RespostasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RespostasService],
    }).compile();

    service = module.get<RespostasService>(RespostasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
