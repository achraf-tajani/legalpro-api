import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import configuration from './config/configuration';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { EncryptionModule } from './modules/encryption/encryption.module';
import { AuditModule } from './modules/audit/audit.module';
import { StorageModule } from './modules/storage/storage.module';
import { AvocatsModule } from './modules/avocats/avocats.module';
import { DossiersModule } from './modules/dossiers/dossiers.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ProceduresModule } from './modules/procedures/procedures.module';
import { TachesModule } from './modules/taches/taches.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { NotesModule } from './modules/notes/notes.module';
import { FacturesModule } from './modules/factures/factures.module';
import { AdversairesModule } from './modules/adversaires/adversaires.module';
import { AlertesModule } from './modules/alertes/alertes.module';
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
    EncryptionModule,
    AuditModule,
    StorageModule,
    AvocatsModule,
    DossiersModule,
    ClientsModule,
    ProceduresModule,
    TachesModule,
    DocumentsModule,
    NotesModule,
    FacturesModule,
    AdversairesModule,
    AlertesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}