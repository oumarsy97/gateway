import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import LegumeResolve from './route/legume-routing-resolve.service';

const legumeRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/legume.component').then(m => m.LegumeComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/legume-detail.component').then(m => m.LegumeDetailComponent),
    resolve: {
      legume: LegumeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/legume-update.component').then(m => m.LegumeUpdateComponent),
    resolve: {
      legume: LegumeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/legume-update.component').then(m => m.LegumeUpdateComponent),
    resolve: {
      legume: LegumeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default legumeRoute;
