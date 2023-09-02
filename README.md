# Documentación del Módulo lwte-expressify

`lwte-expressify` es un módulo de Node.js que proporciona una clase llamada `ServerBuilder`. Esta clase facilita la creación y configuración de aplicaciones web utilizando el framework Express.js. Ofrece una forma organizada y reutilizable de crear múltiples instancias de aplicaciones Express con diferentes rutas y configuraciones.

## Instalación

Para instalar este módulo, Abre tu terminal y ejecuta el siguiente comando:

```bash
npm install lwte-expressify
```

## Uso

Una vez que hayas instalado el módulo, puedes usarlo en tus proyectos de Node.js. Aquí tienes un ejemplo de cómo importar y usar la clase `ServerBuilder` en tu código:

```javascript
// Importar el Module
const ServerBuilder = require("lwte-expressify");

// Crear una instancia de ServerBuilder con las rutas de vistas y archivos públicos
const server = new ServerBuilder({
  viewspath: "./views",
  publicpath: "./public",
});

(async () => {
  // Crear el server 1
  const success_one = await server.newServer({
    name: "server1",
    filejs: "./router1.js",
    port: 3010,
  });

  // Respuesta
  if (success_one) {
    console.log("servidor 1 creado con exito.");
  } else {
    console.log("error al crear el servidor 1");
  }

  // Crear el server 2
  const success_two = await server.newServer({
    name: "server2",
    filejs: "./router2.js",
    port: 3020,
  });

  // Respuesta
  if (success_two) {
    console.log("servidor 2 creado con exito.");
  } else {
    console.log("error al crear el servidor 2");
  }
})();
```

## Rutas `router1.js`

```javascript
const routes = [
  {
    method: "get",
    path: "/",
    handler: (req, res) => {
      // Configuración para la ruta de Inicio
      res.send("¡Bienvenido a la página de inicio de myApp!");
    },
  },
  {
    method: "get",
    path: "/about",
    handler: (req, res) => {
      // Configuración para la ruta '/about'
      res.send("Acerca de myApp");
    },
  },
  {
    method: "post",
    path: "/submit",
    handler: (req, res) => {
      // Configuración para la ruta '/submit'
      res.json({ message: "Datos enviados correctamente" });
    },
  },
];

module.exports = routes;
```

### Url

http://localhost:3010/

## Rutas `router2.js`

```javascript
const routes = [
  {
    method: "get",
    path: "/",
    handler: (req, res) => {
      // Configuración para la ruta de Inicio
      res.send("¡Bienvenido a la página de inicio de myApp!");
    },
  },
  {
    method: "get",
    path: "/about",
    handler: (req, res) => {
      // Configuración para la ruta '/about'
      res.send("Acerca de myApp");
    },
  },
  {
    method: "post",
    path: "/submit",
    handler: (req, res) => {
      // Configuración para la ruta '/submit'
      res.json({ message: "Datos enviados correctamente" });
    },
  },
];

module.exports = routes;
```

### Url

http://localhost:3020/

### Nombre del Desarrollador

- Nombre: lokuedo5000
- Correo Electrónico: lokuedo5001@email.com
- Perfil de GitHub: https://github.com/lokuedo5000

Si tienes alguna pregunta o necesitas soporte técnico, no dudes en ponerte en contacto con el desarrollador.

Si encuentras algún problema o necesitas ayuda con el módulo `lwte-expressify`, aquí tienes algunas opciones:

### Informar un Problema

Si crees que has encontrado un error o un problema con el módulo, por favor crea un "issue" en el repositorio oficial en [GitHub](https://github.com/lokuedo5000/lwte-expressify/issues). Asegúrate de proporcionar la siguiente información al informar un problema:

- Descripción detallada del problema.
- Paso a paso para reproducir el problema.
- Capturas de pantalla (si es aplicable).
- Versión del módulo y versión de Node.js que estás utilizando.

### Soporte Comunitario

Si tienes preguntas generales sobre el uso del módulo o necesitas orientación, puedes publicar tus preguntas en la sección de "Discusiones" del repositorio en GitHub. La comunidad de usuarios y el desarrollador pueden ayudarte con tus consultas.

### Contactar al Desarrollador

Si tienes consultas más específicas o necesitas ayuda urgente, puedes ponerte en contacto directamente con el desarrollador a través de su correo electrónico: lokuedo5001@email.com.

Por favor, sé lo más claro y detallado posible al describir cualquier problema o pregunta que puedas tener. Estamos aquí para ayudarte a resolver cualquier dificultad que encuentres al utilizar `lwte-expressify`.
