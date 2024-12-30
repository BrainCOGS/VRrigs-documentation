<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<p>The control module consist on a 24V power source, a couple of distribution blocks, which make it easier to connect any other stuff that works on 24V; a custom made solenoid valve driver, an USB NiDAQ card from National Instruments and an Arduino due that is inside a 3D printed housing with a DIN rail clip attached. Each of these parts will be explained in detail below with instructions for assembly.</p>
<figure>
  <img src='@source/building/assets/images/control/control-1.png'>
  <center><figcaption><small>Control module.</small></figcaption></center>
</figure>
<h2 id="solenoid-valve-driver-assembly" tabindex="-1"><a class="header-anchor" href="#solenoid-valve-driver-assembly"><span>Solenoid valve driver assembly</span></a></h2>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-1.png'>
</figure>
<p>We designed a simple solenoid valve driver circuit using a MOSFET, the gate is driven by a digital input that will be supplied by the NIDAQ card, which open and closes the circuit from the solenoid valve to a 24V power supply. We added a diode to protect the circuit from discharge from the solenoid valve. To assembly the solenoid valve driver follow the next steps.</p>
<ol>
<li>Have the PCB made (we use pcbway since they can make and ship the stencil, you can found our project <a href="https://www.pcbway.com/project/shareproject/Simple_Solenoid_valve_driver_1340eb55.html" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a>) and make sure to order a stencil. We use a manual printer for PCB stencil to spread the soldering paste across the PCB pads evenly. First, place the PCB on the surface using high temperature tape and place the stencil on top of it. Make sure to match the solder pads to the holes of the stencil.</li>
</ol>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-2.png'>
</figure>
<ol start="2">
<li>Use solder paste and a flexible wipe down knife and spread evenly the solder paste into the pads. Then lift and remove the stencil.</li>
</ol>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-3.png'>
</figure>
<ol start="3">
<li>Place each component into place, we place the resistances (R1, R3, R5, R7, and R9 resistor values are 10K Ohm and R2, R4, R6, R8 and R10 resistor values are 1K Ohm) first, then place the MOSFET and finally the diodes, make sure that the diodes are placed correctly (the band should match the ] symbol on the PCB). The picture below show the correct position of the components.</li>
</ol>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-21.png'>
</figure>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Each time you place a component in the pad make sure to slightly press it against the solder paste with the same tweezers that you use.</p>
 <figure>
  <img src='@source/building/assets/images/control/control-assembly-4.png'>
 </figure>
</div>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-5.png'>
</figure>
<ol start="4">
<li>Use a heat gun (we set the temperature at 1000F) at the lowest intensity allowed (to avoid components flying around) and move it around on top of the components until the solder melt and the components get attached in place.</li>
</ol>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-6.png'>
</figure>
<ol start="5">
<li>Remove the high temperature tape and solder the pluggable terminal blocks, place the fillers and slide down the PCB into the case, then close the case.</li>
</ol>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-7.png'>
</figure>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-8.png'>
</figure>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-9.png'>
</figure>
<ol start="7">
<li>Place the labels (make sure they are placed correctly) and place the driver on the DIN rail.</li>
</ol>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-10.png'>
</figure>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-11.png'>
</figure>
<h2 id="power-supply-and-nidaq-control-assembly" tabindex="-1"><a class="header-anchor" href="#power-supply-and-nidaq-control-assembly"><span>Power supply and NIDAQ control assembly</span></a></h2>
<ol>
<li>Place the power supply and the distribution blocks on the DIN rails, connect the power supply to the distribution block input accordigly. The TRACO Power TBLC 50-124 is a 50W power supply, which is more than enough to power both the reward module solenoid valve (7 Watts) and the two air puffs solenoid valves (0.65 Watts each one), and have plenty of power left (~40W) for other modules if required. One power supply could be use for a stack of 2 or 3 rigs if desired.</li>
</ol>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-12.png'>
</figure>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Use a standard PC power cable and cut the portion of the connector that goes to the PC, cut the ground cable and connect the neutral cable to the negative input of the power supply and the hot cable to the positive input.</p>
</div>
<ol start="2">
<li>Open the NIDAQ case and make a hole at the middle of the back case. Screw the DIN rail mounting clip to it, then close the case and place the top screws only.</li>
</ol>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-13.png'>
</figure>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-14.png'>
</figure>
<ol start="3">
<li>Connect everything!</li>
</ol>
<ul>
<li>Start by connecting the positive output of the power supply from one of the pins of the red distribution blocks to the V IN input of the solenoid valve driver, then the ground from one of the pins of the black distribution block to the GND pin of the solenoid valve driver.</li>
<li>Then connect the one of the GND pins of the solenoid valve driver to the the digital ground pin of the NIDAQ.</li>
<li>Connect the solenoid valve driver inputs to the NIDAQ outputs as follows: P0.0 from NIDAQ to V IN 1, P0.1 to V IN 2 and P0.2 to V IN 3.</li>
<li>Finally connect the solenoid valve driver outputs to the solenoid valve drivers. Since the solenoid valves doesn't have polarity, you should use the V OUT (+) as common in the valves, you can use one or multiple pins of the solenoid valve driver. Then connect the V OUT 1 (-) pin to the reward solenoid valve, the V OUT 2 (-) pin to the left solenoid valve and the V OUT 3 (-) to the right solenoid valve.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The solenoid valve driver has more outputs for you to connect and control with the NIDAQ digital outputs any other piece of hardware (like a 24 V IR light source for example), just make sure to wire the ports to the input and output of the driver and match them in the Rig Parameters portion of ViRMEN.</p>
</div>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-15.png'>
  <center><figcaption><small>Control module wiring diagram for solenoid valves.</small></figcaption></center>
