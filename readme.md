---
title: Pokémon Battle Simulator

---

# Pokémon Battle Simulator

## Introducción

Este proyecto es un simulador interactivo de combates Pokémon por turnos en el que el jugador se enfrenta a un enemigo salvaje aleatorio. A través de una interfaz retro que emula los juegos clásicos, la aplicación calcula estadísticas, daño y efectividad de tipos en tiempo real basándose en los datos oficiales de la franquicia. 

Esta documentación tiene como objetivo proporcionar una visión clara y estructurada de la arquitectura del proyecto. Para el desarrollo se han utilizado **HTML5**, **CSS3** (con variables, Flexbox/Grid y animaciones nativas) y **JavaScript (ES6 Modules)** puro sin frameworks adicionales. Los datos de las criaturas, tipos y estadísticas se obtienen de forma dinámica y asíncrona consumiendo la API REST pública de [PokeAPI](https://pokeapi.co/).

---

## Estructura de archivos

El proyecto sigue una arquitectura modular basada en la Separación de Responsabilidades (Separation of Concerns). La estructura es la siguiente:

* **`/index.html`**: Punto de entrada principal. Contiene el esqueleto de la interfaz de usuario (UI), las barras de vida y el panel de acciones.
* **`/css/styles.css`**: Hoja de estilos única que maneja el diseño responsive, las variables de colores, el aspecto retro (fuente pixelada) y las animaciones de ataque y daño.
* **`/js/main.js`**: Script orquestador. Inicia la aplicación, solicita los datos a la API de forma concurrente y arranca el gestor del combate.
* **`/js/api/PokeAPI.js`**: Servicio estático encargado de las peticiones `fetch` a la PokeAPI externa, el formateo de los datos brutos y la asignación del diccionario de movimientos.
* **`/js/classes/`**:
  * `Pokemon.js`: Modelo de datos que representa a un Pokémon en combate. Gestiona sus estadísticas vitales y cálculos de daño base.
  * `Move.js`: Modelo de datos que define un ataque individual, calculando su coste de PP y su probabilidad de acierto.
* **`/js/game/`**:
  * `BattleManager.js`: Controlador principal de la lógica del juego. Maneja el estado de la partida, los turnos de la IA y actualiza el DOM dinámicamente.
  * `TypeChart.js`: Clase estática que contiene la tabla de efectividad de tipos y calcula los multiplicadores de daño.

**Justificación:** Se ha separado la lógica de consumo de red (`api/`), la definición de modelos puros (`classes/`), y las mecánicas del juego/interfaz (`game/`). El uso de módulos de ES6 (`import`/`export`) evita la contaminación del scope global y facilita la mantenibilidad.

---

## Diagrama de clases y Arquitectura

El sistema utiliza **Composición de Objetos** y **Métodos Estáticos** para estructurar la lógica. A continuación se expone el diagrama general:

```mermaid
classDiagram
    class main {
        +DOMContentLoaded()
    }
    class BattleManager {
        +Pokemon player
        +Pokemon enemy
        +Object ui
        +initBattle()
        +setupActionButtons()
        +updateUI()
        +resolveAttack(attacker, defender, move)
        +executeTurnCycle(playerMove)
    }
    class Pokemon {
        +String name
        +int level
        +int health
        +int maxHealth
        +Array types
        +Array moves
        +boolean isAlive
        +takeDamage(amount)
        +calculateDamage(move, defender)
    }
    class Move {
        +String name
        +String type
        +int power
        +int pp
        +use()
    }
    class PokeAPI {
        <<static>>
        +Object moveDictionary
        +getPokemon(id, level)$
    }
    class TypeChart {
        <<static>>
        +Object effectivity
        +getMultiplier(moveType, defenderTypes)$
    }

    main --> PokeAPI : Llama para obtener datos
    main --> BattleManager : Instancia e Inicia
    BattleManager --> Pokemon : Controla (Jugador y Enemigo)
    Pokemon *-- Move : Composición (Tiene varios)
    Pokemon ..> TypeChart : Consulta efectividad
    PokeAPI ..> Pokemon : Crea instancias
    PokeAPI ..> Move : Crea instancias