export interface Dossier {
  id: string;
  titre: string;
  description?: string;
  type: string;
  domaine?: string;
  statut: 'ouvert' | 'en_cours' | 'suspendu' | 'clos' | 'archive';
  priorite: 'basse' | 'normale' | 'haute' | 'critique';
  date_creation: string;
  date_modification: string;
  date_cloture?: string;
  montant_en_jeu?: number;
  tribunal?: string;
  reference?: string;
  confidentialite: 'public' | 'prive' | 'confidentiel';
  avocat_assigne?: string;
  id_client: string;
  created_at: string;
  updated_at: string;
}