var service = {
    mover: _mover,
    estaDentro: _estaDentro
}

/** Atribui posicao do mouse como centro do componente (Realizando deslocamento) */
function _mover(event){
    
    this.style.top = ((event.clientY || event.changedTouches[0].clientY) - (this.scrollHeight/2)) + "px";
    this.style.left = ((event.clientX || event.changedTouches[0].clientX) - (this.scrollWidth/2)) + "px";

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
