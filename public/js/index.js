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

    // Funcionalidades
    function validarPosicaoFinal(component, event){
        var jaPossui = possuiComponente(campoFinal, component);

        let tipo = component.tipo;
        let campo;

        if(tipo === 'bloco') campo = campoFinalUnidade;
        else if(tipo === 'tira') campo = campoFinalDezena;
        else if(tipo === 'plataforma') campo = campoFinalCentena;
        
        if(dragDropService.estaDentro(campo, event)) {
            if(!jaPossui)
                adicionarComponentPosicaoFinal(component, campo);
                    
            if(tipo === 'plataforma') 
                if(estaLimiteCentena())
                    component.remove();
        } else
            removerComponentPosicaoInicial(component);
        
        component.style.top = 'unset';
        component.style.left = 'unset';
    
        contar(campoFinal);
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
        let tipo = component.tipo;

        let clone = component.cloneNode(true);
        clone.tipo = tipo;
        clone.classList.remove('absolute');

        dragDropService.adicionarMovimento(body, clone);

        campo.appendChild(clone);
    }

    function voltaPosicaoInicial(component){
        let tipo = component.tipo;

        if(tipo === 'bloco') campoBloco.appendChild(component);
        else if(tipo === 'tira') campoTira.appendChild(component);
        else if(tipo === 'plataforma') campoPlataforma.appendChild(component);
    }

    function removerComponentPosicaoInicial(component){
        let tipo = component.tipo;
        let campo;

        if(tipo === 'bloco') campo = campoBloco;
        else if(tipo === 'tira') campo = campoTira;
        else if(tipo === 'plataforma') {
            campo = campoPlataforma;

            if(estaLimiteCentena())
                voltaPosicaoInicial(component);
        }
        
        if(campo.querySelectorAll('#'+tipo).length && campo.querySelectorAll('#'+tipo)[0] != component)
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
        bloco.tipo = 'bloco';
        dragDropService.adicionarMovimento(body, bloco, validarPosicaoFinal); 
    });

    tiras.forEach(function(tira){
        tira.tipo = 'tira';
        dragDropService.adicionarMovimento(body, tira, validarPosicaoFinal); 
    });
    
    plataformas.forEach(function(plataforma){
        plataforma.tipo = 'plataforma';
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