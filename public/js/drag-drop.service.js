var dragDropService = {
    mover: _mover,
    estaDentro: _estaDentro
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
