const routes = require('express').Router();
const passport = require('passport');
const Imageupload = require('../../midelweer/multer');

const { resentcreat, deletrecrent, aactive, ddeactive, editrecrnt, recentupdate } = require('../../controler/admin/recent-Cuntroller');

routes.post('/resentcreat', Imageupload, resentcreat);
routes.get('/deletrecrent/:id', deletrecrent)
routes.get('/aactive/:_id', aactive);
routes.get('/ddeactive/:_id', ddeactive);
routes.get('/editrecrnt/:_id', editrecrnt)
routes.post('/recentupdate/:_id', Imageupload, recentupdate)

const { postcreate, postdelete, actives, deactives, postedit, updatedpost } = require('../../controler/admin/post_cuntroller');

routes.post('/postcreate', Imageupload, postcreate);
routes.get('/deletepost/:id', postdelete)
routes.get('/postactive/:id', actives)
routes.get('/postdeactive/:id', deactives)
routes.get('/editpost/:id', postedit)
routes.post('/updatedpost/:id', Imageupload, updatedpost)


module.exports = routes;