//////////////////////////////////////////
// VARS
//////////////////////////////////////////

window.VEJASP    = window.VEJASP || {};
var clickHandler = ('ontouchstart' in document.documentElement ? "touchend" : "click");
var VEJASP = window.VEJASP;
var Vurl = "http://localhost/vejasp/dia-dos-namorados/";
var Vhome = Vurl + "/index.html";
var Vurl_passo2 = Vurl + "/passo2.html";
var Vurl_passo3 = Vurl + "/passo3.html";
var Vteste,
    Vparte,
    Vpasso2,
    Vpasso3,
    Vsexo,
    Vitem,
    Vboneco,
    Vdevice,
    Vdevice_atual,
    Vcarrossel,
    Vcabeca,
    Vtronco,
    Vpernas;


Vboneco = [];
Vboneco["cabeca"] = "Vboneco_cabeca";
Vboneco["tronco"] = "Vboneco_tronco";
Vboneco["pernas"] = "Vboneco_pernas";

Vgaleria = [];
Vgaleria["cabeca"] = "Vgaleria_cabeca";
Vgaleria["tronco"] = "Vgaleria_tronco";
Vgaleria["pernas"] = "Vgaleria_pernas";

dados_top = {
  "homem": {
      "cabeca": {
        "basico": "Básico",
        "esportista": "Esportista",
        "hipster": "Hipster",
        "sofisticado": "Sofisticado"
      },
      "tronco": {
        "asiatica": "Asiática",
        "brasileira": "Brasileira",
        "francesa": "Francesa",
        "italiana": "Italiana"
      },
      "pernas": {
        "ar_livre": "Atividade ao ar livre",
        "artes": "Arte",
        "musica": "Música",
        "sair_rotina": "Sair da Rotina"
      }
  },
  "mulher": {
      "cabeca": {
        "basico": "Básico",
        "esportista": "Esportista",
        "hipster": "Hipster",
        "sofisticado": "Sofisticado"
      },
      "tronco": {
        "asiatica": "Asiática",
        "brasileira": "Brasileira",
        "francesa": "Francesa",
        "italiana": "Italiana"
      },
      "pernas": {
        "ar_livre": "Atividade ao ar livre",
        "artes": "Arte",
        "musica": "Música",
        "sair_rotina": "Sair da Rotina"
      }
  }
}

range_preco = {
  "Presente" : [
    "até R$ 100,00",
    "de R$ 100,00 a R$ 200,00",
    "de R$ 200,00 a R$ 300,00",
    "acima de R$ 300,00"
  ],
  "Restaurante": [
    "até R$ 70,00",
    "de R$ 71,00 a R$ 105,00",
    "de R$ 106,00 a R$ 175,00",
    "acima de R$ 175,00"
  ],
  "Passeio": [
    "até R$ 100,00",
    "de R$ 100,00 a R$ 200,00",
    "de R$ 200,00 a R$ 300,00",
    "acima de R$ 300,00"
  ]
}

//////////////////////////////////////////
// GERAL
//////////////////////////////////////////

VEJASP.getURLParameter = function(Vname) {
  sPageURL = window.location.search.substring(1);
  sURLVariables = sPageURL.split('&');
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == Vname) {
      return sParameterName[1];
    }
  }
}

VEJASP.scrollbarWidth = function() {
  var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
      $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
      inner = $inner[0],
      outer = $outer[0];
   
  jQuery('body').append(outer);
  var width1 = inner.offsetWidth;
  $outer.css('overflow', 'scroll');
  var width2 = outer.clientWidth;
  $outer.remove();

  return (width1 - width2);
}

VEJASP.defineDevice = function(){
  if ($("body").height() > $(window).height()) {
    Vwidth = $(window).width() + VEJASP.scrollbarWidth();
  } else {
    Vwidth = $(window).width();
  }
  
  Vheight = $(window).height();

  if (Vwidth < 768) {
    return "mobile";
  } else if (Vwidth >= 768 && Vwidth <= 992) {
    return "tablet";
  } else if (Vwidth > 992) {
    return "desktop";
  }
}

