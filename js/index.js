var highlightOn = false;
carregaUsuario();
preparaMenu();

function preparaMenu() {
    let menuCodeEditor = $("#menu-code-editor");
    menuCodeEditor.addClass("nav-link-active");
    $(menuCodeEditor[0].firstElementChild).addClass("btn-item-menu-active");
};

function carregaUsuario() {
    let usuario = getUsuario();

    if (usuario) {
        $("#img-user").attr("src", usuario.avatar);
        $("#img-user").attr("width", "32px");
        $("#img-user").attr("height", "32px");
        $("#img-user").addClass("rounded-circle");
        $("#user-name").html(usuario.userName);
        $("#user-name").css("margin-right", "0px")
        $("#btn-logout").css("display", "initial");
    } else {
        $("#img-user").attr("src", "img/icon_login.svg");
        $("#img-user").removeClass("rounded-circle");
        $("#img-user").attr("width", "24px");
        $("#img-user").attr("height", "24px");
        $("#user-name").html("Login");
        $("#user-name").css("margin-right", "12px")
        $("#btn-logout").css("display", "none");
    }
};

$("#color").on("input", function () {
    $("#col-code-editor .bg-code-editor").css("background", this.value);
});

$('#txt-buscar').keypress(function(e){
    let filtro = e.target.value;
	let keycode = (e.keyCode ? e.keyCode : e.which);

	if(keycode == '13'){
        if (!filtro || filtro === ""){
            carregaProjetos();
        } else {
            exibeComunidade();
            carregaProjetos(filtro);
        }		
	}
});

$("#menu-code-editor").on("click", function () {
    limpaMenuAtivo();

    $(this).addClass("nav-link-active");
    $(this.firstElementChild).addClass("btn-item-menu-active");

    $("#col-code-editor").css("display", "block");
    $("#col-formulario").css("display", "block");
    $("#col-comunidade").css("display", "none");
});

$("#menu-comunidade").on("click", function () {
    limpaCampos();
    exibeComunidade();
    carregaProjetos();
});

function exibeComunidade() {
    limpaMenuAtivo();
    $("#menu-comunidade").addClass("nav-link-active");
    $($("#menu-comunidade")[0].firstElementChild).addClass("btn-item-menu-active");

    $("#col-code-editor").css("display", "none");
    $("#col-formulario").css("display", "none");
    $("#col-comunidade").css("display", "block");
};

function limpaMenuAtivo() {
    $(".nav-link").removeClass("nav-link-active")
    $(".nav-link .btn-item-menu").removeClass("btn-item-menu-active")
};

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
    let usuario = getUsuario();
    let isValid = true;
    let listaDeErros = "<ul class='lista-erros'>";
    let nomeDoProjeto = $("#txt-nome-projeto")[0];
    let descricaoDoProjeto = $("#txt-descricao-projeto")[0];
    let codeEditor = $("#code-editor")[0];

    if (!usuario) {
        isValid = false;
        listaDeErros += "<li>Faça o <b>login</b> para salvar!</li>";
    }

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
            "likes": [],
            "usuario": {
                "userName": usuario.userName,
                "avatar": usuario.avatar
            },
            "comentarios": [{}]
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

