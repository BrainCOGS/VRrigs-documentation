<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<p>The Ephys/Imaging Automation Pipeline in BRAINCoGS main goals are:</p>
<ul>
<li>Automate spike sorting and imaging segmentation for all recordings</li>
<li>Centralize/Standardize paths for Recording Data Storage</li>
<li>Unify &amp; Register Ephys/Imaging Processing</li>
<li>Store processed data in BRAINCoGS Database (DJ)</li>
</ul>
<p>To accomplish this we developed three tools:</p>
<ul>
<li>Ephys/Imaging Automation GUI (<a href="https://github.com/BrainCOGS/RecordingProcessJobGUI">RecordingProcessJobGUI</a>)</li>
<li>Recording Workflow management (<a href="https://github.com/BrainCOGS/U19-pipeline_python/tree/master/u19_pipeline/automatic_job">Automatic_job directory in U19-pipeline_python </a>)</li>
<li>Collab reposiotries to handle Ephys/Imaging Processing (<a href="https://github.com/BrainCOGS/BrainCogsEphysSorters">BrainCogsEphysSorters </a> and <a href="https://github.com/BrainCOGS/BrainCogsImagingSegmentation">BrainCogsImagingSegmentation </a>)</li>
</ul>
<h2 id="ephys-imaging-automation-gui" tabindex="-1"><a class="header-anchor" href="#ephys-imaging-automation-gui"><span>Ephys/Imaging Automation GUI</span></a></h2>
<p>In this mini guide for the automation GUI we will show the relationship between the GUI and the Database. From which tables some values are taken and which records are written by the GUI.</p>
<h3 id="automation-gui-main-screen" tabindex="-1"><a class="header-anchor" href="#automation-gui-main-screen"><span>Automation GUI main screen</span></a></h3>
 <figure>
<img src='@source/software/assets/images/automation_pipeline_developer/GUI_tab1_table_connection.png'>
<center><figcaption>Automation GUI main screen fill values</figcaption></center>
 </figure>
<h3 id="ephys-preprocessing-precluster-parameters-organization" tabindex="-1"><a class="header-anchor" href="#ephys-preprocessing-precluster-parameters-organization"><span>Ephys Preprocessing (precluster) parameters organization</span></a></h3>
<h4 id="main-tables" tabindex="-1"><a class="header-anchor" href="#main-tables"><span>Main tables</span></a></h4>
<ul>
<li><strong>u19_pipeline_ephys_element.#pre_cluster_method</strong> List of methods (or algorithms) supported for ephys preprocessing</li>
<li><strong>u19_pipeline_ephys_element.pre_cluster_param_set</strong> Specific set of parameters (mainly a dictionary) for a given preprocessing method. Multiple set of parameters can be stored for the same method.</li>
<li><strong>u19_pipeline_ephys_element.pre_cluster_param_steps</strong> (Ephys) Reference to a set to steps to perform in ephys preprocessing</li>
<li><strong>u19_pipeline_ephys_element.pre_cluster_param_steps__step</strong> These records indicate which set of parameters for given preprocessing methods will be executed (and in which order).</li>
</ul>
 <figure>
<img src='@source/software/assets/images/automation_pipeline_developer/precluster_params_example.png'>
<center><figcaption>Precluster tables record examples </figcaption></center>
 </figure>
