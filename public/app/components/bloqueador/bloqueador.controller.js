(function BloqueadorController(){
    var panelStop = document.querySelector('#panel-stop');

    window.addEventListener('resize', verificarPosicaoTela);

    function verificarPosicaoTela(){        
        if(document.body.scrollHeight > document.body.scrollWidth)
            panelStop.classList.remove('hide');
        else
            panelStop.classList.add('hide');
    }

    verificarPosicaoTela();
})();