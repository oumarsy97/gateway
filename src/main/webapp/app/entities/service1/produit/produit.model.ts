export interface IProduit {
  id: number;
  libelle?: string | null;
  quantite?: number | null;
  price?: number | null;
}

export type NewProduit = Omit<IProduit, 'id'> & { id: null };
