const path = require('path');
const express = require('express');
const net = require('node:net');

class ServerBuilder {
  constructor() {
    this.appInstances = {}; // Almacenará las instancias de las aplicaciones
    this.servercreate = false;

    // Views
    this.viewspath = path.join(__dirname, "bin", "views");

    // Public
    this.publicpath = path.join(__dirname, "bin", "public");


  }

  setupAppMiddleware(app, {pathViews, pathPublic}) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: '100mb' }));
    app.set('view engine', 'ejs');
    app.set('views', pathViews === false ? this.viewspath : pathViews);
    app.use(express.static(pathPublic === false ? this.publicpath : pathPublic));
  }

  setupAppRoutes(app, appRoutes) {
    appRoutes.forEach(route => {
      app[route.method.toLowerCase()](route.path, route.handler);
    });
  }

  async isPortAvailable(port) {
    return new Promise((resolve) => {
      const tester = net.createServer()
        .once('error', () => resolve(false))
        .once('listening', () => {
          tester.close();
          resolve(true);
        })
        .listen(port);
    });
  }

  async newServer({name, routers, port, pathViews = false, pathPublic = false}) {
    if (this.appInstances[name]) {
      return true;
    }

    const portAvailable = await this.isPortAvailable(port);

    if (!portAvailable) {
      return true;
    }

    const app = express();
    this.setupAppMiddleware(app, {pathViews, pathPublic});

    const appRoutes = require(routers);
    this.setupAppRoutes(app, appRoutes);

    const server = await this.startServerAsync(app, port);

    if (server) {
      this.appInstances[name] = {
        app,
        server
      };
      return true;
    } else {
      return false;
    }
  }

  async startServerAsync(app, port) {
    return new Promise((resolve, reject) => {
      const server = app.listen(port, () => {
        resolve(server);
      }).on('error', err => {
        resolve(false);
      });
    });
  }

  // coming soon
  // addNewRoute(appName, newRoute) {
  //   if (this.appInstances[appName]) {
  //     const app = this.appInstances[appName].app;
  //     app[newRoute.method.toLowerCase()](newRoute.path, newRoute.handler);

  //     console.log(`New route added to ${appName}: ${newRoute.path}`);
  //   } else {
  //     console.log(`App ${appName} not found.`);
  //   }
  // }

  stopServer(serverName) {
    if (this.appInstances[serverName]) {
      const server = this.appInstances[serverName].server;
      if (server) { // Verificar si 'server' está definido antes de intentar cerrarlo
        server.close();
        delete this.appInstances[serverName];
        return {
          message: `Server for ${serverName} stopped.`,
          response: true
        }
      } else {
        return {
          message: `Server for ${serverName} is not defined.`,
          response: false
        }
      }
    } else {
      return {
        message: `App ${serverName} not found.`,
        response: false
      }
    }
  }

}

module.exports = ServerBuilder;
