import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BoardModule } from './board/board.module';
import { UserEntity } from './user/entities/user.entity';
import { Board } from './board/entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        retryAttempts: configService.get('NODE_ENV') === 'prod' ? 10 : 1,
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        entities: [
          UserEntity, Board
        ],
        synchronize: Boolean(process.env.DB_SYNC),
        logging: Boolean(process.env.DB_LOG),
        timezone: 'local',
      }),
    }),
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
