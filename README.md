# Enterprise Hub

Enterprise Hub es una plataforma modular para la gestión empresarial, desarrollada en Angular y TypeScript. El proyecto utiliza incrustación de paquetes federados (Module Federation) para integrar múltiples aplicaciones y librerías de manera independiente y escalable.

## Características principales

- Arquitectura basada en microfrontends usando Angular y Webpack Module Federation.
- Integración de aplicaciones independientes: gestión de proyectos, analítica, login y shell principal.
- Librerías compartidas para servicios, utilidades y autenticación.
- Estilos modernos con Tailwind y SCSS.
- Backend con API Gateway y microservicios (Java + Oracle).

## Estructura del proyecto

```
enterprise-hub/
├── projects/
│   ├── shell/           # Aplicación principal (host)
│   ├── project-app/     # Microfrontend de proyectos
│   ├── analytics-app/   # Microfrontend de analítica
│   ├── login-app/       # Microfrontend de login
│   ├── shared-lib/      # Librería compartida
│   ├── auth-lib/        # Librería de autenticación
│   └── ...
├── angular.json
├── package.json
├── tailwind.config.js
├── README.md
└── ...
```

## Paquetes federados

El proyecto utiliza Webpack Module Federation para incrustar y compartir módulos entre aplicaciones. Cada microfrontend puede ser desarrollado y desplegado de forma independiente, permitiendo una integración ágil y escalable.

## Requisitos

- Node.js >= 18
- Angular CLI >= 16
- Java 21 (para backend)
- Oracle Database (para backend)

## Instalación y ejecución

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Ejecuta el shell principal:
   ```bash
   npm run start:shell
   ```
3. Ejecuta los microfrontends según sea necesario:
   ```bash
   npm run start:project-app
   npm run start:analytics-app
   # ...
   ```

## Desarrollo

- Cada microfrontend y librería tiene su propio package.json y configuración de build.
- Los módulos federados se configuran en los archivos webpack.config.js y webpack.prod.config.js de cada app.
- El shell principal orquesta la carga dinámica de los microfrontends.

## Backend

- El backend se compone de microservicios Java y un API Gateway.
- La persistencia se realiza en Oracle Database.
- Comunicación entre frontend y backend vía REST APIs.

## Créditos

Desarrollado por el equipo TCC. Para dudas o soporte, contacta a los administradores del repositorio.
