<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<ul>
<li>This documentation will guide the researcher through the process of register, monitor &amp; review pupillometry data.</li>
</ul>
<h2 id="instructions-to-set-up-pupillometry-pipeline-on-a-rig-machine" tabindex="-1"><a class="header-anchor" href="#instructions-to-set-up-pupillometry-pipeline-on-a-rig-machine"><span>Instructions to Set up Pupillometry Pipeline on a Rig Machine</span></a></h2>
<ol>
<li>Ask your lab manager for helo to set up a camera in the rig.</li>
<li>If needed, add these parameters in <strong>RigParameters.m</strong></li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">%% Pupilometry video parameters</span>
<span class="line">video_parent_path               =   'E:/VideoData'</span>
<span class="line">video_ext                       =   '.mj2'</span>
<span class="line">video_acquisition_rate          =   30</span>
<span class="line">video_record                    =   true</span>
<span class="line">video_gain                      =   8</span>
<span class="line">preview                         =   true</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>In Tranining GUI subject task selection menu, under <code v-pre>PupillometryVideo</code> select <code v-pre>2. In RigParameters</code>:</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/pupillometry_guide/training_gui_pupillometry.png'>
  <center><figcaption>Training GUI for pupillometry</figcaption></center>
 </figure>
<ol start="4">
<li>In Experiment file add the following lines in <code v-pre>initializationcodeFun</code> function (just after <code v-pre>vr = initializeGradedExperiment(vr);</code> line):</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">% Start video acquisition</span>
<span class="line">if ~isempty(vr.trainee.pupillometryVideo) &amp;&amp; vr.trainee.pupillometryVideo ~= 1</span>
<span class="line">    vr = startVideoAcquisition(vr);</span>
<span class="line">end</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>In Experiment file add the following lines in <code v-pre>runtimeCodeFun</code> function (just after <code v-pre>catch err displayException(err);</code> line):</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">% Stop video acquisition</span>
<span class="line">if ~isempty(vr.trainee.pupillometryVideo) &amp;&amp; vr.trainee.pupillometryVideo ~= 1</span>
<span class="line">        vr = stopVideoAcquisition(vr);</span>
<span class="line">end</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6">
<li>In Experiment file add the following lines in <code v-pre>terminationCodeFun</code> function (the very first line):</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">% Stop video acquisition</span>
<span class="line">if ~isempty(vr.trainee.pupillometryVideo) &amp;&amp; vr.trainee.pupillometryVideo ~= 1</span>
<span class="line">        vr = stopVideoAcquisition(vr);</span>
<span class="line">end</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pupillometry-backup-videos-task-schedule" tabindex="-1"><a class="header-anchor" href="#pupillometry-backup-videos-task-schedule"><span>Pupillometry backup videos task schedule</span></a></h3>
<ol>
<li>On Windows type <strong>&quot;Task Scheduler&quot;</strong></li>
<li>Open <strong>Task Scheduler</strong> &quot;App&quot;</li>
<li>On right hand side menu, click on <strong>&quot;Create Task&quot;</strong> Action</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/configure_systems/Menu_task_scheduler.png'>
  <center><figcaption>Task scheduler menu</figcaption></center>
 </figure>
<ol start="4">
<li>Name new task as <strong>video_backup</strong></li>
<li>Add a trigger to run task daily at 11:30 pm</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/configure_systems/Trigger_tab_task_scheduler.png'>
  <center><figcaption>Task scheduler Trigger Tab</figcaption></center>
 </figure>
<ol start="6">
<li>Add an action: add this line to the Program/script edit: <code v-pre>C:\Experiments\U19-pipeline-matlab\scripts\cmd_copy_video_files</code></li>
<li>Hit <strong>OK</strong> button</li>
</ol>
<h2 id="pupillometry-db-and-data-organization" tabindex="-1"><a class="header-anchor" href="#pupillometry-db-and-data-organization"><span>Pupillometry DB and data organization</span></a></h2>
<ul>
<li>
<p>Raw data (video files) are located in: <code v-pre>\\cup.pni.princeton. edu\braininit\Data\Raw\video_pupillometry\(userid)\(subjectfullname)\(session_date)_g(session_number)\(video_file)</code></p>
</li>
<li>
<p>Processed data (h5 files) are located in: <code v-pre>\\cup.pni.princeton. edu\braininit\Data\Processed\video_pupillometry\(userid)\(subjectfullname)\(session_date)_g(session_number)\(h5_file)</code></p>
</li>
<li>
<p>Video models are located in: <code v-pre>\\cup.pni.princeton. edu\braininit\Data\Raw\video_models\(video_model_directory)</code></p>
</li>
<li>
<p>Check <a href="https://braincogs.github.io/software/db_organization.html#_9-u19-pupillometry"> DB Organization (pupillometry) </a> for a description for each pupillometry table.</p>
</li>
</ul>
 <figure>
  <img src='@source/software/assets/images/pupillometry_guide/pupillometry_DB_erd.png'>
  <center><figcaption>Pupillometry pipeline DB schema</figcaption></center>
 </figure>
