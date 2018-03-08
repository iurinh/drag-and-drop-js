var bloqueador = document.querySelector('bloqueador');

readFileService.read(URI_BLOQUEADOR_VIEW)
.then(function(response){
    bloqueador.innerHTML = response;
    bloqueador.appendChild(htmlService.createLink(URI_BLOQUEADOR + '/bloqueador.style.css'));
    bloqueador.appendChild(htmlService.createJSScript(URI_BLOQUEADOR + '/bloqueador.controller.js'));
})

