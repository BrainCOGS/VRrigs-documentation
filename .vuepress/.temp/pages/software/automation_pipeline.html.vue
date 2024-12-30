<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<h2 id="initial-configuration" tabindex="-1"><a class="header-anchor" href="#initial-configuration"><span>Initial configuration</span></a></h2>
<ul>
<li>Note: These steps are only needed if a label in red with &quot;Configuration needed&quot; is shown on the top right corner of the GUI.</li>
</ul>
  <figure>
   <img src='@source/software/assets/images/automation_gui/Configuration_needed_label.png'>
   <center><figcaption>Configuration needed label</figcaption></center>
  </figure>
  <figure>
   <img src='@source/software/assets/images/automation_gui/Configuration_screen.png'>
   <center><figcaption>Configuration screen</figcaption></center>
  </figure>
<ol>
<li>Switch to <strong>&quot;System Configuration&quot;</strong> tab.</li>
<li>Click <strong>&quot;Start Configuration&quot;</strong> button.</li>
<li>In <strong>&quot;System Name&quot;</strong> dropdown, select corresponding system (normally named room#-Recording#).</li>
<li>In <strong>&quot;Associated Behavior Rig&quot;</strong> dropdown, select corresponding rig paired with recording system.</li>
<li>Click <strong>&quot;Add Rig to System&quot;</strong> button.</li>
<li>Repeat steps 4 &amp; 5 until all rigs associated to recording system are added.</li>
<li>In <strong>&quot;Recording Modality&quot;</strong> dropdown select corresponsing modality of the recording system.</li>
<li>In <strong>&quot;Recording Root Folder&quot;</strong> area, click folder button to search for Parent path where all recordings will be stored.</li>
<li>Click <strong>&quot;Configure System&quot;</strong> button.</li>
</ol>
  <figure>
   <img src='@source/software/assets/images/automation_gui/System_configured_dialog.png'>
   <center><figcaption>System configured correctly</figcaption></center>
  </figure>
<p>If something was configured incorrectly, you can repeat the whole process.</p>
<h2 id="automation-gui-regular-use-manual" tabindex="-1"><a class="header-anchor" href="#automation-gui-regular-use-manual"><span>Automation GUI &quot;regular use&quot; Manual</span></a></h2>
<ul>
<li>The automation GUI is located on the desktop in all microscope/ephys recording system across BRAINCoGS. You can identify it by a desktop BRAINCoGS icon called &quot;Recording_Automation_GUI&quot;.</li>
<li>It is encouraged to register &amp; process every recording with the Automation GUI just after recording has ended.</li>
</ul>
<h3 id="default-use-case" tabindex="-1"><a class="header-anchor" href="#default-use-case"><span>Default use case</span></a></h3>
<ol>
<li>Open the GUI just after recording has ended.</li>
<li>Select the recording directory from dropdown list in section 1.</li>
</ol>
<ul>
<li>If no behavior associated with this recording uncheck ****</li>
</ul>
<ol start="3">
<li>Check &quot;Add surgery &amp; insertion device if missing&quot; checkbox if you want to add electrode/microscope/optic fiber insertion coordinates.</li>
<li>Select behavior session corresponding to recording from dropdown list in section 2.</li>
<li>Click Register Recording button.</li>
</ol>
  <figure>
   <img src='@source/software/assets/images/automation_gui/Automation_GUI_main_screen.png'>
   <center><figcaption>Automation GUI main screen</figcaption></center>
  </figure>
<ul>
<li>If no surgery data is found for the subject, a small form to insert surgery and device insertion coordinates will be shown.</li>
</ul>
  <figure>
   <img src='@source/software/assets/images/automation_gui/Add_surgery_data.png'>
   <center><figcaption>Add surgery data form</figcaption></center>
  </figure>
<ul>
<li>Common coordinates for previous recordings:</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:right"><strong>Area</strong></th>
<th style="text-align:right">ml(mm)</th>
<th style="text-align:right">ap(mm)</th>
<th style="text-align:right">depth(mm)</th>
<th style="text-align:right">theta(°)</th>
<th style="text-align:right">phi(°)</th>
<th style="text-align:right">rho(°)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:right"><strong>mPFC L HEMIS</strong></td>
<td style="text-align:right">-0.6</td>
<td style="text-align:right">1.8</td>
<td style="text-align:right">3.8</td>
<td style="text-align:right">-45</td>
<td style="text-align:right">-9</td>
<td style="text-align:right">180</td>
</tr>
<tr>
<td style="text-align:right"><strong>mPFC R HEMIS</strong></td>
<td style="text-align:right">0.6</td>
<td style="text-align:right">1.8</td>
<td style="text-align:right">3.8</td>
<td style="text-align:right">45</td>
<td style="text-align:right">9</td>
<td style="text-align:right">0</td>
</tr>
<tr>
<td style="text-align:right"><strong>HPC  L HEMIS</strong></td>
<td style="text-align:right">-1.5</td>
<td style="text-align:right">2</td>
<td style="text-align:right">1.8</td>
<td style="text-align:right">-45</td>
<td style="text-align:right">-9</td>
<td style="text-align:right">180</td>
</tr>
<tr>
<td style="text-align:right"><strong>HPC  R HEMIS</strong></td>
<td style="text-align:right">1.5</td>
<td style="text-align:right">2</td>
<td style="text-align:right">1.8</td>
<td style="text-align:right">45</td>
<td style="text-align:right">9</td>
<td style="text-align:right">0</td>
</tr>
</tbody>
</table>
<ul>
<li>Wait until recording has been copied to PNI storage resources (cup).</li>
</ul>
  <figure>
   <img src='@source/software/assets/images/automation_gui/Copying_session_dialog.png'>
   <center><figcaption>Dialog shown while copying session</figcaption></center>
  </figure>
<ol start="6">
<li>After recording has been transferred a small dialog with recording id will be shown.</li>
</ol>
  <figure>
   <img src='@source/software/assets/images/automation_gui/Recording_registered.png'>
   <center><figcaption>Dialog shown when recording has been transferred</figcaption></center>
  </figure>
<ol start="7">
<li>User can check basic info of the new recording in the &quot;Recording Table&quot; tab. This tab will be active after recording is transferred.</li>
</ol>
  <figure>
   <img src='@source/software/assets/images/automation_gui/Recording_table.png'>
   <center><figcaption>Recording table tab screenshot</figcaption></center>
  </figure>
<h4 id="notes" tabindex="-1"><a class="header-anchor" href="#notes"><span>Notes</span></a></h4>
<ul>
<li>This use case assumes that default parameters will be used to process the recording.</li>
</ul>
<h2 id="advanced-select-parameters-use-case" tabindex="-1"><a class="header-anchor" href="#advanced-select-parameters-use-case"><span>&quot;Advanced&quot; (select parameters) use case</span></a></h2>
<ol>
<li>Follow 1-4 from <strong>Default use</strong> case</li>
<li>Uncheck <strong>&quot;Use default processing parameters for recording?&quot;</strong> checkbox</li>
<li>Click <strong>&quot;Select parameters &gt;&gt;&gt;&quot;</strong> button</li>
</ol>
  <figure>
   <img src='@source/software/assets/images/automation_gui/Select_parameters.png'>
   <center><figcaption>Parameter selection main screen</figcaption></center>
  </figure>
<ol start="4">
<li>On the <strong>&quot;Select parameters&quot;</strong> tab (assume that all probes/fovs are going to be processed with same parameters)</li>
</ol>
<h3 id="on-section-1" tabindex="-1"><a class="header-anchor" href="#on-section-1"><span>On section 1:</span></a></h3>
<ol start="5">
<li>In <strong>Preprocessing Params Lists</strong> dropdown Select a Preprocessing Param list</li>
</ol>
<ul>
<li>You can check which preprocessing steps are defined for that list on the listbox to the right)</li>
<li>If you select a preprocessing step from the listbox you can check the specific parameters for that preprocessing step on the text area to the right.</li>
</ul>
<h3 id="on-section-2" tabindex="-1"><a class="header-anchor" href="#on-section-2"><span>On section 2:</span></a></h3>
<ol start="6">
<li>In <strong>Processing Params&quot;</strong> dropdown select a Processing parameter suited for recording</li>
</ol>
<ul>
<li>If you select a processing parameter from the dropdown you can check the specific parameters for it on the text area to the right.</li>
</ul>
<ol start="7">
<li>Click <strong>Register Recording</strong> button.</li>
</ol>
<ul>
<li>Next actions are idential to the <strong>&quot;Default use&quot;</strong> case</li>
</ul>
<h2 id="monitor-jobs" tabindex="-1"><a class="header-anchor" href="#monitor-jobs"><span>Monitor jobs</span></a></h2>
<ul>
<li>After a recording is submitted to processing the user is able to track, reprocess and visualize all jobs corresponsing to that recording.</li>
</ul>
  <figure>
   <img src='@source/software/assets/images/automation_gui/Job_table.png'>
   <center><figcaption>Manage Processing Jobs main screen</figcaption></center>
  </figure>
