import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signup")
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const {email, nickname} = createUserDto;
    const hasEmail = await this.userService.findByEmail(email);
    if(hasEmail) {
      throw new ConflictException("이미 사용중인 이메일 입니다.");
    }
    const hasNickname = await this.userService.findByNickname(nickname);
    if(hasNickname) {
      throw new ConflictException("이미 사용중인 닉네임 입니다.");
    }
    const userEntity = await this.userService.create(createUserDto);
    return "회원가입 성공";
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
