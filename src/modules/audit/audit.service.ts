import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export enum AuditAction {
  // Auth
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  LOGIN_FAILED = 'LOGIN_FAILED',
  
  // Documents
  DOCUMENT_VIEW = 'DOCUMENT_VIEW',
  DOCUMENT_DOWNLOAD = 'DOCUMENT_DOWNLOAD',
  DOCUMENT_UPLOAD = 'DOCUMENT_UPLOAD',
  DOCUMENT_DELETE = 'DOCUMENT_DELETE',
  
  // Dossiers
  DOSSIER_CREATE = 'DOSSIER_CREATE',
  DOSSIER_UPDATE = 'DOSSIER_UPDATE',
  DOSSIER_DELETE = 'DOSSIER_DELETE',
  DOSSIER_VIEW = 'DOSSIER_VIEW',
  
  // Clients
  CLIENT_CREATE = 'CLIENT_CREATE',
  CLIENT_UPDATE = 'CLIENT_UPDATE',
  CLIENT_DELETE = 'CLIENT_DELETE',
  CLIENT_VIEW = 'CLIENT_VIEW',
  
  // Factures
  FACTURE_CREATE = 'FACTURE_CREATE',
  FACTURE_UPDATE = 'FACTURE_UPDATE',
  FACTURE_DELETE = 'FACTURE_DELETE',
  FACTURE_SEND = 'FACTURE_SEND',
  
  // Données sensibles
  SENSITIVE_DATA_ACCESS = 'SENSITIVE_DATA_ACCESS',
  SENSITIVE_DATA_EXPORT = 'SENSITIVE_DATA_EXPORT',
}

export interface AuditLog {
  userId: string;
  action: AuditAction;
  resourceType?: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AuditService {
  constructor(private supabaseService: SupabaseService) {}

  async log(audit: AuditLog): Promise<void> {
    try {
      const supabase = this.supabaseService.getClient();
      
      await supabase.from('audit_logs').insert({
        user_id: audit.userId,
        action: audit.action,
        resource_type: audit.resourceType || null,
        resource_id: audit.resourceId || null,
        details: audit.details || null,
        ip_address: audit.ipAddress || null,
        user_agent: audit.userAgent || null,
        created_at: new Date().toISOString(),
      });
    } catch (error) {
      // Ne pas faire échouer l'action principale si le log échoue
      console.error('Audit log failed:', error);
    }
  }

  async getLogsByUser(userId: string, limit: number = 50) {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  async getLogsByResource(resourceType: string, resourceId: string) {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('resource_type', resourceType)
      .eq('resource_id', resourceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}