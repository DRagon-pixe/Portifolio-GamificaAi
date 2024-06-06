import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class historyScene extends Scene {
// Declaração do elemnetoTexto
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

// Ao entrar ou sair da cena, utiliza o feito de transicao lenta
onTransition(direction: "in" | "out"): Transition | undefined {
    return new FadeInOut({
        direction: direction,
        color: Color.Black,
        duration: 1000
    })
}

    onInitialize(engine: Engine<any>): void {

        this.backgroundColor = Color.fromHex("#403f4c")

        // Crair elemento com a descrição da empresa
        this.elementoTexto = document.createElement("div") as HTMLElement

        // Definir opacidadde do elemneto para 1 = visivel
        this.elementoTexto.style.opacity = "1"

        // Inseriri elementoTexto no container-game
        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto)

        // Adicionar classe na div criada (elementoTexto)
        this.elementoTexto.classList.add("sobre-gamifica")

        // Adicionar titulo e paragrafo dentro do conteudo da div
        this.elementoTexto.innerHTML = `<h2>O que é gamificação?</h2>
        <p>Gamificação é a aplicação de elementos típicos de jogos em contextos não lúdicos, 
        com o objetivo de engajar e motivar indivíduos a atingir determinados objetivos. Esta abordagem se utiliza de componentes como pontuação, 
        níveis, recompensas, desafios, e feedback imediato, visando promover comportamentos desejados e aumentar a participação e o comprometimento dos participantes.</p>`

        let actorLogoVertical = new Actor({  
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight - 50)
        })

        let imagemLogoVertical = Resources.Gamifica.toSprite()
        imagemLogoVertical.scale = vec(0.7, 0.7)
        actorLogoVertical.graphics.add(imagemLogoVertical)
        this.add(actorLogoVertical)

        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter) {
                // Criar transicao suave do elemento texto 
                this.fadeOutElement(this.elementoTexto!)

                // Direcionar para a proxima cena
                engine.goToScene("gamificacao")
            }
        })
    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        // Remover elemento texto da tela
        this.elementoTexto?.remove()
    }

}



// // Configurar Actor do Logo
// let actorLogo = new Actor({
//     pos: vec(engine.drawWidth / 2, 430),
// })

// // Utilizar imagem do logo
// let imagemLogo = Resources.Logo.toSprite()

// // Aplicar zoom na imagem - 40% de x, e 40% de y
// imagemLogo.scale = vec(0.4, 0.4)

// // Configurar o Actor para usar a imagem
// actorLogo.graphics.add(imagemLogo)

// // Adicionando Actor Logo na tela
// this.add(actorLogo)