<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<ul>
<li>This documentation will guide the researcher through all steps, tricks &amp; tips to train within the ViRMEn/Datajoint Environment.</li>
</ul>
<h2 id="new-task-creation" tabindex="-1"><a class="header-anchor" href="#new-task-creation"><span>New task Creation</span></a></h2>
<h3 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites"><span>Prerequisites</span></a></h3>
<ul>
<li>Read ViRMEn Manual. Access from virmen Repository (login to github first): <a href="https://github.com/BrainCOGS/TankMouseVR/blob/master/ViRMEn%20manual.pdf">Virmen Manual Link</a></li>
</ul>
<h3 id="initial-set-up" tabindex="-1"><a class="header-anchor" href="#initial-set-up"><span>Initial set-up</span></a></h3>
<ul>
<li>Each task is conformed by a group of files (2 .mat files and 4 .m functions) that make everything work. All files are described here:</li>
</ul>
<h4 id="experiment-code-file" tabindex="-1"><a class="header-anchor" href="#experiment-code-file"><span>Experiment code file</span></a></h4>
<ul>
<li>Located in <strong>ViRMEn\experiments</strong> (Rigs) or <strong>tankmousevr\experiments</strong> (Personal computer) directory.</li>
<li>File that controls stimulus presentation and trial/block progression. Each frame this code is executed, it's general structure is a state machine that follow the trial schema.</li>
<li>Detailed guide on how to modify things on ViRMEn Manual.</li>
<li>Original file: <code v-pre>C:\Experiments\ViRMEn\experiments\poisson_blocks.m</code></li>
<li>Most common use:</li>
</ul>
<ol>
<li>Copy the existing Experiment code file from the most similar task.</li>
<li>Rename file to descriptive name (e.g. <strong>&quot;TaskName&quot;_ExperimentCode.mat</strong>)</li>
<li>Change Experiment code logic.</li>
<li>Check &quot;Tips and Tricks to modify Experiment Code&quot; for detailed tips</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/virmen_guide/experiment_code.png'>
  <center><figcaption>ViRMEn Experiment Code</figcaption></center>
 </figure>
<h4 id="world-file" tabindex="-1"><a class="header-anchor" href="#world-file"><span>World file</span></a></h4>
<ul>
<li>Located in <strong>ViRMEn\experiments</strong> (Rigs) or <strong>tankmousevr\experiments</strong> (Personal computer) directory.</li>
<li>File that defines the structure of the Virmen world(s) settings.</li>
<li>Detailed guide on how to modify things on ViRMEn Manual.</li>
<li>Original file: <code v-pre>C:\Experiments\ViRMEn\experiments\poisson_blocks.mat</code></li>
<li>Most common use:</li>
</ul>
<ol>
<li>Copy the existing World file from the most similar task.</li>
<li>Rename file to descriptive name (e.g. <strong>&quot;TaskName&quot;_World.mat</strong>)</li>
<li>Execute <code v-pre>virmen</code> in MATLAB and open world (Experiment-&gt;Open)</li>
<li>If no object is going to change, just modify <strong>Experiment code</strong> dropdown (Bottom left corner) value to match your experiment code filename.</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/virmen_guide/virmen_gui.png'>
  <center><figcaption>ViRMEn GUI: to modify world files</figcaption></center>
 </figure>
<h4 id="protocol-file" tabindex="-1"><a class="header-anchor" href="#protocol-file"><span>Protocol file</span></a></h4>
<ul>
<li>Located in <strong>ViRMEn\experiments\protocols</strong> (Rigs) or <strong>tankmousevr\experiments\protocols</strong> (Personal computer) directory.</li>
<li>File that declares the number of levels, mazes settings and criteria to decide when to advance subjects to next levels.</li>
<li>Original file: <code v-pre>C:\Experiments\ViRMEn\experiments\protocols\PoissonBlocksCondensed3m.m</code></li>
</ul>
 <figure>
  <img src='@source/software/assets/images/virmen_guide/protocol_code.png'>
  <center><figcaption>Protocol file Code</figcaption></center>
 </figure>
