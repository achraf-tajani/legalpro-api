export interface Tache {
  id: string;
  id_dossier: string;
  titre: string;
  description?: string;
  priorite: 'basse' | 'normale' | 'haute' | 'critique';
  statut: 'non_commencée' | 'en_cours' | 'en_attente' | 'complétée' | 'annulée';
  date_creation: string;
  date_echeance?: string;
  assigne_a?: string;
  progression: number;
  tags?: string;
  created_at: string;
  updated_at: string;
}