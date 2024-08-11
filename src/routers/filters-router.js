const express = require("express");
const { authMiddleware } = require("../middlewares/auth-middleware");
const { isAdmin } = require("../middlewares/isAdmin-middleware");
const filterController = require("../controllers/filter-controller");

const filtersRouter = express.Router();

//rota para filtrar álbuns por artista
filtersRouter.get("/artist", filterController.findAlbunsByArtist);
//rota para filtrar álbuns por ano
filtersRouter.get("/year", filterController.findAlbunsByYear);
//rota para filtar álbuns por gênero
filtersRouter.get("/genres", filterController.findAlbunsByGenres);

module.exports = filtersRouter;
