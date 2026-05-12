overview:
demo project for a new booking flow - rush deliveries can be dispatched with priority 'speed' or 'quality', changing the dispatch behavior to find either the closest + high accept driver, or the highest quality / accept blend.

quality only blasts to one driver at a time, speed blasts in waves

UI displays summary of driver population at current time, and highlight of drivers being blasted

- found a driver 2 miles away
- pinging driver with 1.2x efficiency score
- we usually fulfill deliveries like this within x minutes


mobile states
- set your blend of distance x accept probability x quality probability
- in state 'waiting for deliveries'
> desktop sends delivery information (keep simple for boilerplate)
- in state '30 second claim window'
- in state 'rejected claim'
- in state 'blast received (not a reserved claim)'


desktop states
- filling out booking details (placeholder allowed for now)
- selecting priority 'speed' vs 'quality'
- placeholder map: do not make map rn
>send delivery to mobile clients
- delivery blasting in progress
- blasted 'priority driver' (quality path)
- blasted 'n drivers' (speed or fallback quality path)
- delivery fulfilled! when someone accepts
- restart


next steps
- build booking UI
- driver signup form to see how good you are
