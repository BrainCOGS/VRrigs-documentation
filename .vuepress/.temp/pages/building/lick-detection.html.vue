<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<p>The lick detection module is based on a simple transistor design (Slotnick 2009), we modified the design to allow the detection of 2 lick spouts in the same module. Additionally, we added a DC-DC converter to isolate the circuit from the power source and added a 5V voltage regulator after the relays to have a TTL signal at the output of both circuits.</p>
<p>The module was designed this way to enable a specific task that require the use of two spouts, but it can also be used in a one spout setting (e.g count the number of licks during a task). Below is an example of a setup using two lick spouts during a decision making task developed by one member of the BRAIN CoGS team.</p>
<h2 id="two-lick-detection-module-assembly" tabindex="-1"><a class="header-anchor" href="#two-lick-detection-module-assembly"><span>Two lick detection module assembly</span></a></h2>
<p>Have the PCB fabricated <a href="https://www.pcbway.com/project/shareproject/Two_spouts_lick_detector_059c7e07.html" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a> (or download the GERBER files and have it made elsewhere). The step by step instructions to solder the components on the solenoid valve driver from the <RouteLink to="/building/control.html#solenoid-valve-driver-assembly">control module</RouteLink> can be used as well for this module, making sure to use the appropiate components and placing them as labeled in the PCB.</p>
<figure>
  <img src='@source/building/assets/images/lick-detection/lick-detection-1.png'>
</figure>
<table>
<thead>
<tr>
<th>Label</th>
<th>Part No.</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>R1, R2, R4, R5</td>
<td><a href="https://www.digikey.com/en/products/detail/yageo/AC1206FR-0710ML/5897214" target="_blank" rel="noopener noreferrer">AC1206FR-0710ML<ExternalLinkIcon/></a></td>
<td>10M Ohm resistors</td>
</tr>
<tr>
<td>R3, R6</td>
<td><a href="https://www.digikey.com/en/products/detail/yageo/AC1206FR-0747KL/5897559" target="_blank" rel="noopener noreferrer">AC1206FR-0747KL<ExternalLinkIcon/></a></td>
<td>47K Ohm resistors</td>
</tr>
<tr>
<td>R7, R8</td>
<td><a href="https://www.digikey.com/en/products/detail/yageo/ac1206fr-0710kl/5897213" target="_blank" rel="noopener noreferrer">AC1206FR-0710KL<ExternalLinkIcon/></a></td>
<td>10K Ohm resistors</td>
</tr>
<tr>
<td>T1, T2, T3, T4</td>
<td><a href="https://www.digikey.com/en/products/detail/onsemi/mmbt2222lt1g/919595" target="_blank" rel="noopener noreferrer">MMBT2222LT1G<ExternalLinkIcon/></a></td>
<td>BJT Transistor NPN</td>
</tr>
<tr>
<td>8L61-12-011 (2)</td>
<td><a href="https://www.digikey.com/en/products/detail/coto-technology/8l61-12-011/1914969" target="_blank" rel="noopener noreferrer">8L61-12-011<ExternalLinkIcon/></a></td>
<td>Relay reed SPDT 250MA 12V</td>
</tr>
<tr>
<td>U2</td>
<td><a href="https://www.digikey.com/en/products/detail/texas-instruments/ua78l05acpke6/9860880" target="_blank" rel="noopener noreferrer">UA78L05ACPKE6<ExternalLinkIcon/></a></td>
<td>Linear Voltage Regulator</td>
</tr>
<tr>
<td>No label (middle big square)</td>
<td><a href="https://www.digikey.com/en/products/detail/traco-power/trs-2-2412/9383650" target="_blank" rel="noopener noreferrer">TRS 2-2412<ExternalLinkIcon/></a></td>
<td>Isolated Module DC DC Converter</td>
</tr>
<tr>
<td>C1</td>
<td><a href="https://www.digikey.com/en/products/detail/samsung-electro-mechanics/cl31b475kbhnnne/3888447" target="_blank" rel="noopener noreferrer">CL31B475KBHNNNE<ExternalLinkIcon/></a></td>
<td>4.7 µF Ceramic Capacitor</td>
</tr>
<tr>
<td>C2</td>
<td><a href="https://www.digikey.com/en/products/detail/samsung-electro-mechanics/cl31c151jbcnnnc/3888469" target="_blank" rel="noopener noreferrer">CL31C151JBCNNNC<ExternalLinkIcon/></a></td>
<td>150 pF Ceramic Capacitor</td>
</tr>
<tr>
<td>22 micro</td>
<td><a href="https://www.digikey.com/en/products/detail/vishay-dale/ifsc1008aber220m01/2744218" target="_blank" rel="noopener noreferrer">IFSC1008ABER220M01<ExternalLinkIcon/></a></td>
<td>22 µH Shielded Inductor</td>
</tr>
</tbody>
</table>
<p>After assemblying the module, place the labels as shown in the picture below.</p>
<figure>
  <img src='@source/building/assets/images/lick-detection/lick-detection-2.png'>
