import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';

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
        database: configService.get<string>('DB_DATABASE') || 'postgres',
        entities: [UserEntity],
        synchronize: true,
        logging: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
