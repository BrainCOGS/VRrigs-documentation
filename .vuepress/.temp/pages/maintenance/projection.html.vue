<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<p>The projection module maintenance consist primarily on the initial calibration and subsequent maintenance calibrations that should be performed every ~6 months, and the projector bulb replacement that must be done whenever the projector ask for it, since the projector has an internal counter of how many hours the bulb has been used.</p>
<h2 id="projection-calibration" tabindex="-1"><a class="header-anchor" href="#projection-calibration"><span>Projection calibration</span></a></h2>
<p>The projection system use a spherical mirror to project into the dome. The image transformation is based on a <a href="http://www.domerama.com/general/geodesic-dome-projection/hemispherical-dome-projection/" target="_blank" rel="noopener noreferrer">hemispherical dome projection principle<ExternalLinkIcon/></a>.</p>
<p>Creating correctly warped images given a particular projector, mirror, and dome arrangement requires finding the point on the projector frustum for any point on the dome. The problem is three-dimensional but can be turned into a simpler two dimensional problem by firstly translating the geometry so the spherical mirror is at the origin and then rotating the geometry so that the point on the mirror, dome, and projector lies in a single plane.</p>
<p>The projector is located at P1, the mirror is of radius r, and the position on the dome is P2. The path length from the projector to the mirror is L1, the path length from the dome to the mirror is L2. In the case of a spherical mirror: the line at mid-angle between the vectors OP1 and OP2 and its intersection with the surface of the mirror defines the reflection point.</p>
<p>Fermat’s principle states that light travels by the shortest route, so the reflection point on the mirror can be found by minimising the total light path length from the projector to the position on the dome, namely minimising (L1^2 + L2^2)^1/2. It is quite simple in the case of a spherical mirror: the line at mid-angle between the vectors OP1 and OP2 and its intersection with the surface of the mirror defines the reflection point.</p>
<figure>
  <img src='@source/maintenance/assets/images/projection/projection-1.png'>
