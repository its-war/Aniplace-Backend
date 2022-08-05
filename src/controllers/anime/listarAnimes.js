const Anime = require('../../models/Anime');
module.exports = async (req, res) => {
    let pagina = req.params.pagina;
    let labels = {
        totalDocs: 'totalAnimes',
        docs: 'animes',
        limit: 'limit',
        page: 'paginaAtual',
        nextPage: 'proximo',
        prevPage: 'anterior',
        hasNextPage: 'temProximo',
        hasPrevPage: 'temAnterior',
        totalPages: 'totalPaginas',
        pagingCounter: 'slNo',
        meta: 'paginator',
    };
    if(pagina > 0){
        await Anime.paginate({}, {
            projection: '_id nome foto',
            page: pagina,
            limit: 10,
            sort: {nome: "asc"},
            customLabels: labels
        }, (err, result) => {
            return res.send(result);
        });
    }else{
        let retorno = {
            animes: [],
            paginator: {
                totalAnimes: 0,
                limit: 0,
                totalPaginas: 0,
                paginaAtual: 0,
                slNo: 0,
                temAnterior: false,
                temProximo: false,
                anterior: null,
                proximo: null
            }
        }
        return res.send(retorno);
    }
}