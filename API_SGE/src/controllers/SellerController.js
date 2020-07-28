const express = require('express');
const Seller = require('../db/schemas/seller');

const sellerRouter = express.Router();

sellerRouter.get('/', async (req, res) => {
    res.json({message: 'Acessou pelo GET'});
    let sellers = await Seller.find();

    if (sellers.length > 0) {
        res.status(200).json(sellers);
    } else {
        res.status(404).json({message: 'Nenhum dado encontrado'});
    };

});

sellerRouter.get('/', async (req, res) => {
    let username = req.params.username;
    let seller = await Seller.find({'user.username': username});

    if (seller != null && seller != undefined) {
        res.status(200).json(seller);
    } else {
        res.status(404).json({message: `Nenhum vendedor encontrado com esse nome de usuario: ${username}`});
    };
});

sellerRouter.post('/', async(req, res) => {
    const sellerBody = req.body;
    if (sellerBody != undefined && sellerBody != null) {
        const seller = new Seller(sellerBody);
        seller.save()
        .then(() => {
            res.status(200).json(seller);
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        });
    } else {
        res.status(400).json({message: 'faltou mandar o body'});
    };
});

sellerRouter.put('/: id', async(req, res) => {
    const sellerBody = req.body;
    if (!sellerBody && Object.keys(sellerBody).length > 0) {
        let documentUpdated = await Seller.updateOne({_id: id, sellerBody});

        if (documentUpdated.nModified > 0) {
            res.status(200).json({message: 'Atualizado com sucesso'})
        } else {
            res.status(500).json({message: 'Não foi possivel atualizar'})
        }
    } else {
        res.status(400).json({message: 'Informação incompleta'})
    }
});

module.exports = sellerRouter;