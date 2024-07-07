import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import * as bcrypt from 'bcrypt';
import { Board } from "src/board/entities/board.entity";

@Entity({name: 'user'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    nickname: string;

    @OneToMany(() => Board, board => board.author)
    boards: Board[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @BeforeInsert()
    private beforeInsert() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}
