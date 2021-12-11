const ProjectsController = require('./ProjectsController');
const UsersController = require('./UsersController')

exports.registrarControladores = (app) => {
    //Proteger endpoints de todo el controlador.
    //app.use('/projects/', authGuard, ProjectsController);
    app.use('/projects/', ProjectsController);
    app.use('/users/', UsersController);
}