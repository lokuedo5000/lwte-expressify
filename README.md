# Using the lwte-expressify Module

The `lwte-expressify` module is a tool that allows you to create and manage Express.js-based web servers in a Node.js application effortlessly. Below, you'll find the main functionalities and how to use them:

## Installation

Make sure Node.js is installed on your system before using this module. You can install it using npm or yarn.

```bash
npm install lwte-expressify
```

## Importing the Module

First, import the module into your Node.js file to start using it:

```javascript
const ServerBuilder = require("lwte-expressify");
const serverBuilder = new ServerBuilder();
```

## Creating a New Server

You can use the newServer method to create a new web server. This method takes a configuration object with the following parameters:

```javascript
const serverConfig = {
  name: "MyServer",
  routers: "./routes/routes.js",
  port: 3000,
  pathViews: "./my/view/path",
  pathPublic: "./my/public/path",
};

const success = await serverBuilder.newServer(serverConfig);
if (success) {
  console.log("Server created successfully.");
} else {
  console.error("Error creating the server.");
}

// You can add more servers with different names and configurations.
```

## Defining Routes in the `routes.js` File

The `routes.js` file is crucial for configuring routes for your server in "lwte-expressify". Follow these guidelines to define effective routes:

1. Create an array named `routes` to store the server's routes. Each route is defined as an object within this array.

2. Each route object must have three main properties:

   - `method`: Specifies the HTTP method used to access this route (e.g., "get," "post," "put," "delete," etc.).

   - `path`: Indicates the URL or relative path that triggers this route when accessed from the browser.

   - `handler`: Contains a function that will execute when the corresponding route is accessed. This function takes two arguments: `req` (the client's request) and `res` (the response to be sent to the client).

3. For example, the following code defines a "get" route that responds to the root path ("/") and sends a welcome message to the client when that route is accessed:

   ```javascript
   let routes = [
     {
       method: "get",
       path: "/",
       handler: (req, res) => {
         res.send("Welcome to the myApp home page!");
       },
     },
     {
       method: "get",
       path: "/home",
       handler: (req, res) => {
         res.send("Welcome to the home page");
       },
     }

     // You can add more routes this way
   ];
   module.exports = routes;
   ```

## Stopping a Server

You can stop a server using the `stopServer` method by passing the server's name as a parameter. This method closes the server and removes it from the list of active servers.

Example of stopping a server:

```javascript
const serverName = "MyServer";
const result = serverBuilder.stopServer(serverName);

if (result.response) {
  console.log(result.message);
} else {
  console.error(result.message);
}
```

## Additional Notes

- You can customize the view and public static file paths by providing `pathViews` and `pathPublic` when creating a server.
- The `isPortAvailable` function is used to check if a specific port is available before starting a server on that port.
- The module also includes additional functionalities that are commented and labeled as `coming soon` in the source code, suggesting they may be available in future versions.

This module is useful when you need to efficiently manage Express.js-based web servers within a single Node.js application.

### Developer Name

- Name: lokuedo5000
- Email: lokuedo5001@gmail.com
- GitHub profile: https://github.com/lokuedo5000

If you have any questions or need technical support, feel free to contact the developer.

If you run into any problems or need help with the `lwte-expressify` module, here are some options:

### Report a Problem

If you think you have found a bug or a problem with the module, please create an "issue" in the official repository at [GitHub](https://github.com/lokuedo5000/lwte-expressify/issues). Be sure to provide the following information when reporting a problem:

- Detailed description of the problem.
- Step by step to reproduce the problem.
- Screenshots (if applicable).
- Module version and version of Node.js that you are using.

### Community Support

If you have general questions about using the module or need guidance, you can post your questions in the "Discussions" section of the GitHub repository. The user community and the developer can help you with your queries.

### Contact Developer

If you have more specific questions or need urgent help, you can contact the developer directly through his email: lokuedo5001@gmail.com.

Please be as clear and detailed as possible when describing any issues or questions you may have. We are here to help you solve any difficulties you encounter when using `lwte-expressify`.
