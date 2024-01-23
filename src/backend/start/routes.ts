import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })
  
  Route.resource('/responsaveis', 'ResponsaveisController').apiOnly()
  Route.resource('/almoxarifados', 'AlmoxarifadosController').apiOnly()
  Route.resource('/pecas', 'PecasController').apiOnly()
  Route.resource('/responsabilidades', 'ResponsaveisPecasController').apiOnly()
}).prefix("/api")