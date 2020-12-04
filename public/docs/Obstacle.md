In this demo the vehicle is trying to avoid the circle obstacles. 

The vehicle has the collision detection area - a red circle at the good enough distance along the velocity vector, the circle has the radius big enough to cover the front of the vehicle and detect the collision.

Once the circle is detecting that it crosses the obstacle, it applies the force pointing away from the obstacle centre. This force is then added to the force vehicle uses to [arrive](http://www.red3d.com/cwr/steer/Arrival.html) to the target point.

![obstacles](/images/obstacles.png)

*Orange vector is the result force to avoid the obstacle and move towards target. Blue vector added to illustrate the vector sum of the target arrive force and obstacle avoid force.*

The vehicle takes into account only first found obstacle in this example. In real life it should also check the urgency - how close the obstacle is, what is the angle to it, etc.

> Move your mouse to set a new target point to the vehicle.

> Left mouse click to create new obstacle.

Note that this is not the perfect implementation but only shows the concept. It does not have a breaking force if the vehicle can't pass around the obstacles in the complicated situations. The solution here would be the obstacle edge following behaviour, when vehicle is trying to follow the border of the obstacle until it it left behind.