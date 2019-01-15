# VCL Web Framework

This is a Node.js application that will serve as the modernization of the original VCL Java Framework.

Currently supported experiments:

| Name                           | Base Experiment | Trial Type      | Graph Type(s)   | Balancing       |
| ------------------------------ | --------------- | --------------- | --------------- | --------------- |
| Base                           | JND             | Foundational    | Scatter, Strip  | Latin Square    |
| Distractor Rainbow             | JND             | Design          | Scatter         | Latin Square    |
| Multi-Phase [Task 1]           | JND             | Design-Multi    | Scatter         | Latin Square    |
| Circle, Square                 | JND             | Foundational    | Shape           | Random          |
| Circle, Triangle               | JND             | Foundational    | Shape           | Random          |
| Square, Triangle               | JND             | Foundational    | Shape           | Random          |
| RotatedSquare, RotatedTriangle | JND             | Foundational    | Shape           | Random          |
| Slice, Triangle                | JND             | Foundational    | Shape           | Random          |
| Slice-45, Triangle             | JND             | Foundational    | Shape           | Random          |
| Slice-90, Triangle             | JND             | Foundational    | Shape           | Random          |
| Base                           | Stevens         | Foundational    | Scatter, Strip  | Latin Square    |
      
1/2/2019 - Madison's Visual Search + Numerosity experiments from December 2018 can be found [here.](https://github.com/Wongelawit/Correlation_MultipleEnsemble/tree/Numerosity-Task)
  
## Prerequisites

#### (1) Git clone the repository
#### (2) Install Node

Visit the following link to download Node: [here.](https://nodejs.org/en/)

#### (3) Install Dependencies

Navigate into the folder then run:

```
npm install
```

## Running the Experiment

```
node app.js
```

Or alternatively, with nodemon:

```
nodemon app.js
```

The app is available at [localhost:8080](localhost:8080). If you want to access it at a different port, change the port number in app.js (line 57). 
