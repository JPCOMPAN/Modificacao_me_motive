function init(SeletorFrase, seletorAutor, seletorBtn) {
    const frase = document.querySelector(SeletorFrase);
    const autor = document.querySelector(seletorAutor);
    const btn = document.querySelector(seletorBtn);
    const body = document.querySelector('body');
    const imgTopo = document.querySelector('img'); // Seleciona a imagem do topo

    // Array de imagens (adicione os nomes dos arquivos das imagens que você quer usar)
    const imagens = [
        'images1.jpg',
        'images2.jpg',
        'images3.jpg'
        // Adicione mais nomes de arquivos conforme desejar
    ];

    if (frase && autor && btn && imgTopo) {
        async function activeApp() {
            try {
                const dadosResponse = await fetch('./phrases.json');
                const dadosJSON = await dadosResponse.json();
                const index = Math.floor(Math.random() * 30);
                const aleatorio = dadosJSON[index];

                frase.innerText = aleatorio.quote;
                autor.innerText = aleatorio.author;

                // Troca a imagem do topo
                const imgIndex = index % imagens.length;
                imgTopo.src = imagens[imgIndex];

                return gradientColor();
            } catch (erro) {
                console.log(erro);
            }
        }

        async function gradientColor() {
            try {
                const colorsResponse = await fetch('./colors.json');
                const colorsJSON = await colorsResponse.json();
                const aleatorioColors = colorsJSON[Math.floor(Math.random() * 3)].color;
                body.style.background = aleatorioColors;
            } catch (erro) {
                console.log(erro)
            }
        }

        btn.addEventListener('click', activeApp);
        activeApp();
    }
}
init('.frase', '.autor', '.btn-novo');