var bloco = document.querySelector('.bloco');
var campo = document.querySelector('.campo');
var mensagem = document.querySelector('.mensagem');

campo.addEventListener('mouseover', function(e){
    if(estaDentroCampo(e))
        campo.classList.add('campo-hover');
    else
        campo.classList.remove('campo-hover');
})

campo.addEventListener('touchmove', function(e){
    if(estaDentroCampo(e))
        campo.classList.add('campo-hover');
    else
        campo.classList.remove('campo-hover');
})

bloco.addEventListener('mouseleave', function(e){
    campo.classList.remove('campo-hover');
})

bloco.addEventListener('mousedown', function(){
    bloco.addEventListener('mousemove', obterPosicao);
});

bloco.addEventListener('touchstart', function(){
    bloco.addEventListener('touchmove', obterPosicao);
});

bloco.addEventListener('mouseup', function(e){
    soltarBloco(e);
});

bloco.addEventListener('touchend', function(e){
    soltarBloco(e);
});

bloco.addEventListener('mouseover', function(){
    bloco.removeEventListener('mousemove', obterPosicao);
});

bloco.addEventListener('touchcancel', function(){
    bloco.removeEventListener('touchmove', obterPosicao);
});

function soltarBloco(e){
    bloco.removeEventListener('mousemove', obterPosicao);
    bloco.removeEventListener('touchmove', obterPosicao);
    
    if(estaDentroCampo(e))
        mensagem.classList.remove('hide');
    else
        mensagem.classList.add('hide');
}

function obterPosicao(e){
    bloco.style.top = ((e.clientY || e.changedTouches[0].clientY) - (bloco.scrollHeight/2)) + "px";
    bloco.style.left = ((e.clientX || e.changedTouches[0].clientX) - (bloco.scrollWidth/2)) + "px";
        
    if(estaDentroCampo(e))
        campo.classList.add('campo-hover');
    else
        campo.classList.remove('campo-hover');
}

function estaDentroCampo(e){
    var x = e.clientX || e.changedTouches[0].clientX;
    var y = e.clientY || e.changedTouches[0].clientY;

    var top = campo.getBoundingClientRect().top;
    var left = campo.getBoundingClientRect().left;
    var bottom = campo.getBoundingClientRect().bottom;
    var right = campo.getBoundingClientRect().right;

    var dentroLargura = x > left && x < right;
    var dentroAltura = y > top && y < bottom;
    
    return dentroLargura && dentroAltura;
}
