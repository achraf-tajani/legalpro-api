import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import configuration from './config/configuration';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    
    SupabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}