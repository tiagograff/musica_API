const express = require("express");
const { authMiddleware } = require("../middlewares/auth-middleware");
const { isAdmin } = require("../middlewares/isAdmin-middleware");
const filterController = require("../controllers/filter-controller");

const filtersRouter = express.Router();

//rota para filtrar albuns por artista
filtersRouter.get("/artist", filterController.findAlbunsByArtist);

module.exports = filtersRouter;
