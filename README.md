# Puro Suco Indie Engine

> **Um motor de jogo 2D minimalista, imperfeito e honesto.**

O **Puro Suco Indie Engine** é uma micro-engine open source construída sobre uma filosofia de design rígida: **restrição gera criatividade**. Ele roda diretamente no navegador, usando JavaScript puro e HTML5 Canvas, sem dependências, sem bibliotecas externas e sem excessos.

Este motor não é para todos. Ele é para quem aceita que o traço humano é superior à perfeição vetorial.

---

## 🏛 Filosofia

O motor impõe uma linguagem visual não negociável:

1.  **O Mundo é Branco**
    Não existe "fundo transparente". O vazio é branco sólido (#FFFFFF). O contraste máximo é a base de tudo.
2.  **A Imperfeição é a Lei**
    Linhas retas não existem. O motor desenha **traços**. Eles tremem, variam de espessura e falham. A perfeição vetorial é rejeitada em favor da "tinta digital".
3.  **Cor é Informação**
    Não há decoração. Se algo é vermelho, é perigoso. Se é preto, é estrutura. Se não tem função, não existe.

---

## ⚙️ Arquitetura

O motor segue uma arquitetura modular e transparente:

-   **Loop de Jogo**: Controle preciso via `requestAnimationFrame` com cálculo de `deltaTime` para física consistente.
-   **Entidades**: Sistema simples de objetos com métodos `update()` e `draw()`.
-   **Renderizador Abstrato**: Camada que substitui o `ctx` nativo. Você não desenha linhas; você pede ao motor para "riscar" algo, e ele decide como a tinta se comporta.
-   **Colisão AABB**: Física simples de caixas delimitadoras. O que você vê (traço) é uma representação do que existe (caixa lógica).

---

## 🛠 Como Usar

### 1. Estrutura Básica

Basta incluir o script principal em seu HTML:

```html
<canvas id="gameCanvas"></canvas>
<script src="src/main.js"></script>
```

### 2. Criando um Jogo

```javascript
/* Exemplo Conceitual */
const game = new Game();

const player = new Entity(50, 50, 20, 20);
player.draw = (renderer) => {
    // Desenha um quadrado com "Traço Funcional" (interativo)
    renderer.rect(player.x, player.y, player.w, player.h, "FUNCTIONAL");
};

game.add(player);
game.start();
```

---

## 🚦 Tipos de Traço

O motor entende três intenções de desenho:

-   **ESTRUTURAL**: Paredes, chão. Espesso, sólido, confiável. Raramente falha.
-   **FUNCIONAL**: Jogador, inimigos, caixas. Espessura média. Pode desaparecer ou quebrar dependendo do estado.
-   **NARRATIVO**: Efeitos, vento, impacto. Fino, instável, muito ruído. Existe apenas no momento.

---

## 📦 Licença

MIT License.
Construído para a comunidade indie que valoriza a essência sobre a forma.
