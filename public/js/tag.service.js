var tagService = {
    build: _build,
    bloco: _bloco,
    tira: _tira,
    plataforma: _plataforma
}

function _build(){
    var html = document.querySelector('html');

    var innerText = html. innerHTML;

    innerText = innerText.replace(new RegExp('<plataforma></plataforma>', 'g'), _plataforma());
    innerText = innerText.replace(new RegExp('<tira></tira>', 'g'), _tira());
    innerText = innerText.replace(new RegExp('<bloco></bloco>', 'g'), _bloco());

    innerText = innerText.replace('<div class="plataforma">', '<div id="plataforma" class="plataforma">');
    innerText = innerText.replace('<div class="tira">', '<div id="tira" class="tira">');
    innerText = innerText.replace('<div class="bloco">', '<div id="bloco" class="bloco">');

    html.innerHTML = innerText;
}

function _bloco(){
    return '<div class="bloco"></div>'
}

function _tira(){
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

function _plataforma(){
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