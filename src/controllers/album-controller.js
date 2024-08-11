const { typeIsString, yearIsValid } = require("../functions/validation");
const albumModel = require("../models/album-model");

module.exports = {
  //GET -> /api/albuns
  getAlbuns: (req, res) => {
    const albuns = albumModel.getAllAlbuns();
    res.status(200).json(albuns);
  },
  //GET -> /api/albuns/:id
  getAlbum: (req, res) => {
    const id = req.params.id;
    const album = albumModel.getAlbunById(id);
    if (!album)
      return res.status(404).json({ message: "álbum não encontrado!" });
    res.status(200).json(album);
  },
  createAlbum: (req, res) => {
    const { title, artist, release_date, genres = [], tracks = [] } = req.body;
    const album = albumModel.registerNewAlbum(
      title,
      artist,
      release_date,
      genres,
      tracks,
      genres,
      tracks
    );
    //verificando se a data é um ano válido
    if (!yearIsValid(release_date))
      return res.status(400).json({
        message:
          "data inválida, insira um ano com 4 digitos (0000), no formato string",
      });
    //verificando tipos
    if (!typeIsString(title, artist, release_date))
      return res.status(400).json({ message: "tipo de dado inválido" });
    if (!Array.isArray(genres) || !Array.isArray(tracks))
      return res.status(400).json({ message: "tipo de dado inválido" });

    res.status(200).json(album);
  },
  //PUT -> /api/albuns/:id
  updateAlbum: (req, res) => {
    //pegando o id pelo parâmetro
    const id = req.params.id;
    //pegando informações pelo corpo da requisição
    const { title, artist, release_date, genres = [], tracks = [] } = req.body;
    //confirmando se os tipos de dados estão corretos
    if (!typeIsString(title, artist, release_date))
      return res.status(400).json({ message: "dados com valor inválidos" });
    if (!Array.isArray(genres) || !Array.isArray(tracks))
      return res.status(400).json({ message: "dados com valor inválidos" });
    //atualizando o album
    const albumToUpdate = albumModel.getAlbunById(id);
    albumToUpdate.title = title;
    albumToUpdate.artist = artist;
    albumToUpdate.release_date = release_date;
    albumToUpdate.genres = genres;
    albumToUpdate.tracks = tracks;
    res.status(200).json(albumToUpdate);
  },
  deleteAlbum: (req, res) => {
    //pegando id
    const id = req.params.id;
    //verificando se o id existe
    if (!id) return res.status(404).json({ message: "álbum não encontrado" });
    //deletando o álbum
    albumModel.deleteAlbum(id);
    res.status(200).json({ message: "álbum deletado com sucesso!" });
  },
};
