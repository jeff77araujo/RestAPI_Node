const express = require('express');
const { request } = require('http');

const app = express();

const restaurants = [];
restaurants.push({
    id: 1,
    name: "Top Lanches do Marcinho",
});
restaurants.push({
    id: 2,
    name: "Dharma",
});

app.get('/restaurants', () => {
    console.log(request);
    console.log(response);
});


app.listen(3000, () => {
    console.log("Houston, we have a server!");
});