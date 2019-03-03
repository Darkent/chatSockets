

class Usuarios {
    
    constructor(){

        this.usuarios = [];

    }

    addUsuario(id, nombre,sala){
        let persona = {id,nombre,sala};
        this.usuarios.push(persona);

        return this.usuarios;
    }

    getUsuario(id){
        let persona = this.usuarios.filter(persona => persona.id===id)[0];

        return persona;
    }

    getUsuarios(){
        
        return this.usuarios
    }

    deleteUsuario(id){
        let usuarioDeleted = this.getUsuario(id);

        this.usuarios = this.usuarios.filter(persona => persona.id != id);

        return usuarioDeleted;
    }

    getUsuariosSala(sala){

        let personasSala = this.usuarios.filter(personas => personas.sala === sala);

        return personasSala;

    }

}

module.exports = {
    Usuarios
}