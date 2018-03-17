var tagService = {
    build: _build,
    getBloco: _getBloco,
    getTira: _getTira,
    getTiraMinimizada: _getTiraMinimizada,
    getComponentTiraMinimizada: _getComponentTiraMinimizada,
    getPlataforma: _getPlataforma,
    getPlataformaMinimizada: _getPlataformaMinimizada,
    getComponentPlataformaMinimizada: _getComponentPlataformaMinimizada
}

function _build(){
    var html = document.querySelector('html');

    var innerText = html. innerHTML;

    innerText = innerText.replace(new RegExp('<plataforma></plataforma>', 'g'), _getPlataforma());
    innerText = innerText.replace(new RegExp('<tira></tira>', 'g'), _getTira());
    innerText = innerText.replace(new RegExp('<bloco></bloco>', 'g'), _getBloco());

    innerText = innerText.replace('<div class="plataforma">', '<div id="plataforma" class="plataforma">');
    innerText = innerText.replace('<div class="tira">', '<div id="tira" class="tira">');
    innerText = innerText.replace('<div class="bloco">', '<div id="bloco" class="bloco">');

    html.innerHTML = innerText;
}

function _getBloco(){
    return '<div class="bloco"></div>'
}

function _getTira(){
    return '<div class="tira">'
        + '<bloco></bloco>'
        + '<bloco></bloco>'
        + '<bloco></bloco>'
        + '<bloco></bloco>'
        + '<bloco></bloco>'
        + '<bloco></bloco>'
        + '<bloco></bloco>'
        + '<bloco></bloco>'
        + '<bloco></bloco>'
        + '<bloco></bloco>'
        + '</div>'
}

function _getPlataforma(){
    return '<div class="plataforma">'
        + '<tira></tira>'
        + '<tira></tira>'
        + '<tira></tira>'
        + '<tira></tira>'
        + '<tira></tira>'
        + '<tira></tira>'
        + '<tira></tira>'
        + '<tira></tira>'
        + '<tira></tira>'
        + '<tira></tira>'
        + '</div>'
}

function _getTiraMinimizada(){
    return '<div id="tira-minimizada" class="tira-minimizada"></div>';
}

function _getComponentTiraMinimizada(){
    var component = document.createElement('div');
    component.setAttribute('id', 'tira-minimizada');
    component.classList.add('tira-minimizada');
    return component;
}

function _getPlataformaMinimizada(){
    return '<div id="plataforma-minimizada" class="plataforma-minimizada"></div>';
}

function _getComponentPlataformaMinimizada(){
    var component = document.createElement('div');
    component.setAttribute('id', 'plataforma-minimizada');
    component.classList.add('plataforma-minimizada');
    return component;
}