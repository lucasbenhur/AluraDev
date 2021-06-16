carregaUsuario();

let menuCodeEditor = $("#menu-code-editor");
menuCodeEditor.addClass("nav-link-active");
$(menuCodeEditor[0].firstElementChild).addClass("btn-item-menu-active");

var highlightOn = false;

$("#color").on("input", function () {
    $("#col-code-editor .bg-code-editor").css("background", this.value);
});

$(".nav-link").on("click", function () {
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

$("#btn-highligth").on("click", function () {
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

$("#btn-salvar").on("click", function () {
    let isValid = true;
    let listaDeErros = "<ul class='lista-erros'>";
    let nomeDoProjeto = $("#txt-nome-projeto")[0];
    let descricaoDoProjeto = $("#txt-descricao-projeto")[0];
    let codeEditor = $("#code-editor")[0];

    if (nomeDoProjeto.value === "") {
        isValid = false;
        listaDeErros += "<li>Insira o <b>nome</b> do seu projeto!</li>";
    }

    if (descricaoDoProjeto.value === "") {
        isValid = false;
        listaDeErros += "<li>Insira a <b>descrição</b> do seu projeto!</li>";
    }

    if (codeEditor.innerText === "") {
        isValid = false;
        listaDeErros += "<li>Insira o <b>código</b> do seu projeto!</li>";
    }

    listaDeErros += "</ul>"

    if (isValid === true){
        let projeto = {
            "nome": $("#txt-nome-projeto").val(),
            "descricao": $("#txt-descricao-projeto").val(),
            "linguagem": $("#select-linguagem").val(),
            "cor": $("#color").val(),
            "codigo": codeEditor.innerText,
            "favorito": "N"
        }

        localStorage.setItem(newGuid(), JSON.stringify(projeto));

        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'O projeto será exibido na página da comunidade.',
            confirmButtonColor: '#5081FB'
        }).then(() => { limpaCampos() });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            html: listaDeErros,
            confirmButtonColor: '#5081FB'
        });
    }       
});

function newGuid() {  
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
        return v.toString(16);  
    });
};

function carregaProjetos() {

    let htmlProjetos = "";
    let htmlImgFavorito = "";
    
    $("#col-comunidade").html(htmlProjetos);

    let index = 0;

    Object.keys(localStorage).forEach((key) => {

        if (key === "Usuario") {
            return;
        }

        index++;        

        let projeto = JSON.parse(localStorage.getItem(key));

        if (index % 2 !== 0) {
            htmlProjetos += '<div class="row">' +
                                '<div class="col-left col-lg-6">';
        } else {
            htmlProjetos += '<div class="col-right col-lg-6">';
        }

        if (projeto.favorito === "S") {
            htmlImgFavorito = '<img class="img-favorito" src="img/icon_favorito_red.svg" data-favorito="S">';
        } else {
            htmlImgFavorito = '<img class="img-favorito" src="img/icon_favorito.svg" data-favorito="N">';
        }
        
        htmlProjetos += '<div id="' + key + '" class="cartao"> ' +
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
                                        getRandom() +
                                    '</button>' +
                                    '<button class="btn-favorito" onclick="favoritaProjeto(\'' + key + '\')">' +
                                        htmlImgFavorito +
                                        getRandom() +
                                    '</button>' +
                                    '<button class="btn-excluir" onclick="excluiProjeto(\'' + key + '\')">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">' +
                                            '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>' +
                                            '<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>' +
                                        '</svg>' +
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

function favoritaProjeto(idProjeto) {
    let img_favorito = $("#"+idProjeto + " .img-favorito");
    
    if (img_favorito.attr("data-favorito") === "N") {
        img_favorito.attr("data-favorito", "S");
        img_favorito.attr("src", "img/icon_favorito_red.svg");
    } else {
        img_favorito.attr("data-favorito", "N");
        img_favorito.attr("src", "img/icon_favorito.svg");
    }

    let projeto = JSON.parse(localStorage.getItem(idProjeto));
    projeto.favorito = img_favorito.attr("data-favorito");
    localStorage.setItem(idProjeto, JSON.stringify(projeto));
};

function excluiProjeto(idProjeto) {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5081FB',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        localStorage.removeItem(idProjeto);
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Excluído!',
                text: 'O projeto foi excluído.',
                icon: 'success',
                confirmButtonColor: '#5081FB'
            }).then(() => {carregaProjetos();});
        }
    });
};

function limpaCampos() {
    $("#code-editor")[0].innerText = "";
    $("#txt-nome-projeto")[0].value = "";
    $("#txt-descricao-projeto")[0].value = "";
    $("#select-linguagem")[0].value = "javascript";
    $("#color")[0].value = "#6BD1FF";
    $("#col-code-editor .bg-code-editor").css("background", "#6BD1FF");
};

function getRandom() {
    return Math.floor(Math.random() * 65536);
};

function login() {
    let usuario = JSON.parse(localStorage.getItem("Usuario"));

    if (usuario) {
        return;
    }

    Swal.fire({
        title: 'Digite seu usuário do GitHub',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Logar',
        confirmButtonColor: "#5081FB",
        cancelButtonText: 'Cancelar',
        cancelButtonColor: "#d33",
        showLoaderOnConfirm: true,
        preConfirm: (userName) => {
          return fetch(`//api.github.com/users/${userName}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(() => {
              Swal.showValidationMessage(
                `Usuário não encontrado!`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
            let usuario = {
                "userName": result.value.login,
                "avatar": result.value.avatar_url
            }

            localStorage.setItem("Usuario", JSON.stringify(usuario));

            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Você está logado.',
                confirmButtonColor: '#5081FB'
            });

            carregaUsuario();
        }
    });
};

function carregaUsuario() {
    let usuario = JSON.parse(localStorage.getItem("Usuario"));

    if (usuario) {
        $("#user-img").attr("src", usuario.avatar);
        $("#user-img").addClass("rounded-circle");
        $("#user-name").html(usuario.userName);
    } else {
        $("#user-img").attr("src", "img/icon-login.svg");
        $("#user-img").removeClass("rounded-circle");
        $("#user-name").html("Login");
    }
};