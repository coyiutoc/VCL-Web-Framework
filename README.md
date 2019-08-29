# VCL Web Framework

This is a Node.js application that serves as the modernization of the original VCL Java Framework.

- Deployed on heroku [here.](https://vcl-web-framework.herokuapp.com/)
- Documentation is hosted [here.](https://ubc-vcl.github.io/VCLWebFramework/manual/README.html)

***!!! Note that the code here is an outdated version - a more up-to-date version was ported under VCL's repo [here.](https://github.com/UBC-VCL/VCLWebFramework) (only members of the lab have access). !!!***

## Local Set Up

#### (1) Git clone the repository
#### (2) Install Node

Visit the following link to download Node: [here.](https://nodejs.org/en/)

#### (3) Install Dependencies

Navigate into the folder:
```
cd VCL-Web-Framework
```
Then run:
```
npm install
```

#### (4) Run the Application

```
node app.js
```

Or alternatively, with nodemon:

```
nodemon app.js
```

The app is available at [localhost:8080](localhost:8080). If you want to access it at a different port, change the port number in app.js (line 57).