VEJASP.setCallback = function() {
  var updFunction = VEJASP.updateBoxes;
  if( Vdevice == "mobile" || Vdevice == "tablet") {
    updFunction = function(){};
  }

  for (var key in Vboneco) {
    Vboneco[key].settings.onAnimComplete = updFunction;
  }

}

Vdevice = Vdevice_atual = VEJASP.defineDevice();

//////////////////////////////////////////
// CUSTOM
//////////////////////////////////////////

VEJASP.pegarSexo = function() {
  if (!$("#abre #escolha ul li span").hasClass("ativo")) {
    return false;
  } else if ($("#abre #escolha ul li:first span").hasClass("ativo")) {
    return "mulher";
  } else {
    return "homem";
  }
}

VEJASP.setaSexo = function(bt) {
  if(bt.hasClass("ativo")){
    return;
  } else {
    $("#abre #escolha ul li span").removeClass("ativo");
    bt.addClass("ativo");
  }
}

VEJASP.createCarrossel = function() {
  if (Vpasso2) {
    Vboneco = $(".imagem").touchCarousel({      
                  itemsPerMove: 1,
                  snapToItems: true,
                  pagingNav: true,
                  loopItems: true,
                  scrollbar: false,       
                  scrollToLast: false,
                  onAnimComplete: VEJASP.updateBoxes,
                  transitionSpeed: 300,
                  pagingNavControls: false  
                }).data("touchCarousel");
  };
  
  if (Vpasso3) {

    $.each(dados_top[Vsexo], function(indexParte,valueParte){

        Vboneco[indexParte] =  $(".boneco-" + Vsexo + " ." + indexParte + " .slider_" + Vsexo + "_" + indexParte ).touchCarousel({      
                                        itemsPerMove: 1,
                                        snapToItems: true,
                                        pagingNav: true,
                                        loopItems: true,
                                        scrollbar: false,       
                                        scrollToLast: false,
                                        onAnimComplete: VEJASP.updateBoxes,
                                        transitionSpeed: 300,
                                        pagingNavControls: false  
                                      }).data("touchCarousel");
                                       
        Vgaleria[indexParte]  =  $(".boneco-" + Vsexo + " ." + indexParte + " .produtos_mobile .touchcarousel").touchCarousel({      
                                          pagingNav: true,
                                          scrollbar: false,
                                          directionNavAutoHide: false,        
                                          itemsPerMove: 1,        
                                          loopItems: false,        
                                          directionNav: false,
                                          autoplay: false,
                                          autoplayDelay: 2000,
                                          useWebkit3d: false,
                                          transitionSpeed: 400,
                                        }).data("touchCarousel");

    })
  };

}

VEJASP.updateBoxes = function(item) {
  if(item) {
    Vparte = $(item).data("item");
    Vaparece = $(item).val();
  } else {
    Vparte = $(this.carouselRoot[0]).parent().attr("class");
    Vaparece = this.getCurrentId() + 1;
  }

  if (Vpasso2) {
    if(!$("." + Vparte + " .texto > ul > li:nth-child(" + Vaparece + ")").hasClass("ativo") ) {
      $("." + Vparte + " .texto > ul > li").removeClass("ativo").slideUp("fast");
      $("." + Vparte + " .texto > ul > li:nth-child(" + Vaparece + ")").addClass("ativo").slideDown("fast");
    }
  };

  if (Vpasso3) {
    if(!$("." + Vparte + " .produtos > ul > li:nth-child(" + Vaparece + ")").hasClass("ativo")) {
      VEJASP.trocarCaixas(Vparte, Vaparece);
      VEJASP.trocarSelects(Vparte, Vaparece - 1);
      VEJASP.trocarBoneco(Vparte, Vaparece - 1);
    }
  };

}

