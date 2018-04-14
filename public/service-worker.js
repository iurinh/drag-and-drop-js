let versao = 1;

let arquivos = [
    "/",
    "audio/Musica-Ambiente-drag-and-drop.mp3",
    "css/index.css",
    "css/reset.css",
    "font/Soft_Marshmallow.otf",
    "img/logo-the-bitwise-life.png",
    "js/drag-drop.service.js",
    "js/index.js",
    "js/register.js",
    "js/tag.service.js",
    "js/tela.service.js"
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