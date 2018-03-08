// Variavel service é proveniente do script service.js

// Componentes de tela
var body = document.querySelector('body');
var blocos = document.querySelectorAll('#bloco');
var tiras = document.querySelectorAll('#tira');
var campoFinal = document.querySelector('#campo-final');
var campoBloco = document.querySelector('#campo-bloco');
var campoTira = document.querySelector('#campo-tira');
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
    if(service.estaDentro(campoFinal, event)) {
        campoFinal.appendChild(component);

        adicionarComponentPosicaoInicial(component);
    } else {
        voltaPosicaoInicial(component);
        removerComponentPosicaoInicial(component);
    }
    
    component.style.top = 'unset';
    component.style.left = 'unset';

    contar(campoFinal);
}

function voltaPosicaoInicial(component){
    let tipo = component.tipo;

    if(tipo === 'bloco') campoBloco.appendChild(component);
    else if(tipo === 'tira') campoTira.appendChild(component);
    else if(tipo === 'plataforma') campoPlataforma.appendChild(component);
}

function adicionarComponentPosicaoInicial(component){
    let tipo = component.tipo;

    let clone = component.cloneNode(true);
    clone.tipo = tipo;
    clone.classList.remove('absolute');

    adicionarMovimento(clone);
    campoFinal.appendChild(clone);

    voltaPosicaoInicial(component);
}

function removerComponentPosicaoInicial(component){
    let tipo = component.tipo;
    let campo;

    if(tipo === 'bloco') campo = campoBloco;
    else if(tipo === 'tira') campo = campoTira;
    else if(tipo === 'plataforma') campo = campoPlataforma;

    if(campo.querySelectorAll('#'+tipo).length && campo.querySelectorAll('#'+tipo)[0] != component)
        component.remove();
}

function validarMovimentoCursor(event){
    if(service.estaDentro(campoFinal, event))
        campoFinal.classList.add('campo-final-hover');
    else
        campoFinal.classList.remove('campo-final-hover');
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
    bloco.tipo = 'bloco';
    adicionarMovimento(bloco); 
});

tiras.forEach(function(tira){
    tira.tipo = 'tira';
    adicionarMovimento(tira); 
});

inspecinarCursor();