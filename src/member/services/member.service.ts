import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';
import { Member } from '../entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async findAll(): Promise<Member[]> {
    return this.memberRepository.find({ relations: ['borrows'] });
  }

  async findOne(id: number): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.memberRepository.create(createMemberDto);
    return this.memberRepository.save(member);
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = await this.findOne(id);
    Object.assign(member, updateMemberDto);
    return this.memberRepository.save(member);
  }

  async remove(id: number): Promise<void> {
    const member = await this.findOne(id);
    await this.memberRepository.remove(member);
  }
}
