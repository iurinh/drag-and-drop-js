var htmlService = {
    createLink: _createLink,
    createJSScript: _createJSScript,
    hasLink: _hasLink,
    hasScript: _hasScript,
    addJSScript: _addJSScript,
    addLink: _addLink
}

function _createLink(uri){
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = uri;

    return link;
}

function _createJSScript(uri){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = uri;

    return script;
}

function _hasLink(uri){
    var html = document.querySelector('html');

    var has = false;
    html.querySelectorAll('link').forEach(function(link){
        has = has || (uri == link.getAttribute('href'));
    });

    return has;
}

function _hasScript(uri){
    var html = document.querySelector('html');

    var has = false;
    html.querySelectorAll('script').forEach(function(script){
        has = has || (uri == script.getAttribute('src'));
    });

    return has;
}

function _addJSScript(uri){
    var html = document.querySelector('html');

    var script = _createJSScript(uri);
    html.innerHTML = html.innerHTML + script.outerHTML;
}

function _addLink(uri){
    var head = document.querySelector('head');

    var link = _createLink(uri);
    head.innerHTML = head.innerHTML + link.outerHTML;
}