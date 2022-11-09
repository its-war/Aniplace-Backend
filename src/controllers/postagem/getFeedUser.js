const Postagem = require('../../models/Postagem');
const Usuario = require('../../models/Usuario');
const Comentario = require('../../models/Comentario');
module.exports = async (req, res) => {
    let pagina = parseInt(req.params.pagina);
    if(isNaN(pagina) || pagina < 1){
        return res.send({
            posts: [],
            paginator: {
                totalPosts: 0,
                limit: 10,
                totalPaginas: 0,
                paginaAtual: 1,
                slNo: 1,
                temAnterior: false,
                temProximo: false,
                anterior: null,
                proximo: null
            }
        });
    }

    let labels = {
        totalDocs: 'totalPosts',
        docs: 'posts',
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

    await Postagem.paginate({
        autor: req.userData._id
    }, {
        page: pagina,
        limit: 10,
        sort: {_id: "desc"},
        customLabels: labels,
        populate: [
            {
                path: 'autor',
                select: '_id nome foto',
                model: Usuario
            },
            {
                path: 'comentarios',
                model: Comentario,
                populate: [
                    {
                        path: 'autor',
                        model: Usuario,
                        select: 'nome foto'
                    },
                    {
                        path: 'curtidas',
                        model: Usuario,
                        select: 'nome foto'
                    },
                    {
                        path: 'respostas',
                        model: Comentario,
                        populate: [
                            {
                                path: 'autor',
                                model: Usuario,
                                select: 'nome foto'
                            },
                            {
                                path: 'curtidas',
                                model: Usuario,
                                select: 'nome foto'
                            }
                        ]
                    }
                ]
            },
            {
                path: 'postOrigem',
                select: '_id texto imagem',
                model: Postagem
            },
            {
                path: 'curtidas',
                model: Usuario,
                select: 'nome foto'
            }
        ]
    }, (err, result) => {
        if(err){
            console.log("ERRO - paginate de posts: " + err);
        }
        return res.send(result);
    });
}