import { IProduit, NewProduit } from './produit.model';

export const sampleWithRequiredData: IProduit = {
  id: 10819,
  quantite: 32111,
  price: 22616.34,
};

export const sampleWithPartialData: IProduit = {
  id: 15214,
  libelle: 'résulter',
  quantite: 31922,
  price: 15481.33,
};

export const sampleWithFullData: IProduit = {
  id: 2644,
  libelle: 'en plus de comme aïe',
  quantite: 23325,
  price: 7912.41,
};

export const sampleWithNewData: NewProduit = {
  quantite: 19739,
  price: 15119.43,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
