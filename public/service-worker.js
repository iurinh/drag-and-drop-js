let versao = 3;

let arquivos = [
    "/",
    'index.js',
    'app/common/drag-drop.service.js',
    'app/common/file.service.js',
    'app/common/html.service.js',
    'app/common/tag.service.js',
    'app/components/bloco/bloco.controller.js',
    'app/components/bloco/bloco.style.css',
    'app/components/bloco/bloco.view.html',
    'app/components/bloqueador/bloqueador.controller.js',
    'app/components/bloqueador/bloqueador.style.css',
    'app/components/bloqueador/bloqueador.view.html',
    'app/components/tira/tira.controller.js',
    'app/components/tira/tira.style.css',
    'app/components/tira/tira.view.html',
    'app/main/main.constant.js',
    'app/main/main.tag.js',
    'css/index.css',
    'css/reset.css',
    'img/logo-the-bitwise-life.png'
]

self.addEventListener("install", function(){
    console.log('Instalou')
})

self.addEventListener("activate", function(){
    console.log("Instalou")
    
    caches.open("drag-and-drop-game-arquivos-"+versao)
    .then(cache => {
        cache.addAll(arquivos)
        .then(cache => {
            caches.delete("drag-and-drop-game-arquivos-"+(versao - 1))
            caches.delete("drag-and-drop-game-arquivos")
        })
    })
})

self.addEventListener("fetch", function(event){
    
    let pedido = event.request;
    let promiseResposta = caches.match(pedido).then(respostaCache => {
        let resposta = respostaCache ? respostaCache : fetch(pedido);

        return resposta
    });

    event.respondWith(promiseResposta);

})