<h2 id="steps-executed-in-pupillometry-pipeline" tabindex="-1"><a class="header-anchor" href="#steps-executed-in-pupillometry-pipeline"><span>Steps executed in Pupillometry pipeline</span></a></h2>
<ol>
<li>
<p>When <code v-pre>pupillometry_video -&gt; 2. In RigParameters </code> is selected in training GUI a new <code v-pre>session_video</code> record is registered in the DB while ingesting Session. (<a href="https://github.com/BrainCOGS/U19-pipeline-matlab/blob/master/schemas/%2Bacquisition/Session.m#L135">Code here</a>)</p>
</li>
<li>
<p>The <code v-pre>cmd_copy_video_files</code> task scheduler takes <code v-pre>session_video</code> records and store new videos in this location: <code v-pre>\\cup.pni.princeton. edu\braininit\Data\Raw\video_pupillometry\(userid)\(subjectfullname)\(session_date)_g(session_number)\(video_file)</code>. <a href="https://github.com/BrainCOGS/U19-pipeline-matlab/blob/master/scripts/cmd_copy_behavior_files.BAT">Script run by pupillometry backup videos task schedule</a></p>
</li>
<li>
<p>During night cronjob: if video is found on cup location:</p>
</li>
</ol>
<ul>
<li>Populate <code v-pre>pupillometry_session</code> table</li>
<li>Execute sync behavior code for video. <a href="https://github.com/BrainCOGS/U19-pipeline-matlab/blob/master/schemas/%2Bpupillometry/PupillometrySyncBehavior.m"> Code here</a>.</li>
<li>Register default model to process video in <code v-pre> pupillometry_session_model</code> and <code v-pre>pupillometry_session_model_data</code>.</li>
</ul>
<ol start="4">
<li>Queue/Checks job in <code v-pre>spockvm2</code></li>
</ol>
<ul>
<li>
<p>Similar to ephys/imaging automation pipeline, pupillometry pipeline has a main (more simple) class to process all pupillometry jobs called <code v-pre>PupillometryProcessingHandler</code>. This class is located <a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/pupillometry_handler.py"> here </a>.</p>
</li>
<li>
<p>Execute <a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/call_pupillometry_queue_jobs.sh">pupillometry_queue_jobs script</a>. This scripts calls <code v-pre>PupillometryProcessingHandler.check_pupillometry_sessions_queue</code> function. Queues a processing job to all sessions where a model was registered.</p>
</li>
<li>
<p>Execute <a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/call_pupillometry_check_jobs.sh">pupillometry_check_jobs script</a>. This scripts calls <code v-pre>PupillometryProcessingHandler.check_processed_pupillometry_sessions</code> function. If processing job is finished get final result (pupil_diameter) and stores it in  <code v-pre>pupillometry_session_model_data</code> table.</p>
</li>
</ul>
<h2 id="monitor-pupillometry-processing-sessions" tabindex="-1"><a class="header-anchor" href="#monitor-pupillometry-processing-sessions"><span>Monitor pupillometry processing sessions</span></a></h2>
<ul>
<li>
<p>A few MATLAB functions were built to check how pupillometry jobs are doing:</p>
</li>
<li>
<p>Get processed data from a session:</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'efonseca_ef317_act116', 'session_date', '2024-02-21')</span>
<span class="line">pupillometry_data = fetch(pupillometry.PupillometrySessionModelData * pupillometry.PupillometrySyncBehavior &amp; key, '*')</span>
<span class="line">pupillometry_data = </span>
<span class="line"></span>
<span class="line">  struct with fields:</span>
<span class="line"></span>
<span class="line">           subject_fullname: 'efonseca_ef317_act116'</span>
<span class="line">               session_date: '2024-02-21'</span>
<span class="line">             session_number: 0</span>
<span class="line">                   model_id: 2</span>
<span class="line">        pupillometry_job_id: 2984</span>
<span class="line">             pupil_diameter: [108177×1 double]</span>
<span class="line">    sync_video_frame_matrix: [108177×4 single]</span>
<span class="line">       sync_behavior_matrix: [150227×5 single]</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>pupil_diameter</strong>: Pupil diameter for each video frame.<br>
<strong>sync_video_frame_matrix</strong>: Time &amp; Block/Trial/Iteration for each video frame.<br>
<strong>sync_behavior_matrix</strong>: Time &amp; video frame for each Block/Trial/Iteration.</p>
<ul>
<li>Restart processing for failed processing
Sometimes processing fails for external factors (processing system was down, model was not properly selected, etc). As a first attempt to solve the issue a restart processing function was created:</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">psmd = pupillometry.PupillometrySessionModelData()</span>
<span class="line">key = struct('subject_fullname', 'efonseca_ef317_act116', 'session_date', '2024-02-21')</span>
<span class="line">psmd.restart_pupillometry_failed_job(key)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If processing fails again, contact Software Developer and check <code v-pre>#automation_pipeline_errors</code> slack channel for more information about the error.</p>
<ul>
<li>Check status for all sessions:</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">psmd = pupillometry.PupillometrySessionModelData()</span>
<span class="line">all_sessions_table = psmd.check_status_pupillometry_jobs()</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Check status for a specific session(s):</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">psmd = pupillometry.PupillometrySessionModelData()</span>
<span class="line">key = struct('subject_fullname', 'efonseca_ef317_act116', 'session_date', '2024-02-21')</span>
<span class="line">session_status = psmd.check_status_pupillometry_jobs(key)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Get all succesfully processed sessions:</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">psmd = pupillometry.PupillometrySessionModelData()</span>
<span class="line">pupillometry_finished_sessions = psmd.get_finished_jobs_pupillometry()</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="add-a-new-video-model-to-the-pipeline" tabindex="-1"><a class="header-anchor" href="#add-a-new-video-model-to-the-pipeline"><span>Add a new video model to the pipeline</span></a></h2>
<ol>
<li>
<p>Check <a href="https://deeplabcut.github.io/DeepLabCut/README.html">Deeplabcut documentation</a> for step by step guide.</p>
</li>
<li>
<p>Ask for tips and tricks to our BRAINCoGS personnel that have created video models in the past:</p>
</li>
</ol>
<ul>
<li>Joshua Julian (jjulian@princeton.edu)</li>
<li>Juan Lopez (juanlopez@princeton.edu)</li>
</ul>
<ol start="3">
<li>
<p>After video model has been created, copy the main directory of the model to this location: <code v-pre>\\cup.pni.princeton. edu\braininit\Data\Raw\video_models\(video_model_directory)</code></p>
</li>
<li>
<p>Add model to the DB (u19_pupillometry.PupillometryModels table):</p>
</li>
</ol>
<ul>
<li>MATLAB code:</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">new_model_key = struct()</span>
<span class="line">new_model_key.model_description = 'New model to insert'</span>
<span class="line">new_model_key.model_path = 'video_models/new_model_directory_name'</span>
<span class="line">insert(pupillometry.PupillometryModels,new_model_key)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Always add <code v-pre>video_models/</code> to the model_path, <code v-pre>before model_directory_name</code>.</li>
</ul>
<ol start="5">
<li>Get <code v-pre>model_id</code> of model you want to use for your sessions:</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">>> pupillometry.PupillometryModels</span>
<span class="line"></span>
<span class="line">ans = </span>
<span class="line">Object pupillometry.PupillometryModels</span>
<span class="line"> :: Table to store reference for each model ::</span>
<span class="line">    MODEL_ID      model_description                        model_path                  </span>
<span class="line">    ________    _____________________    ______________________________________________</span>
<span class="line"></span>
<span class="line">       1        {'Pupillometry_2022'}    {'video_models/Pupillometry2-Ryan-2022-04-07'}</span>
<span class="line">       2        {'Pupillometry_2023'}    {'video_models/twolickspouts-esme-2023-06-22'}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>fetch(pupillometry.PupillometryModels,'*')</code></p>
 <figure>
  <img src='@source/software/assets/images/pupillometry_guide/pupillometry_model_selection.png'>
  <center><figcaption>Pupillometry model_id selection</figcaption></center>
 </figure>
