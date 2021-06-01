var menuCodeEditor = $("#menu-code-editor");
menuCodeEditor.addClass("nav-link-active");
$(menuCodeEditor[0].firstElementChild).addClass("btn-item-menu-active");

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
    hljs.highlightElement($("#code-editor")[0]);
});

$("#select-linguagem").on("change", function() {
    var linguagem = this;
    var divCodigo = $("#div-code-editor")[0];
    var codigo = $("#code-editor")[0];

    divCodigo.innerHTML = `<code id="code-editor" class="code-editor hljs ${linguagem.value}" contenteditable="true" spellcheck="false"></code>`;
    divCodigo.firstElementChild.innerHTML = codigo.innerHTML;
});