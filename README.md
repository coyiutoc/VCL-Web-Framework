# VCL Web Framework

This is a Node.js application that will serve as the modernization of the original VCL Java Framework.

Currently supported experiments:

## JND

| Name                           | Trial Type      | Graph Type(s)   | Balancing       |
| ------------------------------ | --------------- | --------------- | --------------- |
| Base                           | Foundational    | Scatter, Strip  | Latin Square    |
| Strip Ring Size                | Foundational    | Ring            | Latin Square    |
| Line Length Strip              | Foundational    | Strip           | Latin Square    |
| Distractor Rainbow             | Design          | Scatter         | Latin Square    |
| Multi-Phase [Task 1]           | Design-Multi    | Scatter         | Latin Square    |


## JND Radius

| Name                           | Trial Type      | Graph Type(s)   | Balancing       |
| ------------------------------ | --------------- | --------------- | --------------- |
| Circle, Square                 | Foundational    | Shape           | Random          |
| Circle, Triangle               | Foundational    | Shape           | Random          |
| Square, Triangle               | Foundational    | Shape           | Random          |
| RotatedSquare, RotatedTriangle | Foundational    | Shape           | Random          |
| Slice, Triangle                | Foundational    | Shape           | Random          |
| Slice-45, Triangle             | Foundational    | Shape           | Random          |
| Slice-90, Triangle             | Foundational    | Shape           | Random          |

## Stevens

| Name                           | Trial Type      | Graph Type(s)   | Balancing       |
| ------------------------------ | --------------- | --------------- | --------------- |
| Base                           | Foundational    | Scatter, Strip  | Latin Square    |
| Strip Ring Size                | Foundational    | Ring            | Latin Square    |
| Line Length Strip              | Foundational    | Strip           | Latin Square    |
      
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
