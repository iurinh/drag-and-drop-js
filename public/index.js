// Variavel service é proveniente do script service.js

// Componentes de tela
var body = document.querySelector('body');
var bloco = document.querySelector('.bloco');
var campo = document.querySelector('.campo');
var mensagem = document.querySelector('.mensagem');

var lastComponentClicked;

/** Eventos para os componentes de tela que funcionarão como drag-and-drop */
function adicionarMovimento(component){
    component.addEventListener('mousedown', function(event){
        component.addEventListener('mousemove', service.mover);
    });

    component.addEventListener('touchstart', function(event){
        component.addEventListener('touchmove', service.mover);
    });

    component.addEventListener('mouseup', function(event){
        component.removeEventListener('mousemove', service.mover);
        validarPosicaoFinal(event);
    });

    component.addEventListener('touchend', function(event){
        component.removeEventListener('touchmove', service.mover);
        validarPosicaoFinal(event);
    });
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
function validarPosicaoFinal(event){
    if(service.estaDentro(campo, event)) 
        mensagem.classList.remove('hide');
    else 
        mensagem.classList.add('hide');
}

function validarMovimentoCursor(event){
    if(service.estaDentro(campo, event))
        campo.classList.add('campo-hover');
    else
        campo.classList.remove('campo-hover');
}

// Inicializadores
adicionarMovimento(bloco);
inspecinarCursor();