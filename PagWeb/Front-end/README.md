# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# PW AT

Este proyecto es una aplicación web diseñada para facilitar la liquidación de impuestos y otros trámites tributarios. La aplicación está construida utilizando tecnologías modernas como JavaScript, React, Vite y Node.js.

## Dependencias

### Front-end

Para el front-end, necesitarás instalar las siguientes dependencias:

- react
- react-dom
- react-router-dom
- @vitejs/plugin-react-swc

### Back-end

Para el back-end, necesitarás instalar las siguientes dependencias:

- express

### DevDependencies

Para el desarrollo, necesitarás instalar las siguientes devDependencies:

- eslint
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Clona el repositorio:
    ```bash
    git clone <url-del-repositorio>
    ```

2. Navega a la carpeta del proyecto:
    ```bash
    cd PW_AT/pagWeb/Front-end
    ```

3. Instala las dependencias del front-end:
    ```bash
    npm install
    ```

4. Navega a la carpeta del back-end:
    ```bash
    cd ../Back-end
    ```

5. Instala las dependencias del back-end:
    ```bash
    npm install
    ```

## Ejecución del Proyecto

### Front-end

Para ejecutar el front-end, usa el siguiente comando dentro de la carpeta `Front-end`:

```bash
npm run dev

Uso de la Aplicación
Abre tu navegador y navega a http://localhost:3000.
Explora las diferentes secciones de la aplicación usando la barra de navegación.
En la sección de "Liquidación de Impuestos", completa el formulario para calcular el interés y otros detalles relacionados con los impuestos.
Contribuciones
Si deseas contribuir a este proyecto, por favor sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza los cambios necesarios y haz commit (git commit -m 'Agrega nueva funcionalidad').
Sube los cambios a tu fork (git push origin feature/nueva-funcionalidad).
Crea un Pull Request hacia el repositorio original.