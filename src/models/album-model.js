const { v4: uuid } = require("uuid");

//array armazenando os álbuns
const albuns = [
  {
    id: uuid(),
    title: "blond",
    artist: "frank ocean",
    release_date: "2016",
    genres: ["R&B", "Hip-Hop"],
    tracks: ["nikes", "ivy"],
  },
];

//exportando métodos
module.exports = {
  //exibe todos os álbuns
  getAllAlbuns: () => albuns,
  //exibe um álbum
  getAlbunById: (id) => albuns.find((album) => album.id === id),
  //registra um novo álbum
  registerNewAlbum(title, artist, release_date, genres = [], tracks = []) {
    const newAlbum = {
      id: uuid(),
      title,
      artist,
      release_date,
      genres,
      tracks,
    };
    albuns.push(newAlbum);
    return newAlbum;
  },
  //delete um álbum
  deleteAlbum(id) {
    const index = albuns.findIndex((album) => album.id === id);
    albuns.splice(index, 1);
  },
  //retornar albuns de um mesmo artista
  findAlbumByArtist(artist) {
    return albuns.filter((album) => album.artist === artist);
  },
};
