import { Controller, Post, Body } from '@nestjs/common';
import { BorrowService } from '../services/borrow.service';
import { BorrowBookDto } from '../dto/borrow-book.dto';
import { ReturnBookDto } from '../dto/return-book.dto';
import { Borrow } from '../entities/borrow.entity';

@Controller('borrows')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  borrowBook(@Body() borrowBookDto: BorrowBookDto): Promise<Borrow> {
    return this.borrowService.borrowBook(borrowBookDto);
  }

  @Post('return')
  returnBook(@Body() returnBookDto: ReturnBookDto): Promise<void> {
    return this.borrowService.returnBook(returnBookDto);
  }
}
