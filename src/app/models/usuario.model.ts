export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public imagen?: string,
        public role?: string,
        public _id?: string
    ) { }
}
