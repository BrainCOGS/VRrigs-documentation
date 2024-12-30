<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<p>The stage holds a 3D printed cup where the optical flow sensor is placed at the bottom and a hose is connected to deliver a constant air flow to make a styrofoam ball float at the top. The mice is head fixed on top of the ball, allowing it to run, while the optical flow sensor update the virtual world projected on the screen.</p>
<figure>
  <img src='@source/building/assets/images/stage/stage.png'>
  <center><figcaption><small>Stage assembly with 3D printed cup.</small></figcaption></center>
</figure>
<p>The stage consist on a pair of optical breadboards attached by a set of posts. The posts lenght is calculated so that the stage has the proper height at which the mice will be positioned and the projection will be calibrated. The top optical breadboard is modified to insert the cup that will direct the constant air flow to the bottom of the styrofoam ball and will make it float, allowing the mice to freely move and run.</p>
<p>We send the optical breadboard to be modified at a machine shop. To assemble the stage you have to first screw the 4 posts by attaching a 1&quot; diameter 1&quot; long post to a 1&quot; diamater 2&quot; long post using a 1/4&quot; set screw (alternatively, you can use a 1&quot; diamater 3&quot; long post). Then attach both the top plate and the bottom plate to each end of the 4 posts using 1/4&quot; screws.</p>
<figure>
  <img src='@source/building/assets/images/stage/stage-assembly-1.png'>
</figure>
<p>Send the adapter to be made at a machine shop, then attach the latch holder to the adapter using a pair of M4 x 0.7mm, 8mm long screws. Attach the adapter to the bottom part of the bottom plate, in the intersection of the middle columns and the second row as shown in the picture below.</p>
<figure>
  <img src='@source/building/assets/images/stage/stage-assembly-2.png'>
</figure>
<h2 id="stage-installation" tabindex="-1"><a class="header-anchor" href="#stage-installation"><span>Stage installation</span></a></h2>
<p>Install the stage into the cabinet using 1/4&quot;-20 1/2&quot; long low profile socket head screws from the bottom of the drawer slider into the breadboard (the stage can be installed in the cabinet before or after placing the 3D printed cup). Extend the drawer all the way out and place the stage on top of it, align it according to the image below.</p>
<figure>
  <img src='@source/building/assets/images/stage/stage-assembly-3.png'>
</figure>
<h2 id="cup-with-optical-flow-sensor" tabindex="-1"><a class="header-anchor" href="#cup-with-optical-flow-sensor"><span>Cup with optical flow sensor</span></a></h2>
<p>The cup has 2 main components, the cup itself that includes a circular arm through which a constant air flow will be introduced to the inner part and a connector that will transmit the power and data from the sensor to the arduino that is part of the control module of the training mini VR. The second main component is the bottom plate, that has attached the optical flow sensor, a mirror, and a LED printed circuit board (PCB).</p>
<figure>
  <img src='@source/building/assets/images/stage/cup-with-optical-flow-sensor.png'>
  <center><figcaption><small>Cup with optical flow sensor.</small></figcaption></center>
</figure>
<h3 id="cup-assembly" tabindex="-1"><a class="header-anchor" href="#cup-assembly"><span>Cup assembly</span></a></h3>
<p>We use a 3D printing external service to manufacture the cup, Nylon 12 works fine and ideally the top curved surface of the cup should be smooth (smoothing it manually with fine sandpaper does the work).</p>
<ol>
<li>Use a transparent epoxy to place a small ammount aroung the circular hole in the middle of the cup from the bottom up and place the 30 mm gorilla glass window, gently press the window making sure the epoxy covers the edges to avoid air leakage but making sure it doesn't spread into the middle of the mirror.</li>
</ol>
<figure>
  <img src='@source/building/assets/images/stage/cup-assembly-1.png'>
</figure>
<figure>
  <img src='@source/building/assets/images/stage/cup-assembly-2.png'>
</figure>
<ol start="2">
<li>
<p>Cut the cables from the 8 pin connector to 4 inches and remove the tip of the plastic protective cover, also remove the unused lead (in this case the dark purple/ brown cable), cut the black and red 26 AWG cables at 3 inches and remove the plastic cover from the tips as well. Place a female crimp pin in each cable one at the time and use the crimping tool following the instructions <a href="https://www.pololu.com/product/1928" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a>. For the grey and red cables, crimp the black and red 26 AWG cables with them respectively; as shown in the picture below.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Leads colors might change depending on the connector used, just make sure to follow the same color code across the circuit.</p>
</div>
</li>
</ol>
<figure>
  <img src='@source/building/assets/images/stage/cup-assembly-3.png'>
</figure>
<ol start="3">
<li>
<p>Insert each crimped cable into the housing with the correct position, according to the following picture.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The strain relief barrel sometimes ends up a little overly flattened, making it too wide to fit comfortably into the crimp pin housing. In such situations, you can use a pair of pliers to gently squeeze the wider axis of the barrel into a more cylindrical shape that will slide easily into the housing. This tip is taken directly from the <a href="https://www.pololu.com/product/1928" target="_blank" rel="noopener noreferrer">source<ExternalLinkIcon/></a></p>
</div>
</li>
</ol>
 <figure>
  <img src='@source/building/assets/images/stage/cup-assembly-4.png'>
 </figure>
<ol start="4">
<li>Insert the connector into the cup hole and screw.</li>
</ol>
 <figure>
  <img src='@source/building/assets/images/stage/cup-assembly-5.png'>
 </figure>
