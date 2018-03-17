var dragDropService = {
    mover: _mover,
    estaDentro: _estaDentro,
    adicionarMovimento: _adicionarMovimento,
    inspecinarCursor: _inspecinarCursor
}

/** Atribui posicao do mouse como centro do componente (Realizando deslocamento) */
function _mover(event, component){
    var obj = component || this;

    obj.style.top = ((event.clientY || event.changedTouches[0].clientY) - (obj.scrollHeight/2)) + "px";
    obj.style.left = ((event.clientX || event.changedTouches[0].clientX) - (obj.scrollWidth/2)) + "px";

}

/** Verifica o mouse esta dentro do componente */
function _estaDentro(component, event){

    //Posicao do mouse
    var eventX = event.clientX || event.changedTouches[0].clientX;
    var eventY = event.clientY || event.changedTouches[0].clientY;

    //Posicao do component
    var top = component.getBoundingClientRect().top;
    var left = component.getBoundingClientRect().left;
    var bottom = component.getBoundingClientRect().bottom;
    var right = component.getBoundingClientRect().right;

    //Verifica se a posicao do mouse esta contida no componente
    var dentroLargura = eventX > left && eventX < right;
    var dentroAltura = eventY > top && eventY < bottom;
    
    return dentroLargura && dentroAltura;

}

/** Adiciona evento para os componentes de tela que funcionarão como drag-and-drop */
function _adicionarMovimento(field, component, callBack){
    component.addEventListener('mousedown', function(event){
        component.classList.add('absolute');
        component.classList.add('elevar');

        field.addEventListener('mousemove', mover);

        mover(event);
    });

    component.addEventListener('touchstart', function(event){
        component.classList.add('absolute');
        component.classList.add('elevar');

        component.addEventListener('touchmove', mover);
    });

    component.addEventListener('mouseup', function(event){
        component.classList.remove('absolute');
        component.classList.remove('elevar');

        field.removeEventListener('mousemove', mover);
        callBack(component, event);
    });

    component.addEventListener('touchend', function(event){
        component.classList.remove('absolute');
        component.classList.remove('elevar');

        component.removeEventListener('touchmove', mover);
        callBack(component, event);
    });

    function mover(event){
        _mover(event, component);
    }
    
}

/** Eventos gerais do mouse sobre a tela */
function _inspecinarCursor(field, callback){
    field.addEventListener('mousemove', function(event){
        callback(event);
    });

    field.addEventListener('touchmove', function(event){
        callback(event);
    });
}