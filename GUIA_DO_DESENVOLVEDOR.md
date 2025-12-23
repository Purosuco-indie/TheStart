# Guia do Desenvolvedor - Puro Suco Indie Engine

Bem-vindo à documentação oficial do **Puro Suco Indie**, o motor de jogo que rejeita a perfeição em favor da expressão.

---

## 1. O Editor (Ambiente de Trabalho)

A engine agora roda dentro de um ambiente controlado, projetado para engenharia, não para arte.

-   **Top Bar**: Controle o fluxo (`RUN`, `PAUSE`, `RESET`, `STEP`).
-   **Inspector**: Veja todas as entidades da cena na barra lateral. Clique em uma para ver suas coordenadas (X, Y).
-   **Canvas**: Onde a simulação acontece.

---

## 2. A Filosofia do Traço

Antes de codar, entenda onde você está:
- **Nada é reto**: O mundo é feito de tinta, não de vetores.
- **Branco Sólido**: O canvas é limpo a cada frame com branco puro.
- **Sem Decoração**: Se não tem colisão ou função, não desenhe.

---

## 3. Arquitetura Básica

O motor roda em um loop clássico, agora gerenciado pelo Editor:

1.  **Editor Loop**: O Editor controla quando o o Game update ocorre.
2.  **Scene Reset**: Ao clicar em `RESET`, o jogo chama `game.onReset(game)` para reconstruir a cena.
3.  **Entity Lifecycle**: Entidades são gerenciadas pelo EntityManager e expostas ao Inspector.

---

## 4. Criando sua Cena

A maneira correta de inicializar uma cena é definindo `game.onReset` no seu `main.js`:

```javascript
window.addEventListener('load', () => {
    // Inicializa o Game e o Editor
    const game = new Game('gameCanvas');
    const editor = new Editor(game);

    // Define o conteúdo da cena
    game.onReset = (g) => {
        // Criar Chão
        const floor = new Entity(0, 500, 800, 50, "STRUCTURAL");
        g.add(floor);

        // Criar Jogador
        const player = new Entity(100, 100, 40, 40, "FUNCTIONAL");
        player.update = (dt) => {
             // Lógica de update
        };
        g.add(player);
    };

    // Boot
    game.init(); 
});
```

---

## 5. API Reference (Atualizado)

### `Game`
- `start()`, `pause()`, `step()`, `reset()`: Controle de estado.
- `state`: 'RUNNING', 'PAUSED', 'STOPPED'.

### `Renderer`
- `line(x1, y1, x2, y2, type)`: Desenha linha imperfeita.
- `rect(x, y, w, h, type)`: Desenha retângulo imperfeito.
- Tipos: "STRUCTURAL" (Grosso), "FUNCTIONAL" (Médio), "NARRATIVE" (Fino/Instável).

---

**Puro Suco Indie** é sobre fazer mais com menos. Boa sorte.
