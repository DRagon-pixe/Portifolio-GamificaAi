import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";
import { Npc } from "../actors/npc";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        // Ativar o modo de Debug
        // engine.toggleDebug()

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

        // Carregar o spawnpoint do player
        let spawnPoint = tiledMap.getObjectsByName("player_spawn")[0]

        // Criação e configuração do Player
        let jogador = new Player(vec(spawnPoint.x + offsetX, spawnPoint.y + offsetY))

        // Define z-index do player, ~util se algum outro elementoficar "por cima" do jogador
        jogador.z = 1

        // Adicionar o player na cena
        this.add(jogador)
        
        // 
        let npcSpawnPointA = tiledMap.getObjectsByName("npc_0")[0]
        let npcSpawnPointB = tiledMap.getObjectsByName("npc_1")[0]
        let npcSpawnPointC = tiledMap.getObjectsByName("npc_2")[0]

        // Configurar NPC's
        let npcA = new Npc(
            vec(npcSpawnPointA.x + offsetX, npcSpawnPointA.y + offsetY),
            Color.Blue,
            "NpcA"
        )
        let npcB = new Npc(
            vec(npcSpawnPointB.x + offsetX, npcSpawnPointB.y + offsetY),
            Color.Chartreuse,
            "NpcB"
        )
        let npcC = new Npc(
            vec(npcSpawnPointC.x + offsetX, npcSpawnPointC.y + offsetY),
            Color.Yellow,
            "NpcC"
        )

        this.add(npcA)
        this.add(npcB)
        this.add(npcC)

        // Focar a camera no Player
        this.camera.strategy.lockToActor(jogador)

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