'use strict';

const path = require('path');
const koa = require('koa');
const router = require('koa-router')();
const serve = require('koa-static');
const views = require('co-views');

const appDir = path.dirname(require.main.filename);
const render = views(path.join(appDir, 'app'), {map: {html: 'ejs'}});

const app = koa();

router.get('/', function *() {
	this.body = yield render('index.html');
});

app
	.use(router.routes())
	.use(router.allowedMethods());

app.use(serve(`${__dirname}/app`));

app.listen(3000);
