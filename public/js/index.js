(function IndexController(){    
    
    tagService.build();

    // Componentes de tela
    var body = document.querySelector('body');

    var blocos = document.querySelectorAll('#bloco');
    var tiras = document.querySelectorAll('#tira');
    var plataformas = document.querySelectorAll('#plataforma');

    var campoBloco = document.querySelector('#campo-bloco');
    var campoTira = document.querySelector('#campo-tira');
    var campoPlataforma = document.querySelector('#campo-plataforma');
    
    var campoFinal = document.querySelector('#campo-final');
    var campoFinalUnidade = document.querySelector('#campo-final-unidade');
    var campoFinalDezena = document.querySelector('#campo-final-dezena');
    var campoFinalCentena = document.querySelector('#campo-final-centena');
    var campoSubiuDezena = document.querySelector('#campo-subiu-dezena');
    var campoSubiuCentena = document.querySelector('#campo-subiu-centena');

    var limiteCasaDecimal = 9;

    // Funcionalidades
    function validarPosicaoFinal(component, event){
        var jaPossui = possuiComponente(campoFinal, component);

        let id = component.getAttribute("id");
        let campo;

        if(id === 'bloco') campo = campoFinalUnidade;
        else if(id === 'tira') campo = campoFinalDezena;
        else if(id === 'plataforma') campo = campoFinalCentena;
        else if(id === 'tira-minimizada') return;
        else if(id === 'plataforma-minimizada') return;
        
        if(dragDropService.estaDentro(campo, event)) {
            if(!jaPossui){
                adicionarComponentPosicaoFinal(component, campo);

                if(campo.querySelectorAll('#' + id).length > limiteCasaDecimal && !(id === 'tira-minimizada' || id === 'plataforma-minimizada')){
                    campo.innerHTML = "";
                    adicionarComponentSubiu(id);
                }
            }
                    
            if(id === 'plataforma') 
                if(estaLimiteCentena())
                    component.remove();
        } else
            removerComponentPosicaoInicial(component);
        
        component.style.top = 'unset';
        component.style.left = 'unset';
    
        contar(campoFinal);
    }

    function adicionarComponentSubiu(id){
        var component = '';
        
        if(id === 'bloco'){
            component = tagService.getComponentTiraMinimizada();
            campoSubiuDezena.appendChild(component);
        } else if(id === 'tira'){
            component = tagService.getComponentPlataformaMinimizada();
            campoSubiuCentena.appendChild(component);
        } else 
            return;

        dragDropService.adicionarMovimento(body, component, validarPosicaoFinal); 
    }

    function possuiComponente(field, component){
        var components = field.querySelectorAll('#' + component.getAttribute("id"));
        if(components.length){
            var has = false
            
            components.forEach(function(node){
                has = has || (node == component);
            })
        }

        return has;
    }

    function adicionarComponentPosicaoFinal(component, campo){
        let clone = component.cloneNode(true);
        clone.classList.remove('absolute');

        dragDropService.adicionarMovimento(body, clone, validarPosicaoFinal);

        campo.appendChild(clone);
    }

    function voltaPosicaoInicial(component){
        let id = component.getAttribute("id");

        if(id === 'bloco') campoBloco.appendChild(component);
        else if(id === 'tira') campoTira.appendChild(component);
        else if(id === 'plataforma') campoPlataforma.appendChild(component);
        else if(id === 'tira-minimizada') campoSubiuDezena.appendChild(component);
        else if(id === 'plataforma-minimizada') campoSubiuCentena.appendChild(component);;
    }

    function removerComponentPosicaoInicial(component){
        let id = component.getAttribute("id");
        let campo;

        if(id === 'bloco') campo = campoBloco;
        else if(id === 'tira') campo = campoTira;
        else if(id === 'plataforma') {
            campo = campoPlataforma;

            if(estaLimiteCentena())
                voltaPosicaoInicial(component);
        }
        else if(id === 'tira-minimizada') campo = campoSubiuDezena;
        else if(id === 'plataforma-minimizada') campo = campoSubiuCentena;
        
        if(campo.querySelectorAll('#'+id).length && campo.querySelectorAll('#'+id)[0] != component)
            component.remove();
    }

    function estaLimiteCentena(){
        return campoFinalCentena.querySelectorAll('#plataforma').length >= 9
    }

    function contar(component){
        var unidades = 0;
        var dezenas = 0;
        var centenas = 0;

        component.querySelectorAll('#bloco').forEach(function(bloco){
            unidades++;
        });

        component.querySelectorAll('#tira').forEach(function(tira){
            dezenas++;
        });
        
        component.querySelectorAll('#plataforma').forEach(function(plataforma){
            centenas++;
        });

        document.querySelector('#valor-unidade').innerHTML = unidades;
        document.querySelector('#valor-dezena').innerHTML = dezenas;
        document.querySelector('#valor-centena').innerHTML = centenas;

    }

    // Inicializadores
    blocos.forEach(function(bloco){
        dragDropService.adicionarMovimento(body, bloco, validarPosicaoFinal); 
    });

    tiras.forEach(function(tira){
        dragDropService.adicionarMovimento(body, tira, validarPosicaoFinal); 
    });
    
    plataformas.forEach(function(plataforma){
        dragDropService.adicionarMovimento(body, plataforma, validarPosicaoFinal); 
    });

    function validarMovimentoCursor(event){
        if(dragDropService.estaDentro(campoFinal, event))
            campoFinal.classList.add('campo-final-hover');
        else
            campoFinal.classList.remove('campo-final-hover');
    }

    dragDropService.inspecinarCursor(body, validarMovimentoCursor);
    telaService.redimensionar();
})();