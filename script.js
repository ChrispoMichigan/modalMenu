// Variables para almacenar la selección del usuario
let pedidoActual = {
    tipo: '',
    sabores: [],
    opcion: '',
    tipoEscarchado: ''
};

// Contador para limitar la selección de sabores combinados
let contadorSabores = 0;
const MAX_SABORES = 7;

// Función para abrir un modal
function abrirModal(id) {
    document.getElementById(id).style.display = 'block';
    
    // Reiniciar selección si abrimos un nuevo tipo de raspado
    if (id === 'modal-combinado' || id === 'modal-natural' || id === 'modal-enchiloso') {
        pedidoActual = {
            tipo: '',
            sabores: [],
            opcion: '',
            tipoEscarchado: ''
        };
        contadorSabores = 0;
        
        // Si es combinado, establecer el tipo
        if (id === 'modal-combinado') {
            pedidoActual.tipo = 'Combinado';
            
            // Limpiar selecciones previas
            const sabores = document.querySelectorAll('.sabor');
            sabores.forEach(sabor => {
                sabor.classList.remove('seleccionado');
            });
        } else if (id === 'modal-natural') {
            pedidoActual.tipo = 'Natural';
        } else if (id === 'modal-enchiloso') {
            pedidoActual.tipo = 'Enchiloso';
        }
    }
}

// Función para cerrar un modal
function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Función para seleccionar/deseleccionar un sabor en combinado
function seleccionarSabor(elemento) {
    // Si ya está seleccionado, deseleccionar
    if (elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado');
        const indice = pedidoActual.sabores.indexOf(elemento.textContent);
        if (indice > -1) {
            pedidoActual.sabores.splice(indice, 1);
        }
        contadorSabores--;
    } 
    // Si no está seleccionado y no hemos llegado al máximo, seleccionar
    else if (contadorSabores < MAX_SABORES) {
        elemento.classList.add('seleccionado');
        pedidoActual.sabores.push(elemento.textContent);
        contadorSabores++;
    }
    // Si ya alcanzamos el máximo, mostrar alerta
    else {
        alert(`Solo puedes seleccionar hasta ${MAX_SABORES} sabores.`);
    }
}

// Función para continuar con el pedido combinado
function continuarPedidoCombinado() {
    if (pedidoActual.sabores.length === 0) {
        alert('Por favor selecciona al menos un sabor.');
        return;
    }
    
    cerrarModal('modal-combinado');
    mostrarResumen();
}

// Función para seleccionar una opción en Natural
function seleccionarOpcionNatural(opcion) {
    pedidoActual.opcion = opcion;
    cerrarModal('modal-natural');
    mostrarResumen();
}

// Función para seleccionar una opción en Enchiloso
function seleccionarOpcionEnchiloso(opcion) {
    pedidoActual.opcion = opcion;
    cerrarModal('modal-enchiloso');
    mostrarResumen();
}

// Función para abrir el modal de escarchado
function seleccionarOpcionEscarchado(origen) {
    if (origen === 'natural') {
        pedidoActual.opcion = 'Escarchado';
        cerrarModal('modal-natural');
    } else if (origen === 'enchiloso') {
        pedidoActual.opcion = 'Escarchado';
        cerrarModal('modal-enchiloso');
    }
    
    abrirModal('modal-escarchado');
}

// Función para seleccionar el tipo de escarchado
function seleccionarTipoEscarchado(tipo) {
    pedidoActual.tipoEscarchado = tipo;
    cerrarModal('modal-escarchado');
    mostrarResumen();
}

// Función para mostrar el resumen del pedido
function mostrarResumen() {
    const resumenContenido = document.getElementById('resumen-contenido');
    let html = `<h3>Tipo de Raspado: ${pedidoActual.tipo}</h3>`;
    
    if (pedidoActual.tipo === 'Combinado') {
        html += '<h3>Sabores seleccionados:</h3>';
        html += '<ul>';
        pedidoActual.sabores.forEach(sabor => {
            html += `<li>${sabor}</li>`;
        });
        html += '</ul>';
    } else {
        html += `<h3>Opción: ${pedidoActual.opcion}</h3>`;
        
        if (pedidoActual.opcion === 'Escarchado') {
            html += `<h3>Tipo de Escarchado: ${pedidoActual.tipoEscarchado}</h3>`;
        }
    }
    
    resumenContenido.innerHTML = html;
    abrirModal('modal-resumen');
}

// Función para realizar el pedido
function realizarPedido() {
    alert('¡Gracias por tu pedido! Se ha realizado con éxito.');
    cerrarModal('modal-resumen');
    
    // Reiniciar todo para un nuevo pedido
    pedidoActual = {
        tipo: '',
        sabores: [],
        opcion: '',
        tipoEscarchado: ''
    };
    contadorSabores = 0;
}

// Cerrar modales al hacer clic fuera del contenido
window.onclick = function(event) {
    const modales = document.getElementsByClassName('modal');
    for (let i = 0; i < modales.length; i++) {
        if (event.target === modales[i]) {
            modales[i].style.display = 'none';
        }
    }
}