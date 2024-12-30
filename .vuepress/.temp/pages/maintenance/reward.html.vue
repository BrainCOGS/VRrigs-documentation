<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<p>The reward module maintenance consist mainly on the daily cleaning of the lines and valves, valve calibration procedure done every 2 weeks and a monthly cleaning of the reward valves and replacement of the lines if using a combination of condensed milk and water (70-30).</p>
<h2 id="daily-clean" tabindex="-1"><a class="header-anchor" href="#daily-clean"><span>Daily clean</span></a></h2>
<p>Follow the next procedure:</p>
<ol>
<li>
<p>Once the day’s training is complete, gently pull the rig’s central stage towards you, leaving some space between you and the rig’s edge. Take the reward spout out of its holding area and place it on the edge of the rig’s stage, reward spout pointed down, place a beaker under it to dispose all the liquids.</p>
</li>
<li>
<p>If milk was prepared that day, pour any remaining milk from the syringes into the milk bottle. Otherwise, empty all of the syringes into the beaker.</p>
</li>
<li>
<p>Pick up the bottle of H2O2 from the shelf labeled “Cleaning Supplies” and fill the syringe with the hydrogen peroxide up to the 40 mL line.</p>
</li>
<li>
<p>When ready, press the “Open Valve” button in the regiment window or open the valve using the rig tester and let the H2O2 drain into the beakers.</p>
</li>
<li>
<p>Once the syringes are empty, fill the syringes with 100 mL in total of distilled water and let them drain into the beakers. When the distilled water reaches the 10 mL line on the syringe, press the “Close Valve” button.</p>
</li>
</ol>
<h2 id="lines-replacement-and-valve-cleaning" tabindex="-1"><a class="header-anchor" href="#lines-replacement-and-valve-cleaning"><span>Lines replacement and valve cleaning</span></a></h2>
<p>This maintenance procedure should be done monthly if using a combination of condensed milk and water as reward during mice training, we currently don't have an accurate range for other kind of reward liquid but estimate to do it every 2 months for sucrose and water solutions and way longer for plain water.</p>
<p>Follow the procedure below.</p>
<ol>
<li>
<p>Remove all liquids in the circuit, first by emptying the srynge into a dispose beaker and then open the valve to realease the rest of the liquid into the same beaker.</p>
</li>
<li>
<p>Take off the lines from the srynge to the valve and from the valve to the spout, use those lines to measure and cut the new lines from tubing.</p>
</li>
<li>
<p>Follow the appropiate instructions to clean the valves, for the 003-0096-900 model from Parkerparker valves fill a srynge with hydrogen peroxide, connect it to the IN port and flush it while the valve is open, repeat the process filling the srynge with air this time.</p>
</li>
<li>
<p>Use a srynge to flush the spout with hydrogen peroxide, then fill the srynge with air and flush it once more.</p>
</li>
<li>
<p>Install a new srynge and connect the circuit with the new lines.</p>
</li>
</ol>
<h2 id="valve-calibration" tabindex="-1"><a class="header-anchor" href="#valve-calibration"><span>Valve calibration</span></a></h2>
<p>To perform the valve calibration we determine the time required to deliver 0.1 ml in total after valve opened 25 times. That is, each drop should have volume of 4 microliters. Follow the steps below.</p>
<ol>
<li>
<p>Gather the following materials: A one mL Eppendorf with a mark at 0.1 mL and a blunt metal tipped syringe.</p>
</li>
<li>
<p>Open MatLab and open the solenoidValveCalibration.m and RigParameters files.</p>
</li>
<li>
<p>Make sure that the spout is a vertical position at the same height as it would be with an animal, place the eppendorf under the reward spout and run the solenoid valve calibration script.</p>
</li>
<li>
<p>Once the run time has ended and every drop collected, use the blunt metal tipped syringe to drag any extraneous drops into the pool at the bottom of the eppendorf. If the pool of milk isn't at 0.1 ml (whether it is over or under), change the run duration time next to the command that reads “timeValveOpen =” in the Solenoid Valve Calibration window, and click “Run” when ready, keep adjusting until the pool of milk is at 0.1 mL.</p>
</li>
<li>
<p>Once the milk is close to the 1 ml mark, then change the value of the <strong>rewardDuration</strong> parameter in the Rig Parameters window.</p>
</li>
<li>
<p>Be sure to save (click Ctrl and S at the same time) what was changed in the Rig Parameters window if the run duration was changed.</p>
</li>
</ol>
<h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting"><span>Troubleshooting</span></a></h2>
<p>Troubleshooting is mostly done from top down. Check first for clogging or anything else from srynge to valve, then from valve in to valve out, then from valve out to spout, and clean or replace accordingly.</p>
</div></template>


