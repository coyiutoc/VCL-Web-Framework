# >> JND Radius

- **Task**: Discrimination
- **Method**: Forced choice with Staircase

## Specifications

**_**Note that all CAPPED variables are constants taken from the excel sheets/data file.**_**

- For a given subcondition, there are at minimum 24 trials and at maximum 52. Once a user has reached the 24th trial, we start computing for convergence by calculating an F-value to see if it is lower than the threshold. 
  - If the F-value is < `(1-CONVERGENCE_THRESHOLD)`, then the current subcondition ends, and proceeds to the next subcondition.
  - If the F-value is >= `(1-CONVERGENCE_THRESHOLD)`, then the trials continue.

### Test Procedure
- For a given subcondition's trial:
  - The BASE_RADIUS for that subcondition will be used to calculate the distribution of one plot, but we need to calculate the adjusted radius on a trial-by-trial basis.
    - _At the first presentation of a trial_, there is a need to compute the adjusted radius. 
      - If converging from above, we calculate it by: `BASE_RADIUS + INITIAL_DIFFERENCE`
      - If converging from below, we calculate it by: `BASE_RADIUS - INITIAL_DIFFERENCE`
    - _If this is NOT the first presentation of a trial_, then use the **staircase method** to calculate the adjusted radius. 
      - If converging from above:
        - If the **previous** trial was correct, adjusted radius = `previous adjusted radius - 0.002`
        - If the **previous** trial was incorrect, adjusted correlation = `previous adjusted radius + 0.006`
      - If converging from below:
        - If the **previous** trial was correct, adjusted correlation = `previous adjusted radius + 0.002`
        - If the **previous** trial was incorrect, adjusted correlation = `previous adjusted radius - 0.006`
   - Generate the shape using the BASE_RADIUS and adjusted radius.
   - Plot each shape side by side, and randomize whether the right/left areas get the base or adjusted shapes.
   - A user can make keyboard inputs with the "z" or "m" keys. "z" corresponds to the left graph, "m" corresponds to the right graph.

### Constants
These are the constants extracted from the input excel sheets. The values of these constants differ for each sub condition.

- BASE_RADIUS
- CONVERGE_FROM_ABOVE
- INITIAL_DIFFERENCE