<h3 id="track-status" tabindex="-1"><a class="header-anchor" href="#track-status"><span>Track status</span></a></h3>
<ol>
<li>Switch to <strong>&quot;Manage Processing Jobs&quot;</strong> tab.</li>
<li>Use <strong>&quot;User&quot;</strong>, <strong>&quot;Subject&quot;</strong> &amp; <strong>&quot;Date&quot;</strong> dropdwons / edits to find desired jobs</li>
<li>Select row corresponding to the corresponding job:</li>
</ol>
<ul>
<li>Corresponding Job Status history is shown for selected job.</li>
</ul>
<h4 id="if-status-of-job-is-in-error-status-1-2-error-in-recording-process" tabindex="-1"><a class="header-anchor" href="#if-status-of-job-is-in-error-status-1-2-error-in-recording-process"><span>If status of job is in error status (-1, -2; &quot;Error in recording process&quot;):</span></a></h4>
<ul>
<li>You can open the Error log file on the bottom right corner by clicking <strong>&quot;Open Error Log File&quot;</strong> button.</li>
<li>If you consider that what cause the error is solved now, you can rerun job by clicking <strong>&quot;Rerun job&quot;</strong> button.</li>
</ul>
<h4 id="if-status-of-job-is-in-finished-status-7-8-dat-in-element" tabindex="-1"><a class="header-anchor" href="#if-status-of-job-is-in-finished-status-7-8-dat-in-element"><span>If status of job is in finished status (7, 8; &quot;Dat in element&quot;):</span></a></h4>
<ul>
<li>You can open the Output log file on the bottom right corner by clicking <strong>&quot;Open Output Log File&quot;</strong> button.</li>
<li>You can visualize results from processing by clicking the bottom rightmost buttons: (<strong>Open Phy</strong>, <strong>Open IBL Atlas</strong> for ephys <strong>Open Suite2p-GUI</strong> for imaging)</li>
</ul>
  <figure>
   <img src='@source/software/assets/images/automation_gui/Processing_visualization.png'>
   <center><figcaption>Visualization tools available</figcaption></center>
  </figure>
<h4 id="rerun-jobs" tabindex="-1"><a class="header-anchor" href="#rerun-jobs"><span>Rerun jobs</span></a></h4>
<ul>
<li>A job can be rerun with different parameters by clicking <strong>New Job With different Parameters</strong> button.</li>
<li>Follow <a href='https://braincogs.github.io/software/automation_pipeline.html#advanced-select-parameters-use-case'> &quot;Advanced&quot; (select parameters) use case </a></li>
</ul>
<h2 id="create-new-sets-of-processing-parameters-for-recordings" tabindex="-1"><a class="header-anchor" href="#create-new-sets-of-processing-parameters-for-recordings"><span>Create new sets of processing parameters for recordings</span></a></h2>
<ul>
<li>In order to process recordings with parameters different than default you need at least one of the following:</li>
</ul>
<ol>
<li>A new ser or processing parameters (parameters for the algorithm to process, e.g. kilosort, suite2p).</li>
<li>A list of preprocessing steps formed by a set of preprocessing params (e.g. perform catgt + tprime before kilosort).</li>
</ol>
  <figure>
   <img src='@source/software/assets/images/automation_gui/Create_parameters_screen.png'>
   <center><figcaption>Create parameters screen</figcaption></center>
  </figure>
<h3 id="create-new-processing-parameters-algorithm-pararms" tabindex="-1"><a class="header-anchor" href="#create-new-processing-parameters-algorithm-pararms"><span>Create new Processing parameters (algorithm pararms)</span></a></h3>
<ul>
<li>Note: You need a json file with all parameters ready before starting this process.</li>
<li><a href='./assets/files/automation_gui/kilosort_parameters_example.json.zip'>Here</a> is an example of a kilosort parameter json file. It can serve you as an example for creating your own:</li>
</ul>
<ol>
<li>Switch to &quot;Create Parameters&quot; tab.</li>
</ol>
<h4 id="on-section-0" tabindex="-1"><a class="header-anchor" href="#on-section-0"><span>On section 0:</span></a></h4>
<ol start="2">
<li>In &quot;recordig modality&quot; dropdown select to which modality the parameters correspond.</li>
<li>In &quot;user&quot; dropdown Select your NETID username (select general-user if this parameter will be shared by many users).</li>
</ol>
<h4 id="on-section-1a" tabindex="-1"><a class="header-anchor" href="#on-section-1a"><span>On section 1a:</span></a></h4>
<ol start="4">
<li>In &quot;proc. Param Method&quot; dropdown, select which method (algorithm) these parameters refer to.</li>
</ol>
<h5 id="if-the-algorithm-is-not-found-on-proc-param-method-dropdown" tabindex="-1"><a class="header-anchor" href="#if-the-algorithm-is-not-found-on-proc-param-method-dropdown"><span>If the algorithm is not found on &quot;proc. Param Method&quot; dropdown:</span></a></h5>
<ul>
<li>Check &quot;define new proc. param method ?&quot; checkbox.</li>
<li>Write new processing method name in &quot;New Proc. Param. method&quot; edit</li>
<li>Check automation pipeline developer guide to add corresponding processing code. (LINK MISSING)</li>
</ul>
<ol start="5">
<li>In &quot;proc. Param Set Description&quot; edit, write a small description for the new parameters.</li>
<li>Click &quot;Upload Proc-Parm Set json file&quot; button and search/load for your json file with parameters. You can check your parameters on the text area on the right.</li>
<li>Click &quot;Register Proc. Param Set&quot; button.</li>
</ol>
<h3 id="create-new-preprocessing-parameters-a-single-step-on-preprocessing-list" tabindex="-1"><a class="header-anchor" href="#create-new-preprocessing-parameters-a-single-step-on-preprocessing-list"><span>Create new preprocessing parameters (a single step on preprocessing list)</span></a></h3>
<ul>
<li>Note: You need a json file with all parameters ready before starting this process.</li>
<li><a href='./assets/files/automation_gui/catgt_parameters_example.json.zip'>Here</a> is an example of a catgt parameter json file. It can serve you as an example for creating your own:</li>
</ul>
<ol>
<li>Switch to &quot;Create Parameters&quot; tab.</li>
</ol>
<h3 id="on-section-0-1" tabindex="-1"><a class="header-anchor" href="#on-section-0-1"><span>On section 0:</span></a></h3>
<ol start="2">
<li>In &quot;recordig modality&quot; dropdown select to which modality the parameters correspond.</li>
<li>In &quot;user&quot; dropdown Select your NETID username (select general-user if this parameter will be shared by many users).</li>
</ol>
<h3 id="on-section-1b" tabindex="-1"><a class="header-anchor" href="#on-section-1b"><span>On section 1b:</span></a></h3>
<ol start="4">
<li>In &quot;Preproc.-Param Method&quot; dropdown, select which method (tool) these parameters refer to.</li>
</ol>
<h4 id="if-the-tool-is-not-found-on-preproc-param-method-dropdown" tabindex="-1"><a class="header-anchor" href="#if-the-tool-is-not-found-on-preproc-param-method-dropdown"><span>If the tool is not found on &quot;Preproc.-Param Method&quot; dropdown:</span></a></h4>
<ul>
<li>Check &quot;define new prerproc.-param method ?&quot; checkbox.</li>
<li>Write new preprocessing method name in &quot;New Preproc.-Param method&quot; edit.</li>
<li>Check automation pipeline developer guide to add corresponding preprocessing code. (LINK MISSING).</li>
</ul>
<ol start="5">
<li>In &quot;Preproc.-Param Set Description&quot; edit, write a small description for the new parameters.</li>
<li>Click &quot;Upload Preproc.-Parm Set json file&quot; button and search/load for your json file with parameters. You can check your parameters on the text area on the right.</li>
<li>Click &quot;Register PreProc. Param Set&quot; button.</li>
</ol>
<h3 id="create-new-preprocessing-parameters-list-a-set-of-preprocessing-paramaters" tabindex="-1"><a class="header-anchor" href="#create-new-preprocessing-parameters-list-a-set-of-preprocessing-paramaters"><span>Create new preprocessing parameters list (a set of preprocessing paramaters)</span></a></h3>
<ul>
<li>Note: If you just created a preprocessing parameter, restart GUI.</li>
</ul>
<ol>
<li>Switch to &quot;Create Parameters&quot; tab.</li>
</ol>
<h3 id="on-section-0-2" tabindex="-1"><a class="header-anchor" href="#on-section-0-2"><span>On section 0:</span></a></h3>
<ol start="2">
<li>In &quot;recordig modality&quot; dropdown select to which modality the parameters correspond.</li>
<li>In &quot;user&quot; dropdown Select your NETID username (select general-user if this parameter will be shared by many users).</li>
</ol>
<h3 id="on-section-1c" tabindex="-1"><a class="header-anchor" href="#on-section-1c"><span>On section 1c:</span></a></h3>
<ol start="4">
<li>In &quot;Pre-Params List Name&quot; dropdown, write a suitable name for the list.</li>
<li>In &quot;Pre.-Param List Description&quot; edit, write a small description for the new list.</li>
<li>From &quot;Pre.-Params steps&quot; dropdown select the desired preprocessing step as part of the list.</li>
<li>Click &quot;Add Preparam Steps&quot; button</li>
<li>Repeat steps 6 &amp; 7 to add all desired preprocessing steps for the list.</li>
<li>Use &quot;v&quot; &amp; &quot;^&quot; buttons to set order of preprocessing steps.</li>
<li>Use &quot;x&quot; button to delete an unwanted preprocessing step.</li>
<li>Click &quot;Register pre param list&quot; button.</li>
</ol>
</div></template>


