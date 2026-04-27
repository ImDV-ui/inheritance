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