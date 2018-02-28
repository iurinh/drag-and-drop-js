let versao = 5;

let arquivos = [
    "/",
    'css/index.css',
    'js/app/index.js',
    'js/app/service.js'
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