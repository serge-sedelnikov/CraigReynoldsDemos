The combination of 

- [Seek](http://www.red3d.com/cwr/steer/SeekFlee.html)
- [Arrive](http://www.red3d.com/cwr/steer/Arrival.html)
- [Flee](http://www.red3d.com/cwr/steer/SeekFlee.html)

In this demo the leader vehicle <span class="purple">(purple colour)</span> is trying to [seek](http://www.red3d.com/cwr/steer/SeekFlee.html) for the randomly selected target point. New target point is selected every 3 seconds.

All the other vehicles are trying to follow it by selecting own target point a bit behind the leader vehicles. Notice that there are two following scenarios are implemented:

- all vehicles are following the leader and trying to avoid the collision with each other;
- each vehicle is following other vehicle as a chain, also trying to avoid each other.

> Switch between modes by using radio buttons.

The second mode is implemented by simply assigning the target point for [arrive](http://www.red3d.com/cwr/steer/Arrival.html) behaviour to be a point slightly behind the previous vehicle in the array. This is not yet a truly flocking behaviour as we assign the point manually.

In the flocking behaviour the vehicle is moving randomly until it meets another vehicle or a group of vehicles, then it selects the point to follow as an average following point for observed group of vehicles.

In every case the [flee](http://www.red3d.com/cwr/steer/SeekFlee.html) behaviour is stronger to make vehicles avoid collisions to each other.