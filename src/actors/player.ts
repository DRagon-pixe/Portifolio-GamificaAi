import { Actor, CollisionType, Color, Engine, Keys, SpriteSheet, Vector, vec, Animation, Collider, CollisionContact, Side} from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
    // Propriedade do player
    private velocidade: number = 180
    private ultimaDirecao: string = "down"

    private temObjetoProximo: boolean = false
    private ultimoColisor?: Collider

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
                    y: 0
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
        // this.graphics.use("left-idle")

        const rightIdle = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(0,1) },
                { graphic: PlayerSpriteSheet.getSprite(1,1) },
                { graphic: PlayerSpriteSheet.getSprite(2,1) },
                { graphic: PlayerSpriteSheet.getSprite(3,1) },
                { graphic: PlayerSpriteSheet.getSprite(4,1) },
                { graphic: PlayerSpriteSheet.getSprite(5,1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("right-idle", rightIdle)
        // this.graphics.use("right-idle")

        const upIdle = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(6,1) },
                { graphic: PlayerSpriteSheet.getSprite(7,1) },
                { graphic: PlayerSpriteSheet.getSprite(8,1) },
                { graphic: PlayerSpriteSheet.getSprite(9,1) },
                { graphic: PlayerSpriteSheet.getSprite(10,1) },
                { graphic: PlayerSpriteSheet.getSprite(11,1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("up-idle", upIdle)
        // this.graphics.use("up-idle")

        const downIdle = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(18,1) },
                { graphic: PlayerSpriteSheet.getSprite(19,1) },
                { graphic: PlayerSpriteSheet.getSprite(20,1) },
                { graphic: PlayerSpriteSheet.getSprite(21,1) },
                { graphic: PlayerSpriteSheet.getSprite(22,1) },
                { graphic: PlayerSpriteSheet.getSprite(23,1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("down-idle", downIdle)
        // this.graphics.use("down-idle")

        const leftWalk = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(12,2) },
                { graphic: PlayerSpriteSheet.getSprite(13,2) },
                { graphic: PlayerSpriteSheet.getSprite(14,2) },
                { graphic: PlayerSpriteSheet.getSprite(15,2) },
                { graphic: PlayerSpriteSheet.getSprite(16,2) },
                { graphic: PlayerSpriteSheet.getSprite(17,2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("left-walk", leftWalk)
        // this.graphics.use("left-walk")

        const rightWalk = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(0,2) },
                { graphic: PlayerSpriteSheet.getSprite(1,2) },
                { graphic: PlayerSpriteSheet.getSprite(2,2) },
                { graphic: PlayerSpriteSheet.getSprite(3,2) },
                { graphic: PlayerSpriteSheet.getSprite(4,2) },
                { graphic: PlayerSpriteSheet.getSprite(5,2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("right-walk", rightWalk)
        // this.graphics.use("right-walk")

        const upWalk = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(6,2) },
                { graphic: PlayerSpriteSheet.getSprite(7,2) },
                { graphic: PlayerSpriteSheet.getSprite(8,2) },
                { graphic: PlayerSpriteSheet.getSprite(9,2) },
                { graphic: PlayerSpriteSheet.getSprite(10,2) },
                { graphic: PlayerSpriteSheet.getSprite(11,2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("up-walk", upWalk)
        // this.graphics.use("up-walk")

        const downWalk = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(18,2) },
                { graphic: PlayerSpriteSheet.getSprite(19,2) },
                { graphic: PlayerSpriteSheet.getSprite(20,2) },
                { graphic: PlayerSpriteSheet.getSprite(21,2) },
                { graphic: PlayerSpriteSheet.getSprite(22,2) },
                { graphic: PlayerSpriteSheet.getSprite(23,2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("down-walk", downWalk)
        // this.graphics.use("down-walk")

        // Confugurar player para monitorar evento "holf" => segurar tecla
        engine.input.keyboard.on("hold", (event) => {
            // Detectar qual tecla está pressionada
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    // Mover para esquerda // Definir animação
                    this.graphics.use("left-walk")
                    // Definir a velocidade x para negativa, que significa movimentar o player para a esquerda
                    this.vel.x = -this.velocidade
                    this.ultimaDirecao = "left"

                    break;
                case Keys.Right:
                case Keys.D:
                    this.graphics.use("right-walk")
                    this.vel.x = this.velocidade
                    this.ultimaDirecao = "right"
                    break;
                case Keys.Up:
                case Keys.W:
                    this.graphics.use("up-walk")
                    this.vel.y = -this.velocidade
                    this.ultimaDirecao = "up"
                    break;
                case Keys.Down:
                case Keys.S:
                    this.graphics.use("down-walk")
                    this.vel.y = this.velocidade
                    this.ultimaDirecao = "down"
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
            // if (
            //     event.key == Keys.A ||
            //     event.key == Keys.Left
            // ) {
            //     this.graphics.use("left-idle")
            //     // Zerar a velociade horizontal
            //     this.vel.x = 0
            // } if (
            //     event.key == Keys.D ||
            //     event.key == Keys.Right
            // ) {
            //     this.graphics.use("right-idle")
            //     this.vel.x = 0
            // }

            // // Fazer o player parar ao soltar as teclas de movimentação horizonatal
            // if (
            //     event.key == Keys.W ||
            //     event.key == Keys.Up 
            //     ) {
            //         this.graphics.use("up-idle")
            //         // Zerar a velociade vertical
            //         this.vel.y = 0
            //     }
            // if (
            //     event.key == Keys.S ||
            //     event.key == Keys.Down
            //     ) {
            //         this.graphics.use("down-idle")
            //         this.vel.y = 0
            //     }

            if (
                event.key == Keys.A ||
                event.key == Keys.Left||
                event.key == Keys.D ||
                event.key == Keys.Right
            ) {
                this.vel.x = 0
            } if (
                event.key == Keys.W ||
                event.key == Keys.Up ||
                event.key == Keys.S ||
                event.key == Keys.Down
            ) {
                this.vel.y = 0
            } if (this.vel.x == 0 && this.vel.y == 0) {
                this.graphics.use(this.ultimaDirecao + "-idle")
            }
        })

        // Configura o player para monitorar o evento "press" -> pressionar
        engine.input.keyboard.on("press", (event) => {
            // Se a tecla pressionada for a F e tiver objeto proximo
            if (event.key == Keys.F && this.temObjetoProximo) {
                // Identificar o alvo da interação
                if (this.ultimoColisor?.owner.name == "mesa_stand_0") {
                    console.log("Essa é a mesa 0")
                    // Vai para a cena passando qual o objeto da interacao
                    engine.goToScene("case", {
                        sceneActivationData:{
                            // Passa o nome do Actor que interagiu com o Player
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
                }
                if (this.ultimoColisor?.owner.name == "mesa_stand_1") {
                    console.log("Essa é a mesa 1")
                    engine.goToScene("case", {
                        sceneActivationData:{
                            // Passa o nome do Actor que interagiu com o Player
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
                }
                if (this.ultimoColisor?.owner.name == "mesa_stand_2") {
                    console.log("Essa é a mesa 2")
                    engine.goToScene("case", {
                        sceneActivationData:{
                            // Passa o nome do Actor que interagiu com o Player
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
                }
            }
        })
    }

    onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        // Indicar que tem um objeto proximo
        this.temObjetoProximo = true

        // Registrar o ultimo objeto colidido
        this.ultimoColisor = other
    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        // Detectar se oplayer está distante do último objeto colido
        if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) > 100) {
            // Marcar que o objeto não está próximo
            this.temObjetoProximo = false

            console.log("Está longe");
        }
    }
    
}