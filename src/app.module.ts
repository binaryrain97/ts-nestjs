import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { ormConfig } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MoviesModule,
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
