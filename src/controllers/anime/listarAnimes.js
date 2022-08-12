const Anime = require('../../models/Anime');
module.exports = async (req, res) => {
    let pagina = req.body.pagina;
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
        let $and = [];

        $and.push({nome: {$regex: '.*' + req.body.conditions.nome + '.*', $options: 'i'}});

        if(req.body.conditions.letra !== ''){
            if(req.body.conditions.letra === '#'){
                $and.push({
                    $or: [
                        {nome: {$regex: '^0', $options: 'i'}},
                        {nome: {$regex: '^1', $options: 'i'}},
                        {nome: {$regex: '^2', $options: 'i'}},
                        {nome: {$regex: '^3', $options: 'i'}},
                        {nome: {$regex: '^4', $options: 'i'}},
                        {nome: {$regex: '^5', $options: 'i'}},
                        {nome: {$regex: '^6', $options: 'i'}},
                        {nome: {$regex: '^7', $options: 'i'}},
                        {nome: {$regex: '^8', $options: 'i'}},
                        {nome: {$regex: '^9', $options: 'i'}},
                    ]
                });
            }else{
                $and.push({nome: {$regex: '^' + req.body.conditions.letra, $options: 'i'}});
            }
        }

        if(req.body.generos.length > 0){
            $and.push({generos: {$all: req.body.generos}});
        }

        if(req.body.conditions.ano > 1){
            $and.push({ano: {$eq: req.body.conditions.ano}});
        }


        await Anime.paginate({
            $and
        }, {
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