"use strict";
import UserController from '../app/controllers/UserController';

const router = require('koa-router')();

router.post('/friends/register/:range', async function (ctx, next) {
    try {
        console.log(ctx.params);
        let user = ctx.request.body;
        let range = ctx.params.range;
        ctx.body = await UserController.updateIfExists(user, range);
    } catch (err) {
        ctx.throw(err.message, 500);
    }
});

router.get('/friends', async(ctx, next) => {
    try {
        ctx.body = await UserController.getUsers();
    } catch (err) {
        ctx.throw(err.message, 500);
    }
});

module.exports = router;
