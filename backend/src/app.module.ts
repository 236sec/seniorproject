import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PricePointModule } from './price-point/price-point.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Make ConfigModule available
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        user: configService.get<string>('MONGODB_USER'),
        pass: configService.get<string>('MONGODB_PASS'),
        dbName: configService.get<string>('MONGODB_DATABASE'),
      }),
      inject: [ConfigService], // Inject ConfigService to use it in useFactory
    }),
    PricePointModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
