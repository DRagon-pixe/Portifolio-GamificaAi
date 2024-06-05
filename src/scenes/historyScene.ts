import { Actor, Color, Engine, FadeInOut, Keys, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class historyScene extends Scene {
// Declaração do elemnetoTexto
elementoTexto?: HTMLElement

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
        this.elementoTexto.innerHTML = `<h2>Sobre o GamificaAi</h2>
        <p>Nossa empresa cria soluções de envolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`

        let actorLogoVertical = new Actor({
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight - 50)
        })

        let imagemLogoVertical = Resources.Gamifica.toSprite()
        imagemLogoVertical.scale = vec(0.7, 0.7)
        actorLogoVertical.graphics.add(imagemLogoVertical)
        this.add(actorLogoVertical)

        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter) {
                engine.goToScene("gamificacao")
            }
        })
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