VEJASP.setInicial = function() {
  VEJASP.trocarCaixas("cabeca", Vcabeca);
  VEJASP.trocarCaixas("tronco", Vtronco);
  VEJASP.trocarCaixas("pernas", Vpernas);
  VEJASP.trocarSelects("cabeca", Vcabeca - 1);
  VEJASP.trocarSelects("tronco", Vtronco - 1);
  VEJASP.trocarSelects("pernas", Vpernas - 1);
  VEJASP.trocarBoneco("cabeca", Vcabeca - 1);
  VEJASP.trocarBoneco("tronco", Vtronco - 1);
  VEJASP.trocarBoneco("pernas", Vpernas - 1);
}

VEJASP.trocarCaixas = function(Vparte, Vaparece) {
  $("." + Vparte + " .trocar_li > li").removeClass("ativo").slideUp("fast");
  $("." + Vparte + " .trocar_li > li:nth-child(" + Vaparece + ")").addClass("ativo").slideDown("fast");
}

VEJASP.trocarSelects = function(Vparte, Vaparece) {

  $("select[data-item=" + Vparte + "] option").prop('selected', false);
  $("select[data-item=" + Vparte + "] option:eq(" + Vaparece + ")").prop('selected', true);
  
}

VEJASP.trocarBoneco = function(Vparte, Vaparece) {
  Vboneco[Vparte].goTo(Vaparece);
}

VEJASP.setUrlFinal = function() {

  if(Vpasso2) {
    Vcabeca = $(".boneco-" + Vsexo + " .cabeca .texto li").index($(".boneco-" + Vsexo + " .cabeca .texto li.ativo")) + 1;
    Vtronco = $(".boneco-" + Vsexo + " .tronco .texto li").index($(".boneco-" + Vsexo + " .tronco .texto li.ativo")) + 1;
    Vpernas = $(".boneco-" + Vsexo + " .pernas .texto li").index($(".boneco-" + Vsexo + " .pernas .texto li.ativo")) + 1;

    return Vurl_passo3 + "?s=" + Vsexo + "&c=" +  Vcabeca + "&t=" +  Vtronco + "&p=" +  Vpernas;
  }


}

VEJASP.mostrarOverlay = function(Vimg,Vnome,Vdescricao,Vpreco,Vestabelecimento,Vendereco) {
  $("#produto_overlay .imagem").attr("src", Vimg);
  $("#produto_overlay li:nth-child(1) h4").html(Vnome);
  $("#produto_overlay li:nth-child(1) h5").html(Vdescricao);
  $("#produto_overlay li:nth-child(1) .preco b").html(Vpreco);
  $("#produto_overlay li:nth-child(2) h5").html(Vestabelecimento);
  $("#produto_overlay li:nth-child(2) h6").html(Vendereco);
  $("#overlay").fadeIn("fast");
  $("#produto_overlay").fadeIn("fast");
}

VEJASP.fecharOverlay = function(Vimg,Vnome,Vdescricao,Vpreco,Vestabelecimento,Vendereco) {
  $("#overlay").fadeOut("fast");
  $("#produto_overlay").fadeOut("fast", function() {
    $("#produto_overlay .imagem").attr("src", "");
    $("#produto_overlay li:nth-child(1) h4").html("");
    $("#produto_overlay li:nth-child(1) h5").html("");
    $("#produto_overlay li:nth-child(1) .preco b").html("");
    $("#produto_overlay li:nth-child(2) h5").html("");
    $("#produto_overlay li:nth-child(2) h6").html("");
  });
}


