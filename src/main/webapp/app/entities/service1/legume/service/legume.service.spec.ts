import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ILegume } from '../legume.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../legume.test-samples';

import { LegumeService } from './legume.service';

const requireRestSample: ILegume = {
  ...sampleWithRequiredData,
};

describe('Legume Service', () => {
  let service: LegumeService;
  let httpMock: HttpTestingController;
  let expectedResult: ILegume | ILegume[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LegumeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Legume', () => {
      const legume = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(legume).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Legume', () => {
      const legume = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(legume).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Legume', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Legume', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Legume', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLegumeToCollectionIfMissing', () => {
      it('should add a Legume to an empty array', () => {
        const legume: ILegume = sampleWithRequiredData;
        expectedResult = service.addLegumeToCollectionIfMissing([], legume);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(legume);
      });

      it('should not add a Legume to an array that contains it', () => {
        const legume: ILegume = sampleWithRequiredData;
        const legumeCollection: ILegume[] = [
          {
            ...legume,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLegumeToCollectionIfMissing(legumeCollection, legume);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Legume to an array that doesn't contain it", () => {
        const legume: ILegume = sampleWithRequiredData;
        const legumeCollection: ILegume[] = [sampleWithPartialData];
        expectedResult = service.addLegumeToCollectionIfMissing(legumeCollection, legume);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(legume);
      });

      it('should add only unique Legume to an array', () => {
        const legumeArray: ILegume[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const legumeCollection: ILegume[] = [sampleWithRequiredData];
        expectedResult = service.addLegumeToCollectionIfMissing(legumeCollection, ...legumeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const legume: ILegume = sampleWithRequiredData;
        const legume2: ILegume = sampleWithPartialData;
        expectedResult = service.addLegumeToCollectionIfMissing([], legume, legume2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(legume);
        expect(expectedResult).toContain(legume2);
      });

      it('should accept null and undefined values', () => {
        const legume: ILegume = sampleWithRequiredData;
        expectedResult = service.addLegumeToCollectionIfMissing([], null, legume, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(legume);
      });

      it('should return initial array if no Legume is added', () => {
        const legumeCollection: ILegume[] = [sampleWithRequiredData];
        expectedResult = service.addLegumeToCollectionIfMissing(legumeCollection, undefined, null);
        expect(expectedResult).toEqual(legumeCollection);
      });
    });

    describe('compareLegume', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLegume(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 29650 };
        const entity2 = null;

        const compareResult1 = service.compareLegume(entity1, entity2);
        const compareResult2 = service.compareLegume(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 29650 };
        const entity2 = { id: 22622 };

        const compareResult1 = service.compareLegume(entity1, entity2);
        const compareResult2 = service.compareLegume(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 29650 };
        const entity2 = { id: 29650 };

        const compareResult1 = service.compareLegume(entity1, entity2);
        const compareResult2 = service.compareLegume(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
