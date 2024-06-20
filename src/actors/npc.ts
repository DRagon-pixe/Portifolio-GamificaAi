import { Actor, CollisionType, Color, Engine, SpriteSheet, Animation, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Npc extends Actor {
    constructor(posicao: Vector, nome: string) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: nome,
            collisionType: CollisionType.Fixed
        })
    }

    onInitialize(engine: Engine<any>): void {
        // Carregar os Sprites
        const spriteNpcA = SpriteSheet.fromImageSource({
            image: Resources.NpcASpriteSheet,
            grid: {
                spriteHeight: 64,
                spriteWidth: 32,
                columns: 56,
                rows: 20
            }
        })
        const spriteNpcB = SpriteSheet.fromImageSource({
            image: Resources.NpcBSpriteSheet,
            grid: {
                spriteHeight: 64,
                spriteWidth: 32,
                columns: 56,
                rows: 20
            }
        })
        const spriteNpcC = SpriteSheet.fromImageSource({
            image: Resources.NpcCSpriteSheet,
            grid: {
                spriteHeight: 64,
                spriteWidth: 32,
                columns: 56,
                rows: 20
            }
        })

        // Definir o sprite de acordo com o Npc
        let spriteDefinido

        if(this.name == "npc_0") {
            spriteDefinido = spriteNpcA
        }
        else if (this.name = "npc_1") {
            spriteDefinido = spriteNpcB
        }
        else if (this.name = "npc_2") {
            spriteDefinido = spriteNpcC
        }
        else {
            console.log("Nome do NPC não previsto", this.name)
        }

        // Se tiver um spriteDefinido, Criar animacao
        if (spriteDefinido) {
            const downIdle = new Animation({
                frames: [
                    { graphic: spriteDefinido.getSprite(18, 1) },
                    { graphic: spriteDefinido.getSprite(19, 1) },
                    { graphic: spriteDefinido.getSprite(20, 1) },
                    { graphic: spriteDefinido.getSprite(21, 1) },
                    { graphic: spriteDefinido.getSprite(22, 1) }
                ],
                frameDuration: 70
            })
            this.graphics.add(downIdle)
        }





        // const NpcSpriteSheet = SpriteSheet.fromImageSource({
        //     image: Resources.NpcSpriteSheet,
        //     grid: {
        //         spriteHeight: 64,
        //         spriteWidth: 32,
        //         columns: 56,
        //         rows: 20
        //     },
        //     spacing: {
        //         originOffset: {
        //             y: 0
        //         }
        //     }
        // })
        // let imagemNpc = NpcSpriteSheet.getSprite(3,0)
        // imagemNpc.scale = vec(1.1, 1.1)
        // this.graphics.add(imagemNpc)
    }
}