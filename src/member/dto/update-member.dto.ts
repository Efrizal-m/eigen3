import { IsString, IsOptional } from 'class-validator';

export class UpdateMemberDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
