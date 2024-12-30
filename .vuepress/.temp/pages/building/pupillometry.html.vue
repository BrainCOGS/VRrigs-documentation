<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<p>The pupillometry module consist on a monochrome camera mounted at the side of the screen pointing laterally to the face of the mice, the lens used allows to frame the pupil with enough detail to be processed by markeless pose estimation software. The field of view obtained with the lens allows to track sniffing and whisking, altough that is out of the scope of this building guide.</p>
<h2 id="camera-set-up" tabindex="-1"><a class="header-anchor" href="#camera-set-up"><span>Camera set up</span></a></h2>
<p>We use a Teledyne FLIR FFY-U3-04S2M-S camera, the small factor allows to place it right below the aluminum plate holding the screen without taking much space on the rig. We use a 0.4 MP, 121 FPS, monochromatic camera with an IR light source; a mono camera has better sensitivity and allow us to capture the details of the pupil better than the color sensor. Despite the fact that pupillometry can be detected at 30 Hz, we decided to use a 0.4 MP 121 FPS camera to have the flexibility in case we need another kind of measurement (whiskers move), but using the 1.6 MP 60 FPS camera should work fine for pupillometry and should result in a better image resolution.</p>
<ol>
<li>Make a 1&quot; hole on the screen at the position showed below. If you're setting up a pupillometry module on a built screen first mark the position where the hole is going to be made, then use a precision knife to remove the outer part of the screen (make sure not to introduce the knife all the way into the other side), remove the outer part using your fingers and then use your fingers to remove the styrofoam up to the inner part of the screen (the paint layer). Then, use the precision knife to cut the paint layer in the inner part of the screen, this way the hole from the inside out will be cleaner and the smaller size possible (it will adjust to the diameter of the lens).</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Despite the fact that the screen has a hole in one of the sides, we didn't observe any behavioral impact in any of the pilot -or subsequent- sessions. The position and the fact that the hole is tailored to the diameter of the lens can be the reason.</p>
</div>
<figure>
  <img src='@source/building/assets/images/pupillometry/pupillometry-1.png'>
</figure>
<ol start="2">
<li>Set up the camera and position it on the aluminum plate.</li>
</ol>
<ol start="3">
<li>Connect it to the computer.</li>
</ol>
<h2 id="light-source-set-up" tabindex="-1"><a class="header-anchor" href="#light-source-set-up"><span>Light source set up</span></a></h2>
<p>Explain how to set up the light source at the top of the rig.</p>
<h2 id="image-focus-and-camera-positioning" tabindex="-1"><a class="header-anchor" href="#image-focus-and-camera-positioning"><span>Image focus and camera positioning</span></a></h2>
<p>Explain step by step how to focus the image and screw all the parts to get the camera in position.</p>
<h2 id="flir-spinnaker-support-installation-and-configuration-manual-in-matlab" tabindex="-1"><a class="header-anchor" href="#flir-spinnaker-support-installation-and-configuration-manual-in-matlab"><span>FLIR Spinnaker Support Installation and Configuration Manual in MATLAB</span></a></h2>
<h3 id="installation-instructions" tabindex="-1"><a class="header-anchor" href="#installation-instructions"><span>Installation Instructions</span></a></h3>
<ol>
<li>
<p><strong>Open MATLAB</strong>:</p>
<ul>
<li>Launch the MATLAB application on your computer.</li>
</ul>
</li>
<li>
<p><strong>Access Add-Ons</strong>:</p>
<ul>
<li>In the main MATLAB window, access the &quot;Add-Ons&quot; menu.</li>
</ul>
</li>
<li>
<p><strong>Search and Download FLIR Spinnaker Support</strong>:</p>
<ul>
<li>Use the search bar to find &quot;FLIR Spinnaker Support&quot;.</li>
<li>Check the version of MATLAB you have installed.</li>
<li>Download the corresponding version of the program by selecting the &quot;Full exe&quot; option.</li>
</ul>
</li>
<li>
<p><strong>Run the Program</strong>:</p>
<ul>
<li>Execute the downloaded installer.</li>
<li>Accept the terms and conditions of the software.</li>
<li>In the configuration section, select &quot;Application Developer&quot;.</li>
<li>Uncheck the &quot;GigE Driver&quot; option twice.</li>
<li>Proceed with the software installation.</li>
</ul>
</li>
<li>
<p><strong>Add the Package to MATLAB</strong>:</p>
<ul>
<li>Open the directory of the downloaded package: <code v-pre>C:\\Users\ephys\AppData\Roaming\MathWorks\MATLAB Add-Ons\Toolboxes\FLIR Spinnaker Support by Image Acquisition Toolbox\FLIR Spinnaker Support by Image</code>.</li>
</ul>
</li>
<li>
<p><strong>Open the README File</strong>:</p>
<ul>
<li>Locate and open the &quot;README&quot; file in the package directory.</li>
<li>Change the driver registry patch as instructed, ensuring you use the patch for MATLAB version 2022a.</li>
</ul>
</li>
<li>
<p><strong>Verification</strong>:</p>
<ul>
<li>Run all the stages described in the README file to verify that FLIR Spinnaker support is functioning correctly.</li>
</ul>
</li>
<li>
<p><strong>Configure Rig Parameters</strong>:</p>
<ul>
<li>Return to the &quot;Rig Parameters&quot; configuration.</li>
<li>Add the necessary elements according to the specific instructions for your work environment.</li>
</ul>
</li>
</ol>
<h4 id="additional-note" tabindex="-1"><a class="header-anchor" href="#additional-note"><span>Additional Note:</span></a></h4>
<p>Ensure you follow each step precisely and verify the compatibility of each component with your installed MATLAB version to avoid issues during the software installation and configuration.</p>
<h2 id="explanation-of-the-processing-and-how-to-set-up-the-pipeline" tabindex="-1"><a class="header-anchor" href="#explanation-of-the-processing-and-how-to-set-up-the-pipeline"><span>Explanation of the processing and how to set up the pipeline</span></a></h2>
<p>Check <a href="https://braincogs.github.io/software/pupillometry_guide.html"> Pupillometry Pipeline Guide </a> for more information.</p>
</div></template>


