(function IndexController(){    
    
    tagService.build();

    // Componentes de tela
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

    var clearButton = document.querySelector('#clear');
    var refreshButton = document.querySelector('#refresh');
    var muteOnButton = document.querySelector('#mute-on');
    var muteOffButton = document.querySelector('#mute-off');
    var initButton = document.querySelector('#botao-somar');
    var newGameButton = document.querySelector('#botao-novo-jogo');

    var limiteCasaDecimal = 9;

    var primeiraParcela = 0;
    var segundaParcela = 0
    var resultadoFinal = 0;

    var muted = false;

    // Funcionalidades
    function validarPosicaoFinal(field, componentMovimentado, event){
        var id = componentMovimentado.getAttribute("id");

        if(dragDropService.estaDentro(document.querySelector('#lixeira'), event) && (id === 'tira-minimizada' || id === 'plataforma-minimizada')){
            componentMovimentado.remove();
            return;
        }
        
        var componentCriado;
        if(id === 'tira-minimizada'){
            componentCriado = tagService.getComponentTira();
            id = 'tira';
        } else if(id === 'plataforma-minimizada'){
            componentCriado = tagService.getComponentPlataforma();
            id = 'plataforma';
        }
        
        var jaPossui = possuiComponente(field, componentCriado || componentMovimentado);
                
        if(dragDropService.estaDentro(field, event)) {
            if(estaLimiteSubiuDezena() && id === 'bloco' && estaLimiteUnidade()){
                mostrarMensagem('Você já usou muitas unidades. Resolva antes a casa das dezenas.');
                field.classList.remove('campo-hover');
                return;
            }

            if(estaLimiteSubiuCentena() && id === 'tira' && estaLimiteDezena()){
                mostrarMensagem('Você já usou muitas dezenas. Resolva antes a casa das centenas.');
                field.classList.remove('campo-hover');
                return;
            }

            if(id === 'plataforma' && estaLimiteCentena()){
                mostrarMensagem('Nesse jogo, não usaremos valores com mais de ' + limiteCasaDecimal + ' centenas.');
                field.classList.remove('campo-hover');
                return;
            }

            if(!jaPossui){
                adicionarComponentPosicaoFinal(componentCriado || componentMovimentado, field);

                if(field.querySelectorAll('#' + id).length > limiteCasaDecimal){
                    field.innerHTML = "";
                    adicionarComponentSubiu(id);
                }
            }
            
            if(componentCriado)
                componentMovimentado.remove();
        } else
            removerComponentPosicaoInicial(componentMovimentado);
        
        componentMovimentado.style.top = 'unset';
        componentMovimentado.style.left = 'unset';
    
        contar(campoFinal);
        field.classList.remove('campo-hover');
    }

    function adicionarComponentSubiu(id){
        var component = '';
        
        if(id === 'bloco'){
            component = tagService.getComponentTiraMinimizada();
            campoSubiuDezena.appendChild(component);

            dragDropService.adicionarMovimento(campoFinalDezena, component, validarPosicaoFinal, cursorSobreCampo);
        } else if(id === 'tira'){
            component = tagService.getComponentPlataformaMinimizada();
            campoSubiuCentena.appendChild(component);

            dragDropService.adicionarMovimento(campoFinalCentena, component, validarPosicaoFinal, cursorSobreCampo);
        }
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
        var clone = component.cloneNode(true);
        clone.classList.remove('absolute');

        var id = component.getAttribute("id");

        if(id === 'bloco') dragDropService.adicionarMovimento(campoFinalUnidade, clone, validarPosicaoFinal, cursorSobreCampo);
        else if(id === 'tira') dragDropService.adicionarMovimento(campoFinalDezena, clone, validarPosicaoFinal, cursorSobreCampo);
        else if(id === 'plataforma') dragDropService.adicionarMovimento(campoFinalCentena, clone, validarPosicaoFinal, cursorSobreCampo);

        campo.appendChild(clone);
    }

    function voltaPosicaoInicial(component){
        var id = component.getAttribute("id");

        if(id === 'bloco') campoBloco.appendChild(component);
        else if(id === 'tira') campoTira.appendChild(component);
        else if(id === 'plataforma') campoPlataforma.appendChild(component);
        else if(id === 'tira-minimizada') campoSubiuDezena.appendChild(component);
        else if(id === 'plataforma-minimizada') campoSubiuCentena.appendChild(component);;
    }

    function removerComponentPosicaoInicial(component){
        var id = component.getAttribute("id");
        var campo;

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

    function estaLimiteUnidade(){
        return campoFinalUnidade.querySelectorAll('#bloco').length >= limiteCasaDecimal;
    }

    function estaLimiteDezena(){
        return campoFinalDezena.querySelectorAll('#tira').length >= limiteCasaDecimal;
    }

    function estaLimiteCentena(){
        return campoFinalCentena.querySelectorAll('#plataforma').length >= limiteCasaDecimal;
    }

    function estaLimiteSubiuDezena(){
        return campoSubiuDezena.querySelectorAll('#tira-minimizada').length >= limiteCasaDecimal;
    }

    function estaLimiteSubiuCentena(){
        return campoSubiuCentena.querySelectorAll('#plataforma-minimizada').length >= limiteCasaDecimal;
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

        var resultado = (centenas * 100) + (dezenas * 10) + unidades;

        if(resultadoFinal == resultado){
            document.querySelectorAll('#resultado').forEach(function(res){
                res.innerHTML = resultadoFinal;
            });
            show('#tela-parabens');
            hide('main');
        } else
            document.querySelectorAll('#resultado').forEach(function(res){
                res.innerHTML = "";
            });
    }

    // Inicializadores
    blocos.forEach(function(bloco){
        dragDropService.adicionarMovimento(campoFinalUnidade, bloco, validarPosicaoFinal, cursorSobreCampo);
    });

    tiras.forEach(function(tira){
        dragDropService.adicionarMovimento(campoFinalDezena, tira, validarPosicaoFinal, cursorSobreCampo);
    });
    
    plataformas.forEach(function(plataforma){
        dragDropService.adicionarMovimento(campoFinalCentena, plataforma, validarPosicaoFinal, cursorSobreCampo);
    });

    function cursorSobreCampo(field, event){
        if(dragDropService.estaDentro(field, event))
            field.classList.add('campo-hover');
        else
            field.classList.remove('campo-hover');
    }

    function limparCampos(){
        campoFinalUnidade.innerHTML = '';
        campoFinalDezena.innerHTML = '';
        campoFinalCentena.innerHTML = '';
        campoSubiuDezena.innerHTML = '';
        campoSubiuCentena.innerHTML = '';
    }

    clearButton.addEventListener('mousedown', function(event){
        limparCampos();
        contar(campoFinal);
    });

    clearButton.addEventListener('touchstart', function(event){
        limparCampos();
        contar(campoFinal);
    });

    refreshButton.addEventListener('mousedown', function(event){
        gerarExpressao();
        contar(campoFinal);
    });

    refreshButton.addEventListener('touchstart', function(event){
        gerarExpressao();
        contar(campoFinal);
    });

    muteOnButton.addEventListener('mousedown', function(event){
        event.stopPropagation();
        mute();
    });
    
    muteOnButton.addEventListener('touchstart', function(event){
        event.stopPropagation();
        mute();
    });
    
    muteOffButton.addEventListener('mousedown', function(event){
        event.stopPropagation();
        mute();
    });
    
    muteOffButton.addEventListener('touchstart', function(event){
        event.stopPropagation();
        mute();
    });

    function gerarExpressao(){
        primeiraParcela = gerarNumero();
        segundaParcela = gerarNumero();
        
        resultadoFinal = primeiraParcela + segundaParcela;

        if(resultadoFinal > 999){
            gerarExpressao();
            return;
        }

        document.querySelectorAll('#primeira-parcela').forEach(function(parcela){
            parcela.innerHTML = primeiraParcela;
        });
        document.querySelectorAll('#segunda-parcela').forEach(function(parcela){
            parcela.innerHTML = segundaParcela;
        });
    }

    function gerarNumero(){
        var numero = parseInt(Math.random() * 1000) - 1;
        return numero > 0 ? numero : gerarNumero();
    }

    initButton.addEventListener('mousedown', function(){
        hide('#tela-inicial');
        show('main');
        
        play('audio-ambiente');
    });
    
    initButton.addEventListener('touchstart', function(){
        hide('#tela-inicial');
        show('main');
        
        play('audio-ambiente');
    });

    newGameButton.addEventListener('mousedown', function(){
        hide('#tela-parabens');
        show('main');
        limparCampos();
        gerarExpressao();
        contar(campoFinal);
    });

    function mostrarMensagem(msg){
        document.querySelector('#mensagem').innerHTML = msg;
        show('#popup');

        setTimeout(function(){
            hide('#popup');
        }, 4000);
    }

    function mute(){
        document.querySelector('#audio-ambiente').muted = muted = !muted;

        if(muted){
            hide('#mute-off');
            show('#mute-on');
        } else {
            hide('#mute-on');
            show('#mute-off');
        }
    }
    
    function play(id){
        document.querySelector('#'+id).play();
    }
    
    function pause(id){
        document.querySelector('#'+id).pause();
    }

    function hide(selector){
        document.querySelector(selector).classList.add('hide');
    }
    
    function show(selector){
        document.querySelector(selector).classList.remove('hide');
    }

    telaService.redimensionar();
    gerarExpressao();

    hide('main');
    hide('#tela-parabens');
    hide('#audio-ambiente');

})();