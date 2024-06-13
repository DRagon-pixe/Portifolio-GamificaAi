import { Actor, CollisionType, Color, Engine, Keys, SpriteSheet, Vector, vec, Animation} from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
    // Propriedade do player
    private velocidade: number = 180

    // Configuração do Player
    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: "jogador",
            color: Color.Red,
            collisionType: CollisionType.Active
        })
    }

    onInitialize(engine: Engine<any>): void {
        // Configurar sprite do player
        const PlayerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerSpriteSheet,
            grid: {
                spriteHeight: 64,
                spriteWidth: 32,
                columns: 56,
                rows: 20
            },
            spacing: {
                originOffset: {
                    y: 8
                }
            }
        })

        let imagemPlayer = PlayerSpriteSheet.getSprite(3, 0)
        imagemPlayer.scale = vec(1.1, 1.1)

        this.graphics.add(imagemPlayer)

        // Criar as animacoes
        const duracaoFrameAnimacao = 100
        // Animacao idle
        // idle esquerdo
        const leftIdle = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(12,1) },
                { graphic: PlayerSpriteSheet.getSprite(13,1) },
                { graphic: PlayerSpriteSheet.getSprite(14,1) },
                { graphic: PlayerSpriteSheet.getSprite(15,1) },
                { graphic: PlayerSpriteSheet.getSprite(16,1) },
                { graphic: PlayerSpriteSheet.getSprite(17,1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("left-idle", leftIdle)
        this.graphics.use("left-idle")

        // Confugurar player para monitorar evento "holf" => segurar tecla
        engine.input.keyboard.on("hold", (event) => {
            // Detectar qual tecla está pressionada
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    // Mover para esquerda
                    // Definir a velocidade x para negativa, que significa movimentar o player para a esquerda
                    this.vel.x = -this.velocidade
                    break;
                case Keys.Right:
                case Keys.D:
                    this.vel.x = this.velocidade
                    break;
                case Keys.Up:
                case Keys.W:
                    this.vel.y = -this.velocidade
                    break;
                case Keys.Down:
                case Keys.S:
                    this.vel.y = this.velocidade
                    break;
                default:
                    // this.vel.x = 0
                    // this.vel.y = 0

                    this.vel = vec(0,0)
                    break;
            }
        })

        // Configura o player para monitorar o evento "release" -> soltar
        engine.input.keyboard.on("release", (event) => {
            // Fazer o player parar ao soltar as teclas de movimentação lateral
            if (
                event.key == Keys.A ||
                event.key == Keys.Left ||
                event.key == Keys.D ||
                event.key == Keys.Right
            ) {
                // Zerar a velociade horizontal
                this.vel.x = 0
            }
            // Fazer o player parar ao soltar as teclas de movimentação horizonatl
            if (
                event.key == Keys.W ||
                event.key == Keys.Up ||
                event.key == Keys.S ||
                event.key == Keys.Down
            ) {
                // Zerar a velociade vertical
                this.vel.y = 0
            }
        })
    }


    
}