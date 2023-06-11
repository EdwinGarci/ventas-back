import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    RoleModule,
    AuthModule,
    ClientModule,
    SupplierModule
  ],
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
