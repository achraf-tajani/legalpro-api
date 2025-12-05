export interface Procedure {
  id: string;
  id_dossier: string;
  titre: string;
  description?: string;
  type?: string;
  etape?: string;
  deadline?: string;
  date_evenement?: string;
  date_completion?: string;
  statut: 'programmée' | 'en_cours' | 'reportée' | 'complétée' | 'annulée';
  priorite: 'basse' | 'normale' | 'haute' | 'critique';
  tribunal?: string;
  juge_assigne?: string;
  salle?: string;
  notes?: string;
  frais_associes?: number;
  jours_restants?: number;
  created_at: string;
  updated_at: string;
}