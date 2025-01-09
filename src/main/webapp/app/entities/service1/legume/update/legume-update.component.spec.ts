import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { LegumeService } from '../service/legume.service';
import { ILegume } from '../legume.model';
import { LegumeFormService } from './legume-form.service';

import { LegumeUpdateComponent } from './legume-update.component';

describe('Legume Management Update Component', () => {
  let comp: LegumeUpdateComponent;
  let fixture: ComponentFixture<LegumeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let legumeFormService: LegumeFormService;
  let legumeService: LegumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LegumeUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(LegumeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LegumeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    legumeFormService = TestBed.inject(LegumeFormService);
    legumeService = TestBed.inject(LegumeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const legume: ILegume = { id: 22622 };

      activatedRoute.data = of({ legume });
      comp.ngOnInit();

      expect(comp.legume).toEqual(legume);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILegume>>();
      const legume = { id: 29650 };
      jest.spyOn(legumeFormService, 'getLegume').mockReturnValue(legume);
      jest.spyOn(legumeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ legume });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: legume }));
      saveSubject.complete();

      // THEN
      expect(legumeFormService.getLegume).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(legumeService.update).toHaveBeenCalledWith(expect.objectContaining(legume));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILegume>>();
      const legume = { id: 29650 };
      jest.spyOn(legumeFormService, 'getLegume').mockReturnValue({ id: null });
      jest.spyOn(legumeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ legume: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: legume }));
      saveSubject.complete();

      // THEN
      expect(legumeFormService.getLegume).toHaveBeenCalled();
      expect(legumeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILegume>>();
      const legume = { id: 29650 };
      jest.spyOn(legumeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ legume });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(legumeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
