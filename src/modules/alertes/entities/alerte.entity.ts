export interface Alerte {
  id: string;
  id_dossier?: string;
  id_procedure?: string;
  titre: string;
  description?: string;
  type?: string;
  date_creation: string;
  date_echeance?: string;
  priorite: 'basse' | 'normale' | 'haute' | 'critique';
  statut: 'non_lue' | 'lue' | 'archivée';
  destinataire?: string;
  date_notification?: string;
  moyen_notification?: string;
  created_at: string;
  updated_at: string;
}