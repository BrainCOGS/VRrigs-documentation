---
title: Control
lang: en-US
---

# {{ $frontmatter.title }}

The control module consist on a 24V power source, a couple of distribution blocks, which make it easier to connect any other stuff that works on 24V; a custom made solenoid valve driver, an USB NiDAQ card from National Instruments and an Arduino due that is inside a 3D printed housing with a DIN rail clip attached. Each of these parts will be explained in detail below with instructions for assembly.

<figure>
  <img src='./assets/images/control/control-1.png'>
  <center><figcaption><small>Control module.</small></figcaption></center>
</figure>

## Solenoid valve driver assembly

Explanation of the design of the solenoid valve driver.

1. Have the PCB made (we use an external service) and make sure to order a stencil. We use a tool (brief description of the tool) to solder the components into the PCB. Place the PCB on the surface using high temperature tape and place the stencil on top of it. Make sure to match the solder pads to the holes of the stencil.

:::tip
 Brief tip on how to do this step
:::

2. Use solder paste and a thing (description of the thing we use to spread the solder paste) and spread evenly the solder paste into the pads. Then lift and remove the stencil.

3. Place each component into place, we begin with the resistances, then place the MOSFET and finally the diodes, make sure that the diodes are placed correctly (the band should match the ] symbol on the PCB).

4. Use a heat gun (we set the temperature at 1000F) at the lowest intensity allowed (to avoid components flying around) and move it around on top of the components until the solder melt and the components get attached in place.

5. Remove the high temperature tape and solder the pins (headers or whatever they are called).

6. Place the fillers and slide down the PCB into the case, then close the case.

7. Place the labels (make sure they are placed correctly) and place the driver on the DIN rail.

## Power supply and NIDAQ control assembly

1. Place the power supply and the distribution blocks on the DIN rails, connect the power supply to the distribution block input accordigly.

2. Open the NIDAQ case and make a hole at the middle of the back case. Screw the DIN rail mounting clip to it, then close the case and place the top screws (send the bottom screw to hell).

3. Connect everything - power supply to solenoid valve driver, NIDAQ outputs to solenoid valve driver inputs, common to everyone, valves to solenoid valve driver outputs. Maybe make a diagram here.

## Arduino module assembly

1. Have printed the arduino case and screw the arduino. Insert the connector in place and crimp the cables.

2. Make sure to follow the color code and connect the cables to the arduino.

3. Cover the case and install the din rail mounting clip. Install the arduino module in the top DIN rail.

4. Make the cable. Cut the cable and insert into the connector on one end. Connect it to the arduino, then insert the cable trough the hole and the cable carrier until it reached the cup, cut the cable and peel off the cover, install the connector on the other end and connect it to the cup.

## USB HUB and Speaker

1. Use double side tape to glue the USB Hub and connect everything that must be connected there.

2. Place the speaker inside the cabinet and connect to Hub - Make an upper hole on the cabinet for other cables (?).