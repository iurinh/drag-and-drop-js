// Variavel service é proveniente do script service.js

// Componentes de tela
var body = document.querySelector('body');
var blocos = document.querySelectorAll('#bloco');
var tiras = document.querySelectorAll('#tira');
var campo = document.querySelector('#campo');
var mensagem = document.querySelector('#mensagem');

/** Adiciona evento para os componentes de tela que funcionarão como drag-and-drop */
function adicionarMovimento(component){
    component.addEventListener('mousedown', function(event){
        component.classList.add('absolute');
        component.classList.add('elevar');

        body.addEventListener('mousemove', mover);

        mover(event);
    });

    component.addEventListener('touchstart', function(event){
        component.classList.add('absolute');
        component.classList.add('elevar');

        component.addEventListener('touchmove', mover);
    });

    component.addEventListener('mouseup', function(event){
        component.classList.remove('elevar');

        body.removeEventListener('mousemove', mover);
        validarPosicaoFinal(component, event);
    });

    component.addEventListener('touchend', function(event){
        component.classList.remove('elevar');

        component.removeEventListener('touchmove', mover);
        validarPosicaoFinal(component, event);
    });

    function mover(event){
        service.mover(event, component);
    }
}

/** Eventos gerais do mouse sobre a tela */
function inspecinarCursor(){
    body.addEventListener('mousemove', function(event){
        validarMovimentoCursor(event);
    });

    body.addEventListener('touchmove', function(event){
        validarMovimentoCursor(event);
    });
}

// Funcionalidades
function validarPosicaoFinal(component, event){
    if(service.estaDentro(campo, event)) {
        campo.appendChild(component);        
    } else {
        component.classList.add('absolute');
        body.appendChild(component);
    }

    component.classList.remove('absolute');
    component.style.top = '';
    component.style.left = '';

    contar(campo);
}

function validarMovimentoCursor(event){
    if(service.estaDentro(campo, event))
        campo.classList.add('campo-hover');
    else
        campo.classList.remove('campo-hover');
}

function contar(component){
    var unidades = 0;
    var dezenas = 0;

    component.querySelectorAll('#bloco').forEach(function(bloco){
        unidades++;
    });

    component.querySelectorAll('#tira').forEach(function(tira){
        dezenas++;
    });

    mensagem.innerHTML = (dezenas * 10) + unidades;
}

// Inicializadores
blocos.forEach(function(bloco){
    adicionarMovimento(bloco); 
});

tiras.forEach(function(tira){
    adicionarMovimento(tira); 
});

inspecinarCursor();