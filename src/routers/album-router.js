const express = require("express");
const albumController = require("../controllers/album-controller");
const { authMiddleware } = require("../middlewares/auth-middleware");
const { isAdmin } = require("../middlewares/isAdmin-middleware");

const albumRouter = express.Router();

//rota que exibe todos os álbuns
albumRouter.get("/", albumController.getAlbuns);
//rota que exibe um álbum específico pelo id
albumRouter.get("/:id", albumController.getAlbum);
//rota para criar um novo álbum
albumRouter.post("/", authMiddleware, albumController.createAlbum);
//rota para atualizar informações do álbum
albumRouter.put("/:id", authMiddleware, isAdmin, albumController.updateAlbum);
//rota para deletar um álbum
albumRouter.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  albumController.deleteAlbum
);

module.exports = albumRouter;