<ul>
<li>Depicted in the above image:</li>
</ul>
<ol>
<li>Let's pretend: <strong>precluster_param_steps_name</strong> = new_preprocessing_steps_1 (precluster_param_steps_id = 10 ) is selected for preprocessing.</li>
<li>According to <strong>pre_cluster_param_steps__step</strong>
<ul>
<li>paramset_idx = 9 will be executed 1st</li>
<li>paramset_idx = 2 2nd</li>
<li>paramset_idx = 3 3rd.</li>
</ul>
</li>
<li>Checking <strong>pre_cluster_param_set</strong> for paramset_idx = 9,2,3 we conclude preprocessing will comprise:
<ul>
<li><strong>Tprime</strong> (Tprime ParamSet 1)</li>
<li><strong>Catgt</strong> (Catgt ParamSet for Towers Task)</li>
<li><strong>PreClustMethod1</strong> (PreClusterMethod1 Paramset Mika)</li>
</ul>
</li>
</ol>
<h3 id="epgys-processing-cluster-parameters-organization" tabindex="-1"><a class="header-anchor" href="#epgys-processing-cluster-parameters-organization"><span>Epgys Processing (cluster) parameters organization</span></a></h3>
<ul>
<li>Simpler than preprocessing structure (since there are no multiple steps involved), we have two tables to organize Ephys Processing parameters.</li>
</ul>
 <figure>
<img src='@source/software/assets/images/automation_pipeline_developer/cluster_params_example.png'>
<center><figcaption>Cluster tables record examples </figcaption></center>
 </figure>
<h4 id="main-tables-1" tabindex="-1"><a class="header-anchor" href="#main-tables-1"><span>Main tables</span></a></h4>
<ul>
<li>
<p><strong>u19_pipeline_ephys_element.#clustering_method</strong> List of methods (or algorithms) supported for ephys processing</p>
</li>
<li>
<p><strong>u19_pipeline_ephys_element.#clustering_param_set</strong> Specific set of parameters (mainly a dictionary) for a given processing method. Multiple set of parameters can be stored for the same method.</p>
</li>
<li>
<p>Each recording (or to be precise, recording process) can be processed with a different set of parameters. Default parameters are used for the majority of the recordings in BRAINCoGS.</p>
</li>
</ul>
<h3 id="default-parameters-for-preprocessing-and-processing" tabindex="-1"><a class="header-anchor" href="#default-parameters-for-preprocessing-and-processing"><span>Default parameters for preprocessing and processing</span></a></h3>
<ul>
<li>As seen in in Automation GUI main screen, <strong>u19_recording.#modality</strong> stores default parameters for each modality.</li>
<li>As a developer <strong>manually update  default parameters</strong> for all modalities when needed by the project.</li>
</ul>
 <figure>
<img src='@source/software/assets/images/automation_pipeline_developer/default_parameters_main.png'>
<center><figcaption>From which tables default parameters are taken </figcaption></center>
 </figure>
<ul>
<li>In <strong>u19_recording.#modality</strong> table it is stored a reference for default parameters most commonly used for processing ephys &amp; imaging.</li>
<li>Main table to store preprocessing parameters:
<ol>
<li><strong>u19_pipeline_ephys_element.pre_cluster_param_steps</strong>: (Ephys) Reference to a set to steps to perform in ephys preprocessing</li>
<li><strong>Imaging, u19_pipeline_imaging_element.pre_process_param_steps</strong>: (Imaging) Reference to a set to steps to perform in imaging preprocessing (No preprocessing in imaging for any user at the moment)</li>
</ol>
</li>
<li>Main table to store processing parameters:
<ol>
<li><strong>Ephys, u19_pipeline_ephys_element.#clustering_param_set</strong>: (Ephys) Reference to a set of parameters for chosen sorting algorithm.</li>
<li><strong>Imaging, u19_pipeline_imaging_element.#processing_param_set</strong>: (Imaging) Reference to a set of parameters for chosen segmentation algorithm.</li>
</ol>
</li>
</ul>
<h3 id="imaging-equivalence-parameter-tables" tabindex="-1"><a class="header-anchor" href="#imaging-equivalence-parameter-tables"><span>Imaging equivalence parameter tables:</span></a></h3>
 <figure>
<img src='@source/software/assets/images/automation_pipeline_developer/imaging_equivalence_parameter_tables.png'>
<center><figcaption>Imaging equivalence parameter tables </figcaption></center>
 </figure>
