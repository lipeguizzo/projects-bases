import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AddressModule } from 'src/modules/address/address.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CompanyModule } from 'src/modules/company/company.module';
import { MailModule } from 'src/modules/mail/mail.module';
import { OrganizationModule } from 'src/modules/organization/organization.module';
import { RoleModule } from 'src/modules/role/role.module';
import { StoredFileModule } from 'src/modules/stored-file/stored-file.module';
import { UserModule } from 'src/modules/user/user.module';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UserAbilitiesGuard } from 'src/shared/guards/user-abilities.guard';
import { TokenSignService } from 'src/shared/services/token-sign.service';
import { TokenVerifyService } from 'src/shared/services/token-verify.service';
import { PrismaService } from './database/prisma.service';
import { AwsFileSystem } from './file-system/implementations/aws.file-system';

@Global()
@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    OrganizationModule,
    CompanyModule,
    AddressModule,
    StoredFileModule,
    MailModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    PrismaService,
    TokenSignService,
    TokenVerifyService,
    AwsFileSystem,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserAbilitiesGuard,
    },
  ],
  exports: [PrismaService, AwsFileSystem, TokenSignService, TokenVerifyService],
})
export class InfraModule {}
