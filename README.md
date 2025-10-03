# Pokedex - Prueba Técnica Front-End Developer (Vue.js)

Esta aplicación es una Pokedex desarrollada como parte de una prueba técnica para un puesto de Front-End Developer. El objetivo era crear una lista de Pokémon, permitir a los usuarios marcar sus favoritos y ver los detalles de cada uno, todo ello consumiendo la [PokéAPI](https://pokeapi.co/).

## Stack Tecnológico y Decisiones Clave

Para este proyecto, se seleccionó un stack moderno basado en Vue.js, enfocado en la escalabilidad, el rendimiento y la mantenibilidad.

- **Framework Principal: Vue.js 3 con Composition API y `<script setup>`**
  - **Decisión:** Se utilizó Vue 3 por su rendimiento mejorado y, en particular, la **Composition API**. Esto permite organizar la lógica por funcionalidad en lugar de por opciones, lo que resulta en un código más limpio y reutilizable, especialmente visible en los archivos `composables`. El uso de `<script setup>` hace que los componentes sean más concisos y fáciles de leer.

- **Lenguaje: TypeScript**
  - **Decisión:** Se eligió TypeScript para añadir tipado estático al proyecto. Esto garantiza un desarrollo más robusto, facilita la detección de errores en tiempo de compilación y mejora la auto-documentación del código, lo cual es crucial para la mantenibilidad a largo plazo.

- **Build Tool: Vite**
  - **Decisión:** Vite fue la elección natural por su increíble velocidad de desarrollo y su eficiente sistema de build para producción. Su integración nativa con Vue.js y TypeScript simplifica enormemente la configuración.

- **Gestión de Estado: Pinia**
  - **Decisión:** Para la gestión de favoritos, se optó por Pinia, el gestor de estado oficial para Vue. Pinia ofrece una API muy intuitiva y modular. Para cumplir con el requisito de persistencia de datos sin un backend, el store de favoritos (`src/stores/favorites.ts`) utiliza **`localStorage`**. Esto permite que la lista de favoritos del usuario se conserve entre sesiones, mejorando la experiencia de usuario.

- **Routing: Vue Router**
  - **Decisión:** Se utilizó Vue Router para gestionar la navegación entre las diferentes vistas de la aplicación (`Home`, `Favorites`, `PokemonList`).

- **Estilos: Tailwind CSS**
  - **Decisión:** Se eligió Tailwind CSS por su enfoque "utility-first", que permite construir interfaces de usuario complejas y consistentes directamente en el marcado HTML sin escribir CSS personalizado. Esto agiliza el desarrollo y mantiene la consistencia visual.

- **Cliente HTTP: Axios**
  - **Decisión:** Para las llamadas a la PokéAPI, se utilizó Axios por su API basada en promesas, su facilidad de uso y su capacidad para interceptar peticiones y respuestas. Toda la lógica de la API está centralizada en el directorio `src/api`, siguiendo el principio de Responsabilidad Única.

- **Internacionalización: Vue I18n**
  - **Decisión:** Como un extra, se implementó soporte para múltiples idiomas (inglés y español).

- **Testing: Vitest y Vue Test Utils**
  - **Decisión:** Para garantizar la calidad y fiabilidad del código, se añadieron pruebas unitarias utilizando Vitest, el framework de testing diseñado para Vite. Se crearon tests para componentes clave y lógica de negocio.

## Arquitectura y Diseño de Código

La arquitectura del proyecto está diseñada para ser modular y escalable, siguiendo los principios de **SOLID** y **DRY**.

- **Estructura de Carpetas:** El código fuente (`src`) está organizado por funcionalidad (`api`, `components`, `composables`, `stores`, `views`, etc.), lo que facilita la localización y el mantenimiento del código.
- **Componentes:** Se dividen en `ui` (componentes base reutilizables como botones y inputs) y `shared` (componentes más complejos que orquestan la lógica de la aplicación).
- **Composables (Composition API):** La lógica reutilizable, como la búsqueda de Pokémon (`usePokemonSearch`) o la gestión del detalle de un Pokémon (`usePokemonDetail`), se extrajo a funciones `composables`. Esto sigue el principio **DRY** y hace que los componentes sean más ligeros y centrados en la presentación.
- **Manejo de Gran Cantidad de Datos:** Aunque la aplicación es sencilla, se pensó en la escalabilidad. La lista de Pokémon se obtiene de forma paginada desde la API y se renderiza en el cliente. Para una aplicación con muchísimos más datos, se podría implementar "scroll infinito" o una virtualización de la lista para mantener un alto rendimiento y no sobrecargar el DOM. La búsqueda también ayuda al usuario a encontrar lo que necesita sin tener que cargar toda la lista.

## Cómo ejecutar el proyecto

1.  Clonar el repositorio.
2.  Crear un archivo `.env.local` en la raíz del proyecto y añadir la siguiente variable de entorno:
    ```
    VITE_POKEAPI_BASE_URL=https://pokeapi.co/api/v2/
    ```
3.  Instalar las dependencias:
    ```bash
    npm install
    ```
4.  Ejecutar el servidor de desarrollo:
    ```bash
    npm run dev
    ```
5.  Para ejecutar los tests:
    ```bash
    npm run test:unit
    ```
