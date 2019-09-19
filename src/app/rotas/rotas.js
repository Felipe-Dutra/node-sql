const db = require('../../config/database')
const LivroDao = require('../infra/listagem-dao');

module.exports = (app)=>{
    app.get('/',function(req, resp){
        resp.send(
            `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do Código </h1>
                </body> 
            </html>
        `
        )
    });

    app.get('/livros/form', function(req, resp) {
        resp.marko(require('../views/livros/form/form.marko'))
    });

    app.get('/livro', function(req, resp) {

        const livroDao = new LivroDao(db);
        livroDao.lista()
                .then(livros => resp.marko(
                    require('../views/livros/listagem/listagem.marko'),
                    {
                        livros: livros
                    }
    
                ))
                .catch(erro => console.log(erro));
    
    });

    app.post('/livros', function(req, resp) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.adiciona()
                .then()   
                .catch(erro => console.log(erro));
    });
        livroDao.lista(function(erro, resultados) {
    
            


}


// module.exports = (app) => {

//     app.get('/', function(req, resp) {
//         resp.send(
//             `
//                 <html>
//                     <head>
//                         <meta charset="utf-8">
//                     </head>
//                     <body>
//                         <h1> Casa do Código </h1>
//                     </body> 
//                 </html>
//             `
//         );
//     });

//     app.get('/livros', function(req, resp) {
//         resp.send(
//             `
//                 <html>
//                     <head>
//                         <meta charset="utf-8">
//                     </head>
//                     <body>
//                         <h1> Listagem de livros </h1>
//                     </body> 
//                 </html>
//             `
//         );
//     });

// }