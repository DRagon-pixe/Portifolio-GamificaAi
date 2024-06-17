import { Color, Engine, FadeInOut, Scene, SceneActivationContext, Transition } from "excalibur";

export class caseScene extends Scene {
    elementoTexto?: HTMLElement
    private objetoInteracao: any

    private textoDACena: string = ""

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray
    }

    onActivate(context: SceneActivationContext<unknown>): void {
        // Pegar dados vindos da cena passada
        this.objetoInteracao = context.data

        console.log(this.objetoInteracao)

        // Se for a mesa 0
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_0") {
            this.textoDACena = "Essa é a descricao do case A"
            this.backgroundColor = Color.Green
            this.elementoTexto = document.createElement("div") as HTMLElement
            // Definir opacidadde do elemneto para 1 = visivel
            this.elementoTexto.style.opacity = "1"

            // Inserir elementoTexto no container-game
            let containerGame = document.querySelector(".container-game") as HTMLElement
            containerGame.appendChild(this.elementoTexto)

            // Adicionar classe na div criada (elementoTexto)
            this.elementoTexto.classList.add("sobre-gamifica")

            // Adicionar titulo e paragrafo dentro do conteudo da div
            this.elementoTexto.innerHTML = `<h2>Case Número 1</h2>
            <p></p>`
        }
        // Se for a mesa 1
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_1") {
            this.textoDACena = "Essa é a descricao do case B"
            this.backgroundColor = Color.Yellow
            this.elementoTexto = document.createElement("div") as HTMLElement
            // Definir opacidadde do elemneto para 1 = visivel
            this.elementoTexto.style.opacity = "1"

            // Inserir elementoTexto no container-game
            let containerGame = document.querySelector(".container-game") as HTMLElement
            containerGame.appendChild(this.elementoTexto)

            // Adicionar classe na div criada (elementoTexto)
            this.elementoTexto.classList.add("sobre-gamifica")

            // Adicionar titulo e paragrafo dentro do conteudo da div
            this.elementoTexto.innerHTML = `<h2>Case Número 2</h2>
            <p></p>`
        }
        // Se for a mesa 2
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_2") {
            this.textoDACena = "Essa é a descricao do case C"
            this.backgroundColor = Color.Blue
            this.elementoTexto = document.createElement("div") as HTMLElement
            // Definir opacidadde do elemneto para 1 = visivel
            this.elementoTexto.style.opacity = "1"

            // Inserir elementoTexto no container-game
            let containerGame = document.querySelector(".container-game") as HTMLElement
            containerGame.appendChild(this.elementoTexto)

            // Adicionar classe na div criada (elementoTexto)
            this.elementoTexto.classList.add("sobre-gamifica")

            // Adicionar titulo e paragrafo dentro do conteudo da div
            this.elementoTexto.innerHTML = `<h2>Case Número 3</h2>
            <p></p>`
        }
    }
}