import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/authDto';

import * as bcrypt from 'bcrypt';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  
  @Post("/signin")
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    const {email, password} = authDTO;
    const user = await this.userService.findByEmail(email);
    if(!user) {
      throw new UnauthorizedException("이메일 확인");
    }
    const isSamePassword = bcrypt.compareSync(password, user.password);
    if(!isSamePassword) {
      throw new UnauthorizedException("비밀번호 확인");
    }
    const payload = {id: user.id}
    const accessToken = this.jwtService.sign(payload);
    console.log(email, password);
    console.log(accessToken);
    return accessToken;
  }
}
