import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Biblioteca } from '../../models/biblioteca.model';

@Component({
  selector: 'app-biblioteca-form',
  imports: [ReactiveFormsModule],
  templateUrl: './biblioteca-form.html',
  styleUrl: './biblioteca-form.css',
})
export class BibliotecaForm {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(BibliotecaService);

  /** Avisa al componente padre que se registró una biblioteca. */
  readonly creada = output<Biblioteca>();

  readonly enviando = signal(false);
  readonly mensaje = signal('');
  readonly error = signal('');

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    direccion: ['', [Validators.required, Validators.maxLength(150)]],
    ciudad: ['', [Validators.required, Validators.maxLength(80)]],
  });

  invalido(campo: 'nombre' | 'direccion' | 'ciudad'): boolean {
    const control = this.form.controls[campo];
    return control.invalid && control.touched;
  }

  submit(): void {
    this.mensaje.set('');
    this.error.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    this.service.registrar(this.form.getRawValue()).subscribe({
      next: (biblioteca) => {
        this.mensaje.set(`Biblioteca "${biblioteca.nombre}" registrada.`);
        this.form.reset();
        this.enviando.set(false);
        this.creada.emit(biblioteca);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(
          err.status === 400
            ? 'Revisa los datos del formulario.'
            : 'No se pudo registrar la biblioteca. Intenta de nuevo.',
        );
        this.enviando.set(false);
      },
    });
  }
}
