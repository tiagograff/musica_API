const { yearIsValid, typeIsString } = require("../functions/validation");
const albumModel = require("../models/album-model");

module.exports = {
  //fitrando albuns por artista
  findAlbunsByArtist(req, res) {
    //recebendo o artista pelos parâmetros
    const { artist } = req.body;
    //armazenando álbuns em uma const
    const artistAlbuns = albumModel.findAlbumByArtist(artist);
    //caso não exista
    if (!artistAlbuns || artistAlbuns.length === 0)
      return res
        .status(404)
        .json({ message: "não há registros de álbum por este artista" });
    //retornando álbuns
    res.status(200).json(artistAlbuns);
  },
  //buscando álbuns por ano
  findAlbunsByYear(req, res) {
    //pegando o ano
    const { year } = req.body;
    if (!yearIsValid(year) || !typeIsString(year))
      return res.status(400).json({
        message:
          "data inválida, insira um ano com 4 digitos (0000), no formato string",
      });
    //armazenando albuns em uma const
    const yearAlbuns = albumModel.findAlbumByReleaseDate(year);
    //caso não exista
    if (!yearAlbuns || yearAlbuns.length === 0)
      return res
        .status(404)
        .json({ message: "não há albuns cadastrados neste ano" });
    //retornando álbuns
    res.status(200).json(yearAlbuns);
  },
  //buscando álbuns por gênero
  findAlbunsByGenres: (req, res) => {
    //pegando o gênero
    const { genre } = req.body;
    //verificando tipo
    if (!typeIsString(genre))
      return res
        .status(400)
        .json({ message: "o gênero precisa ser uma string" });
    //armazenando álbuns em uma const
    const genreAlbuns = albumModel.findAlbumByGenre(genre);
    //caso não exista
    if (!genreAlbuns || genreAlbuns.length === 0)
      return res
        .status(404)
        .json({ message: "não há albuns cadastrados com este gênero" });
    //retornando álbuns
    res.status(200).json(genreAlbuns);
  },
};
