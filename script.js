
document.addEventListener("DOMContentLoaded", () => {

    const WHATSAPP_NUMBER = "5511965430833";


    

    function abrirWhatsApp(mensagem) {

        if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === "5511999999999") {
            alert("Configure o número do WhatsApp no arquivo script.js.");
            return;
        }

        const texto = encodeURIComponent(mensagem);

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;

        window.open(url, "_blank");
    }


   

    function mostrarMensagem(elemento, texto, tipo = "") {

        if (!elemento) return;

        elemento.textContent = texto;

        elemento.className = "form-message";

        if (tipo) {
            elemento.classList.add(tipo);
        }
    }


    
    const carousel = document.getElementById("hero-carousel");
    const carouselImage = document.getElementById("hero-carousel-image");

    const carouselPrev =
        document.getElementById("hero-carousel-prev");

    const carouselNext =
        document.getElementById("hero-carousel-next");

    const carouselDots =
        document.getElementById("hero-carousel-dots");

    const carouselCaption =
        document.getElementById("hero-carousel-caption");


    /*
       Fotos utilizadas no carrossel
    */

    const fotos = [
        {
            src: "imagens/laranja 2.jpeg",
            alt: "Foto de LaLa e Isa",
            legenda: "."
        },

        {
            src: "imagens/laranja .jpeg",
            alt: "Foto de LaLa e Isa",
            legenda: "."
        },

        {
            src: "imagens/laranja 3.png",
            alt: ".",
            legenda: " cara eu to tão na sua "
        },

        {
            src: "imagens/laranja 4.jpeg",
            alt: ".",
            legenda: "."
        },


    ];


    let fotoAtual = 0;
    let intervaloCarrossel;


    

    function atualizarCarrossel(indice, animar = true) {

        if (!carouselImage || fotos.length === 0) {
            return;
        }

        fotoAtual =
            (indice + fotos.length) % fotos.length;

        const foto = fotos[fotoAtual];


        if (animar) {

            carouselImage.classList.add("is-changing");

            setTimeout(() => {

                carouselImage.src = foto.src;
                carouselImage.alt = foto.alt;

                if (carouselCaption) {
                    carouselCaption.textContent =
                        foto.legenda;
                }

                carouselImage.classList.remove(
                    "is-changing"
                );

            }, 220);

        } else {

            carouselImage.src = foto.src;
            carouselImage.alt = foto.alt;

            if (carouselCaption) {
                carouselCaption.textContent =
                    foto.legenda;
            }
        }


        atualizarBolinhas();
    }


 
    function criarBolinhas() {

        if (!carouselDots) return;

        carouselDots.innerHTML = "";


        fotos.forEach((foto, indice) => {

            const botao =
                document.createElement("button");

            botao.type = "button";

            botao.className =
                "hero-carousel-dot";

            botao.setAttribute(
                "aria-label",
                `Ir para a foto ${indice + 1}`
            );


            botao.addEventListener(
                "click",
                () => {

                    atualizarCarrossel(indice);

                    reiniciarCarrossel();
                }
            );


            carouselDots.appendChild(botao);
        });


        atualizarBolinhas();
    }


   

    function atualizarBolinhas() {

        if (!carouselDots) return;

        const bolinhas =
            carouselDots.querySelectorAll(
                ".hero-carousel-dot"
            );


        bolinhas.forEach((bolinha, indice) => {

            bolinha.classList.toggle(
                "active",
                indice === fotoAtual
            );

        });
    }


   

    function proximaFoto() {

        atualizarCarrossel(
            fotoAtual + 1
        );
    }


    

    function fotoAnterior() {

        atualizarCarrossel(
            fotoAtual - 1
        );
    }




    function iniciarCarrossel() {

        clearInterval(intervaloCarrossel);

        intervaloCarrossel =
            setInterval(() => {

                proximaFoto();

            }, 5000);
    }


  

    function reiniciarCarrossel() {

        iniciarCarrossel();
    }


    
    if (carousel && carouselImage) {

        criarBolinhas();

        atualizarCarrossel(
            0,
            false
        );

        iniciarCarrossel();


        /* BOTÃO PRÓXIMO */

        carouselNext?.addEventListener(
            "click",
            (evento) => {

                evento.stopPropagation();

                proximaFoto();

                reiniciarCarrossel();
            }
        );


        

        carouselPrev?.addEventListener(
            "click",
            (evento) => {

                evento.stopPropagation();

                fotoAnterior();

                reiniciarCarrossel();
            }
        );


        

        carousel.addEventListener(
            "mouseenter",
            () => {

                clearInterval(
                    intervaloCarrossel
                );
            }
        );


        

        carousel.addEventListener(
            "mouseleave",
            () => {

                iniciarCarrossel();
            }
        );


        

        carousel.addEventListener(
            "keydown",
            (evento) => {

                if (evento.key === "ArrowRight") {

                    proximaFoto();

                    reiniciarCarrossel();
                }


                if (evento.key === "ArrowLeft") {

                    fotoAnterior();

                    reiniciarCarrossel();
                }
            }
        );
    }


   

    const noteTitle =
        document.getElementById("note-title");

    const noteText =
        document.getElementById("note-text");

    const sendNoteButton =
        document.getElementById(
            "btn-send-note-whatsapp"
        );

    const noteMessage =
        document.getElementById(
            "note-message"
        );


    sendNoteButton?.addEventListener(
        "click",
        () => {

            const titulo =
                noteTitle?.value.trim() || "";

            const recado =
                noteText?.value.trim() || "";


           

            if (!recado) {

                mostrarMensagem(
                    noteMessage,
                    "Escreva um recadinho antes de enviar. 💗",
                    "error"
                );

                noteText?.focus();

                return;
            }


            

            const mensagem =
`💌 *RECADO PARA NÓS*

${titulo ? `*${titulo}*\n\n` : ""}${recado}

Feito com carinho. ❤️`;


            

            abrirWhatsApp(mensagem);


            mostrarMensagem(
                noteMessage,
                "Recado preparado para enviar no WhatsApp. 💗",
                "success"
            );
        }
    );


    

    const dateTitle =
        document.getElementById("date-title");

    const dateDescription =
        document.getElementById(
            "date-description"
        );

    const dateDay =
        document.getElementById("date-day");

    const dateTime =
        document.getElementById("date-time");

    const dateLocation =
        document.getElementById(
            "date-location"
        );


    const sendDateButton =
        document.getElementById(
            "btn-send-date-whatsapp"
        );

    const dateMessage =
        document.getElementById(
            "date-message"
        );


   

    sendDateButton?.addEventListener(
        "click",
        () => {

            const titulo =
                dateTitle?.value.trim() || "";

            const descricao =
                dateDescription?.value.trim() || "";

            const data =
                dateDay?.value || "";

            const horario =
                dateTime?.value || "";

            const local =
                dateLocation?.value.trim() || "";


            

            if (!titulo) {

                mostrarMensagem(
                    dateMessage,
                    "Coloque uma ideia para o nosso date. 🧡",
                    "error"
                );

                dateTitle?.focus();

                return;
            }


            

            const dataFormatada =
                formatarData(data);


            
            const mensagem =
`🧡 *IDEIA DE DATE*

*Ideia:* ${titulo}
${descricao ? `*Detalhes:* ${descricao}\n` : ""}
${data ? `*Data:* ${dataFormatada}\n` : ""}
${horario ? `*Horário:* ${horario}\n` : ""}
${local ? `*Local:* ${local}\n` : ""}

Vamos marcar? 🥰`;


            abrirWhatsApp(mensagem);


            mostrarMensagem(
                dateMessage,
                "A ideia foi preparada para enviar no WhatsApp. 🧡",
                "success"
            );
        }
    );


    

    const calendarButton =
        document.getElementById(
            "btn-add-date-calendar"
        );


    calendarButton?.addEventListener(
        "click",
        () => {

            const titulo =
                dateTitle?.value.trim() || "";

            const descricao =
                dateDescription?.value.trim() || "";

            const data =
                dateDay?.value || "";

            const horario =
                dateTime?.value || "20:00";

            const local =
                dateLocation?.value.trim() || "";


            

            if (!titulo) {

                mostrarMensagem(
                    dateMessage,
                    "Coloque um nome para o encontro primeiro. 🧡",
                    "error"
                );

                dateTitle?.focus();

                return;
            }


          

            if (!data) {

                mostrarMensagem(
                    dateMessage,
                    "Escolha uma data para colocar na agenda. 📅",
                    "error"
                );

                dateDay?.focus();

                return;
            }


            

            const inicio =
                criarDataGoogle(
                    data,
                    horario
                );


            if (!inicio) {

                mostrarMensagem(
                    dateMessage,
                    "Confira a data e o horário escolhidos.",
                    "error"
                );

                return;
            }


           

            const fim =
                new Date(
                    inicio.getTime() +
                    2 * 60 * 60 * 1000
                );


            const inicioGoogle =
                formatarDataGoogle(
                    inicio
                );

            const fimGoogle =
                formatarDataGoogle(
                    fim
                );


            

            const parametros =
                new URLSearchParams({

                    action: "TEMPLATE",

                    text: titulo,

                    dates:
                        `${inicioGoogle}/${fimGoogle}`,

                    details:
                        descricao ||
                        "Um encontro nosso. ❤️",

                    location: local
                });


            const url =
                `https://calendar.google.com/calendar/render?${parametros.toString()}`;


            window.open(
                url,
                "_blank"
            );


            mostrarMensagem(
                dateMessage,
                "Abrindo o Google Agenda. 📅❤️",
                "success"
            );
        }
    );


    
    function formatarData(dataISO) {

        if (!dataISO) return "";

        const partes =
            dataISO.split("-");

        if (partes.length !== 3) {
            return dataISO;
        }

        const ano = partes[0];
        const mes = partes[1];
        const dia = partes[2];

        return `${dia}/${mes}/${ano}`;
    }


    

    function criarDataGoogle(
        data,
        horario
    ) {

        if (!data) return null;


        const partesData =
            data.split("-");


        const ano =
            Number(partesData[0]);

        const mes =
            Number(partesData[1]);

        const dia =
            Number(partesData[2]);


        const partesHora =
            (horario || "20:00").split(":");


        const hora =
            Number(partesHora[0]) || 0;

        const minuto =
            Number(partesHora[1]) || 0;


        const resultado =
            new Date(
                ano,
                mes - 1,
                dia,
                hora,
                minuto,
                0
            );


        if (
            Number.isNaN(
                resultado.getTime()
            )
        ) {

            return null;
        }


        return resultado;
    }


    
    function formatarDataGoogle(data) {

        const ano =
            data.getFullYear();

        const mes =
            String(
                data.getMonth() + 1
            ).padStart(2, "0");

        const dia =
            String(
                data.getDate()
            ).padStart(2, "0");

        const hora =
            String(
                data.getHours()
            ).padStart(2, "0");

        const minuto =
            String(
                data.getMinutes()
            ).padStart(2, "0");

        const segundo =
            String(
                data.getSeconds()
            ).padStart(2, "0");


        return `${ano}${mes}${dia}T${hora}${minuto}${segundo}`;
    }


  

    const secoes =
        document.querySelectorAll(
            "main section"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entradas, observador) => {

                    entradas.forEach(
                        (entrada) => {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target
                                    .classList
                                    .add(
                                        "section-visible"
                                    );


                                observador.unobserve(
                                    entrada.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        secoes.forEach(
            (secao) => {

                secao.classList.add(
                    "section-hidden"
                );

                observer.observe(
                    secao
                );
            }
        );
    }


    

    console.log(
        "💗 Página carregada com sucesso!"
    );

});