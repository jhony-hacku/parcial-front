import { Component, computed, input } from '@angular/core';
import { Biblioteca } from '../../models/biblioteca.model';
import { LibroConBiblioteca } from '../../models/libro.model';

@Component({
  selector: 'app-libro-tabla',
  templateUrl: './libro-tabla.html',
  styleUrl: './libro-tabla.css',
})
export class LibroTabla {
  /** Bibliotecas tal como llegan de GET /bibliotecas. */
  readonly bibliotecas = input.required<Biblioteca[]>();

  /** Aplana bibliotecas → libros para mostrar una fila por libro. */
  readonly libros = computed<LibroConBiblioteca[]>(() =>
    this.bibliotecas().flatMap((b) =>
      b.libros.map((libro) => ({ ...libro, biblioteca: b.nombre })),
    ),
  );
}
