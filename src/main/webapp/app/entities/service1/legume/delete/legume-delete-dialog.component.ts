import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILegume } from '../legume.model';
import { LegumeService } from '../service/legume.service';

@Component({
  templateUrl: './legume-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LegumeDeleteDialogComponent {
  legume?: ILegume;

  protected legumeService = inject(LegumeService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.legumeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
