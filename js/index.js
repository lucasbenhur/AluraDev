let menuCodeEditor = $("#menu-code-editor");
menuCodeEditor.addClass("nav-link-active");
$(menuCodeEditor[0].firstElementChild).addClass("btn-item-menu-active");

var highlightOn = false;

$("#color").on("input", function() {
    $("#col-code-editor .bg-code-editor").css("background", this.value);
});

$(".nav-link").on("click", function() {
    $(".nav-link").removeClass("nav-link-active")
    $(".nav-link .btn-item-menu").removeClass("btn-item-menu-active")
})

$("#menu-code-editor").on("click", function () {
    $(this).addClass("nav-link-active");
    $(this.firstElementChild).addClass("btn-item-menu-active");

    $("#col-code-editor").css("display", "block");
    $("#col-formulario").css("display", "block");
    $("#col-comunidade").css("display", "none");
});

$("#menu-comunidade").on("click", function () {
    $(this).addClass("nav-link-active");
    $(this.firstElementChild).addClass("btn-item-menu-active");

    $("#col-code-editor").css("display", "none");
    $("#col-formulario").css("display", "none");
    $("#col-comunidade").css("display", "block");

    carregaProjetos();
});

$("#btn-highligth").on("click", function() {
    if (highlightOn === true) {
        desligaHighligth();
    } else {
        ligaHighligth();
    }
});

$("#select-linguagem").on("change", function() {
    desligaHighligth();
});

function ligaHighligth () {
    $("#code-editor").html(hljs.highlight($("#code-editor")[0].innerText, {language: $("#select-linguagem").val()}).value);
    highlightOn = true;
    atualizaBtnHighlight();
};

function desligaHighligth () {
    $("#code-editor").html(hljs.highlight($("#code-editor")[0].innerText, {language: "plaintext"}).value);
    highlightOn = false;
    atualizaBtnHighlight();
};

function atualizaBtnHighlight () {
    if (highlightOn === false) {
        $("#btn-highligth")[0].innerText = "Visualizar com o highlight";
    } else {
        $("#btn-highligth")[0].innerText = "Visualizar sem o highlight";
    }
};

$("#btn-hamburguer").on("click", function () {
    if ($("#col-sidebar").css("display") === "none") {
        $("#col-sidebar").css("display", "block");
        $("#img-btn-hamburguer").attr("src", "img/CloseIcon.png");
    } else {
        defaultMenu();
    }    
});

$("#btn-buscar").on("click", function () {
    $("#col-buscar").css("display", "flex");
    $("#col-logo").css("display", "none");
    $("#col-btn-nav").css("display", "none");
});

$("#btn-fechar-buscar").on("click", function () {
    defaultColunasNavbar();
});

$(".nav-link").on("click", function () {
    if (window.innerWidth < 992) {
        defaultMenu();
    }
});

window.addEventListener('resize', function () {
    /*var heigth = window.innerHeight; */
    let width = window.innerWidth;

    if (width >= 992) {
        defaultMenu();
    }

    if (width >= 768) {
        defaultColunasNavbar();
    }
});

function defaultMenu () {
    $("#col-sidebar").removeAttr("style");
    $("#img-btn-hamburguer").attr("src", "img/HamburguerIcon.png");
};

function defaultColunasNavbar () {
    $("#col-buscar").removeAttr("style");
    $("#col-logo").removeAttr("style");
    $("#col-btn-nav").removeAttr("style");
};

function salvar () {
    let projeto = {
        "nome": $("#txt-nome-projeto").val(),
        "descricao": $("#txt-descricao-projeto").val(),
        "linguagem": $("#select-linguagem").val(),
        "cor": $("#color").val(),
        "codigo": $("#code-editor")[0].innerText
    }

    localStorage.setItem(newGuid(), JSON.stringify(projeto));
};

function newGuid() {  
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
        return v.toString(16);  
    });
};

function carregaProjetos() {

    let htmlProjetos = "";
    
    $("#col-comunidade").html(htmlProjetos);

    let index = 0;

    Object.keys(localStorage).forEach((key) => {

        index++;

        let projeto = JSON.parse(localStorage.getItem(key));

        if (index % 2 !== 0) {
            htmlProjetos += '<div class="row">' +
                                '<div class="col-left col-lg-6">';
        } else {
            htmlProjetos += '<div class="col-right col-lg-6">';
        }
        
        htmlProjetos += '<div class="cartao"> ' +
                            '<div class="bg-code-editor" style="background: ' + projeto.cor +';">' +
                                '<div class="btn-mac">' +
                                    '<img class="img-mac" src="img/mac_buttons.svg">' +
                                '</div>' +
                                '<div class="div-code-editor">' +
                                    '<code class="code-editor" contenteditable="false" spellcheck="false">' +
                                        hljs.highlight(projeto.codigo, {language: projeto.linguagem}).value +
                                    '</code>' +
                                '</div>' +
                            '</div>' +
                            '<div class="titulo font-title">' +
                                projeto.nome +
                            '</div>' +
                            '<div class="descricao font-body">' +
                                projeto.descricao +
                            '</div>' +
                            '<div class="row actions">' +
                                '<div class="col col-lg-5" style="display: flex;">' +
                                    '<button class="btn-comentario">' +
                                        '<img class="img-comentario" src="img/icon_comentario.svg">' +
                                        '9' +
                                    '</button>' +
                                    '<button class="btn-favorito">' +
                                        '<img class="img-favorito" src="img/icon_favorito.svg">' +
                                        '9' +
                                    '</button>' +
                                '</div>' +
                                '<div class="col col-lg-7" style="text-align: -webkit-right;">' +
                                    '<button class="btn-usuario">' +
                                        '<img src="https://avatars.githubusercontent.com/u/46672988?v=4" class="rounded-circle img-usuario" width="32px" height="32px">' +
                                        '@lucas' +
                                    '</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'

        if (index % 2 === 0) {
            htmlProjetos += '</div>';
        }
    });

    $("#col-comunidade").html(htmlProjetos);
};

$(".cartao .btn-favorito").on("click", function () {
    let img_favorito = $(this.firstElementChild);
    
    if (img_favorito.attr("src") === "img/icon_favorito.svg") {
        img_favorito.attr("src", "img/icon_favorito_red.svg");
    } else {
        img_favorito.attr("src", "img/icon_favorito.svg");
    }
});