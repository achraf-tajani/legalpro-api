export interface Note {
  id: string;
  id_dossier: string;
  titre?: string;
  contenu?: string;
  date_creation: string;
  date_modification: string;
  auteur?: string;
  categorie?: string;
  est_publique: boolean;
  created_at: string;
  updated_at: string;
}