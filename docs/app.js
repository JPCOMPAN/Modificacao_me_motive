function init(SeletorFrase, seletorAutor, seletorBtn) {
    const frase = document.querySelector(SeletorFrase);
    const autor = document.querySelector(seletorAutor);
    const btn = document.querySelector(seletorBtn);

    if (frase && autor && btn) {
        async function activeApp() {
            try {
                const dadosResponse = await fetch('./phrases.json');
                const dadosJSON = await dadosResponse.json();
                const index = Math.floor(Math.random() * 30);
                const aleatorio = dadosJSON[index];

                frase.innerText = aleatorio.quote;
                autor.innerText = aleatorio.author;
            } catch (erro) {
                console.log(erro);
            }
        }

        btn.addEventListener('click', activeApp);
        activeApp();
    }
}
init('.frase', '.autor', '.btn-novo');