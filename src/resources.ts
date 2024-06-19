import { ImageFiltering, ImageSource, Loader, Sound } from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";

import sword from "./images/sword.png";
import logo from "./images/logo.png"
import GamificaLogo from "./images/logo-vertical.png"
import gamificacao from "./images/oqGamificacao.png"

import  pngTilesetPath from "./maps/Room_Builder_32x32.png?url"

import tsxParedesPath from "./maps/tileset_paredes.tsx?url"
import tsxGenericPath from "./maps/tileset_generic?url"
import tsxEstoquePath from "./maps/tileset_estoque?url"
import tsxBibliotecaPath from "./maps/tileset_biblioteca?url"

import tmxMapaPath from "./maps/showroom_map.tmx?url"

import playerSpritePaht from "./sprites/Player.png"
import npcSpritePaht from "./sprites/NPC.png"

import ritmada from "./sounds/ritmada_zelda.mp3"
import classico from "./sounds/zelda.mp3"

import logo1 from "./images/1.png"
import logo2 from "./images/2.png"
import logo3 from "./images/3.png"

export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  PlayerSpriteSheet: new ImageSource(playerSpritePaht, { filtering: ImageFiltering.Pixel }),
  NpcSpriteSheet: new ImageSource(npcSpritePaht, {filtering: ImageFiltering.Pixel}),
  Gamifica: new ImageSource(GamificaLogo),
  Gamificacao: new ImageSource(gamificacao),
  RitmadaBGM: new Sound(ritmada),
ClassicBGM: new Sound(classico),
Logo0: new ImageSource(logo1),
Logo1: new ImageSource(logo2),
Logo2:new ImageSource(logo3),
  Mapa: new TiledResource(tmxMapaPath, {
    pathMap: [
      { path: "showroom_map.tmx", output: tmxMapaPath },
      { path: "Room_Builder_32x32.png", output: pngTilesetPath},
      { path: "tileset_paredes.tsx", output: tsxParedesPath},
      { path: "tileset_generic", output: tsxGenericPath},
      { path: "tileset_estoque", output: tsxEstoquePath},
      { path: "tileset_biblioteca", output: tsxBibliotecaPath}
    ]
  })
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}