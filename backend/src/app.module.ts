import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PricePointModule } from './price-point/price-point.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('MongoDB');

        mongoose.set('debug', (collectionName, methodName, ...methodArgs) => {
          const query = methodArgs[0]?.toString() || '';
          logger.debug(`${collectionName}.${methodName}(${query})`);
        });
        return {
          uri: configService.get<string>('MONGODB_URI'),
          user: configService.get<string>('MONGODB_USER'),
          pass: configService.get<string>('MONGODB_PASS'),
          dbName: configService.get<string>('MONGODB_DATABASE'),
          autoIndex: true,
        };
      },
      inject: [ConfigService],
    }),
    PricePointModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
