/** Libro tal como lo devuelve el backend dentro de cada biblioteca. */
export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  anioPublicacion: number;
}

/** Fila de la tabla: un libro junto al nombre de su biblioteca. */
export interface LibroConBiblioteca extends Libro {
  biblioteca: string;
}
