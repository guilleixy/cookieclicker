import './style.css'

import { io } from 'socket.io-client';

    const socket = io('http://localhost:3000');

    const cookie = document.getElementById("cookie");

    const marcador = document.getElementById("marcador");
    const marcadorPersonal = document.getElementById("marcadorPersonal");

    const puntuaciones = document.getElementById("top10");

    var nombre = "Invitado"

    var cookiesPropias = 0;

    function actualizarNombre() {
        let input = document.getElementById("username");
        nombre = input.value;
        document.getElementById("nombre").innerHTML = nombre;
        cookiesPropias = 0;
        console.log(nombre);
    }
    

    document.addEventListener('keypress', (event)=>{
        if(event.key == 'Enter'){
            actualizarNombre();
        }
    })

    document.getElementById("enviarBtn").addEventListener('click', actualizarNombre);

    // Maneja eventos de socket.io
    socket.on('cookieCount', (count) => {
      console.log('Contador de cookies:', count);
      marcador.innerHTML = count;
    });

    cookie.addEventListener('click', () =>{
        console.log("galleta click");
        cookiesPropias++;
        marcadorPersonal.innerHTML = cookiesPropias;
        socket.emit('cookieClick');
        socket.emit('new_score', nombre, cookiesPropias);
    })

    cookie.addEventListener('mousedown', ()=>{
        cookie.classList.add("cookie-clicked");
    })

    cookie.addEventListener('mouseup', () =>{
        cookie.classList.remove("cookie-clicked");       
    })

    socket.on('highscores', (highscores) =>{
        console.log(highscores);
        let texto = "";
        highscores.forEach(score => {
            console.log(score);
            texto += "<li>" + score.nombre + ": " + score.puntuacion + " </li>";
        });
        puntuaciones.innerHTML = texto;        
    })