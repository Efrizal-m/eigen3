import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import { Member } from '../../member/entities/member.entity';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, (member) => member.borrows)
  member: Member;

  @ManyToOne(() => Book)
  book: Book;

  @Column()
  borrowDate: Date;

  @Column({ nullable: true })
  returnDate: Date;
}
