import { EntityRepository, Repository } from 'typeorm';
import { Member } from '../../member/entities/member.entity';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {}
