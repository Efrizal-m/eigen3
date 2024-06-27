import { EntityRepository, Repository } from 'typeorm';
import { Borrow } from '../../borrow/entities/borrow.entity';

@EntityRepository(Borrow)
export class BorrowRepository extends Repository<Borrow> {}
