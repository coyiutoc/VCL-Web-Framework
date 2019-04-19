# Architecture

The framework runs on a web-based stack, using JsPsych for experimental logic support and D3 for visualization.

## Stack

- Javascript
- Node.js
- Express.js
- JsPsych
- D3.js
- ESDoc (for documentation)

## Structure

Below is a very high-level overview of the entire structure. Basically:

1. `conditions.js` feeds into the index to generate the UI, and send the correct identifiers for that condition.
2. Upon user input on UI, we do a GET request to obtain the correct HTML based on `base experiment`. 
3. The experiment HTML is linked to an **experiment timeline** and **model singleton class**. 
  - The timeline uses JsPsych, which helps order the presentation of what is displayed to the user.
  - The singleton class extracts the right data, balances subconditions, does any calculations necessary on a trial-by-trial basis, and sends what needs to be presented to the timeline and to the `trial HTML`, which displays all trial presentations.
4. Experimental properties, such as graphing, constants used, balancing, or the type of distribution, are fed into the singleton or into the trial HTML (since it is doing the displaying).

![image of architecture](/VCL-Web-Framework/manual/img/architecture.png)
