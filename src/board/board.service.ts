import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class BoardService {

  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ){}

  async create(createBoardDto: CreateBoardDto, id: number): Promise<Board> {
    const author = await this.userRepository.findOne({ where: { id } });
  
    const board = this.boardRepository.create({
      title: createBoardDto.title,
      content: createBoardDto.content,
      author: author,
    });
  
    return this.boardRepository.save(board);
  }

  findAll() {
    return this.boardRepository.find();
  }

  findOne(id: number) {
    return this.boardRepository.findOne({
      where: {id}
    });
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    const board = this.boardRepository.findOne({
      where: {id}
    });
    return this.boardRepository.update(id, updateBoardDto);
  }

  remove(id: number) {
    return this.boardRepository.delete(id);
  }
}
