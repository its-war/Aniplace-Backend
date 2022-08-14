const Episodio = require('../../models/Episodio');
const Anime = require('../../models/Anime');
module.exports = async (req, res) => {
    let pagina = parseInt(req.params.pagina);
    let labels = {
        totalDocs: 'totalLancamentos',
        docs: 'lancamentos',
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
        await Episodio.paginate({}, {
            projection: '_id numero temporada thumb anime',
            page: pagina,
            limit: 20,
            sort: {_id: "desc"},
            customLabels: labels,
            populate: {
                path: 'anime',
                model: Anime,
                select: '_id nome'
            }
        }, (err, result) => {
            return res.send(result);
        });
    }else{
        let retorno = {
            lancamentos: [],
            paginator: {
                totalLancamentos: 0,
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