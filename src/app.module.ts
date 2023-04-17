import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule],
  controllers: [],
  providers: [],
  exports: []
})

export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
  }
}