<ul>
<li>All description made for ephys preprocessing and processing tables apply for the imaging counterparts.</li>
</ul>
<h3 id="tables-written-when-recording-is-registered" tabindex="-1"><a class="header-anchor" href="#tables-written-when-recording-is-registered"><span>Tables written when recording is registered:</span></a></h3>
 <figure>
<img src='@source/software/assets/images/automation_pipeline_developer/new_default_recording_records.png'>
<center><figcaption>Tables written when new recording is registered </figcaption></center>
 </figure>
<ul>
<li>
<p>When a new recording is created three tables are written:</p>
<ol>
<li><strong>u19_recording.recording</strong>: Main table for recordings. Recording_id is created will identify the recording through all the process</li>
<li><strong>u19_recording.recording__behavior_session</strong>: Reference to which behavior session corresponds this recording.</li>
<li><strong>u19_recording.default_params</strong>: Set of parameters chosen for this recording.</li>
</ol>
</li>
<li>
<p>If there is no behavior session attached to recording:</p>
</li>
</ul>
<ul>
<li><strong>u19_recording.recording__recording_session</strong>: Subject and datetime of recording is stored as reference in this table.</li>
</ul>
<h4 id="u19-recording-default-params-design" tabindex="-1"><a class="header-anchor" href="#u19-recording-default-params-design"><span>u19_recording.default_params design:</span></a></h4>
<ul>
<li>Default_params works as a &quot;guide&quot; to know which parameters where chosen for recording.</li>
<li>Explanation for all fields of this table:</li>
</ul>
<ol>
<li><strong>recording_id</strong> Reference to which recording parameters are being selected</li>
<li><strong>fragment_number</strong> Reference to which &quot;fragment&quot; (or job) the parameters apply to. (Check next session to know how recordings are split in fragments).</li>
<li><strong>default_same_preparams_all</strong> If default_same_preparams_all = 1 (default case), same preprocessing parameters will be applied to all fragments of recording.</li>
<li><strong>preprocess_param_steps_id</strong> Preprocessing parameter id chosen for this recording-fragment. Taken from u19_recording.#modality by default.</li>
<li><strong>default_same_params_all</strong> If default_same_params_all = 1 (default case), same processing parameters will be applied to all fragments of recording.</li>
<li><strong>paramset_idx</strong> Processing parameter id chosen for this recording-fragment. Taken from u19_recording.#modality by default.</li>
</ol>
<ul>
<li>In the default case (main screen Automation GUI) default_same_preparams_all=1 &amp; default_same_params_all=1 so default parameters will be applied to all fragments of recording.</li>
</ul>
<h2 id="workflow-management-description" tabindex="-1"><a class="header-anchor" href="#workflow-management-description"><span>Workflow management description</span></a></h2>
<p>Workflow management code creates and coordinates of a set of tasks for all recordings that were registered with the GUI to make sure they are entirely processed.</p>
<p>Shell code executed as a cronjob for workflow management:
(<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/call_cronjob_automatic_job.sh">call_cronjob_automatic_job.sh
</a>)</p>
<p>Workflow management is composed mainly by two classes that handles recordings and recording_processes  (recording_processes or jobs are how recordings are composed)</p>
<ul>
<li>Ephys recordings are composed by one or many independent probe electrophysiology recordings. Each probe recording correspond to a job in the workflow management</li>
<li>Calcium imaging recordings are composed by one or many independent field of views image stacks. Each field of view image stack correspond to a job in the workflow management.</li>
</ul>
<p>The class that manages workflow at the recording level is (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/recording_handler.py">RecordingHandler</a>)</p>
 <figure>
<img src='@source/software/assets/images/automation_pipeline_developer/workflow_manager_recordings.png'>
<center><figcaption>Workflow manager diagam at the recording level</figcaption></center>
 </figure>
<h3 id="main-functions-and-variables-in-recording-workflow-manager" tabindex="-1"><a class="header-anchor" href="#main-functions-and-variables-in-recording-workflow-manager"><span>Main functions and variables in recording workflow manager</span></a></h3>
<ul>
<li><strong>recording_status_dict</strong> in (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/params_config.py">Params Config file</a>): This dictionary defines status definitions and corresponding functions to execute.</li>
<li><strong>pipeline_handler_main</strong> in (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/u19_pipeline/automatic_job/recording_handler.py">RecordingHandler</a>): Main function in recording workflow
<ol>
<li>Executes corresponding functions based in status.</li>
<li>Executed every 30 minutes to check for new recordings to be handled.</li>
<li>Send notifications for processed and failed functions.</li>
</ol>
<ul>
<li><strong>exception_handler</strong> in (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/u19_pipeline/automatic_job/recording_handler.py">RecordingHandler</a>): Python decorator for error handling.</li>
</ul>
</li>
<li><strong>modality_preingestion</strong> in (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/u19_pipeline/automatic_job/recording_handler.py">RecordingHandler</a>): Main ingestion function from recording to recording_process tables. There are subcalls depending on modality of recording (ephys or imaging).</li>
</ul>
<h4 id="imaging-preingestion-main-steps" tabindex="-1"><a class="header-anchor" href="#imaging-preingestion-main-steps"><span>Imaging preingestion main steps:</span></a></h4>
<ul>
<li><strong>imaging_preingestion</strong> in (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/u19_pipeline/automatic_job/recording_handler.py">RecordingHandler</a>): Ingestion to recording_process table for an imaging recording. Get all FOVs (TIFF stacks) for the recording and assign a new job for each one with corresponding parameters fetched from selection done in automation GUI.
<strong>AcquiredTiff populate function</strong> in (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/imaging_pipeline.py">Imaging pipeline</a>): Auxiliar script to call <strong>populate_Imaging_AcquiredTiff</strong> script in MATLAB.</li>
<li><strong>populate_Imaging_AcquiredTiff</strong> in (<a href="https://github.com/BrainCOGS/U19-pipeline-matlab/blob/master/scripts/populate_Imaging_AcquiredTiff.m">populate_Imaging_AcquiredTiff</a>): Population calls to:
<ol>
<li><strong>u19_imaging_pipeline.AcquiredTiff</strong>: Each recording is divided into Tiff Splits (e.g. Mesoscope recordings contain multiple tiff stacks that will be processed independently). (<a href="https://github.com/BrainCOGS/U19-pipeline-matlab/blob/master/schemas/%2Bimaging_pipeline/AcquiredTiff.m">Code here</a>)</li>
<li><strong>u19_imaging_pipeline.SyncImagingBehavior</strong>: Find correspondence between virtual reality frame in the behavior experiment and Calcium Imaging frame in recording.
(<a href="https://github.com/BrainCOGS/U19-pipeline-matlab/blob/master/schemas/%2Bimaging_pipeline/SyncImagingBehavior.m">Code here</a>)</li>
</ol>
</li>
</ul>
 <figure>
<img src='@source/software/assets/images/automation_pipeline_developer/imaging_pipeline_basic_ERD.png'>
<center><figcaption>ERD for imaging pipeline at the recording level</figcaption></center>
 </figure>
<h4 id="ephys-preingestion-main-steps" tabindex="-1"><a class="header-anchor" href="#ephys-preingestion-main-steps"><span>Ephys preingestion main steps:</span></a></h4>
<ul>
<li><strong>electrophysiology_preingestion</strong> in (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/u19_pipeline/automatic_job/recording_handler.py">RecordingHandler</a>): Ingestion to recording_process table for an ephys recording. Get all probes for the recording and assign a new job for each one with corresponding parameters fetched from selection done in automation GUI.</li>
</ul>
<ol>
<li>Ingest <strong>ephys_pipeline.EphysPipelineSession</strong> table</li>
<li>Ingest <strong>ephys_element.ProbeInsertion</strong> table</li>
<li>Ingest <strong>ephys_element.EphysRecording</strong> table</li>
<li>Ingest <strong>ephys_pipeline.BehaviorSync</strong> table: Find corresponding iteration in ephys recording with frame from Virmen behavior task (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/ephys_pipeline.py">Code here </a>) (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/utils/ephys_utils.py"> and here </a>).</li>
<li>For each probe (insertion_number) in EphysSession insert a Processing (job) in <strong>u19_recording_process.Processing</strong></li>
</ol>
 <figure>
<img src='@source/software/assets/images/automation_pipeline_developer/ephys_pipeline_basic_ERD.png'>
<center><figcaption>ERD for ephys pipeline at the recording level</figcaption></center>
 </figure>
<h3 id="main-functions-and-variables-in-recording-process-workflow-manager" tabindex="-1"><a class="header-anchor" href="#main-functions-and-variables-in-recording-process-workflow-manager"><span>Main functions and variables in recording_process workflow manager</span></a></h3>
<ul>
<li><strong>recording_process_status_dict</strong> in (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/params_config.py">Params Config file</a>): This dictionary defines status definitions and corresponding functions to execute.</li>
<li><strong>pipeline_handler_main</strong> in (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/u19_pipeline/automatic_job/recording__process_handler.py">RecProcessHandler</a>): Main function in recording process workflow</li>
</ul>
<ol>
<li>Executes corresponding functions based in status.</li>
<li>Executed every 30 minutes to check for new recordings to be handled.</li>
<li>Send notifications for processed and failed functions.</li>
</ol>
<ul>
<li><strong>transfer check/review</strong> in (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/u19_pipeline/automatic_job/recording_process_handler.py">transfer_check/review</a>): Executes and monitors globus transfer from PNI to PrincetonUniversity clusters. (Deprecated)</li>
<li><strong>slurm_job_queue/check</strong> in (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/u19_pipeline/automatic_job/recording_process_handler.py">slurm_job_functions</a>): Generate slurm file and queue the job in the cluster that will process recording process. Monitor job to check if it has already finished.</li>
<li><strong>populate_element</strong> in (<a href="https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/u19_pipeline/automatic_job/recording_process_handler.py">slurm_job_queuew</a>): After processing jobs populate imaging or ephys element tables downstream from results file.</li>
</ul>
 <figure>
<img src='@source/software/assets/images/automation_pipeline_developer/workflow_manager_jobs.png'>
<center><figcaption>Workflow manager diagam at the recording process level</figcaption></center>
 </figure>
  <figure>
<img src='@source/software/assets/images/automation_pipeline_developer/u19_automation_ERD.png'>
<center><figcaption>ERD from behavior session to recording process tables</figcaption></center>
 </figure>
<h2 id="collab-reposiotries-to-handle-ephys-imaging-processing" tabindex="-1"><a class="header-anchor" href="#collab-reposiotries-to-handle-ephys-imaging-processing"><span>Collab reposiotries to handle Ephys/Imaging Processing</span></a></h2>
<h3 id="braincogsephyssorters" tabindex="-1"><a class="header-anchor" href="#braincogsephyssorters"><span>BrainCogsEphysSorters</span></a></h3>
<h4 id="set-up-instructions-for-braincogsephyssorters-in-cluster-system" tabindex="-1"><a class="header-anchor" href="#set-up-instructions-for-braincogsephyssorters-in-cluster-system"><span>Set up instructions for BrainCogsEphysSorters in cluster system</span></a></h4>
<h3 id="set-up-new-processing-cluster" tabindex="-1"><a class="header-anchor" href="#set-up-new-processing-cluster"><span>Set up new processing cluster</span></a></h3>
<p>Instructions to set up a new computing cluster to process Ephys &amp; Imaging</p>
</div></template>


