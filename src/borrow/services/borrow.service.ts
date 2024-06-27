import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowBookDto } from '../dto/borrow-book.dto';
import { ReturnBookDto } from '../dto/return-book.dto';
import { Borrow } from '../entities/borrow.entity';
import { Book } from '../../book/entities/book.entity';
import { Member } from '../../member/entities/member.entity';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async borrowBook(borrowBookDto: BorrowBookDto): Promise<Borrow> {
    const { memberCode, bookCode, borrowDate } = borrowBookDto;

    const member = await this.memberRepository.findOne({
      where: { code: memberCode },
      relations: ['borrows'],
    });
    if (!member) {
      throw new BadRequestException(`Member with code ${memberCode} not found`);
    }

    const book = await this.bookRepository.findOne({
      where: { code: bookCode },
    });
    if (!book) {
      throw new BadRequestException(`Book with code ${bookCode} not found`);
    }

    if (book.stock <= 0) {
      throw new BadRequestException(
        `Book with code ${bookCode} is out of stock`,
      );
    }

    if (member.borrows.length >= 2) {
      throw new BadRequestException(
        `Member with code ${memberCode} has already borrowed 2 books`,
      );
    }

    const activeBorrow = await this.borrowRepository.findOne({
      where: { member, returnDate: null },
    });

    if (activeBorrow) {
      throw new BadRequestException(
        `Member with code ${memberCode} is currently being penalized`,
      );
    }

    const borrow = this.borrowRepository.create({
      member,
      book,
      borrowDate,
    });

    book.stock -= 1;
    await this.bookRepository.save(book);

    return this.borrowRepository.save(borrow);
  }

  async returnBook(returnBookDto: ReturnBookDto): Promise<void> {
    const { memberCode, bookCode, returnDate } = returnBookDto;

    const member = await this.memberRepository.findOne({
      where: { code: memberCode },
      relations: ['borrows'],
    });
    if (!member) {
      throw new BadRequestException(`Member with code ${memberCode} not found`);
    }

    const book = await this.bookRepository.findOne({
      where: { code: bookCode },
    });
    if (!book) {
      throw new BadRequestException(`Book with code ${bookCode} not found`);
    }

    const borrow = await this.borrowRepository.findOne({
      where: { member, book, returnDate: null },
    });

    if (!borrow) {
      throw new BadRequestException(
        `Book with code ${bookCode} is not borrowed by member with code ${memberCode}`,
      );
    }

    const borrowedDays =
      (returnDate.getTime() - borrow.borrowDate.getTime()) /
      (1000 * 60 * 60 * 24);

    if (borrowedDays > 7) {
      member.borrows.push({
        ...borrow,
        returnDate,
      });
      await this.memberRepository.save(member);
    } else {
      borrow.returnDate = returnDate;
      await this.borrowRepository.save(borrow);
    }

    book.stock += 1;
    await this.bookRepository.save(book);
  }
}
