import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILegume } from '../legume.model';
import { LegumeService } from '../service/legume.service';

const legumeResolve = (route: ActivatedRouteSnapshot): Observable<null | ILegume> => {
  const id = route.params.id;
  if (id) {
    return inject(LegumeService)
      .find(id)
      .pipe(
        mergeMap((legume: HttpResponse<ILegume>) => {
          if (legume.body) {
            return of(legume.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default legumeResolve;
