import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'gatewayApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'produit',
    data: { pageTitle: 'gatewayApp.service1Produit.home.title' },
    loadChildren: () => import('./service1/produit/produit.routes'),
  },
  {
    path: 'legume',
    data: { pageTitle: 'gatewayApp.service1Legume.home.title' },
    loadChildren: () => import('./service1/legume/legume.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
