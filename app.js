function init(SeletorFrase, seletorAutor, seletorBtn) {
    // Selecionando elementos do DOM
    const frase = document.querySelector(SeletorFrase);
    const autor = document.querySelector(seletorAutor);
    const btn = document.querySelector(seletorBtn);
    const body = document.querySelector('body');

    // Tratativa de erro
    if (frase && autor && btn) {
        // Função Assincrona puxando a piada da API
        async function activeApp() {
            try {
                // Piadas API
                const dadosResponse = await fetch('./phrases.json');
                const dadosJSON = await dadosResponse.json();
                // Puxando as piadas de forma aleatória (apenas 30)
                const aleatorio = dadosJSON[Math.floor(Math.random() * 30)];

                // Insere os dados no DOM
                frase.innerText = aleatorio.quote; // Corrigido para "quote"
                autor.innerText = aleatorio.author;
                return gradientColor();

            } catch (erro) {
                console.log(erro);
            }
        }

        async function gradientColor() {
            // Gradient Colors API
            try {
                const colorsResponse = await fetch('./colors.json');
                const colorsJSON = await colorsResponse.json();
                // Puxando as cores de forma aleatória (apenas 3)
                const aleatorioColors = colorsJSON[Math.floor(Math.random() * 3)].color;
                body.style.background = aleatorioColors;
            } catch (erro) {
                console.log(erro)
            }
        }

        // Evento do botão
        btn.addEventListener('click', activeApp);

        // Ativando a função quando entra no site
        activeApp();
    }
}
// Chamando a função geral para iniciar o código
init('.frase', '.autor', '.btn-novo');