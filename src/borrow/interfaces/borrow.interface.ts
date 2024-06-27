import { Book } from '../../book/interfaces/book.interface';
import { Member } from '../../member/interfaces/member.interface';

export interface Borrow {
  id: number;
  member: Member;
  book: Book;
  borrowDate: Date;
  returnDate?: Date;
}
