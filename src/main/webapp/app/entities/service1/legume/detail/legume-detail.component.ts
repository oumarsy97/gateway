import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ILegume } from '../legume.model';

@Component({
  selector: 'jhi-legume-detail',
  templateUrl: './legume-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class LegumeDetailComponent {
  legume = input<ILegume | null>(null);

  previousState(): void {
    window.history.back();
  }
}