<ul>
<li>Here are definition of structures and variables in protocol file:</li>
</ul>
<ol>
<li>Maze structure:</li>
</ol>
<table>
<thead>
<tr>
<th>Parameter name</th>
<th>Definition</th>
<th>Values accepted</th>
</tr>
</thead>
<tbody>
<tr>
<td>lStart</td>
<td>Length of start region on track</td>
<td>Real number (&gt;0)</td>
</tr>
<tr>
<td>lCue</td>
<td>Length of cue region on track</td>
<td>Real Number (&gt;0)</td>
</tr>
<tr>
<td>lMemory</td>
<td>Length of delay region on track</td>
<td>Real Number (&gt;0)</td>
</tr>
<tr>
<td>Tri_turnHint</td>
<td>Are the turn hints present at all?</td>
<td>logical</td>
</tr>
<tr>
<td>Tri_turnHint_Mem</td>
<td>Are turn hints present during delay period?</td>
<td>logical</td>
</tr>
<tr>
<td>cueDuration</td>
<td>How long are towers present after they appear (i.e., do they disappear after they are passed, and if yes, after how much time)?</td>
<td>Real Number (&gt;0, in seconds)</td>
</tr>
<tr>
<td>cueVisibleAt</td>
<td>How far away from the navigator are towers visible?</td>
<td>Real Number (&gt;0)</td>
</tr>
<tr>
<td>cueProbability</td>
<td>Probability parameter that defines the ratio of salient vs. distractor towers</td>
<td>Real Number (&gt;0, lower numbers make the ratio smaller on average) or inf (places all towers on correct side)</td>
</tr>
<tr>
<td>cueDensityPerM</td>
<td>How many towers per meter in cue region are possible?</td>
<td>Real number</td>
</tr>
<tr>
<td>antiFraction</td>
<td>Proportion of trials in which the correct choice is away from the side with more towers (i.e., fraction of trials with inverted reward</td>
<td>Real number ([0-1])</td>
</tr>
<tr>
<td>world</td>
<td>Index of Virmen world in vr.worlds for that Maze</td>
<td>Index of virmen world ([1-N], where N is the max number of worlds)</td>
</tr>
</tbody>
</table>
<ol start="2">
<li>Maze advancement criteria structure:</li>
</ol>
<table>
<thead>
<tr>
<th>Parameter name</th>
<th>Definition</th>
<th>Values accepted</th>
</tr>
</thead>
<tbody>
<tr>
<td>numTrials</td>
<td>Minimum number of trials the mouse must spend above performance</td>
<td>Natural number</td>
</tr>
<tr>
<td>numTrialsPerMin</td>
<td>Number of trials required per minute to be considered maintaining “good” performance</td>
<td>Natural number</td>
</tr>
<tr>
<td>criteriaNTrials</td>
<td>Number of trials in the running window used to measure performance for deciding whether to advance to the next maze</td>
<td>Natural number</td>
</tr>
<tr>
<td>numSessions</td>
<td>Minimum number of sessions the navigator must have above criteria before advancing</td>
<td>Natural number</td>
</tr>
<tr>
<td>Performance</td>
<td>Minimum performance criterion to advance maze</td>
<td>Real number ([0-1])</td>
</tr>
<tr>
<td>maxBias</td>
<td>Max allowed side bias to advance maze</td>
<td>Real number ([0-1])</td>
</tr>
<tr>
<td>warmupMaze</td>
<td>Index of Virmen world in vr.worlds for the warmup maze for that particular main maze, which occurs at the start of a given session</td>
<td>Index of virmen world ([1-N], where N is the max number of worlds)</td>
</tr>
<tr>
<td>warmupPerform</td>
<td>Minimum performance allowed during warmup to advance to mainMaze</td>
<td>Real number ([0-1])</td>
</tr>
<tr>
<td>warmupBias</td>
<td>Max allowed side bias allowed during warmup to advance to main maze</td>
<td>Real number ([0-1])</td>
</tr>
<tr>
<td>warmupMotor</td>
<td>Max percentage of trials to have &quot;bad&quot; motor quality. (Too much travel distance inside the maze)</td>
<td>Real number ([0-1])</td>
</tr>
<tr>
<td>easyBlock</td>
<td>Index of Virmen world in vr.worlds for the easy block maze for that particular main maze</td>
<td>Index of virmen world ([1-N], where N is the max number of worlds)</td>
</tr>
<tr>
<td>easyBlockNTrials</td>
<td>Number of trials in an easy block</td>
<td>Natural number</td>
</tr>
<tr>
<td>numBlockTrials</td>
<td>Number of trials within a block used to assess performance for demotion to an easy block</td>
<td>Natural number</td>
</tr>
<tr>
<td>blockPerform</td>
<td>If running window performance (calculated over numBlockTrials) goes under this value, a switch to the easy block is triggered</td>
<td>Real number ([0-1])</td>
</tr>
</tbody>
</table>
<ol start="3">
<li>Protocol extra variables:</li>
</ol>
<table>
<thead>
<tr>
<th>Parameter name</th>
<th>Definition</th>
<th>Values accepted</th>
</tr>
</thead>
<tbody>
<tr>
<td>globalSettings</td>
<td>Defines global settings for all mazes</td>
<td>Cell array of name-value pairs (see below for more details)</td>
</tr>
<tr>
<td>vr.numMazesInProtocol</td>
<td>Total number of mazes in protocol</td>
<td>Natural number (likely the length of mazeIDs)</td>
</tr>
<tr>
<td>vr.stimulusGenerator</td>
<td>Function to generate stimuli (i.e., distribution of towers along the maze)</td>
<td>@stimulusGeneratorFunc (e.g., @PoissonStimulusTrain)</td>
</tr>
<tr>
<td>vr.stimulusParameters</td>
<td>Parameters for a stimulus inherited when running the experiment (so stimulus parameters that change between mazes but are not defined by the stimuli themselves)</td>
<td>Cell array (see below for more details)</td>
</tr>
<tr>
<td>vr.inheritedVariables</td>
<td>Parameters for a maze inherited when running the experiment (so maze parameters that change between mazes but are not defined by the stimuli themselves)</td>
<td>Cell array (see below for more details)</td>
</tr>
</tbody>
</table>
<ol start="4">
<li>Global settings variables:</li>
</ol>
<table>
<thead>
<tr>
<th>Parameter name</th>
<th>Definition</th>
<th>Values accepted</th>
</tr>
</thead>
<tbody>
<tr>
<td>cueMinSeparation</td>
<td>Min distance between two towers on the same side</td>
<td>Real number (&gt;0)</td>
</tr>
<tr>
<td>fracDuplicated</td>
<td>Proportion of trials that are duplicated</td>
<td>Real number ([0-1])</td>
</tr>
<tr>
<td>trialDuplication</td>
<td>Number of times each set of stimulus parameters are duplicated, for a given fracDuplicated (i.e., number of exact replications of each trial type for the duplicated fraction of trials)</td>
<td>Natural number</td>
</tr>
</tbody>
</table>
<h4 id="stimuli-bank-file" tabindex="-1"><a class="header-anchor" href="#stimuli-bank-file"><span>Stimuli bank file</span></a></h4>
<ul>
<li>Located in <strong>ViRMEn\experiments\protocols</strong> (Rigs) or <strong>tankmousevr\experiments\protocols</strong> (Personal computer) directory.</li>
<li>File that contains stimuli sets that will be drawn for during session. It contains trial data: towers positions, number of towers for each maze level depending on protocol variables.</li>
<li>Original file: <code v-pre>C:\Experiments\ViRMEn\experiments\protocols\stimulus_trains_PoissonBlocksCondensed3m.mat</code></li>
<li>Most common use:</li>
</ul>
<ol>
<li>Create protocol and world files.</li>
<li>Run <code v-pre>generatePoissonStimuli(('world_file'), @('protocol_file'))</code>. Substitute <strong>world_file &amp; protocol_file</strong> with corresponding names.</li>
</ol>
<h4 id="program-wrapper-file" tabindex="-1"><a class="header-anchor" href="#program-wrapper-file"><span>Program wrapper file</span></a></h4>
<ul>
<li>Located in <strong>ViRMEn\experiments\programs</strong> (Rigs) or <strong>tankmousevr\experiments\programs</strong> (Personal computer) directory.</li>
<li>File to set up a cohort of animals on the training GUI.</li>
<li>Original file: <code v-pre>C:\Experiments\ViRMEn\experiments\programs\trainPoissonBlocks_lp_cohort1.m</code></li>
<li>Most common use:</li>
</ul>
<ol>
<li>Copy the existing Program wrapper file from the most similar task.</li>
<li>Rename file to descriptive name (e.g. <strong>train&quot;TaskName&quot;_cohort(n).m</strong>)</li>
<li>In the call to <strong>runCohortExperiment</strong> function rename first 3 parameters:</li>
</ol>
<ul>
<li><strong>dataPath:</strong> should be <code v-pre>C:\Data\(NETID)\(String to represent protocol, task or cohort)</code></li>
<li><strong>experName</strong> should be the Experiment Code name (without .m)</li>
<li><strong>cohortName</strong> should be a string to identify Cohort.</li>
</ul>
<ul>
<li><strong>experName &amp; cohortName</strong> will be appended to behavior files.</li>
</ul>
 <figure>
  <img src='@source/software/assets/images/virmen_guide/program_wrapper_file.png'>
  <center><figcaption>Program Wrapper File</figcaption></center>
 </figure>
<h4 id="rigparameters-file" tabindex="-1"><a class="header-anchor" href="#rigparameters-file"><span>RigParameters file</span></a></h4>
<ul>
<li>Located in <strong>ViRMEn\extras</strong> (Rigs) or <strong>tankmousevr\extras</strong> (Personal computer) directory.</li>
<li>File that defines a bunch of parameters to control/adjust hardware, display and motion in task.</li>
<li>Only file: <code v-pre>C:\Experiments\extras\RigParameters.m</code></li>
</ul>
<h5 id="if-working-on-a-rig-computer" tabindex="-1"><a class="header-anchor" href="#if-working-on-a-rig-computer"><span>If working on a rig computer:</span></a></h5>
<ul>
<li>Most likely that this file has been set up by Lab Manager. Do nothing.</li>
</ul>
<h5 id="if-working-on-a-personal-computer" tabindex="-1"><a class="header-anchor" href="#if-working-on-a-personal-computer"><span>If working on a personal computer:</span></a></h5>
<ul>
<li>The most common use for this file when working on a personal computer is to run ViRMEn simulations without interacting with the hardware, to do this set:</li>
<li><code v-pre>simulationMode: = true</code></li>
<li><code v-pre>hasDAQ: = false</code></li>
<li>This will allow you to run simulations on any Windows computer and use the keyboard to simulate mouse movement.</li>
</ul>
 <figure>
  <img src='@source/software/assets/images/virmen_guide/rigparameters_file.png'>
  <center><figcaption>RigParameters File</figcaption></center>
 </figure>
<h2 id="set-up-training" tabindex="-1"><a class="header-anchor" href="#set-up-training"><span>Set up training</span></a></h2>
<ol>
<li>Make sure you have all files needed on the section above.</li>
<li>Run your <strong>Program wrapper file</strong>  (e.g. <code v-pre>trainPoissonBlocks_lp_cohort1()</code>).</li>
<li>Training GUI will be shown:</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/virmen_guide/training_GUI_main.png'>
  <center><figcaption>Main screen training GUI</figcaption></center>
 </figure>
<ol start="4">
<li>Click on <strong>Connect to Database</strong> button.</li>
<li>Click on <strong>Add animal</strong> button.</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/virmen_guide/add_animal_section.png'>
  <center><figcaption>Add animal dialog</figcaption></center>
 </figure>
<ol start="6">
<li>Fill corresponding information for animal to train (see next section).</li>
<li>Click on <strong>Submit</strong> button.</li>
<li>Repeat steps 5-7 to add all animals from the cohort.</li>
<li>Click on <strong>Save regiment</strong> button.</li>
<li>Click on <strong>&quot;Empty area&quot; section</strong> where desired subject to train is shown.</li>
<li>Click on <strong>TRAIN &quot;SubjectFullname&quot;</strong> button</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/virmen_guide/training_GUI_main2.png'>
  <center><figcaption>Main screen training GUI with subject</figcaption></center>
 </figure>
<h3 id="set-up-motor-positioning" tabindex="-1"><a class="header-anchor" href="#set-up-motor-positioning"><span>Set up motor positioning</span></a></h3>
<ul>
<li>If the rig where training is happening has a motor positioning system (ask lab manager about it). It is needed to set up initial coordinates for each subject training in the rig.</li>
</ul>
<ol>
<li>Adjust subject positioning for the first time in the rig with the motor GUI (installed in the rig computer).</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/virmen_guide/motor_GUI.png'>
  <center><figcaption>Motor GUI</figcaption></center>
 </figure>
<ol start="2">
<li>In MATLAB write the following (replace code in brackets with corresponding info for the subject):</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">new_record = struct</span>
<span class="line">new_record.subject_fullname = ['efonseca_ef481_actpg004']; # Subject fullname </span>
<span class="line">new_record.ml_position = [17.5]   # ml position in mm (motor axis#1 position in GUI)</span>
<span class="line">new_record.ap_position = [10]     # ap position in mm (motor axis#2 position in GUI)</span>
<span class="line">new_record.dv_position = [15.3]    # dv position in mm (motor axis#3 position in GUI)</span>
<span class="line">insert(subject.LickometerMotorPosition, new_record)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="training-gui-detailed-description" tabindex="-1"><a class="header-anchor" href="#training-gui-detailed-description"><span>Training GUI detailed description</span></a></h2>
<p>In this section all elements of the training GUI will be described:</p>
 <figure>
  <img src='@source/software/assets/images/virmen_guide/training_GUI_description.png'>
  <center><figcaption>Training GUI main screen parts</figcaption></center>
 </figure>
<ul>
<li>From the main screen we have divided all elements in three categories (<span style="color:red"><em>red</em> = rarely used or not used at all; </span><span style="color:rgb(184, 146, 68);"><em>yellow</em> = used in specific situations; </span><span style="color:green"><em>green</em> = widely used</span>).</li>
</ul>
<ol>
<li><strong>Branch information section:</strong> For git users, informs which branch is checked out right now and if the current version code has current changes on it. The vast majority of the times it should be written &quot;master&quot; &amp; &quot;synced&quot;. Go to section pulling/pushing code if not the case.</li>
<li><strong>Schedule calendar:</strong> Day of the week &amp; time when subjects should be trained. This information is not crucial for training at the moment.</li>
<li><strong>Ball displacement plot:</strong> Figure that shows real time velocity in X &amp; Y for the subject in the rig. This plot is used to detect ball movement sensor issues.</li>
<li><strong>RigParameters info bar:</strong> This bar is in red color whenever simulation mode is activated or hasDaq parameter is set to false. If this is the case both parameters should be reset for training to start. If simulation mode is intended ignore this bar.</li>
<li><strong>Test session checkbox:</strong> If next session goal will be to test code or behavior won't be analyzed check this box. Session will not be stored in our DB.</li>
<li><strong>Open valve buttons:</strong> These buttons are used to give a little reward to subject in rig and/or to test valve function.</li>
<li><strong>Connect to DB button:</strong> Use this button to connect to DB, it should be the first thing to do when training GUI is open. <a href="https://braincogs.github.io//software/virmen_guide.html#set-up-training">Check set up training seciton</a></li>
<li><strong>Add animal button:</strong> Use this button to add a new subject to cohort. <a href="https://braincogs.github.io//software/virmen_guide.html#set-up-training">Check set up training seciton</a>  and <a href="https://braincogs.github.io//software/virmen_guide.html#add-animal-dialog-detailed-description">Add animal dialog detailed description</a></li>
<li><strong>Edit animal button:</strong> Button to change some parameter on the &quot;add animal button&quot; dialog for an already added subject to the cohort.</li>
<li><strong>Remove animal button:</strong> Button to remove subject from cohort (do this when animal has finished training).</li>
<li><strong>Save regiment button:</strong> Click this button whenever a subject is added, edited or removed to save changes.</li>
<li><strong>Train button:</strong> Click this button to start training of selected subject.</li>
<li><strong>Close GUI:</strong> Click to close GUI.</li>
<li><strong>Restart MATLAB shortcut:</strong> Click to restart MATLAB.</li>
</ol>
<h2 id="add-animal-dialog-detailed-description" tabindex="-1"><a class="header-anchor" href="#add-animal-dialog-detailed-description"><span>Add animal dialog detailed description</span></a></h2>
 <figure>
  <img src='@source/software/assets/images/virmen_guide/add_animal_dialog_description.png'>
  <center><figcaption>Training GUI main screen parts</figcaption></center>
 </figure>
<ul>
<li>From the add animal dialog we have divided all elements in three categories (<span style="color:red"><em>red</em> = rarely used or not used at all; </span><span style="color:rgb(184, 146, 68);"><em>yellow</em> = used in specific situations; </span><span style="color:green"><em>green</em> = widely used</span>). Sections not described are not used.</li>
</ul>
<ol>
<li><strong>Subject selection:</strong> Dropdown list of all available for training subjects in BRAINCoGS.</li>
<li><strong>Reward Factor:</strong> Multiplier to be used for reward for each one of the warm-up &amp; main mazes. Regularly reward is 4ul for each correct trial on Towers Task. (e.g. if <code v-pre>RewardFactor = 1.25 -&gt; Reward = 4*1.25 = 5 ul</code>).</li>
<li><strong>Motion blur range:</strong> Parameter to set up cue elongation effect opposite to direction of subject motion in virtual reality. 2x1 vector where first element is distance (in cm) from subject to tower cue to start elongation and second element is distance (in cm) to stop elongation effect. No motion blur effect if empty. Common values: <code v-pre>[28 5], []</code></li>
<li><strong>Restart or append session:</strong> Action to perform if a session is restarted.</li>
</ol>
<ul>
<li>If <strong>APPEND SESSION</strong> is selected, every time session is restarted, the &quot;new&quot; session will be counted as new blocks of the same session.</li>
<li>If <strong>START NEW SESSION</strong> is selected, every time session is restarted a new session will be created (recommended when physiology recordings are performed to facilitare syncing process)</li>
</ul>
<ol start="5">
<li><strong>Protocol code file selector:</strong> Dropdown to select protocol code file, check <a href="https://braincogs.github.io/software/virmen_guide.html#new-task-creation">New task creation section for detailed information</a></li>
<li><strong>Experiment code file selector:</strong> Dropdown to select experiment code file, check <a href="https://braincogs.github.io//software/virmen_guide.html#new-task-creation">New task creation section for detailed information</a></li>
<li><strong>Stimulus bank file selector:</strong> Dropdown to select stimulus bank file, check <a href="https://braincogs.github.io//software/virmen_guide.html#new-task-creation">New task creation section for detailed information</a></li>
<li><strong>stimulus Set edit:</strong> If stimulus bank has more than one set it can be set from here. Only change this if you know deeply the stimulus bank file and you know what you are doing.</li>
<li><strong>How warm up trials are drawn:</strong> Strategy to select left or right trials based on previous bias and performance. Default value eradeTrial described <a href=" https://pubmed.ncbi.nlm.nih.gov/11550944/">here</a></li>
<li><strong>How main trials are drawn:</strong> Strategy to select left or right trials based on previous bias and performance. Default value eradeTrial described <a href=" https://pubmed.ncbi.nlm.nih.gov/11550944/">here</a></li>
<li><strong>Subtask selector:</strong> If session is from a specific subtask you can select it here. Check <a href="https://braincogs.github.io//software/subtask_pipeline.html">subtask pipeline section</a> for more information.</li>
<li><strong>Pupillometry video:</strong> If pupillometry video is going to be captured, select video parameters here.</li>
<li><strong>Behavior video:</strong> If behavior video is going to be captured, select video parameters here.</li>
<li><strong>Manipulation selector:</strong> If session is from a specific manipulation you can select it here. Check <a href="https://braincogs.github.io/software/manipulation_pipeline.html">manipulation pipeline section</a> for more information.</li>
<li><strong>Stimulation protocol:</strong> If session is from a specific manipulation Select stimulation protocol in this dropdown. Check <a href="https://braincogs.github.io/software/manipulation_pipeline.html">manipulation pipeline section</a> for more information.</li>
<li><strong>Software parameters:</strong> If session is from a specific manipulation Select software parameters in this dropdown. Check <a href="https://braincogs.github.io/software/manipulation_pipeline.html">manipulation pipeline section</a> for more information.</li>
</ol>
<h2 id="tips-and-tricks-experiment-code" tabindex="-1"><a class="header-anchor" href="#tips-and-tricks-experiment-code"><span>Tips and Tricks Experiment Code</span></a></h2>
<h3 id="add-variables-to-behavior-file" tabindex="-1"><a class="header-anchor" href="#add-variables-to-behavior-file"><span>Add variables to behavior file</span></a></h3>
<ul>
<li>It is often needed to store more variables to behavior file for further analysis.</li>
</ul>
<h4 id="add-variables-on-the-trial-level" tabindex="-1"><a class="header-anchor" href="#add-variables-on-the-trial-level"><span>Add variables on the trial level</span></a></h4>
<ol>
<li>Go to function <code v-pre>setupTrials</code> on the Experiment code</li>
<li>Find line like this: <code v-pre>cfg.trialData         = { 'trialProb', 'trialType', 'choice', 'trialID' ... </code></li>
<li>Add variable name at the end of <strong>cfg.trialData</strong> cell array.</li>
</ol>
<ul>
<li>Remember to define that variable as vr.(variableName) on <code v-pre>initializationCodeFun()</code> or <code v-pre>runtimeCodeFun()</code> before 1st trial is over.</li>
</ul>
<h4 id="add-variables-on-the-block-level" tabindex="-1"><a class="header-anchor" href="#add-variables-on-the-block-level"><span>Add variables on the block level</span></a></h4>
<ol>
<li>Go to function <code v-pre>setupTrials</code> on the Experiment code</li>
<li>Find line like this: <code v-pre>cfg.blockData         = { 'mazeID', 'mainMazeID', 'motionBlurRange', 'iterStr', 'shapingProtocol' ... </code></li>
<li>Add variable name at the end of <strong>cfg.trialData</strong> cell array.</li>
</ol>
<ul>
<li>Remember to define that variable as vr.(variableName) on <code v-pre>initializationCodeFun()</code> or <code v-pre>runtimeCodeFun()</code> before 1st trial is over.</li>
</ul>
<h3 id="set-code-ready-for-simulation" tabindex="-1"><a class="header-anchor" href="#set-code-ready-for-simulation"><span>Set code ready for simulation</span></a></h3>
<ul>
<li>It is useful to have Experiment code ready for simulations. To test all changes without interacting with the rig hardware.</li>
<li>Setting code for simulation also enable making trial by trial videos with <a href="https://github.com/BrainCOGS/ReproduceTrialTowers">ReproduceTrialTowers repository</a></li>
</ul>
<ol>
<li>Search all lines is experiment code that interact with hardware: (all lines starting with: <strong>nidaq..</strong> and <strong>updateDAQSyncSignals</strong> function. (hardware code lines)</li>
<li>Add this line <code v-pre>if RigParameters.hasDAQ</code> before hardware code lines and close if after them.</li>
</ol>
<h3 id="solve-common-errors-during-training" tabindex="-1"><a class="header-anchor" href="#solve-common-errors-during-training"><span>Solve common errors during training</span></a></h3>
<h4 id="arduino-serial-communication-error" tabindex="-1"><a class="header-anchor" href="#arduino-serial-communication-error"><span>Arduino Serial communication error</span></a></h4>
<ul>
<li>Errors like these:</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Open failed: Port: COM7 is not available. Available ports: COM1.</span>
<span class="line">Use INSTRFIND to determine if other instrument objects are connected to the requested device.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Serial communications have not been properly initiated.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Device Error: Unanticipated host error</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>Are the most common error during training. Check if Arduino COM Port is found in device manager and restart MATLAB and/or system to solve this.</li>
</ul>
<h4 id="virmen-variable-not-properly-set" tabindex="-1"><a class="header-anchor" href="#virmen-variable-not-properly-set"><span>virmen variable not properly set</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Reference to non-existent field (variable_name)...</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Unrecognized field name (variable_name).</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>This error is solved if variable is initialized in <code v-pre>initializationCodeFun()</code> (e.g: <code v-pre>vr.(variable_name) = 0</code>)</li>
</ul>
<h4 id="nidaq-channel-is-busy-or-not-found" tabindex="-1"><a class="header-anchor" href="#nidaq-channel-is-busy-or-not-found"><span>Nidaq channel is busy or not found</span></a></h4>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line"> [nidaqPulseRightReward:commit]  Requested operation could not be performed, because the specified digital lines are either reserved or the device is not present in NI-DAQmx.</span>
<span class="line"> It is possible that these lines are reserved by another task or the device is being reset. If you are using these lines with another task, wait for the task to complete.  If you want to force the other task to relinquish the device, reset the device. If you are resetting the device, wait for the reset to finish.</span>
<span class="line"> Device:  Dev1</span>
<span class="line"></span>
<span class="line"> Task Name: RightReward</span>
<span class="line"></span>
<span class="line"> Status Code: -200587</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Review <strong>RigParameters.m</strong> file and check that there is no overlap between input/output channel variables: (rewardChannel, laserChannel, rightPuffChannel, leftPuffChannel,rightRewardChannel, leftRewardChannel, newIterationChannel, newTrialChannel, etc.)</li>
</ul>
</div></template>


