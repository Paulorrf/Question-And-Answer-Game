import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionStoreDto } from './create-session-store.dto';

export class UpdateSessionStoreDto extends PartialType(CreateSessionStoreDto) {}
