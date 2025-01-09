import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ILegume, NewLegume } from '../legume.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILegume for edit and NewLegumeFormGroupInput for create.
 */
type LegumeFormGroupInput = ILegume | PartialWithRequiredKeyOf<NewLegume>;

type LegumeFormDefaults = Pick<NewLegume, 'id'>;

type LegumeFormGroupContent = {
  id: FormControl<ILegume['id'] | NewLegume['id']>;
  libelle: FormControl<ILegume['libelle']>;
  price: FormControl<ILegume['price']>;
  quantite: FormControl<ILegume['quantite']>;
};

export type LegumeFormGroup = FormGroup<LegumeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LegumeFormService {
  createLegumeFormGroup(legume: LegumeFormGroupInput = { id: null }): LegumeFormGroup {
    const legumeRawValue = {
      ...this.getFormDefaults(),
      ...legume,
    };
    return new FormGroup<LegumeFormGroupContent>({
      id: new FormControl(
        { value: legumeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      libelle: new FormControl(legumeRawValue.libelle, {
        validators: [Validators.required],
      }),
      price: new FormControl(legumeRawValue.price, {
        validators: [Validators.required],
      }),
      quantite: new FormControl(legumeRawValue.quantite, {
        validators: [Validators.required],
      }),
    });
  }

  getLegume(form: LegumeFormGroup): ILegume | NewLegume {
    return form.getRawValue() as ILegume | NewLegume;
  }

  resetForm(form: LegumeFormGroup, legume: LegumeFormGroupInput): void {
    const legumeRawValue = { ...this.getFormDefaults(), ...legume };
    form.reset(
      {
        ...legumeRawValue,
        id: { value: legumeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LegumeFormDefaults {
    return {
      id: null,
    };
  }
}
