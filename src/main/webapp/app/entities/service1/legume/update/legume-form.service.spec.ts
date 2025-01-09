import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../legume.test-samples';

import { LegumeFormService } from './legume-form.service';

describe('Legume Form Service', () => {
  let service: LegumeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegumeFormService);
  });

  describe('Service methods', () => {
    describe('createLegumeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLegumeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            libelle: expect.any(Object),
            price: expect.any(Object),
            quantite: expect.any(Object),
          }),
        );
      });

      it('passing ILegume should create a new form with FormGroup', () => {
        const formGroup = service.createLegumeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            libelle: expect.any(Object),
            price: expect.any(Object),
            quantite: expect.any(Object),
          }),
        );
      });
    });

    describe('getLegume', () => {
      it('should return NewLegume for default Legume initial value', () => {
        const formGroup = service.createLegumeFormGroup(sampleWithNewData);

        const legume = service.getLegume(formGroup) as any;

        expect(legume).toMatchObject(sampleWithNewData);
      });

      it('should return NewLegume for empty Legume initial value', () => {
        const formGroup = service.createLegumeFormGroup();

        const legume = service.getLegume(formGroup) as any;

        expect(legume).toMatchObject({});
      });

      it('should return ILegume', () => {
        const formGroup = service.createLegumeFormGroup(sampleWithRequiredData);

        const legume = service.getLegume(formGroup) as any;

        expect(legume).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILegume should not enable id FormControl', () => {
        const formGroup = service.createLegumeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLegume should disable id FormControl', () => {
        const formGroup = service.createLegumeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
