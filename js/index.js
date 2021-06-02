var menuCodeEditor = $("#menu-code-editor");
menuCodeEditor.addClass("nav-link-active");
$(menuCodeEditor[0].firstElementChild).addClass("btn-item-menu-active");

var highlightOn = false;

$("#color").on("input", function() {
    $(".bg-code-editor").css("background", this.value);
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
});

$("#menu-comunidade").on("click", function () {
    $(this).addClass("nav-link-active");
    $(this.firstElementChild).addClass("btn-item-menu-active");

    $("#col-code-editor").css("display", "none");
    $("#col-formulario").css("display", "none");
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