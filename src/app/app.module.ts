import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/system/configuration';
import { TypeOrmConfigModule } from './config/type-orm/typeorm.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './core/guards/app.role';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    TypeOrmConfigModule,
    UserModule,
    AuthModule,
    AccessControlModule.forRoles(roles),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
