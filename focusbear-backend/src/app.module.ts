import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { DailyStateModule } from './daily-state/daily-state.module';
import { DailyStatsEntity } from './daily-state/daily-state.entity';
import InitSeeder from './database/seeds/init.seed';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,  // Make the configuration globally available
    }),

    // Using TypeOrmModule.forRootAsync to access ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  // Import ConfigModule
      inject: [ConfigService],  // Inject ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),  // Use ConfigService to access the variable
        port: configService.get<number>('DB_PORT') || 5432,  // Use environment variable or default to 5432
        username: configService.get<string>('DB_USERNAME') || 'postgres',
        password: configService.get<string>('DB_PASSWORD') || 'postgres',
        database: configService.get<string>('DB_DATABASE') || 'focusbear',
        entities: [UserEntity, DailyStatsEntity],
        synchronize: true,
        logging: true,
        seeds: [InitSeeder],
        factories: ["src/factories/**/*.factory.ts"]
      }),
    }),

    AuthModule,

    DailyStateModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule { }
