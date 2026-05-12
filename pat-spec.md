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
- make driver signup better
- remove notification that delivery was claimed for priority quality
- remove the nextjs dev tools thing

presentation
- how to drive the estimate / accept logic




driver side
- maps will be covered
- quiz for are you a good driver, shows 1-5<star> for quality, reaction time test for acceptance score

click on the box (box and fox pictures)
do you wear a seatbelt (seatbelt emoji)
what speed would you drive here with silder (school zone speed limit)
did you call your mom on sunday (flower emoji)


reaction time test
screen flashes white after 2-4s delay, time click speed


- display your current score, placeholder for your car in map centered in san diego


- external provided:: map install, placeholder rendered routes in SD
- me to provide:: driver location rendering on map, quality / accept / distance blend that blasts drivers


stretch goals
- show drivers signing up with progress
- god mode map with all drivers, then step into booking demo flow
- demo mode mobile that is guaranteed to get the first delivery with a checkbox on dispatch side and hidden route on mobile side


now active
- show you in map


claim process
- show countdown while you can view delivery details
- detail level TBD, only work on claim countdown for now

Reserved Delivery
We think you're the best driver for this delivery. Here's your chance to secure the gig.
00:30s countdown at top
Accept / Reject buttons

Blast Delivery
current flow, can be claimed whenever
show Sorry, someone else claimed this delivery



delivery dispatch algo actual
- three tiers <balanced>, <speed>, <quality>
- each blends distance x accept x quality 
- show active driver being blasted on dispatch map while it happens

speed
- 4 driver waves
- accept x distance prioritized

quality
- best driver x accept x distance w/ 30s priority
- then waves of 2 for same blend

balanced
- waves of 3, midpoint weighting of the formula between speed and quality



