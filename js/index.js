var menuCodeEditor = $("#menu-code-editor");
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

    $("#col-code-editor").css("display", "initial");
    $("#col-formulario").css("display", "initial");
    $("#col-comunidade").css("display", "none");
});

$("#menu-comunidade").on("click", function () {
    $(this).addClass("nav-link-active");
    $(this.firstElementChild).addClass("btn-item-menu-active");

    $("#col-code-editor").css("display", "none");
    $("#col-formulario").css("display", "none");
    $("#col-comunidade").css("display", "initial");
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
    var width = window.innerWidth;

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
    var projeto = {
        "nome": $("#txt-nome-projeto").val(),
        "descricao": $("#txt-descricao-projeto").val(),
        "linguagem": $("#select-linguagem").val(),
        "cor": $("#color").val(),
        "codigo": $("#code-editor")[0].innerText
    }

    localStorage.setItem(newGuid(), JSON.stringify(projeto));
};

function newGuid()  
{  
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
      return v.toString(16);  
   });  
};

$(".card .btn-favorito").on("click", function () {
    var img_favorito = $(this.firstElementChild);
    
    if (img_favorito.attr("src") === "img/icon_favorito.svg") {
        img_favorito.attr("src", "img/icon_favorito_red.svg");
    } else {
        img_favorito.attr("src", "img/icon_favorito.svg");
    }
});