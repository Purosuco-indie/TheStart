# Guia do Desenvolvedor - Puro Suco Indie Engine

**Puro Suco Indie** é uma engine 2D Data-Driven. O código executa, mas os dados mandam.

---

## 1. O Fluxo Obrigatório

Todo jogo segue estritamente este fluxo (State Machine):
`BOOT` → `MENU` → `GAME` → `GAMEOVER`

Você não codifica esse fluxo. Ele é definido em **`src/data/flow.json`**.

---

## 2. Source of Truth (JSON)

O Editor não salva o projeto. Ele lê arquivos.
Para criar uma fase, você edita um arquivo JSON.

### Estrutura de Cena (`scene.json`)

```json
{
    "name": "Level 1",
    "type": "GAME",
    "entities": [
        {
            "id": "player1",
            "type": "FUNCTIONAL",
            "x": 100, 
            "y": 200, 
            "w": 40, 
            "h": 40,
            "behavior": "PlayerBehavior"
        }
    ]
}
```

### Comportamentos (Behaviors)

O JSON define *quem* está na cena. O Código define *o que* eles fazem.
Em `main.js` (ou seus módulos), você registra comportamentos:

```javascript
game.stateManager.loader.registerBehavior("PlayerBehavior", (ent, game) => {
    ent.update = (dt) => {
        // Lógica de movimento
    };
});
```

---

## 3. O Editor Visual

O Editor (`index.html`) é sua janela para essa máquina de estados.

-   **FLOW STATUS**: Mostra se você está no Menu ou no Jogo.
-   **HIERARCHY**: Mostra as entidades carregadas do JSON atual.
-   **RESET**: Reinicia o fluxo (volta para o estado inicial definido no flow.json).

---

## 4. Como Criar um Novo Nível

1.  Crie `src/data/level2.scene.json`.
2.  Adicione a transição em `src/data/flow.json`:
    ```json
    { "from": "GAME", "to": "LEVEL2", "trigger": "NEXT_LEVEL" }
    ```
3.  No código do Player, quando tocar na saída:
    ```javascript
    game.stateManager.trigger("NEXT_LEVEL");
    ```

Simples. Rígido. Funcional.
