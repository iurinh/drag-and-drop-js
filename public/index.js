// Variavel service é proveniente do script service.js

// Componentes de tela
var body = document.querySelector('body');
var blocos = document.querySelectorAll('#bloco');
var tiras = document.querySelectorAll('#tira');
var campo = document.querySelector('.campo');
var mensagem = document.querySelector('.mensagem');

/** Adiciona evento para os componentes de tela que funcionarão como drag-and-drop */
function adicionarMovimento(component){
    component.addEventListener('mousedown', function(event){
        component.classList.add('absolute');
        component.classList.add('elevar');

        component.addEventListener('mousemove', service.mover);

        event.stopPropagation();
    });

    component.addEventListener('touchstart', function(event){
        component.classList.add('absolute');
        component.classList.add('elevar');

        component.addEventListener('touchmove', service.mover);

        event.stopPropagation();
    });

    component.addEventListener('mouseup', function(event){
        component.classList.remove('elevar');

        component.removeEventListener('mousemove', service.mover);
        validarPosicaoFinal(event);

        event.stopPropagation();
    });

    component.addEventListener('touchend', function(event){
        component.classList.remove('elevar');

        component.removeEventListener('touchmove', service.mover);
        validarPosicaoFinal(event);

        event.stopPropagation();
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
blocos.forEach(function(bloco){
    adicionarMovimento(bloco); 
});

tiras.forEach(function(tira){
    adicionarMovimento(tira); 
});

inspecinarCursor();