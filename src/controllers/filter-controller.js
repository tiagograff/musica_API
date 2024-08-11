const albumModel = require("../models/album-model");

module.exports = {
  //fitrando albuns por artista
  findAlbunsByArtist(req, res) {
    //recebendo o artista pelos parâmetros
    const { artist } = req.body;
    //armazenando álbuns em uma const
    const artistAlbuns = albumModel.findAlbumByArtist(artist);
    //caso não exista
    if (!artistAlbuns)
      return res
        .status(404)
        .json({ message: "não há registros de álbum por este artista" });
    //retornando álbuns
    res.status(200).json(artistAlbuns);
  },
};