</figure>
<p>The description of each pin of the lick detector module can be found in the table below.</p>
<table>
<thead>
<tr>
<th>PIN</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>1. GROUND</td>
<td>Input - ground</td>
</tr>
<tr>
<td>2. 24V</td>
<td>Input - 24V DC</td>
</tr>
<tr>
<td>3. OUT LEFT</td>
<td>Output - TTL output pin for the left spout</td>
</tr>
<tr>
<td>4. OUT RIGHT</td>
<td>Output - TTL output pin for the right spout</td>
</tr>
<tr>
<td>5. RIGHT SPOUT</td>
<td>Input - Connect the right spout to this pin</td>
</tr>
<tr>
<td>6. LEFT SPOUT</td>
<td>Input - Connect the left spout to this pin</td>
</tr>
<tr>
<td>7. HEADPLATE</td>
<td>Input - Connect the headplate to this pin</td>
</tr>
<tr>
<td>8. COMMON</td>
<td>Input - Connect the ground from the NiDAQ (or any acquisition device) to this pin</td>
</tr>
</tbody>
</table>
<h3 id="soldering-a-cable-to-the-feeding-spout-and-headplate-holder" tabindex="-1"><a class="header-anchor" href="#soldering-a-cable-to-the-feeding-spout-and-headplate-holder"><span>Soldering a cable to the feeding spout and headplate holder</span></a></h3>
<ol>
<li>
<p>Use sandpaper to remove the outer layer of the stainless steel spout at one of the sides if the luer lock connector (as far as possible from the connector tip), do the same with the headplate (wherever you want to place the cable, we recommend to use the arm without the tapped hole to fit a heat shrinkable tube).</p>
</li>
<li>
<p>Clean the sanded surface with isopropyl alcohol and let it dry. In the meantime, prepare the coaxial cable (we recommend a <a href="https://www.digikey.com/en/products/detail/molex-temp-flex/1000660054/4368709" target="_blank" rel="noopener noreferrer">26<ExternalLinkIcon/></a> or <a href="https://www.digikey.com/en/products/detail/molex/1001935047/8566104" target="_blank" rel="noopener noreferrer">28<ExternalLinkIcon/></a> AWG coaxial cable like these ones ) by removing the jacket and the shield, then expose the conductor by removing a portion of the insulation material. Repeat the process on the other end of the cable.</p>
</li>
<li>
<p>Drop a small drop of flux in the sanded surface and place the tip of the solder iron over the flux - the tip might stick to the stainless steel, that's normal - continue heating the surface and use soldering wire (we found lead works best) to solder the coaxial cable to the spout and headplate.</p>
</li>
<li>
<p>Use heat shrinkable tube to cover the soldering spot.</p>
</li>
</ol>
<p>To close the circuit for detection, you need a contact in the mice body. We solder a lead (repeating steps 1-4) at the headplate holder, but that can be adjusted on different setups.</p>
</div></template>