<ol start="6">
<li>Insert into <code v-pre>u19_pupillometry.PupillometrySessionModel</code> sessions to be processed with the new model:</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'efonseca_ef317_act116', 'session_date', '2024-02-21')</span>
<span class="line">key.model_id = 2</span>
<span class="line">insert(pupillometry.PupillometrySessionModel, key, 'IGNORE');</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="7">
<li>Sessions will be processed with new model overnight.</li>
</ol>
<h3 id="note-all-pupillometry-sessions-are-processed-with-a-default-model-model-id-2-pupillometry-2023" tabindex="-1"><a class="header-anchor" href="#note-all-pupillometry-sessions-are-processed-with-a-default-model-model-id-2-pupillometry-2023"><span><strong>Note: All pupillometry sessions are processed with a default model (model_id = 2, Pupillometry_2023).</strong></span></a></h3>
<h3 id="in-the-future-we-plan-a-way-to-select-model-for-subjects-and-or-rigs-instead-of-being-processed-with-default-model" tabindex="-1"><a class="header-anchor" href="#in-the-future-we-plan-a-way-to-select-model-for-subjects-and-or-rigs-instead-of-being-processed-with-default-model"><span><strong>In the future we plan a way to select model for subjects and or rigs instead of being processed with default model.</strong></span></a></h3>
<h2 id="review-processed-data" tabindex="-1"><a class="header-anchor" href="#review-processed-data"><span>Review processed data</span></a></h2>
</div></template>


