import { Borrow } from '../../borrow/interfaces/borrow.interface';

export interface Member {
  id: number;
  code: string;
  name: string;
  borrows: Borrow[];
}
