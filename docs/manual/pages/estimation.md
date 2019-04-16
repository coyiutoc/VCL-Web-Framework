# >> Estimation

- **Task**: Discrimination
- **Method**: Estimation w/ Bisection

## Specifications

* This task presents 2 shapes side by side. One shape is the reference shape, while the other is the modifiable shape, in which the user can increase or decrease the size of the shape (by pressing the M or Z keys). The goal is that the user will adjust the size of the modifiable shape so that it is as equal as possible to the reference shape's area. 
* Subconditions:
  * 3 types of shapes - circle, square, or triangle
    * So there are 3 x 3 = 9 different permutations of paired shapes (e.g. circle-circle, circle-square, circle-triangle etc.) - duplicates (3) = 6 permutations
  * 3 sizes that the reference shape can start on - 2cm, 4cm or 6 cm
  * 2 ways the modifiable shape can "start" on e.g. they can be either _smaller_ or _larger_ in size than the reference shape
    * For 2cm reference shape, low = 1.2, high = 3
    * For 4cm reference shape, low = 3.1, high = 5.3
    * For 6cm reference shape, low = 5.0, high = 6.5
  * **Total number of subconditions** = 6 [permutation of pairs] x 3 [possible reference sizes] = 18 subconditions
* Randomize the order of the 18 subconditions.
* On a given subcondition:
  * The reference and modifiable shape positions can be either left or right (randomized). So before a subcondition starts, there will be text like "Adjust the shape on the _left/right_ so that its size equals that of the other shape."
  * For a given subcondition, there are 4 trials. In each trial, the user basically has to make the modifiable shape the same as the reference shape. On a given trial:
     * For trials 1 and 3, the modifiable shape's size will start on the low value as specified above (e.g. if 2cm is the reference shape, then modifiable shape's size is 1.2)
     * For trials 2 and 4, the modifiable shape's size will start on the high value as specified above.
     * The y position of the shapes relative to each other should be slightly jittered (e.g. if have a circle and square, the circle is not completely aligned with the square, so could be a few pixels higher or lower etc.) - the degree of jitter can be randomized.
     * The user can press the z [make shape bigger] or m [make shape smaller] keys.
        * The step size of the adjustment will be randomized (so not constant).
     * They can adjust for an unlimited amount of times.
     * Once satisfied, they hit space bar, which then records the size of their modified shape.
     * This happens 3 more times (for the same subcondition).
  * After the 4 trials for a given subcondition, experiment then moves to the next subcondition.
