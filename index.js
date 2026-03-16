//Primeiro precisamos criar o app  usando express
const express = require('express');
const app = express();


// permitir aceita JSON na requisição
app.use(express.json());

const filmes = [
    { id: 1, titulo: "O Poderoso Chefão", anoDeLançamento: 1972, genero: "Drama", Image: "https://ingresso-a.akamaihd.net/prd/img/movie/o-poderoso-chefao-50-anos/008274f7-a76d-484f-8b5b-1c639c2ce46b.jpg", descrição: "O Poderoso Chefão é um filme de 1972 dirigido por Francis Ford Coppola, baseado no romance de Mario Puzo. O filme segue a história da família mafiosa Corleone, liderada por Vito Corleone, e seu filho Michael, que se envolve cada vez mais nos negócios da família." },
];
const series = [
    { id: 1, titulo: "Breaking Bad", anoDeLançamento: 2008, genero: "Crime", Image: "https://ingresso-a.akamaihd.net/prd/img/series/breaking-bad/8c9e1b0c-5a7e-4f1b-9c3e-1c639c2ce46b.jpg", descrição: "Breaking Bad é uma série de televisão americana criada por Vince Gilligan. A série segue a história de Walter White, um professor de química que se torna um fabricante de metanfetamina após ser diagnosticado com câncer terminal." },
]


// adicionar filmes e series
app.post("/filmes", (req, res) => {
    const { titulo, anoDeLançamento, genero, Image, descrição } = req.body;
    if(!titulo || !anoDeLançamento || !genero || !Image || !descrição){
        return res.status(400).json({erro: "Todos os campos são obrigatórios!"})
    }
    const novoFilme = {
        id: filmes.length + 1,
        titulo,
        anoDeLançamento,
        genero,
        Image,
        descrição
    };
    filmes.push(novoFilme);
    return res.status(201).json(novoFilme);
});

app.post("/series", (req, res) => {
    const { titulo, anoDeLançamento, genero, Image, descrição } = req.body;
    if(!titulo || !anoDeLançamento || !genero || !Image || !descrição){
        return res.status(400).json({erro: "Todos os campos são obrigatórios!"})
    }
    const novaSerie = {
        id: series.length + 1,
        titulo,
        anoDeLançamento,
        genero,
        Image,
        descrição
    };
    series.push(novaSerie);
    return res.status(201).json(novaSerie);
});


//Filtrar por gênero
app.get("/filmes", function(req, res){
    const genero = req.query.genero

    if (!genero){
        return res.json(filmes)
    }
    const filmesFiltrados = filmes.filter(f => f.genero == genero)

    res.json(filmesFiltrados)
})
app.get("/series", function(req, res){
    const genero = req.query.genero

    if (!genero){
        return res.json(series)
    }
    const seriesFiltradas = series.filter(s => s.genero == genero)

    res.json(seriesFiltradas)
})


//Filtrar por ID
app.get("/filmes/:id", function(req, res){
    const id = parseInt(req.params.id)

    const filme = filmes.find(f => f.id == id)
    if (!filme){
        return res.status(404).json({erro: "Filme não encontrado"})
    }
    res.json(filme)
})

app.get("/series/:id", function(req, res){
    const id = parseInt(req.params.id)

    const serie = series.find(s => s.id == id)
    if (!serie){
        return res.status(404).json({erro: "Série não encontrada"})
    }
    res.json(serie)
})

//mostra todos os filmes e séries
app.get("/filmes", (req, res) => {
    return res.json(filmes)
});

app.get("/series", (req, res) => {
    return res.json(series);
});


//Segundo passo, colocar o servido para rodar
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

