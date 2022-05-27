const conn = require('./src/config/database');
let sql1 = "insert into ranking values (default, ?);";
conn.beginTransaction();
for(let i = 0; i < 18; i++){
    conn.query(sql1, [1], (err, result, fields) => {
        if(err !== null){
            conn.rollback();
        }
    });
}
conn.commit();

let sql = "select count(idranking) as resultado from ranking where nota=?;";
let produto = 0;
let soma = 0;
conn.beginTransaction();
for(let i = 1; i <= 10; i++){
    conn.query(sql, [i], (err, result, fields) => {
        if(err !== null){
            conn.rollback();
        }else{
            produto = produto + (i * result[0].resultado);
            soma = soma + result[0].resultado;
            if(i === 10){
                let nota = produto / soma;
                nota = nota.toFixed(2);
                console.log("A nota é: " + nota);
            }
        }
    });
}
conn.commit();
