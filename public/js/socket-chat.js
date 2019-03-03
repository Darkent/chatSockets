var socket = io();

var urlSearchP = new URLSearchParams(window.location.search);

if(!urlSearchP.has('nombre')||!urlSearchP.has('sala')){
    window.location = 'index.html';
    throw new Error('EL nombre y la sala son necesarios.');
}

var usuario = {
    nombre : urlSearchP.get('nombre'),
    sala: urlSearchP.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat',usuario,function(resp){
        renderizarUsuarios(resp);
    })
    
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    renderizarMensajes(mensaje,false);

});

socket.on('mensajePrivado', function(mensaje) {

    console.log('Servidor: el usuario',mensaje.usuario.nombre,'dice', mensaje.mensaje);

});


socket.on('listaPersonas', function(mensaje) {

    renderizarUsuarios(mensaje);

});