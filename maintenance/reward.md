---
title: Reward
lang: en-US
---

# {{ $frontmatter.title }}

Maintenance of the reward module consists mainly of cleaning the lines and valves daily, calibrating the valves every 2 weeks, and, when using a mix of condensed milk and water (70/30), cleaning the reward valves and replacing the lines monthly.

## Daily clean

Follow this procedure:

1. Once the day’s training is complete, gently pull the rig’s central stage towards you, leaving some space between you and the rig’s edge. Take the reward spout out of its holder, place it on the edge of the rig’s stage pointing down, and put a beaker under it to collect all the liquid.

2. If milk was prepared that day, pour any remaining milk from the syringes into the milk bottle. Otherwise, empty all of the syringes into the beaker.

3. Take the bottle of H2O2 from the shelf labeled “Cleaning Supplies” and fill the syringe with hydrogen peroxide up to the 40 mL line.

4. When ready, press the “Open Valve” button in the regiment window, or open the valve with the rig tester, and let the H2O2 drain into the beaker.

5. Once the syringe is empty, run a total of 100 mL of distilled water through it, letting it drain into the beaker. When the distilled water reaches the 10 mL line on the syringe, press the “Close Valve” button.


## Lines replacement and valve cleaning

Do this monthly if you use a mix of condensed milk and water as the reward. We don't have precise intervals for other reward liquids, but estimate every 2 months for sucrose solutions and much longer for plain water.

Follow the procedure below:

1. Drain all liquid from the circuit: first empty the syringe into a waste beaker, then open the valve to release the rest of the liquid into the same beaker.

2. Remove the lines from the syringe to the valve and from the valve to the spout, and use them to measure and cut the new lines from tubing.

3. Clean the valves following the instructions for your model. For the Parker 003-0096-900, fill a syringe with hydrogen peroxide, connect it to the IN port and flush the valve while it is open, then repeat with the syringe filled with air.

4. Use a syringe to flush the spout with hydrogen peroxide, then fill the syringe with air and flush it once more.

5. Install a new syringe and reconnect the circuit with the new lines.


## Valve calibration

The valve calibration finds the valve opening time that delivers 0.1 mL in total over 25 openings, that is, 4 µL per drop. Follow the steps below.

1. Gather the following materials: a 1 mL Eppendorf tube with a mark at 0.1 mL, and a blunt metal-tipped syringe.

2. Open MATLAB, then open the `solenoidValveCalibration.m` and `RigParameters` files.

3. Make sure the spout is vertical and at the same height as it would be with an animal, place the Eppendorf tube under the reward spout and run the solenoid valve calibration script.

4. Once the run has ended and every drop has been collected, use the blunt metal-tipped syringe to drag any stray drops into the pool at the bottom of the Eppendorf tube. If the milk isn't at 0.1 mL (over or under), change the duration next to “timeValveOpen =” in the Solenoid Valve Calibration window and click “Run”. Keep adjusting until the milk is at 0.1 mL.

5. Once the milk is close to the 0.1 mL mark, set the **rewardDuration** parameter in the Rig Parameters window to that duration.

6. If you changed the duration, save the Rig Parameters file (Ctrl+S).

## Troubleshooting

Troubleshoot from the top down: check first for clogs or other problems from the syringe to the valve, then from the valve inlet to the outlet, then from the valve outlet to the spout, and clean or replace parts accordingly.