</figure>
<p>The projection calibration will align the projection within certain boundaries, specifically the horizon, the center and the left and right side will be aligned to the physical position of the dome. This method has a trade-off in the time that has to be inverted to perform the alignment vs the accuracy of the rendered projection, since the height of the towers might be different across systems.</p>
<p>To calibrate the projection:</p>
<ol>
<li>Turn on the projector and make sure to mirror the projection horizontally, otherwise left/right will be inverted.</li>
<li>Place the alignment tool. We recommend to use a <a href="https://www.grainger.com/product/BOSCH-Alignment-Laser-3-Beams-450W78?internalSearchTerm=Alignment+Laser%3A+3+Beams%2C+0+Dots%2C+0+Lines%2C+Red%2C+200+ft+Range+w%2Fo+Detector&amp;suggestConfigId=8&amp;searchBar=true&amp;opr=THKS" target="_blank" rel="noopener noreferrer">3 laser alignment tool<ExternalLinkIcon/></a>. Use the marked lines at the bottom plate to align the center and sides lasers on the dome. Set the height of the horizontal laser to 12&quot; from the bottom plate.</li>
<li>Create a new subject in the ViRMEn training GUI and select the livecalibration.mat experiment. This is the calibration world that was developed, it is necessary to set the simulation mode to true in the RigParameters file. This will project a static world with 3 towers set at the center and at the left and right of the mouse eyes. The goal is to align the horizon to the animal eyes position, the center tower to the center of the screen and the left and right towers to the mouse eyes position.</li>
<li>Set the initial vairables of the projection parameters as below (these parameters has been obatained empirically and they are a good starting point for the training mini VR rigs as they are built).</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">%% Mini VR projection parameters</span>
<span class="line">% Spherical screen radius</span>
<span class="line">proj_param_Rs           =    8;</span>
<span class="line"></span>
<span class="line">% Screen's center location relative to the animal eyes</span>
<span class="line">proj_param_xsm          =    1.814;</span>
<span class="line">proj_param_ysm          =    0;</span>
<span class="line">proj_param_zsm          =    0.47;</span>
<span class="line"></span>
<span class="line">% Mirror position relative to the animal eyes</span>
<span class="line">% Mirror position measurement is facilitated knowing that the center of </span>
<span class="line">%spherical mirror is (43.8-24.2=)19.6mm (0.77in) behind the back surface.</span>
<span class="line">proj_param_xOm          =   5.582;</span>
<span class="line">proj_param_yOm          =   0;</span>
<span class="line">proj_param_zOm          =   -6.62;</span>
<span class="line"></span>
<span class="line">% Radius of the spherical mirror (Silver coated lens LA1740-Thorlabs)</span>
<span class="line">proj_param_r            =   1.724;</span>
<span class="line"></span>
<span class="line">% Projector position relative to the mirror center</span>
<span class="line">proj_param_xP1o         =   11.1;</span>
<span class="line">proj_param_yP1o         =   0;</span>
<span class="line">proj_param_zP1o         =   -0.6;</span>
<span class="line"></span>
<span class="line">% Horizontal coordinate shift and rescaling</span>
<span class="line">proj_param_hrescaling   =   5.5;</span>
<span class="line">proj_param_hshift       =   0.000;</span>
<span class="line"></span>
<span class="line">% Vertical coordinate shift and rescaling</span>
<span class="line">proj_param_vrescaling   =   5.5;</span>
<span class="line">proj_param_vshift       =   -1.017;</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>First, try to align certain variables by physically moving the projector. Unscrew the plate that holds the projector and move it horizontally until the middle tower is centered with the laser. Make sure that the left and rigth towers are equidistant from the middle of the dome, you may be able to achieve this by slightly moving the plate forward from one side or the other.</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The position of the towers will move when the plate is thightened, don't untight the screws all the way if it is not necessary, unthight until it is possible to move the plate and checking the projection, then thight and adjust accordingly.</p>
</div>
<p>The goal of doing this physically instead of modifying the projection transformation parameters is that it decreases the differences across the projections in different training rigs.</p>
<ol start="5">
<li>Adjust the rest of the parameters until the towers and horizon are aligned. A brief description of how each parameter adjust the projection can be found below.</li>
</ol>
<ul>
<li><strong>Rs</strong> should not be modified.</li>
<li><strong>xsm</strong> will adjust the middle tower height without affecting the lateral towers, values should be around [1.5 - 2]. This value canbe adjusted since there will be idiosincrasies due to the screen fabrication.</li>
<li><strong>zOm</strong> will adjust the horizon. This value can be adjusted since there can be differences in how the mirror is glued to its aluminum base.</li>
<li><strong>xP1o</strong> will extend or contract the lateral towers and <strong>zP1o</strong> will lower or elevate the middle tower but will modify the distal part of the lateral towers. These values can be adjusted since there are idiosincrasies in the origin of the projection between projectors in their fabrication.</li>
<li>The <strong>hrescaling</strong> and the <strong>vrescaling</strong> should be the same, otherwise it will modify elongate or contract the projection, and there will be significant differences across sytems.</li>
<li>The <strong>hshift</strong> and <strong>vshift</strong> will move the entire projection up, down, left or right. Ideally the <strong>hshift</strong> should be 0 if the projection is calibrated manually, but it can be modified if necessary since it shouldn't affect significatly the projection across differente systems.</li>
</ul>
<figure>
  <img src='@source/maintenance/assets/images/projection/projection-2.png'>
  <center><figcaption><small>Projection calibration. Due to the principle of the spherical mirror projection, the lateral towers will be slightly curved, the projection should be fine as long as they are equidistant and centered at the top (or the bottom, just make sure to keep the same policy across rigs).</small></figcaption></center>
</figure>
<h2 id="projector-bulb-replacement" tabindex="-1"><a class="header-anchor" href="#projector-bulb-replacement"><span>Projector bulb replacement.</span></a></h2>
<p>The projector has a counter used to determine how long the bulb has been used, it will emit an alert that the bulb should be replaced. Make sure to have in stock projector bulbs and follow each projector instruction to replace it.</p>
</div></template>


