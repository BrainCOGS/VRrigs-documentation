---
title: Reward
lang: en-US
---

# {{ $frontmatter.title }}

The reward module maintenance consist mainly on the daily cleaning of the lines and valves, valve calibration procedure done every 2 weeks and a monthly cleaning of the reward valves and replacement of the lines if using a combination of condensed milk and water (70-30).

## Daily clean

Follow the next procedure:

1. Once the day’s training is complete, gently pull the rig’s central stage towards you, leaving some space between you and the rig’s edge. Take the reward spout out of its holding area and place it on the edge of the rig’s stage, reward spout pointed down, place a beaker under it to dispose all the liquids.

2. If milk was prepared that day, pour any remaining milk from the syringes into the milk bottle. Otherwise, empty all of the syringes into the beaker.

3. Pick up the bottle of H2O2 from the shelf labeled “Cleaning Supplies” and fill the syringe with the hydrogen peroxide up to the 40 mL line.

4. When ready, press the “Open Valve” button in the regiment window or open the valve using the rig tester and let the H2O2 drain into the beakers.

5. Once the syringes are empty, fill the syringes with 100 mL in total of distilled water and let them drain into the beakers. When the distilled water reaches the 10 mL line on the syringe, press the “Close Valve” button.


## Lines replacement and valve cleaning

This maintenance procedure should be done monthly if using a combination of condensed milk and water as reward during mice training, we currently don't have an accurate range for other kind of reward liquid but estimate to do it every 2 months for sucrose and water solutions and way longer for plain water.

Follow the procedure below.

1. Remove all liquids in the circuit, first by emptying the srynge into a dispose beaker and then open the valve to realease the rest of the liquid into the same beaker.

2. Take off the lines from the srynge to the valve and from the valve to the spout, use those lines to measure and cut the new lines from tubing.

3. Follow the appropiate instructions to clean the valves, for the 003-0096-900 model from Parkerparker valves fill a srynge with hydrogen peroxide, connect it to the IN port and flush it while the valve is open, repeat the process filling the srynge with air this time.

4. Use a srynge to flush the spout with hydrogen peroxide, then fill the srynge with air and flush it once more.

5. Install a new srynge and connect the circuit with the new lines.


## Valve calibration

To perform the valve calibration we determine the time required to deliver 0.1 ml in total after valve opened 25 times. That is, each drop should have volume of 4 microliters. Follow the steps below.

1. Gather the following materials: A one mL Eppendorf with a mark at 0.1 mL and a blunt metal tipped syringe.

2. Open MatLab and open the solenoidValveCalibration.m and RigParameters files.

3. Make sure that the spout is a vertical position at the same height as it would be with an animal, place the eppendorf under the reward spout and run the solenoid valve calibration script.

4. Once the run time has ended and every drop collected, use the blunt metal tipped syringe to drag any extraneous drops into the pool at the bottom of the eppendorf. If the pool of milk isn't at 0.1 ml (whether it is over or under), change the run duration time next to the command that reads “timeValveOpen =” in the Solenoid Valve Calibration window, and click “Run” when ready, keep adjusting until the pool of milk is at 0.1 mL.

5. Once the milk is close to the 1 ml mark, then change the value of the **rewardDuration** parameter in the Rig Parameters window.

6. Be sure to save (click Ctrl and S at the same time) what was changed in the Rig Parameters window if the run duration was changed.

## Troubleshooting

Troubleshooting is mostly done from top down. Check first for clogging or anything else from srynge to valve, then from valve in to valve out, then from valve out to spout, and clean or replace accordingly.