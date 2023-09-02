const path = require('path');
const express = require('express');
const net = require('node:net');

class ServerBuilder {
  constructor({viewspath, publicpath}) {
    this.appInstances = {}; // Almacenará las instancias de las aplicaciones
    this.servercreate = false;

    if (!viewspath) {
      this.viewspath = path.join(__dirname, "views");
    }else{
      this.viewspath = path.join(viewspath);
    }

    if (!publicpath) {
      this.publicpath = path.join(__dirname, "public");
    }else{
      this.publicpath = path.join(publicpath);
    }


  }

  setupAppMiddleware(app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.set('view engine', 'ejs');
    app.set('views', this.viewspath);
    app.use(express.static(this.publicpath));
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

  async newServer(appRoute) {
    if (this.appInstances[appRoute.name]) {
      return true;
    }

    const portAvailable = await this.isPortAvailable(appRoute.port);

    if (!portAvailable) {
      return true;
    }

    const app = express();
    const appRoutes = require(appRoute.filejs);

    this.setupAppMiddleware(app);
    this.setupAppRoutes(app, appRoutes);

    const success = await this.startServerAsync(app, appRoute.port);

    if (success) {
      this.appInstances[appRoute.name] = {
        app
      };
      return true;
    } else {
      return false;
    }
  }

  async startServerAsync(app, port) {
    return new Promise((resolve, reject) => {
      const server = app.listen(port, () => {
        resolve(true);
      }).on('error', err => {
        resolve(false);
      });
    });
  }

  addNewRoute(appName, newRoute) {
    if (this.appInstances[appName]) {
      const app = this.appInstances[appName].app;
      // const server = this.appInstances[appName].server;

      app[newRoute.method.toLowerCase()](newRoute.path, newRoute.handler);

      console.log(`New route added to ${appName}: ${newRoute.path}`);
    } else {
      console.log(`App ${appName} not found.`);
    }
  }

  stopApp(appName) {
    if (this.appInstances[appName]) {
      const server = this.appInstances[appName].server;
      server.close();
      console.log(`Server for ${appName} stopped.`);
      delete this.appInstances[appName];
    } else {
      console.log(`App ${appName} not found.`);
    }
  }

}

module.exports = ServerBuilder;
