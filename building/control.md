---
title: Control
lang: en-US
---

# {{ $frontmatter.title }}

The control module consists of a 24 V power supply; a couple of distribution blocks, which make it easy to connect other 24 V devices; a custom solenoid valve driver; a USB NI-DAQ card from National Instruments; and an Arduino Due inside a 3D printed housing with a DIN rail clip attached. Each part is explained in detail below, with assembly instructions.

![Control module.](./assets/images/control/control-1.png)

## Solenoid valve driver assembly

![](./assets/images/control/control-assembly-1.png)

We designed a simple solenoid valve driver circuit using a MOSFET whose gate is driven by a digital signal from the NI-DAQ card, opening and closing the circuit between the solenoid valve and the 24 V power supply. A diode protects the circuit from the solenoid valve's discharge. To assemble the solenoid valve driver, follow these steps.


1. Have the PCB made, and make sure to order a stencil (we use PCBWay since they can make and ship the stencil; you can find our project [here](https://www.pcbway.com/project/shareproject/Simple_Solenoid_valve_driver_1340eb55.html)). We use a manual PCB stencil printer to spread the solder paste evenly across the PCB pads. First, fix the PCB to the surface with high-temperature tape and place the stencil on top of it, lining up the solder pads with the holes in the stencil.

![](./assets/images/control/control-assembly-2.png)

2. Spread the solder paste evenly into the pads with a flexible wipe-down knife. Then lift and remove the stencil.

![](./assets/images/control/control-assembly-3.png)

3. Place each component. We place the resistors first (R1, R3, R5, R7 and R9 are 10 kΩ; R2, R4, R6, R8 and R10 are 1 kΩ), then the MOSFETs and finally the diodes. Make sure the diodes are oriented correctly (the band should match the ] symbol on the PCB). The picture below shows the correct position of the components.

![](./assets/images/control/control-assembly-21.png)

::: tip
 Each time you place a component on its pads, press it lightly into the solder paste with the tweezers.

 ![](./assets/images/control/control-assembly-4.png)
:::

![](./assets/images/control/control-assembly-5.png)

4. Use a heat gun (we set it to 1000 °F) at the lowest airflow setting (so the components don't fly around) and move it over the components until the solder melts and they are fixed in place.

![](./assets/images/control/control-assembly-6.png)

5. Remove the high-temperature tape and solder the pluggable terminal blocks, put in the fillers, slide the PCB into the case and close it.

![](./assets/images/control/control-assembly-7.png)

![](./assets/images/control/control-assembly-8.png)

![](./assets/images/control/control-assembly-9.png)

6. Apply the labels (make sure they are in the right places) and mount the driver on the DIN rail.

![](./assets/images/control/control-assembly-10.png)

![](./assets/images/control/control-assembly-11.png)

## Power supply and NIDAQ control assembly

1. Mount the power supply and the distribution blocks on the DIN rails, and connect the power supply to the distribution block inputs. The TRACO Power TBLC 50-124 is a 50 W power supply, more than enough for the reward module's solenoid valve (7 W) and the two air puff solenoid valves (0.65 W each), with plenty of power left (~40 W) for other modules if required. One power supply can serve a stack of 2 or 3 rigs if desired.

![](./assets/images/control/control-assembly-12.png)

::: tip

Take a standard PC power cable and cut off the connector that goes to the PC. Connect the neutral wire to the power supply's N input and the hot (live) wire to its L input, and connect the ground wire to the power supply's ground (PE) terminal.

:::

2. Open the NI-DAQ case and drill a hole in the middle of the back cover. Screw the DIN rail mounting clip to it, then close the case, putting back only the top screws.

![](./assets/images/control/control-assembly-13.png)

![](./assets/images/control/control-assembly-14.png)

3. Connect everything!
  * Start by connecting the power supply's positive output, from one of the pins of the red distribution block, to the V IN input of the solenoid valve driver, then the ground, from one of the pins of the black distribution block, to the GND pin of the solenoid valve driver.
  * Then connect one of the GND pins of the solenoid valve driver to the digital ground pin of the NI-DAQ.
  * Connect the solenoid valve driver inputs to the NI-DAQ outputs as follows: P0.0 from the NI-DAQ to V IN 1, P0.1 to V IN 2 and P0.2 to V IN 3.
  * Finally, connect the solenoid valve driver outputs to the solenoid valves. Since the solenoid valves have no polarity, use V OUT (+) as the common line for all valves, from one or more of the driver's V OUT (+) pins. Then connect the V OUT 1 (-) pin to the reward solenoid valve, the V OUT 2 (-) pin to the left air puff solenoid valve and the V OUT 3 (-) pin to the right one.

::: tip

The solenoid valve driver has spare outputs, so you can control other hardware (for example, a 24 V IR light source) with the NI-DAQ digital outputs. Just wire the ports to the driver's inputs and outputs and match them in the Rig Parameters section of ViRMEn.

:::

![Control module wiring diagram for solenoid valves.](./assets/images/control/control-assembly-15.png)

## Arduino module assembly

1. Print the Arduino case or have it printed, and screw the Arduino into it. Insert the connector and crimp the wires, then connect them to the Arduino following the color code.

![Wiring diagram from the Arduino Due to the connector.](./assets/images/control/control-assembly-16.png)

2. Close the case and install the DIN rail mounting clip. Mount the Arduino module on the top DIN rail.

![](./assets/images/control/control-assembly-17.png)

3. Make the cable that connects the Arduino to the 3D printed cup. Unscrew the outer shell of the connector and slide it onto the cable (do this before connecting the wires; otherwise you won't be able to fit the cover and will have to start over). Unscrew all the terminals, insert the wires following the color code in the image below, screw them down and put on the connector cover.

![](./assets/images/control/control-assembly-18.png)

![](./assets/images/control/control-assembly-19.png)

::: tip

Attach one connector first and plug it into the Arduino box on the top DIN rail outside the rig, then measure the cable length needed by routing the cable into the rig and through the cable carrier. Cut the cable, attach the other connector, and finally connect it to the 3D printed cup.

:::

4. Connect the Arduino to the computer with a [USB Type-C male to micro-USB Type-B male cable](https://www.bhphotovideo.com/c/product/1387544-REG/tether_tools_cuc2515_blk_tetherpro_usb_c_to_2_0.html?sts=pi&pim=Y), or any other cable that matches your setup. We recommend a single tether cable or USB 3.0 cable; avoid chaining multiple cables or hubs (or make sure everything is rated for high speed).

## Programming the Arduino

1. Download the latest version of the [Arduino IDE](https://www.arduino.cc/en/software) and install the Arduino SAM Boards (32-bits ARM Cortex-M3) package from the Boards Manager (Tools > Board > Boards Manager); v1.6.11 has been working for us.

2. Connect the Arduino to the computer through the [Programming port](https://www.arduino.cc/en/uploads/Main/DueUSBPorts.jpg) (connect the cable to the USB port closest to the circular power connector). The Arduino should be listed in the devices at the top of the window as `Arduino Due (Programming port)`.

3. Download the firmware from the repository, or open it from MATLAB. The file is inside **sensors > ADNS_aout_wUSB_1sensor_or_squal_nativeport** folder and is named `ADNS_aout_wUSB_1sensor_or_squal_nativeport.ino`. Make sure the board is selected at the top of the window and upload the firmware with the Upload button (right arrow icon).

4. Wait until the firmware is uploaded (a message in the Arduino IDE's output panel confirms this), then move the USB cable from the Programming port to the [Native port](https://www.arduino.cc/en/uploads/Main/DueUSBPorts.jpg). The Arduino should now be programmed and working; you can confirm this by running the rig tester and pressing the *Arduino detection* and *sensor quality* buttons.

## USB HUB and Speaker

1. Use double-sided tape to stick the USB hub to the cabinet at the top left, above the DIN rail, and connect everything that goes through it (the NI-DAQ, and USB or USB-powered speakers if used). Connect the hub to the computer with a USB-C extension cable.

![](./assets/images/control/control-assembly-20.png)

2. Place the speaker inside the cabinet and connect it to the hub, making an upper hole in the cabinet for other cables as shown in the picture above. You can use USB speakers or desktop speakers placed on top of the screen plate, connected to the hub and, if necessary, to the computer's audio output.
