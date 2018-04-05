var telaService = {
    redimensionar: _redimensionar
}

function _redimensionar(){
    window.addEventListener('resize', setRootClass);

    function setRootClass(){
        var head = document.querySelector('head');
        var style = document.querySelector('#root-style');

        var size = getSize();

        var classRoot = ':root{'
            + '--altura: ' + parseInt(size.altura) + 'px;'
            + '--largura: ' + parseInt(size.largura) + 'px;'
            + '--tamanho-fonte-titulo: ' + parseInt(size.altura*0.15) + 'px;'
            + '--tamanho-fonte-botao-titulo: ' + parseInt(size.altura*0.05) + 'px;'
            + '--altura-botao-titulo: ' + parseInt(size.altura*0.10) + 'px;'
            + '--largura-botao-titulo: ' + parseInt(size.largura*0.30) + 'px;'
        + '}';

        if(!style){
            style = document.createElement('style');
            style.setAttribute('id','root-style');
            style.innerHTML = classRoot;

            head.innerHTML = head.innerHTML + style.outerHTML;
        } else {
            style.innerHTML = classRoot;
        }

        return {
            size:  size,
            classRoot: classRoot
        }
    }

    function getSize(){
        var proporcaoTelaGame = 16 / 9;
        var proporcaoWindow = window.innerWidth / window.innerHeight

        if(proporcaoWindow == proporcaoTelaGame){
            return {
                altura: window.innerHeight,
                largura: window.innerWidth
            }
        }

        if(proporcaoWindow > proporcaoTelaGame){
            return {
                altura: window.innerHeight,
                largura: window.innerHeight * proporcaoTelaGame
            }
        }

        if(proporcaoWindow < proporcaoTelaGame){
            return {
                altura: window.innerWidth / proporcaoTelaGame,
                largura: window.innerWidth
            }
        }
    }
    
    setRootClass().size;
}