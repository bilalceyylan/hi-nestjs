import { config } from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
console.log(config);
TypeOrmModule.forRoot(config);