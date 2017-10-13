const path = require('path');
const Koa = require('koa');
const koaRoute = require('koa-router');
const koaStatic = require('koa-static');
const koaViews = require('koa-views');

const appDir = path.dirname(require.main.filename);

const app = new Koa();
const router = koaRoute();

router.get('/',  async (ctx) => {
	await ctx.render('index');
});

app
	.use(koaViews(`${appDir}/views`, {map: {html: 'ejs'}}))
	.use(koaStatic(`${appDir}/app`))
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(3000);