VEJASP.carregaTops = function() {

  tplSexo = "Masculino";
  if(Vsexo == "mulher") {
    tplSexo = "Feminino";
  }

  $.each(dados_top[Vsexo], function(indexParte,valueParte){

    tlpCounter = 1;

    $.each(valueParte, function(indexPerfil,valuePerfil){

      var template_top = '<ul class="touchcarousel-container">{{each presentesTop}}{{if sexo == "' + tplSexo + '" }}{{if perfil == "' + valuePerfil + '" }}<li class="touchcarousel-item" data-nome="${item}" data-desc="${descricao}" data-link="${link}" data-estab="${estabelecimento}" data-endereco="${endereco}" data-preco="${preco}"><div data-imagem="./images/produtos/${imagem}-g.jpg"><img src="./images/produtos/${imagem}-p.jpg" alt="" />{{if categoria == "Presente" }}<span class="ampliar">+</span>{{/if}}<h4>${item}</h4><h5>${preco.preco_exato}</h5></div></li>{{/if}}{{/if}}{{/each}}</ul>';
      $.tmpl( template_top, dadosTop ).appendTo('.boneco-'+ Vsexo +' .'+ indexParte +' .produtos > ul > li:nth-child(' + tlpCounter + '),.boneco-'+ Vsexo +' .'+ indexParte +' .produtos_mobile > ul > li:nth-child(' + tlpCounter + ')');

      tlpCounter++;
    });
  });

}

VEJASP.verTodos = function(){
  if(Vdevice == "mobile") {
    Vtop = "140px";
  } else {
    Vtop = "230px";
  }
  Vcabeca_escolhida = $(".boneco-" + Vsexo + " .cabeca .legenda li.ativo").data("texto");
  Vtronco_escolhida = $(".boneco-" + Vsexo + " .tronco .legenda li.ativo").data("texto");
  Vpernas_escolhida = $(".boneco-" + Vsexo + " .pernas .legenda li.ativo").data("texto");

  Vcabeca_item = $(".boneco-" + Vsexo + " .cabeca .produtos > ul > li.ativo").index();
  Vtronco_item = $(".boneco-" + Vsexo + " .tronco .produtos > ul > li.ativo").index();
  Vpernas_item = $(".boneco-" + Vsexo + " .pernas .produtos > ul > li.ativo").index();

  _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Resultado', 'bt-sugestoes']);

  _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Resultado', 'categoria-' + Vcabeca_escolhida + '-presentes']);
  _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Resultado', 'categoria-' + Vtronco_escolhida + '-restaurantes']);
  _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Resultado', 'categoria-' + Vpernas_escolhida + '-passeios']);

  _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Resultado', 'resultado-' + Vcabeca_item + '-presentes']);
  _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Resultado', 'resultado-' + Vtronco_item + '-restaurantes']);
  _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Resultado', 'resultado-' + Vpernas_item + '-passeios']);

  $(".estabelecimentos").show().animate({
    top: Vtop
  }, 500, function() {
    $("body").animate({scrollTop:(0)}, '1000', '', function() {});
  });
}

VEJASP.voltarEstabelecimentos = function(){
  _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Sugestões', 'bt-seta']);

  $(".estabelecimentos").animate({
    top: "150%"
  }, 500, function() {
    $(this).hide();
  });
}

