export interface Tache {
  id: string;
  id_dossier: string;
  titre: string;
  description?: string;
  priorite: 'low' | 'normal' | 'high' | 'critical';
  statut: 'not_started' | 'in_progress' | 'pending' | 'completed' | 'cancelled';
  date_creation: string;
  date_echeance?: string;
  assigne_a?: string;
  progression: number;
  tags?: string;
  created_at: string;
  updated_at: string;
}