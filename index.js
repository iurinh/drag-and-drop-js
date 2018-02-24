var bloco = document.querySelector('.bloco');
var campo = document.querySelector('.campo');
var mensagem = document.querySelector('.mensagem');

bloco.addEventListener('mousedown', function(){
    bloco.addEventListener('mousemove', obterPosicao);
});

bloco.addEventListener('mouseup', function(e){
    bloco.removeEventListener('mousemove', obterPosicao);
    
    if(estaDentroCampo(e.clientX, e.clientY))
        mensagem.classList.remove('hide');
    else
        mensagem.classList.add('hide');
});

bloco.addEventListener('mouseover', function(){
    bloco.removeEventListener('mousemove', obterPosicao);
});

function obterPosicao(e){
    bloco.style.top = (e.clientY - (bloco.scrollHeight/2)) + "px";
    bloco.style.left = (e.clientX - (bloco.scrollWidth/2)) + "px";
}

function verificarPosicaoBloco(){
    console.log(bloco.parentElement);
}

function estaDentroCampo(x, y){
    var top = campo.getBoundingClientRect().top;
    var left = campo.getBoundingClientRect().left;
    var bottom = campo.getBoundingClientRect().bottom;
    var right = campo.getBoundingClientRect().right;

    var dentroLargura = x > left && x < right;
    var dentroAltura = y > top && y < bottom;
    
    return dentroLargura && dentroAltura;
}

//x.replace(/[^0-9]/g,'')