This demo is the combination of two [seek and flee](http://www.red3d.com/cwr/steer/SeekFlee.html).

Each vehicle has own target it tries to arrive - an own place at the word `ARRIVE`. When you move your mouse over the word, each vehicle tries to flee away from the cursor.

Combination of two forces (vector sum) gives such an interesting effect.

![arrive and flee](/images/arrive-flee.png)

Result force is then limited by each vehicle max force and added to the current vehicle acceleration, the acceleration is then affecting velocity.

On each time frame the operation is repeated, new result force is calculated as vector sum of all target behaviours, and added to the acceleration.