The example shows how the environment can affect the vehicles.

In the real world the environment is always unstable: wind or waves on sea. The vehicles must react on that change and try to keep their position or try to arrive to the target point.

The field in that example simulates the circular wind that changes the direction randomly by [Perlin noise](https://en.wikipedia.org/wiki/Perlin_noise). Each vehicle adds the force to the steering behaviour pointing to the opposite direction to the field force, to compensate the field.

No new concepts added here, all motions are the result of vector sum of corresponding steering actions.

Toggle scenarios by selecting one of both:

- Keep vehicles on the same target points - this simulates vessels or drones dynamic positioning.
- Set new target points randomly every 10 sec - this is how drones are trying to arrive to the set target position resisting the wind.