const { io } = require('../server');
const {Usuarios} = require('../classes/Usuarios');
const {crearMensaje} = require ('../utilidades/utilidades');
const usuarios = new Usuarios();




io.on('connection', (client) => {

   client.on('entrarChat',(mensaje,callback)=>{

    if(!mensaje.nombre || !mensaje.sala){
        return callback({
            error:true,
            message:'El nombre/sala es necesario'
        })
    }

    client.join(mensaje.sala);

    let listaDeUsuarios = usuarios.addUsuario(client.id,mensaje.nombre,mensaje.sala);

    

    client.broadcast.to(mensaje.sala).emit('listaPersonas',usuarios.getUsuariosSala(mensaje.sala));
    

    callback(usuarios.getUsuariosSala(mensaje.sala))
    

   });

   client.on('mensajePrivado', data =>{
    let usuario = usuarios.getUsuario(client.id);

    client.broadcast.to(data.para).emit('mensajePrivado',{usuario,mensaje:data.mensaje})


   })

   client.on('enviarMensaje',data=>{

    let usuario = usuarios.getUsuario(client.id);

    let mensaje = crearMensaje(usuario.nombre,data.mensaje);

    client.broadcast.to(usuario.sala).emit('enviarMensaje',mensaje);
   });


   client.on('disconnect',()=>{
       let personaBorrada = usuarios.deleteUsuario(client.id);

       client.broadcast.to(personaBorrada.sala).emit('enviarMensaje',crearMensaje('Admin',`${personaBorrada.nombre} salió`));
       client.broadcast.to(personaBorrada.sala).emit('listaPersonas',usuarios.getUsuariosSala(personaBorrada.sala));
    })

});