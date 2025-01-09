import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILegume } from '../legume.model';
import { LegumeService } from '../service/legume.service';
import { LegumeFormGroup, LegumeFormService } from './legume-form.service';

@Component({
  selector: 'jhi-legume-update',
  templateUrl: './legume-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LegumeUpdateComponent implements OnInit {
  isSaving = false;
  legume: ILegume | null = null;

  protected legumeService = inject(LegumeService);
  protected legumeFormService = inject(LegumeFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LegumeFormGroup = this.legumeFormService.createLegumeFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ legume }) => {
      this.legume = legume;
      if (legume) {
        this.updateForm(legume);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const legume = this.legumeFormService.getLegume(this.editForm);
    if (legume.id !== null) {
      this.subscribeToSaveResponse(this.legumeService.update(legume));
    } else {
      this.subscribeToSaveResponse(this.legumeService.create(legume));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILegume>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(legume: ILegume): void {
    this.legume = legume;
    this.legumeFormService.resetForm(this.editForm, legume);
  }
}
