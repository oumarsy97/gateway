import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LegumeDetailComponent } from './legume-detail.component';

describe('Legume Management Detail Component', () => {
  let comp: LegumeDetailComponent;
  let fixture: ComponentFixture<LegumeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegumeDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./legume-detail.component').then(m => m.LegumeDetailComponent),
              resolve: { legume: () => of({ id: 29650 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LegumeDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegumeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load legume on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LegumeDetailComponent);

      // THEN
      expect(instance.legume()).toEqual(expect.objectContaining({ id: 29650 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
