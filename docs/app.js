function init(SeletorFrase, seletorAutor, seletorBtn) {
    const frase = document.querySelector(SeletorFrase);
    const autor = document.querySelector(seletorAutor);
    const btn = document.querySelector(seletorBtn);
    const body = document.querySelector('body');
    const imgTopo = document.getElementById('imagem-topo'); // Seleciona a imagem do topo pelo id

    // Array de imagens
    const imagens = [
        'images1.jpg',
        'images2.jpg',
        'images3.jpg',
        'images4.jpg'
    ];

    // Array para controlar imagens já exibidas
    let imagensDisponiveis = [...imagens];

    function getImagemNaoRepetida() {
        if (imagensDisponiveis.length === 0) {
            imagensDisponiveis = [...imagens];
        }
        const idx = Math.floor(Math.random() * imagensDisponiveis.length);
        const img = imagensDisponiveis[idx];
        imagensDisponiveis.splice(idx, 1); // Remove a imagem escolhida
        return img;
    }

    // Controle para cores não se repetirem
    let ultimaCor = null;
    let coresDisponiveis = [];

    async function carregarCores() {
        try {
            const colorsResponse = await fetch('./colors.json');
            const colorsJSON = await colorsResponse.json();
            coresDisponiveis = colorsJSON.map(c => c.color);
        } catch (erro) {
            console.log(erro);
            coresDisponiveis = ["#ffffff"]; // fallback
        }
    }

    function getCorNaoRepetida() {
        if (coresDisponiveis.length === 0) return "#ffffff";
        let cor;
        do {
            cor = coresDisponiveis[Math.floor(Math.random() * coresDisponiveis.length)];
        } while (cor === ultimaCor && coresDisponiveis.length > 1);
        ultimaCor = cor;
        return cor;
    }

    if (frase && autor && btn && imgTopo) {
        async function activeApp() {
            try {
                const dadosResponse = await fetch('./phrases.json');
                const dadosJSON = await dadosResponse.json();
                const index = Math.floor(Math.random() * 30);
                const aleatorio = dadosJSON[index];

                frase.innerText = aleatorio.quote;
                autor.innerText = aleatorio.author;

                // Troca a imagem do topo sem repetir até esgotar as opções
                imgTopo.src = getImagemNaoRepetida();

                // Troca a cor de fundo sem repetir
                body.style.background = getCorNaoRepetida();
            } catch (erro) {
                console.log(erro);
            }
        }

        carregarCores().then(() => {
            btn.addEventListener('click', activeApp);
            activeApp();
        });
    }
}
init('.frase', '.autor', '.btn-novo');