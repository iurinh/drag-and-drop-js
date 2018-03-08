var panelStop = document.querySelector('#panel-stop');

function verificarPosicaoTela(){
    window.addEventListener('resize', function(){
        verificarPosicaoTela();
    });

    function verificarPosicaoTela(){        
        if(document.body.scrollHeight > document.body.scrollWidth)
            panelStop.classList.remove('hide');
        else
            panelStop.classList.add('hide');
    }

    verificarPosicaoTela();
}

verificarPosicaoTela();