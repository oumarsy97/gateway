import { ILegume, NewLegume } from './legume.model';

export const sampleWithRequiredData: ILegume = {
  id: 4969,
  libelle: 'pin-pon euh',
  price: 5465.47,
  quantite: 5534,
};

export const sampleWithPartialData: ILegume = {
  id: 29253,
  libelle: 'vouh concernant dans',
  price: 12244.78,
  quantite: 29059,
};

export const sampleWithFullData: ILegume = {
  id: 32150,
  libelle: 'outre afin que maigre',
  price: 28779.07,
  quantite: 9990,
};

export const sampleWithNewData: NewLegume = {
  libelle: 'avant',
  price: 2650.39,
  quantite: 3096,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
