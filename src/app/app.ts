import { Component, OnInit, inject, signal } from '@angular/core';
import { BibliotecaForm } from './components/biblioteca-form/biblioteca-form';
import { LibroTabla } from './components/libro-tabla/libro-tabla';
import { BibliotecaService } from './services/biblioteca.service';
import { Biblioteca } from './models/biblioteca.model';

@Component({
  selector: 'app-root',
  imports: [BibliotecaForm, LibroTabla],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly service = inject(BibliotecaService);

  readonly bibliotecas = signal<Biblioteca[]>([]);
  readonly error = signal('');

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.service.listar().subscribe({
      next: (data) => {
        this.bibliotecas.set(data);
        this.error.set('');
      },
      error: () => this.error.set('No se pudo conectar con el backend.'),
    });
  }
}