VEJASP.parseEstabelecimentos = function(){
  templateSexo = "Feminino";
  if (Vsexo == "homem") {
    templateSexo = "Masculino";
  }
    var tpl_estabelecimentos = '{{each presentes}}{{if sexo == "' + templateSexo + '" }}<li class="col-md-4 col-sm-6 col-xs-12" data-filtroTipo="${tipo}" data-filtroBairro="${bairro}" data-filtroPreco="${preco}" data-filtroPrimario="${categoria}"><div class="chapeu">${tipo}</div><div class="imagem"><img class="lazy" data-original="./images/produtos/${imagem}.jpg" /></div><div class="informacoes">{{if categoria == "Presente" }}<span class="titulo">${item}</span><div class="descricao">${descricao}</div><span class="preco">${preco_exato}</span><hr /><span class="onde">ONDE COMPRAR:</span><span class="estab"><a href="${link}" onclick="_gaq.push(["SITE._trackEvent","dia-dos-namorados-2014","Sugestões", "resultados-estab-${item}"])" target="_blank">${estabelecimento}</a></span>{{if endereco != "E-commerce" }}<span class="address">${endereco} - ${bairro}</span><span class="telefone"><b>Telefone:</b> ${telefone}</span>{{/if}}{{/if}}{{if categoria == "Restaurante" }}<span class="titulo"><a href="${link}" onclick="_gaq.push(["SITE._trackEvent","dia-dos-namorados-2014","Sugestões", "resultados-estab-${item}"])" target="_blank">${item}</a></span><span class="address">${endereco} - ${bairro}</span><span class="telefone"><b>Telefone:</b> ${telefone}</span><span class="preco">${preco_exato}</span>{{/if}}{{if categoria == "Passeio" && tipo != "Filme"  }}<span class="titulo">${item}</span><span class="estab"><a href="${link}" onclick="_gaq.push(["SITE._trackEvent","dia-dos-namorados-2014","Sugestões", "resultados-estab-${item}"])" target="_blank">${estabelecimento}</a></span><span class="address">${endereco} - ${bairro}</span><span class="telefone"><b>Telefone:</b> ${telefone}</span><span class="preco">${preco_exato}</span>{{/if}}{{if categoria == "Passeio" && tipo == "Filme"  }}<span class="titulo"><a href="${link}" onclick="_gaq.push(["SITE._trackEvent","dia-dos-namorados-2014","Sugestões", "resultados-estab-${item}"])" target="_blank">${item}</a></span><span class="preco">${preco_exato}</span>{{/if}}</div></li>{{/if}}{{/each}}';
    $( 'ul#estabelecimentos li' ).remove();
    $.tmpl( tpl_estabelecimentos, dados ).appendTo( 'ul#estabelecimentos' );
    VEJASP.iniciaLazyLoad();
    VEJASP.loadFiltroPrimario();
    VEJASP.montaSelects();
    // VEJASP.checkEstabelecimentos();
    // VEJASP.removeLoader();
}

VEJASP.iniciaLazyLoad = function(){
  $("img.lazy").show().lazyload({
    skip_invisible : false
  });
}

VEJASP.loadFiltroPrimario = function(){
  $("#estabelecimentos > li").hide().filter("[data-filtroPrimario='Presente']").show();
}

VEJASP.getDadosSelects = function(){

  var filtroPrimario = $(".tipos li.selecionado").attr("data-filtroPrimario");
  var arrfiltroTipo = [];
  var arrfiltroBairro = [];
  var arrfiltroPrecoRange = [];

  $.each(dados.presentes, function(index,value){
    if(value.categoria === filtroPrimario){
      arrfiltroTipo[index] = value.tipo;
      arrfiltroBairro[index] = value.bairro;
    }
  })

  var uniqueTipo = [];
  $.each(arrfiltroTipo, function(i, el){
    if($.inArray(el, uniqueTipo) === -1 && el != "-" && el != "" && typeof el != "undefined" ) uniqueTipo.push(el);
  });

  var uniqueBairro = [];
  $.each(arrfiltroBairro, function(i, el){
    if($.inArray(el, uniqueBairro) === -1 && el != "-" && el != "" && typeof el != "undefined") uniqueBairro.push(el);
  });

  var uniquePrecoRange = [];
  $.each(range_preco[filtroPrimario], function(i, el){
    if($.inArray(el, uniquePrecoRange) === -1 && el != "-" && el != "" && typeof el != "undefined") uniquePrecoRange.push(el);
  });

  return [uniqueTipo.sort(), uniqueBairro.sort(), uniquePrecoRange];

}

VEJASP.scrollToFiltros = function(){
  $("html, body").animate({scrollTop:parseInt($("#filtros").position().top) + Math.floor((Math.random() * 10) + 1)}, '1000', '', function() {});
}

