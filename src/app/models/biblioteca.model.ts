import { Libro } from './libro.model';

/** Biblioteca devuelta por GET /bibliotecas (incluye sus libros). */
export interface Biblioteca {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  libros: Libro[];
}

/** Datos que se envían en POST /bibliotecas. */
export interface NuevaBiblioteca {
  nombre: string;
  direccion: string;
  ciudad: string;
}
