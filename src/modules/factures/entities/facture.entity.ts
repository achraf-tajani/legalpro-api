export interface Facture {
  id: string;
  id_dossier: string;
  id_client: string;
  numero: string;
  montant_ht: number;
  montant_ttc: number;
  taux_tva: number;
  reduction: number;
  date_emission: string;
  date_echeance?: string;
  statut: 'brouillon' | 'envoyee' | 'payee' | 'en_retard' | 'annulee';
  methode_facturation?: string;
  mode_paiement?: string;
  moyen_paiement?: string;
  date_paiement?: string;
  notes?: string;
  conditions?: string;
  montant_paye: number;
  created_at: string;
  updated_at: string;
}