function carregaProjetos(filtro) {
    let usuario = getUsuario();
    let htmlProjetos = "";
    let htmlImgLike = "";
    let htmlBtnExcluir = "";
    
    $("#col-comunidade").html(htmlProjetos);

    let index = 0;
    Object.keys(localStorage).forEach((key) => {

        if (key === "Usuario") {
            return;
        }

        let projeto = JSON.parse(localStorage.getItem(key));

        if (!projeto.usuario){
            return;
        }

        if (filtro &&
            (projeto.nome.toLowerCase().indexOf(filtro.toLowerCase()) == -1 &&
             projeto.descricao.toLowerCase().indexOf(filtro.toLowerCase()) == -1)) {
            return;
        }

        index++;        

        if (index % 2 !== 0) {
            htmlProjetos += '<div class="row">' +
                                '<div class="col-left col-lg-6">';
        } else {
            htmlProjetos += '<div class="col-right col-lg-6">';
        }

        if (usuario && projeto.likes.indexOf(usuario.userName) >= 0) {
            htmlImgLike = '<img class="img-like" src="img/icon_like_red.svg">';
        } else {
            htmlImgLike = '<img class="img-like" src="img/icon_like.svg">';
        }

        if (usuario && usuario.userName === projeto.usuario.userName) {
            htmlBtnExcluir = '<button class="btn-excluir" onclick="excluiProjeto(\'' + key + '\')">' +
                                  '<img src="img/icon_delete.svg">'
                             '</button>';
        } else {
            htmlBtnExcluir = "";
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
                                        0 +
                                    '</button>' +
                                    '<button class="btn-like" onclick="likeProjeto(\'' + key + '\')">' +
                                        '<div style="display: flex;">' +
                                            htmlImgLike +
                                            '<div id="numero-likes">' +
                                                projeto.likes.length +
                                            '</div>' +
                                        '</div>' +
                                    '</button>' +
                                    htmlBtnExcluir +
                                '</div>' +
                                '<div class="col col-lg-7" style="text-align: -webkit-right;">' +
                                    '<button class="btn-usuario">' +
                                        '<img src=' + projeto.usuario.avatar +' class="rounded-circle img-usuario" width="32px" height="32px">' +
                                        '@' + projeto.usuario.userName +
                                    '</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'

        if (index % 2 === 0) {
            htmlProjetos += '</div>';
        }
    });

    $("#col-comunidade").html('<h1 class="font-title" style="margin-left: -12px;">Nenhum projeto encontrado, verifique o filtro ou cadastre um projeto!</h1');
};

function likeProjeto(idProjeto) {
    let usuario = getUsuario();

    if (!usuario) {
        Swal.fire({
            text: "Faça o login para interagir na comunidade!",
            icon: "error",
            confirmButtonColor: "#5081FB"
        });

        return;
    }

    let img_like = $("#"+idProjeto + " .img-like");
    let projeto = JSON.parse(localStorage.getItem(idProjeto));
    
    if (img_like.attr("src") === "img/icon_like.svg") {
        projeto.likes.push(usuario.userName);
        $("#"+idProjeto + " #numero-likes").html(projeto.likes.length);
        img_like.attr("src", "img/icon_like_red.svg");
    } else {
        let pos =  projeto.likes.indexOf(usuario.userName);
        projeto.likes.splice(pos, 1);
        $("#"+idProjeto + " #numero-likes").html(projeto.likes.length);
        img_like.attr("src", "img/icon_like.svg");
    }    
    
    localStorage.setItem(idProjeto, JSON.stringify(projeto));
};

function excluiProjeto(idProjeto) {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5081FB',
        cancelButtonColor: '#616262',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem(idProjeto);
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

$(".nav-link-usuario").on("click", function () {
    let usuario = getUsuario();

    if (usuario) {
        Swal.fire({
            title: 'Sair?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5081FB',
            cancelButtonColor: '#616262',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {        
            if (result.isConfirmed) {
                localStorage.removeItem("Usuario");
                carregaUsuario();
                limpaCampos();
                carregaProjetos();
            }
        });
    } else {
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
            cancelButtonColor: "#616262",
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
                limpaCampos();
                carregaProjetos();
            }
        });
    }
});

function getUsuario () {
    return JSON.parse(localStorage.getItem("Usuario"));
};

$("#btn-exportar").on("click", function () {
    let nomeDoProjeto = $("#txt-nome-projeto").val();

    if (!nomeDoProjeto || nomeDoProjeto === "") {
        nomeDoProjeto = "SemTitulo";
    }

    html2canvas($("#col-code-editor .bg-code-editor"), {
        onrendered: function(canvas) {
            theCanvas = canvas;
            canvas.toBlob(function(blob) {
                saveAs(blob, nomeDoProjeto.trim() + ".png"); 
            });
        }
    });
});
