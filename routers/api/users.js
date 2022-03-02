const express = require('express');
const bot = require('../../bot/bot');
const router = express.Router();

router.get('/:id', async (req, res) => {
	const userInfo = await bot.getRESTUser(req.params.id).catch((e) => {
		res.status(500).send({
			error: e.message
		});
	});
	res.json(userInfo);
});

module.exports = router;