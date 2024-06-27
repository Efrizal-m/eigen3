import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from './entities/borrow.entity';
import { BorrowService } from './services/borrow.service';
import { BorrowController } from './controllers/borrow.controller';
import { BookModule } from '../book/book.module';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow]), BookModule, MemberModule],
  providers: [BorrowService],
  controllers: [BorrowController],
})
export class BorrowModule {}
