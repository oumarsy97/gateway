export interface ILegume {
  id: number;
  libelle?: string | null;
  price?: number | null;
  quantite?: number | null;
}

export type NewLegume = Omit<ILegume, 'id'> & { id: null };
