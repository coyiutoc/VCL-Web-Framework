# Terminology

Below is common terminology the lab uses when describing experiments.

## Describing an Experiment

Every experiment has the following:

- **Experiment** : the type of task to be performed.
- **Condition** : dictated by the task, the method(s) used, and the stimuli type.
- **Subcondition** : a set of stable constants.
- **Trial** : marked by the user making a meaningful response/input that is purposely recorded.
  - E.g. I am trying to adjust the correlation of a specific plot to be the midpoint between a plot with a high correlation, and a plot with a lower correlation. The final correlation that I have adjusted marks the relevant trial data to be saved.
- **Action** : the actions a user can make within a trial.
  - E.g. In the above trial example, I can be taking actions to increase or decrease my correlation.

### **Task**
The decision task defined in terms of the stimuli and question posed.
- **Detection** : "there may be any number of alternative stimuli, but one is blank, and the observer is asked only to distinguish between the blank and the other stimuli."
- **Discrimination** : "there are any number of alternative stimuli, but one of the stimuli (which need not be blank), is designated as the reference, and the observer is asked only to distinguish between the reference and other stimuli."

### **Method** 
- **Forced Choice** : "traditionally characterized by two separate stimulus presentations, one blank and one nonblank, in random order. The two stimuli may be presented successively or side by side. The observer is asked whether the nonblank stimulus was first or second (or on the left or right)."
- **Matching** : "two stimuli are presented, and the observer is asked to adjust one to match the other."
- **Staircase** : "for difference thresholds, a variable stimulus is adjusted to increase its absolute difference from a standard stimulus whenever the difference is not discriminated or is adjusted to decrease its absolute difference from the standard stimulus whenever the difference is discriminated."
   - _**E.g.**_ We have two scatter plots side by side. Let us say plot A has r = 0.5 and plot B has r = 0.8. The task is to pick the plot with the higher correlation.
     - _You correctly pick plot B:_ So the next trial will be harder, in that the correlations of the two plots are now closer together. For example, plot A would have r = 0.5 and plot B would have r = 0.7.  
     - _You incorrectly pick plot A:_ So the next trial will be easier, in that the correlations of the two plots are now wider apart. For example, plot A would have r = 0.5 and plot B would have r = 0.9.

### **Properties** 
- **Balancing** : the ways in which the subconditions for a given condition are ordered.
   - Random
   - Latin-Square
- **Graph Type** : e.g. scatter plots, ring plots, strip plots, shapes 
- **Graphical Manipulation**: 
  - May be on how the points are plotted e.g. for strip plots, a y coordinate defines the horizontal translation of the "strip" and x coordinate defines the height of the "strip".
  - May be in terms of how many distributions are plotted on the same graph e.g. on the same axes, we can have TWO scatter plots with different correlations.


---
Definitions adapted from:

_D. G., & Farell, B. (lOlD). Psychophysical methods. In M. Bass, C. DeCusatis. J. Enoch, V. Lakshmit1arayanan. G. U, C. MacDonald, V. Mahajan & E. V. Stryland (Eds,), Handbook 01 Optics. Third Edition, VDlume III: Visioo and Vision Optics (w. 3.1-3.12). New Yori<: McGraw+liR. http:// psych.nyu,edu/pelilpubslpelIi20 IOpsychophysical-methods,pdt_


## Condition Identifiers

Each condition is uniquely defined by 4 properties.

### **Base Experiment**

Defines the underlying procedural logic of the experiment.

- JND
- Stevens
- Equalizer
- Estimation

### **Trial Structure**

The trial structure represents the range or pattern of correlation values, and defines a set of constants for each subcondition. Each condition can follow these pattern of values, or use it's own custom structure.

The two main types of patterns are Design or Foundational.

- Foundational : 17 subconditions, base correlation is in the range of [0.0, 0.9] in 0.1 increments.
- Design       : 15 subconditions, grouped into five sets with base correlation values set at 0.3, 0.6, 0.9.
- Estimation
- Custom       : used when a condition does not follow any of the above structures.

### **Balancing**

How subconditions in a given condition get ordered.

- Randomized
- Latin Square

### **Condition**

Any given condition will always have a base, trial structure, and balancing. However, they will also have a set of variables that manipulate different aspects of the distribution, graphical properties of the visualization, and non-graphical properties such as having a custom instruction set. 

Here is a non-comprehensive list of properties that could be manipulated by a condition.

* Plot type: 
   * Scatter
   * Strip
* Distribution type: 
   * Gaussian
   * Uniform
* Number of distributions _on a single plot_: 
   * Single
   * Multiple (i.e distractor)
* Graphical Properties of the Distribution:
   * Some examples if `plot type = scatter`:
      * Point shape: circle, diamond, triangle
      * Point color
      * Point size
   * Some examples if `plot type = strip`:
      * Line length
      * Line width
* Graphical Properties _not to do with the Distribution_:
   * Axis color, ticks
   * Background color
   * Text color
* Custom Instructions
