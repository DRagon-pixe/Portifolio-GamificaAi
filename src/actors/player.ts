import { Actor, CollisionType, Color, Engine, Keys, vec } from "excalibur";

export class Player extends Actor {
    // Propriedade do player
    private velocidade: number = 180

    // Configuração do Player
    constructor() {
        super({
            pos: vec(617, 550),
            width: 32,
            height: 32,
            name: "Jugador",
            color: Color.Red,
            collisionType: CollisionType.Active
        })
    }

    onInitialize(engine: Engine<any>): void {
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