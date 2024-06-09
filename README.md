# forest-simulator
Technical test, for Cyril Group.

# Format of the conf file
The input file must be named ```forest.conf``` and must be placed in the directory among ```case.js, grid.js, simulation.js```.
The format must be as below:
```h,w
;
p
;
(x,y)
(x,y)
```
h : height of the grid
w : width of the grid
p : probability (must be in %, example : 75% -> write 75)
(x,y) : position of a case the origin is in the top left corner, you can add as many case as u want. However, you must do a newline to separate each one.

This repo has already a forest.conf, that can be used.

# Launch the simulation
In the folder in a terminal do the following command :
```node simulation.js```

Each steps will be printed in the terminal.