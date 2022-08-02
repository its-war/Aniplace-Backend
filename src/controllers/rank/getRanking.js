const Ranking = require('../../models/Ranking');
module.exports = async (req, res) => {
    if(req.params.anime.length !== 24){
        return res.send({nota: null});
    }

    await Ranking.find({anime: req.params.anime}, 'nota -_id').then((rankList) => {
        if(rankList.length < 1){
            return res.send({nota: null});
        }

        let produto = 0;
        let soma = 0;
        let counts = {};

        for(const num of rankList){
            counts[num.nota] = counts[num.nota] ? counts[num.nota] + 1 : 1;
        }
        for(let i = 1; i <= 10; i++){
            if(counts[i] === undefined){
                counts[i] = 0;
            }
            produto = produto + (i * counts[i]);
            soma = soma + counts[i];
        }
        let nota = produto / soma;
        nota = nota.toFixed(2);
        res.send({nota: nota});
    });
}