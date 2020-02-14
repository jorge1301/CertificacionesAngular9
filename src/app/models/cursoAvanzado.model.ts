export class CursoAvanzado {
    constructor(
        public titulo?: string,
        public imagen?: string,
        public direccion?: string,
        public fecha?: string,
        public descripcion?: string,
        public requisitos?: string,
        public proposito?: string,
        public metodologia?: string,
        public valor?: string,
        public incluye?: string,
        public programacion?: [{
            dia: string,
            informacion: string
        }],
        public _id?: string
    ) { }
}
