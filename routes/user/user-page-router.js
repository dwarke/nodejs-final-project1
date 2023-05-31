const routes = require('express').Router();

const {home, contact, contactdata, blogsingle ,services, clinte,blog,about,resent_course} = require('../../controler/user/pages-Cuntroller')

routes.get('/home', home)
routes.get('/contactpages', contact)
routes.post('/contactcreate', contactdata)
routes.get('/blogsingle/:id', blogsingle)
routes.get('/services',services)
routes.get('/clinte',clinte)
routes.get('/blog',blog)
routes.get('/about',about)
routes.get('/resent_course',resent_course)


module.exports = routes