import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Sprite, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    elementotexto?: HTMLElement
    private objetoInteracao: any
    private actorEmpresa?: Actor
    private listaImagens?: Sprite[]

    private textoDACena: string = ""
    fadeOutElement: any;

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        this.elementotexto = document.createElement("div") as HTMLElement
        this.elementotexto.classList.add("texto-case")

        let containerGame = document.querySelector(".container-game")
        containerGame?.appendChild(this.elementotexto)

        // Ao precionar Esc voltar para a exposicao
        this.input.keyboard.on("press", (event) => {
            if (event.key = Keys.Esc) {
                engine.goToScene("exposição")
            }
        })

        this.actorEmpresa = new Actor({
            pos: vec(engine.drawHeight + 100, engine.drawWidth - 700)
        })

        // Carregar imagens das empresas
        let imagemLogo1 = Resources.Logo0.toSprite()
        let imagemLogo2 = Resources.Logo1.toSprite()
        let imagemLogo3 = Resources.Logo2.toSprite()

        this.listaImagens = [imagemLogo1,imagemLogo2,imagemLogo3]
    }

    onActivate(context: SceneActivationContext<unknown>): void {

        this.elementotexto!.style.opacity = "1"

        // Pegar dados vindos da cena passada
        this.objetoInteracao = context.data

        console.log(this.objetoInteracao)

        if (this.objetoInteracao.nomeDoActor == "mesa_stand_0") {
            this.elementotexto!.innerHTML = `<h2>Case Número 1</h2>
        <p>Aqui na GamificaAi, resolvemos os seus problemas com muita cratividade e eficiencia</p>`

        //  Inserir o sprite no actor da mesa 0
        this.actorEmpresa?.graphics.add(this.listaImagens![0])

        // Mudar o zoom da imagem
        this.actorEmpresa!.graphics.current!.scale = vec(0.5,0.5)
        
        }

        if (this.objetoInteracao.nomeDoActor == "mesa_stand_1") {
            this.elementotexto!.innerHTML = `<h2>Case Número 2</h2>
        <p>Nos da GamificaAi presamos pelo melhor serviço ao nosso cliente, 
        atendendo a todas suas necessidades</p>`

        //  Inserir o sprite no actor da mesa 0
        this.actorEmpresa?.graphics.add(this.listaImagens![1])

        // Mudar o zoom da imagem
        this.actorEmpresa!.graphics.current!.scale = vec(1,1)
        }

        if (this.objetoInteracao.nomeDoActor == "mesa_stand_2") {
            this.elementotexto!.innerHTML = `<h2>Case Número 3</h2>
        <p>Nos empenhando cada vez mais para transformar os seus problemas em criativas e divertidas soluções </p>`

        //  Inserir o sprite no actor da mesa 0
        this.actorEmpresa?.graphics.add(this.listaImagens![2])

        // Mudar o zoom da imagem
        this.actorEmpresa!.graphics.current!.scale = vec(1,1)
        }

        this.add(this.actorEmpresa!)

//         // Se for a mesa 0
//         if (this.objetoInteracao.nomeDoActor == "mesa_stand_0") {
//             this.textoDACena = "Essa é a descricao do case A"
//             this.backgroundColor = Color.Green
//             this.elementotexto = document.createElement("div") as HTMLElement
//             // Definir opacidadde do elemneto para 1 = visivel
//             this.elementotexto.style.opacity = "1"

//             // Inserir elementoTexto no container-game
//             let containerGame = document.querySelector(".container-game") as HTMLElement
//             containerGame.appendChild(this.elementotexto)

//             // Adicionar classe na div criada (elementoTexto)
//             this.elementotexto.classList.add("portifolio-gamifica")

//             // Adicionar titulo e paragrafo dentro do conteudo da div
//             this.elementotexto.innerHTML = `<h2>Case Número 1</h2>
//             <p>Aqui na GamificaAi, resolvemos os seus problemas com muita cratividade e eficiencia</p>`
//             this.engine.input.keyboard.on("press", (event) => {
//                 if (event.key == Keys.Escape) {
//                     this.engine.goToScene("exposição")
//                     this.elementotexto?.remove()
//                 }
//             })
//         }
//         // Se for a mesa 1
//         if (this.objetoInteracao.nomeDoActor == "mesa_stand_1") {
//             this.textoDACena = "Essa é a descricao do case B"
//             this.backgroundColor = Color.Red
//             this.elementotexto = document.createElement("div") as HTMLElement
//             // Definir opacidadde do elemneto para 1 = visivel
//             this.elementotexto.style.opacity = "1"

//             // Inserir elementoTexto no container-game
//             let containerGame = document.querySelector(".container-game") as HTMLElement
//             containerGame.appendChild(this.elementotexto)
            
//             // Adicionar classe na div criada (elementoTexto)
//             this.elementotexto.classList.add("portifolio-gamifica")

//             // Adicionar titulo e paragrafo dentro do conteudo da div
//             this.elementotexto.innerHTML = `<h2>Case Número 2</h2>
//             <p>Nos da GamificaAi presamos pelo melhor serviço ao nosso cliente, 
//             atendendo a todas suas necessidades</p>`
//             this.engine.input.keyboard.on("press", (event) => {
//                 if (event.key == Keys.Escape) {
//                     this.engine.goToScene("exposição")
//                     this.elementotexto?.remove()
//                 }
//             })
            
//         }
//         // Se for a mesa 2
//         if (this.objetoInteracao.nomeDoActor == "mesa_stand_2") {
//             this.textoDACena = "Essa é a descricao do case C"
//             this.backgroundColor = Color.Blue
//             this.elementotexto = document.createElement("div") as HTMLElement
//             // Definir opacidadde do elemneto para 1 = visivel
//             this.elementotexto.style.opacity = "1"

//             // Inserir elementoTexto no container-game
//             let containerGame = document.querySelector(".container-game") as HTMLElement
//             containerGame.appendChild(this.elementotexto)

//             // Adicionar classe na div criada (elementoTexto)
//             this.elementotexto.classList.add("portifolio-gamifica")

//             // Adicionar titulo e paragrafo dentro do conteudo da div
//             this.elementotexto.innerHTML = `<h2>Case Número 3</h2>
//             <p>Nos empenhando cada vez mais para transformar os seus problemas em criativas e divertidas soluções </p>`
//             this.engine.input.keyboard.on("press", (event) => {
//                 if (event.key == Keys.Escape) {
//                     this.engine.goToScene("exposição")
//                     this.elementotexto?.remove()
//                 }
//             })
// }
    }
        
        onDeactivate(context: SceneActivationContext<undefined>): void {
            this.elementotexto!.style.opacity = "0"
        }
}