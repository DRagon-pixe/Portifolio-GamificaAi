import { Actor, CollisionType, Color, Engine, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Npc extends Actor {
    constructor(posicao: Vector, cor: Color, nome: string) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: nome,
            color: cor,
            collisionType: CollisionType.Fixed
        })
    }

    onInitialize(engine: Engine<any>): void {
        const NpcSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.NpcSpriteSheet,
            grid: {
                spriteHeight: 64,
                spriteWidth: 32,
                columns: 56,
                rows: 20
            },
            spacing: {
                originOffset: {
                    y: 0
                }
            }
        })

        let imagemNpc = NpcSpriteSheet.getSprite(3,0)
        imagemNpc.scale = vec(1.1, 1.1)

        this.graphics.add(imagemNpc)
    }
}