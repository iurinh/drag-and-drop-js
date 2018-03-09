var tagService = {
    build: _build
}

function _build(list, html, dir, name){
    let nameUpper = name.toUpperCase();

    list.forEach(function(item){
        fileService.read(html)
        .then(function(response){
            item.innerHTML = response;
            item.appendChild(htmlService.createLink(dir + '/' + name + '.style.css'));
            item.appendChild(htmlService.createJSScript(dir + '/' + name + '.controller.js'));
        })
    });
}