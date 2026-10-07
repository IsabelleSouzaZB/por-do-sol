
    const btnLaLa = document.getElementById("btn-lala");
    const btnIsa = document.getElementById("btn-isa");
    const campoSenha = document.getElementById("senha");
    const btnLogin = document.getElementById("btn-login");
    const mensagem = document.getElementById("login-message");


    let usuarioSelecionado = null;


    btnLaLa.addEventListener("click", function () {

        usuarioSelecionado = "lala";

        btnLaLa.classList.add("selected");
        btnIsa.classList.remove("selected");

        mensagem.textContent = "";

    });


    btnIsa.addEventListener("click", function () {

        usuarioSelecionado = "isa";

        btnIsa.classList.add("selected");
        btnLaLa.classList.remove("selected");

        mensagem.textContent = "";

    });


    btnLogin.addEventListener("click", function () {

        // Verifica se escolheu alguém
        if (usuarioSelecionado === null) {

            mensagem.textContent =
                "Escolha LaLa ou Isa primeiro ❤️";

            return;
        }


        
        if (campoSenha.value !== "1234") {

            mensagem.textContent =
                "Senha incorreta ❤️";

            campoSenha.value = "";

            campoSenha.focus();

            return;
        }


        sessionStorage.setItem(
            "usuarioLogado",
            usuarioSelecionado
        );


        // Mensagem
        if (usuarioSelecionado === "lala") {

            mensagem.textContent =
                "Bem-vinda, LaLa! ❤️";

        } else {

            mensagem.textContent =
                "Bem-vinda, Isa! ❤️";

        }


        // Aguarda um pouquinho e abre a página principal
        setTimeout(function () {

            window.location.href = "inicio.html";

        }, 1000);

    });