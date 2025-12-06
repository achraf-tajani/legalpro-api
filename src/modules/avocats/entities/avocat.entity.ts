export interface Avocat {
  id: string;
  user_id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  numero_barreau: string;
  specialite?: string;
  date_inscription: string;
  statut: 'actif' | 'inactif' | 'suspendu';
  tarif_horaire?: number;
  cabinet?: string;
  created_at: string;
  updated_at: string;
}