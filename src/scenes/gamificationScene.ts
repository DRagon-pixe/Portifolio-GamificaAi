import { Actor, Color, Engine, FadeInOut, Keys, Resource, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene {
    elementoTexto?: HTMLElement

    // Método para esmaecer um elemento HTML
fadeOutElement(elemento: HTMLElement) {
    // Pegar opacidade do elemento HTML
    let opacidade = parseFloat(elemento.style.opacity)

    // Repetir diminuição da opacidade
    setInterval(() => {
        if (opacidade > 0) {
            // diminuir a opacidade
            opacidade -= 0.03
    
            // Atualizar a opacidade do elemento
            elemento.style.opacity = opacidade.toString()
        }
    },30)

}

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex("#403f4c")

        this.elementoTexto = document.createElement("div") as HTMLElement

        this.elementoTexto.style.opacity = "1"

        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto)

        this.elementoTexto.classList.add("sobre-gamificacao")

        this.elementoTexto.innerHTML = `<h2>Sobre o GamificaAi</h2>
        <p>Nossa empresa cria soluções de envolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`

        let actorOqGamificacao = new Actor({
            pos: vec(engine.halfDrawWidth - 350, engine.halfDrawHeight - 50)
        })

        let imagemOqGamificacao = Resources.Gamificacao.toSprite()
        imagemOqGamificacao.scale = vec(0.6, 0.6)
        actorOqGamificacao.graphics.add(imagemOqGamificacao)
        this.add(actorOqGamificacao)

        this.input.keyboard.on("press", (event) => {
            if (event.key = Keys.Enter) {
                // Criar transicao suave do elemento texto 
                this.fadeOutElement(this.elementoTexto!)

                engine.goToScene("exposição")
            }
        }) 
    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementoTexto?.remove()
    }
}