VEJASP.montaSelects = function(){
  $(".selects select option").not(":first-child").remove();
  var selects = [];
  selects = VEJASP.getDadosSelects();
  $.each(selects,function(i, select){
    $.each(select, function(j, valor){
      if(i == 0){ 
        $("#filtroTipo").append("<option value='"+valor+"'>"+valor+"</option>");
      }else if(i == 1){ 
        $("#filtroBairro").append("<option value='"+valor+"'>"+valor+"</option>");
      }else{
        $("#filtroPreco").append("<option value='"+valor+"'>"+valor+"</option>");
      }
    });
  });
  VEJASP.scrollToFiltros();
}

VEJASP.zerarFiltros = function(){
  $(".selects select").val("todos").change();
  $(".mensagem").hide();
}

VEJASP.valorFiltroPrimario = function(){
    return $(".tipos li.selecionado").attr("data-filtroPrimario");
}

VEJASP.aplicaFiltros = function(){
  var valor_filtro_tipo = $("#filtroTipo").val();
  var valor_filtro_bairro = $("#filtroBairro").val();
  var valor_filtro_preco = $("#filtroPreco").val();
  var filtros = "[data-filtroPrimario='"+VEJASP.valorFiltroPrimario()+"']";
  if(valor_filtro_tipo != "todos"){
    filtros += "[data-filtroTipo='"+valor_filtro_tipo+"']";
  }
  if(valor_filtro_bairro != "todos"){
    filtros += "[data-filtroBairro='"+valor_filtro_bairro+"']";
  }
  if(valor_filtro_preco != "todos"){
    filtros += "[data-filtroPreco='"+valor_filtro_preco+"']";
  }
  if(filtros) {
    $("#estabelecimentos > li").hide().filter(filtros).show();
  } else {
    $("#estabelecimentos > li").show();
  }
  VEJASP.scrollToFiltros();
}

VEJASP.checkEstabelecimentos = function(){
  if($("#estabelecimentos > li").length == 0){
    VEJASP.parseEstabelecimentos();
  }else if($("#estabelecimentos > li:visible").length == 0){
    $(".mensagem, .mensagem .no-results").show();
  }else{
    $(".mensagem").hide();
  }
}

VEJASP.filtroTipo = function(obj){
  $("ul.tipos li").removeClass('selecionado');
  var filtroPrimario = obj.attr('data-filtroPrimario');
  var novo_texto_filtro_mobile = obj.text();
  $(".filtro-mobile").text(novo_texto_filtro_mobile);
  obj.addClass('selecionado');

  if(Vdevice == "mobile"){
    $("ul.tipos").toggleClass('hidden-xs');
  }

  $(".selects select option[value=todos]").attr("selected", true);
  $("#estabelecimentos > li").hide().filter("[data-filtroPrimario='"+filtroPrimario+"']").show();
  VEJASP.montaSelects();  
}



//////////////////////////////////////////
// ACOES
//////////////////////////////////////////

