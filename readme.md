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

    Explicación de las clases más importantes:
BattleManager: Es el cerebro del simulador. Vincula los objetos de JavaScript con los elementos del DOM en HTML. Controla el flujo completo: desde inicializar las barras de vida hasta decidir el orden de los ataques basándose en la estadística de Velocidad y gestionar las animaciones.

Pokemon: Es el modelo principal de los combatientes. Encapsula toda la lógica puramente matemática del personaje (calcular vida máxima según el nivel, stats y calcular el daño crudo con STAB).

PokeAPI & TypeChart: Se han diseñado como clases estáticas (Utility Classes) ya que no requieren mantener un estado instanciado propio. Proveen servicios universales al resto de la aplicación (diccionarios de ataques y multiplicadores elementales).

Nomenclatura y Buenas Prácticas
El proyecto respeta las convenciones habituales de Clean Code para JavaScript:

Clases (Archivos y Nombres de clase): Se utiliza PascalCase para denotar que deben ser instanciadas o contienen lógica estática principal (Ej: BattleManager, TypeChart).

Variables, Propiedades y Métodos: Se utiliza camelCase con nombres descriptivos (Ej: executeTurnCycle, defenderTypes, maxHealth).

Selectores de HTML/CSS: Se ha utilizado kebab-case para los IDs y clases en el DOM (Ej: battle-scene, player-hp-fill), creando una distinción clara visual frente al código JavaScript.

Prácticas implementadas:

Desestructuración de Objetos: Usada intensivamente en constructores (ej: constructor({ name, level, types... })) para facilitar la lectura de argumentos largos.

Programación Asíncrona: Uso de async/await y Promise.all en main.js para optimizar los tiempos de carga al hacer peticiones concurrentes a la API.

Early Returns: Validación rápida en funciones (ej: if (!this.isAlive) return;) para evitar anidaciones innecesarias de bloques de código.

Repositorio y Control de Versiones
La gestión del código se ha llevado a cabo utilizando Git y GitHub, adaptando una metodología ágil:

Estructura de Ramas
production (o main): Es la rama principal de despliegue. Contiene versiones estables y funcionales del juego.

develop: Rama de integración donde se testean todas las funcionalidades antes del paso final a producción.

Prefijos de Ramas (Branching)
feature/nombre-funcionalidad: Utilizado para el desarrollo de nuevas mecánicas o secciones (ej. feature/api-integration, feature/ui-animations).

hotfix/nombre-error: Utilizado para arreglos urgentes aplicados directamente sobre la rama principal.

Convención de Commits
Se aplican las reglas de Conventional Commits para mantener un historial trazable:

feat: para nuevas características (ej. feat: añade cálculo de daño por efectividad de tipos).

fix: para solución de errores (ej. fix: corrige el consumo doble de PP al atacar).

style: para cambios estéticos y de CSS.

refactor: para mejoras de código que no alteran la funcionalidad.

Licencia y créditos
Desarrollo y Lógica: [Tu Nombre / Tu Equipo]

Datos, Estadísticas y Sprites: Obtenidos de la API REST pública PokeAPI.

Recursos Gráficos Extra: La interfaz de usuario está inspirada en los juegos clásicos de Nintendo y Game Freak.

Licencia: Distribuido bajo la Licencia MIT. Se permite el uso comercial, la modificación, la distribución y el uso privado.