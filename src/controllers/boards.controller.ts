import { Controller, Get } from "@nestjs/common";
import { Board } from "src/models/boards.models";
import { BoardsService } from "src/services/boards.service";

@Controller('boards')
export class BoardsController {
    boardsService: BoardsService;

    constructor(boardsService: BoardsService) {
        this.boardsService = boardsService;
    }

    @Get()
    getAllBoard(): Board[]{
        return this.boardsService.getAllBoards();
    }
}