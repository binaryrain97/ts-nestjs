import { Injectable } from "@nestjs/common";
import { Board } from "src/models/boards.models";

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards() {
        return this.boards;
    }
}