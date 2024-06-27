import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { MemberService } from '../services/member.service';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';
import { Member } from '../entities/member.entity';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Member> {
    return this.memberService.findOne(id);
  }

  @Post()
  create(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberService.create(createMemberDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    return this.memberService.update(id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.memberService.remove(id);
  }
}
