import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        // Carrega o mapa
        let tiledMap = Resources.Mapa

        // Definir offset para renderização do mapa
        let offsetX = 138
        let offsetY = 80

        // Adicionar o Mapa
        tiledMap.addToScene(this, {
            pos: vec(offsetX,offsetY),
        })

        // Definir zoom da camera para aumentar um pouco a visualização
        this.camera.zoom = 1.4

        // Criação e configuração do Player
        let jogador = new Player

        // Define z-index do player, ~util se algum outro elementoficar "por cima" do jogador
        jogador.z = 1

        // Adicionar o player na cena
        this.add(jogador)

        // Adicionar colisão com cadaobjeto
        // Pegar a camada de objetos colisores
        let camadaObjetosColisores = tiledMap.getObjectLayers("ObjetosColisores")[0]

        console.log(camadaObjetosColisores);

        // Percorrer objetos com foreach e para cada objeto, renderizar um actor
        camadaObjetosColisores.objects.forEach(objeto => {
            const objetoAtual = new Actor({
                name: objeto.name,
                x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
                y: objeto.y + offsetY + (objeto.tiledObject.height! / 2),
                width: objeto.tiledObject.width,
                height: objeto.tiledObject.height,
                collisionType: CollisionType.Fixed
            })

            // Adicionar o colisor do objeto na cena
            this.add(objetoAtual)
        })
    }
}