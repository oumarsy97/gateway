import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILegume, NewLegume } from '../legume.model';

export type PartialUpdateLegume = Partial<ILegume> & Pick<ILegume, 'id'>;

export type EntityResponseType = HttpResponse<ILegume>;
export type EntityArrayResponseType = HttpResponse<ILegume[]>;

@Injectable({ providedIn: 'root' })
export class LegumeService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/legumes', 'service1');

  create(legume: NewLegume): Observable<EntityResponseType> {
    return this.http.post<ILegume>(this.resourceUrl, legume, { observe: 'response' });
  }

  update(legume: ILegume): Observable<EntityResponseType> {
    return this.http.put<ILegume>(`${this.resourceUrl}/${this.getLegumeIdentifier(legume)}`, legume, { observe: 'response' });
  }

  partialUpdate(legume: PartialUpdateLegume): Observable<EntityResponseType> {
    return this.http.patch<ILegume>(`${this.resourceUrl}/${this.getLegumeIdentifier(legume)}`, legume, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILegume>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILegume[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLegumeIdentifier(legume: Pick<ILegume, 'id'>): number {
    return legume.id;
  }

  compareLegume(o1: Pick<ILegume, 'id'> | null, o2: Pick<ILegume, 'id'> | null): boolean {
    return o1 && o2 ? this.getLegumeIdentifier(o1) === this.getLegumeIdentifier(o2) : o1 === o2;
  }

  addLegumeToCollectionIfMissing<Type extends Pick<ILegume, 'id'>>(
    legumeCollection: Type[],
    ...legumesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const legumes: Type[] = legumesToCheck.filter(isPresent);
    if (legumes.length > 0) {
      const legumeCollectionIdentifiers = legumeCollection.map(legumeItem => this.getLegumeIdentifier(legumeItem));
      const legumesToAdd = legumes.filter(legumeItem => {
        const legumeIdentifier = this.getLegumeIdentifier(legumeItem);
        if (legumeCollectionIdentifiers.includes(legumeIdentifier)) {
          return false;
        }
        legumeCollectionIdentifiers.push(legumeIdentifier);
        return true;
      });
      return [...legumesToAdd, ...legumeCollection];
    }
    return legumeCollection;
  }
}