$(document).ready(function(){

  if($("body").data("passo") == "passo2") {
    Vpasso2 = true;
    if(VEJASP.getURLParameter("s")) {
      Vsexo = VEJASP.getURLParameter("s");
      $("section#passo2, section#passo2 .boneco-" + Vsexo).show();
    } else {
      window.location.href = Vhome;
    }
  }

  if($("body").data("passo") == "passo3") {
    Vpasso3 = true;
    if(VEJASP.getURLParameter("s") && VEJASP.getURLParameter("c") && VEJASP.getURLParameter("t") && VEJASP.getURLParameter("p")) {
      Vsexo = VEJASP.getURLParameter("s");
      Vcabeca = VEJASP.getURLParameter("c");
      Vtronco = VEJASP.getURLParameter("t");
      Vpernas = VEJASP.getURLParameter("p");

      $("section#passo3, section#passo3 .boneco-" + Vsexo).show();

    } else {
      window.location.href = Vhome;
    }
  }

  $(window).resize(function() {
    Vdevice = VEJASP.defineDevice();
    if(Vdevice != Vdevice_atual) {
      Vdevice_atual = Vdevice;
      VEJASP.setCallback();
    }
  });

  $("#abre #escolha ul li span").on(clickHandler, function(){
    VEJASP.setaSexo($(this));
  });

  $("#abre .botao").on(clickHandler, function(){
    Vsexo = VEJASP.pegarSexo();
    if (Vsexo) {
      window.location.href = Vurl_passo2 + "?s=" + Vsexo;
    } else {
      alert("Favor escolher o sexo do seu amor :)");
    }
  });

  if (Vpasso2) {
    $("#passo2 .voltar").on(clickHandler, function(){
        _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Home', 'bt-voltar']);
        window.location.href = Vhome;
    });

    $("#passo2 .sugestoes").on(clickHandler, function(){
        Vestilo = $(".boneco-" + Vsexo + " .cabeca .texto li.ativo").data("texto");
        Vgosta = $(".boneco-" + Vsexo + " .tronco .texto li.ativo").data("texto");
        Vcurte = $(".boneco-" + Vsexo + " .pernas .texto li.ativo").data("texto");

        _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Home', 'bt-sugestoes']);
        _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Home', 'filtro-' + Vestilo + '-estilo']);
        _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Home', 'filtro-' + Vgosta + '-gosta']);
        _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Home', 'filtro-' + Vcurte + '-curte']);

        window.location.href = VEJASP.setUrlFinal();

    });

    VEJASP.createCarrossel();
    VEJASP.setUrlFinal();
  };

  if (Vpasso3) {
    
    if (Vsexo == "homem") {
      $(".mulher").remove();
    }else {
      $(".homem").remove();
    };

    $(".botoes .voltar").on(clickHandler, function(){
      _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Resultado', 'bt-refazer']);
      window.location.href = Vurl;
    });


    $('.topo_mobile select').on('change', function() {
      VEJASP.updateBoxes(this);
    });

    $("#produto_overlay .fechar, #overlay").on(clickHandler, function(){
        VEJASP.fecharOverlay();
    });

    $(".estabelecimentos .voltar").on(clickHandler, function(){
        VEJASP.voltarEstabelecimentos();
    });

    $("#passo3 .todas-sugestoes").on(clickHandler, function(){
        VEJASP.verTodos();
    });

    $(".mensagem .no-results span").on("click", function(){
      VEJASP.zerarFiltros();
    });

    $("#filtros select").on("change", function(){
      Vfiltro = $(this).attr("id");
      Vvalue = $(this).find("option").filter(":selected").val();

      _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014',Vfiltro + '-' + Vvalue ]);

      VEJASP.aplicaFiltros();
      VEJASP.checkEstabelecimentos();
    });

    $(".tipos li").on("click", function(){
      _gaq.push(['SITE._trackEvent','dia-dos-namorados-2014','Sugestões', 'bt-' + $(this).text() ]);
      VEJASP.filtroTipo($(this));
    });

    $(".filtro-mobile").on("click", function(){
      $("ul.tipos").toggleClass('hidden-xs');
    });

    VEJASP.carregaTops();
    VEJASP.createCarrossel();

    setTimeout(function(){
      VEJASP.setInicial();
      VEJASP.setCallback();
      VEJASP.parseEstabelecimentos();

      $("#passo3 .cabeca .produtos > ul > li > ul > li").on(clickHandler, function(){
          Vimg = $(this).find("div").data("imagem");
          Vnome = $(this).data("nome");
          Vdescricao = $(this).data("desc");
          Vpreco = $(this).data("preco");
          Vestabelecimento = $(this).data("estab");
          Vendereco = $(this).data("endereco");

          VEJASP.mostrarOverlay(Vimg,Vnome,Vdescricao,Vpreco,Vestabelecimento,Vendereco);
      });

      $("#passo3 .tronco .produtos > ul > li > ul > li, #passo3 .pernas .produtos > ul > li > ul > li").on(clickHandler, function(){
        window.open($(this).data("link"),'_blank');
      });


    }, 500);

    
  };
});
