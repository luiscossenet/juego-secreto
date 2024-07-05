let intentos = 1;
let palabraVeces = "Intentos";
let maxIntentos = 3;
let numMinAleatorio = 0;
let numMaxAleatorio = 10;
let numeroSecreto = 0;
let listaNumerosSorteados = [];
let switchNumerosSorteados = false;


function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    /* Como se hacia entes
       let parrafo = document.querySelector('p');
       parrafo.innerHTML = 'Indica un numero del 1 al 10' ;*/
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    intentos++;
    //parseInt convierte un string a un numero
    if (intentos <= maxIntentos) {
        if (numeroDeUsuario === numeroSecreto) {
            asignarTextoElemento('p', `Acertastes el numero secreto en ${intentos} ${intentos === 1 ? 'vez' : 'veces'} ¡Felicidades!`);
            removerAtributo('reiniciar', 'disabled');
            setAtributo('intentar', 'disabled', 'true');
            setAtributo('valorUsuario', 'disabled', 'true');
        } else {
            //El usuario no adivino el numero secreto
            if (numeroDeUsuario != numeroSecreto && intentos === maxIntentos) {
                maximoIntentos(intentos);
            } else if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p', 'El numero secreto es menor');
            } else if (numeroDeUsuario < numeroSecreto) {
                asignarTextoElemento('p', 'El numero secreto es mayor');
            } else {
                asignarTextoElemento('p', 'Ingresa un numero valido');
            }
            limpiarCaja();
        }
    } else {
        maximoIntentos(intentos);
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
    return;
}

//Aplicacion de recursividad
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numMaxAleatorio) + 1;
    //includes --> verifica si un elemento esta en un arreglo
    if (listaNumerosSorteados.length == numMaxAleatorio) {
        limpiarCaja();
        setAtributo('intentar', 'disabled', 'true');
        setAtributo('valorUsuario', 'disabled', 'true');
        setAtributo('reiniciar', 'disabled', 'true');
        removerAtributo('reset', 'disabled');
        asignarTextoElemento('p', `Ya se sorteraron los ${numMaxAleatorio} numeros posibles, reinicia el juego para volver a intentar. ¡Suerte!`);
        numeroGenerado = -1;
        return numeroGenerado;
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto(); // Add return statement here
        } else  {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }    
}

function maximoIntentos(intentos) {
    asignarTextoElemento('p', `Has llegado al numero maximo de intentos: ${intentos} ¡Intentalo de nuevo!`);
    limpiarCaja();
    setAtributo('intentar', 'disabled', 'true');
    setAtributo('valorUsuario', 'disabled', 'true');
    removerAtributo('reiniciar', 'disabled');
    return;
}

function setAtributo(id, estado, valor) {
    document.getElementById(id).setAttribute(estado, valor);
    return;
}

function removerAtributo(id, atributo) {
    document.getElementById(id).removeAttribute(atributo);
    return;
}



function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del numero secreto actualizado');
    asignarTextoElemento('p', `Indica un numero del ${numMinAleatorio} al ${numMaxAleatorio}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
    return;
}
function reiniciarJuego() {
    //Limpiar la caja de texto
    //Indicar mensaje de intervalo de numeros
    //Generar un nuevo numero aleatorio
    //Deshabilitar boton reiniciar
    //Inicializar numero de intentos
    limpiarCaja();
    condicionesIniciales();
    if (numeroSecreto != -1) {
        setAtributo('reiniciar', 'disabled', 'true');
        removerAtributo('intentar', 'disabled');
        removerAtributo('valorUsuario', 'disabled');
    } 
    return;
}


function resetJuego() {
    //Recargar la pagina
    location.reload();
    return
}

function cerrarJuego() {
    //Cerrar la pagina
    window.close();
    return;
}


condicionesIniciales();
alert('Bienvenido al juego del numero secreto');