</figure>
<h2 id="arduino-module-assembly" tabindex="-1"><a class="header-anchor" href="#arduino-module-assembly"><span>Arduino module assembly</span></a></h2>
<ol>
<li>Have printed the arduino case and screw the arduino. Insert the connector in place and crimp the cables. Make sure to follow the color code and connect the cables to the arduino.</li>
</ol>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-16.png'>
  <center><figcaption><small>Wiring diagram for Arduino due to connector.</small></figcaption></center>
</figure>
<ol start="3">
<li>Cover the case and install the din rail mounting clip. Install the arduino module in the top DIN rail.</li>
</ol>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-17.png'>
</figure>
<ol start="4">
<li>Make the cable to connect the arduino to the 3D printer cup. Unscrew the outer portion of the connector and insert it into the cable (you need to do this before connecting the cables, otherwise you will not be able to insert the cover and will have to do everything again). Unscrew all the conectors and insert the cable following the color code in the image below, screw them and place the connector cover.</li>
</ol>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-18.png'>
</figure>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-19.png'>
</figure>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Place one connector first and connect it to the arduino box placed in the top DIN rail at the outer portion of the rig, then measure the lenght of the cable by inserting into the rig and into the cable carrier. Cut the cable and place the other connector, finally connect it to the 3D printed cup.</p>
</div>
<ol start="5">
<li>Connect the arduino to the computer using a <a href="https://www.bhphotovideo.com/c/product/1387544-REG/tether_tools_cuc2515_blk_tetherpro_usb_c_to_2_0.html?sts=pi&amp;pim=Y" target="_blank" rel="noopener noreferrer">USB Type-C male to micro-USB Type-B male cable<ExternalLinkIcon/></a>. Or any other cable matching your setup, we do recommend to use a single tether cable or USB 3.0 cable and avoid using either multiple cables or HUBs (or make sure everything is high speed rated).</li>
</ol>
<h2 id="programming-the-arduino" tabindex="-1"><a class="header-anchor" href="#programming-the-arduino"><span>Programming the Arduino</span></a></h2>
<ol>
<li>
<p>Download the latest version of the <a href="https://www.arduino.cc/en/software" target="_blank" rel="noopener noreferrer">arduino IDE<ExternalLinkIcon/></a> and download the Arduino SAM Boards (32-bits ARM Cortex-M3) toolbox from the boards manager (Tools &gt; Boards &gt; Boards Manager), v1.6.11 has been working for us.</p>
</li>
<li>
<p>Connect the arduino to the computer using the <a href="https://www.arduino.cc/en/uploads/Main/DueUSBPorts.jpg" target="_blank" rel="noopener noreferrer">Programming port<ExternalLinkIcon/></a> (connect the cable to the USB port closest to the circular power connector). The arduino should be listed in the devices at the top of the window as <code v-pre>Arduino Due (Programming port)</code>.</p>
</li>
<li>
<p>Either download or open from Matlab the firmware from the repository. The file is inside <strong>sensors &gt; ADNS_aout_wUSB_1sensor_or_squal_nativeport</strong> folder and is named <code v-pre>ADNS_aout_wUSB_1sensor_or_squal_nativeport.ino</code>. Make sure you have selecteed the board at the top of the window and upload the firmware by pressing the upload button (right arrow icon).</p>
</li>
<li>
<p>Wait until the firmware is uploaded (a message in the terminal of the arduino IDE should confirm this) and disconnect the USB cable from the Programming port and connect it to the <a href="https://www.arduino.cc/en/uploads/Main/DueUSBPorts.jpg" target="_blank" rel="noopener noreferrer">Native Port<ExternalLinkIcon/></a>. The arduino should be programmed and working, you can confirm this by running the rig tester and pressing the <em>Arduino detection</em> and <em>sensor quality</em> buttons.</p>
</li>
</ol>
<h2 id="usb-hub-and-speaker" tabindex="-1"><a class="header-anchor" href="#usb-hub-and-speaker"><span>USB HUB and Speaker</span></a></h2>
<ol>
<li>Use double side tape to glue the USB Hub to the cabinet at the top left portion above the DIN rail and connect everything that must be connected there (if using USB or USB powered speakers, the NIDAQ). Use a USB C extension to connect the hub to the computer.</li>
</ol>
<figure>
  <img src='@source/building/assets/images/control/control-assembly-20.png'>
</figure>
<ol start="2">
<li>Place the speaker inside the cabinet and connect to Hub - Make an upper hole on the cabinet for other cables as shown in the picture above. You can use a USB speakers or a desktop speakers and place them on top of the screen plate and connect it to the hub and, if necessary, to the computer audio input.</li>
</ol>
</div></template>