<h3 id="bottom-plate-assembly" tabindex="-1"><a class="header-anchor" href="#bottom-plate-assembly"><span>Bottom plate assembly</span></a></h3>
<p>The bottom plate design is sent to a machine shop to be made in aluminum. The bottom plate will hold the optical flow sensor which, due to space constrains, is place horizontally in the front part of the plate (toward the mice and the back to the screen) facing a 45 degrees mirror right below the gorilla glass window, instead of being placed directly at the bottom of the styrofoam ball. We also add a printed circuit board with a resistance and an IR LED to illuminate the bottom part of the ball.</p>
<ol>
<li>
<p>We send the sensor holder to be made at a machine shop in aluminum, but i could also be 3D printed. Solder the 90 degrees angled pins to the optical flow sensor, then use a pair of 4-40 1/4&quot; long screws to screw the sensor to the sensor holder (one at the top left and one at the bottom right is enough).</p>
</li>
<li>
<p>We use an external service to make our PCBs using the GERBER files, some options are PCBway or OSH park. Add some solder to the pads, then place the IR LED on top, making sure the pin ID matches the PCB ID mark as seen in the picture below (the ID pin is a small dent on one of the square corners of the LED, you might need a magnifying glass for this) and use a fine tip to solder it to the PCB. Repeat the process with the resistance and finally solder the pins.</p>
</li>
</ol>
 <figure>
  <img src='@source/building/assets/images/stage/bottom-plate-assembly-1.png'>
 </figure>
<ol start="3">
<li>Use the heat insert installation tool to install a 4-40 x 0.17&quot; long heat insert in the mirror and IR LED printed holder. Insert the correct tip into the soldering iron, then place the insert in the tip and connect it to a wall outlet; wait for a few seconds until it is hot and place it in the holes of the mirror holder. Press until the whole insert is inside and the surface is flat.</li>
</ol>
 <figure>
  <img src='@source/building/assets/images/stage/bottom-plate-assembly-2.png'>
 </figure>
<ol start="4">
<li>Cut a first surface mirror in a 1&quot; x 0.75&quot; square. Use a strong 2 side tape and cut some squares to fill both of the surfaces of the mirror and IR LED holder. Paste both the mirror and the PCB.</li>
</ol>
 <figure>
  <img src='@source/building/assets/images/stage/bottom-plate-assembly-3.png'>
 </figure>
<ol start="5">
<li>Screw the sensor and the mirror to the aluminum bottom plate.</li>
</ol>
<h3 id="assembly" tabindex="-1"><a class="header-anchor" href="#assembly"><span>Assembly</span></a></h3>
<ol>
<li>Laser cut a rubber gasket to be placed between the aluminum plate and the cup. Connect the cables from the connector to the optical flow sensor, making sure the ground cable (grey) is at the bottom pin of the sensor (the one closer to the bottom plate). Use the thin red and black cables to connect to the IR LED PCB to the positive and negative pin respectively.</li>
</ol>
 <figure>
  <img src='@source/building/assets/images/stage/assembly-1.png'>
 </figure>
<ol start="2">
<li>Place the rubber gasket between the bottom plate and the 3D printed cup and screw the bottom plate. Make sure that the optical flow sensor is between the cables connector and the air hose connector as shown in the figure below.</li>
</ol>
 <figure>
  <img src='@source/building/assets/images/stage/assembly-2.png'>
 </figure>
<ol start="3">
<li>Screw the bottom plate to the cup and screw the cup to the top plate of the stage, the air hose connector should be facing the upper right part of the top optical breadboard, so that the optical flow sensor is directed toward facing the mice.</li>
</ol>
 <figure>
  <img src='@source/building/assets/images/stage/assembly-3.png'>
 </figure>
<h2 id="cable-and-hose-carrier-optional" tabindex="-1"><a class="header-anchor" href="#cable-and-hose-carrier-optional"><span>Cable and hose carrier (optional)</span></a></h2>
<p>We place a cable and hose carrier to avoid them to be crushed or damaged while the stage is taken in and out. It is also useful to keep the working space clean and neat. Follow the next steps for assembly.</p>
<ol>
<li>Print the carrier to breadboard adapter and install it in the bottom part of the top breadboard (it is easier to screw it before the posts, but you can always take the top breadboard apart or screw brom the bottom). Place the M6 x 1mm square nuts on the square hole in the bottom part of the adapter and use a pair of M6 x 1mm, 10 mm long to screw the carrier mounting bracket to it.</li>
</ol>
 <figure>
  <img src='@source/building/assets/images/stage/carrier-assembly-1.png'>
 </figure>
<ol start="2">
<li>Place the second mounting bracket for the carrier on the 2 holes at the bottom left part of the aluminum bottom plate in the cabinet.</li>
</ol>
 <figure>
  <img src='@source/building/assets/images/stage/carrier-assembly-2.png'>
 </figure>
<ol start="3">
<li>We order a 3 ft. long cable and hose carrier. Count 17 pieces of the carrier and snap off the rest of them. Attach the carrier to both mounting brackets.</li>
</ol>
 <figure>
  <img src='@source/building/assets/images/stage/carrier-assembly-3.png'>
 </figure>
<h2 id="gerber-files" tabindex="-1"><a class="header-anchor" href="#gerber-files"><span>GERBER files</span></a></h2>
<ol>
<li>Gerber files for the IR LED available <a href='./assets/GERBER/stage/IR-LED-circuit-for-optical-flow-sensor.zip'>here.</a></li>
</ol>
</div></template>


