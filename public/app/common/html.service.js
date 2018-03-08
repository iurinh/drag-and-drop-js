var htmlService = {
    createLink: _createLink,
    createJSScript: _createJSScript
}

function _createLink(uri){
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = uri;

    return link;
}

function _createJSScript(uri){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = uri;

    return script;
}