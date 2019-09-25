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

    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
    
        livroDao.buscarPorId(id)
            .then(livro => 
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro }
                )
            )
            .catch(erro => console.log(erro));
    
    });

    app.get('/livros/form', function(req, resp) {
        resp.marko(require('../views/livros/form/form.marko'),{livro: {}})
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
        livroDao.adiciona(req.body)
                .then(resp.redirect('/livro'))   
                .catch(erro => console.log(erro));
    });

    app.put('/livros', function(req, resp) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.atualiza(req.body)
                .then(resp.redirect('/livro'))   
                .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;
    
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    
    });
    
            


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

 //}