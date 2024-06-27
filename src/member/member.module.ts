import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MemberService } from './services/member.service';
import { MemberController } from './controllers/member.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [MemberService],
  controllers: [MemberController],
  exports: [TypeOrmModule.forFeature([Member]), MemberService],
})
export class MemberModule {}
