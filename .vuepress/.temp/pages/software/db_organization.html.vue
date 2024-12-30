<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<ul>
<li>The next sections will describe all DBs on the BRAINCoGS host (datajoint00.pni.princeton.edu). DBs are subdivided in these categories:</li>
</ul>
<ol>
<li>Lab &amp; subject DBs</li>
<li>Behavior DBs</li>
<li>Ephys &amp; Imaging DBs</li>
</ol>
<h2 id="lab-subject-dbs" tabindex="-1"><a class="header-anchor" href="#lab-subject-dbs"><span>Lab &amp; Subject DBs</span></a></h2>
<h3 id="_1-u19-lab" tabindex="-1"><a class="header-anchor" href="#_1-u19-lab"><span><strong>1. u19_lab</strong></span></a></h3>
<ul>
<li>Stores all general information that apply for entire BRAINCoGS projects. Aditionally general information for researchers are stored here.</li>
</ul>
<h4 id="main-tables" tabindex="-1"><a class="header-anchor" href="#main-tables"><span>Main tables</span></a></h4>
<ul>
<li><strong>User</strong> Stores general information for all researchers and technicians in BRAINCoGS. Being registered in this table is a requirement to add subjects in your behalf  Check <a href="https://braincogs.github.io/software/db_access.html#add-researcher-to-user-table.html"> here </a> for more information. Important fields include, user_id (NETID), active_gui_user &amp; slack_webhook URLS for users (for notifications). Check <a href="https://braincogs.github.io/software/alert_system.html#set-up-custom-slack-alerts.html"> set slack alerts </a> for more info.</li>
<li><strong>Location</strong> All systems associated with rigs, recordings &amp; technician use. All behavior sessions are associated with one of the systems recorded here, each recording (ephys/imaging) is associated with a system recorded here. Check <a href="https://braincogs.github.io/software/db_access.html#add-researcher-to-user-table.html"> here </a> for more information. Important fields include, user_id (NETID), active_gui_user &amp; slack_webhook (for notifications). Check <a href="https://braincogs.github.io/software/alert_system.html#configure_systems.html"> Configure systems section </a> for more info.</li>
<li><strong>Path</strong> Paths for the cup drives in BRAINCoGS. Paths are divided by OS and local or network system types.</li>
<li><strong>AcquisitionType</strong> All possible acquisitions modalities in BRAINCoGS. (Each location in Path is associated with one modality as well). Modalities include: behavior, electrophysiology, 2photon, mesoscope, etc).</li>
<li><strong>DjCustomVariables</strong> Configuration variables for datajoint, mainly paths for special directories. This table is used in the background when DB access configuration is set for a system is made. Check <a href="https://braincogs.github.io/software/db_access.html#db-access-for-matlab-repository"> DB Access section </a></li>
<li><strong>DjStores</strong> External storage path locations on the network drives (cup) for several Datajoint tables. This table is used in the background when DB access configuration is set for a system is made. Check <a href="https://braincogs.github.io/software/db_access.html#db-access-for-matlab-repository"> DB Access section </a></li>
<li><strong>InsertionDevice</strong> Device types for insertion in subjects. (From ephys electrodes, to optogenetic cannula). Paired with u19_action.SurgeryLocation table.</li>
<li><strong>SlackWebhooks</strong> Slack webhooks URLs for general notifications. Check <a href="https://braincogs.github.io/software/alert_system.html#set-up-custom-slack-alerts.html"> set slack alerts </a> for more info.</li>
</ul>
<h3 id="_2-u19-subject" tabindex="-1"><a class="header-anchor" href="#_2-u19-subject"><span><strong>2. u19_subject</strong></span></a></h3>
<ul>
<li>Stores all general information for subjects (mice) registered for experiments.</li>
</ul>
<h4 id="main-tables-1" tabindex="-1"><a class="header-anchor" href="#main-tables-1"><span>Main tables</span></a></h4>
<ul>
<li><strong>Subject</strong> Stores general information for all subjects in BRAINCoGS. Being registered in this table is a requirement to train and perform behavior sessions.</li>
<li><strong>LickometerMotorPosition</strong> Stores ml, ap, &amp; dv motor coordinates for a subject in a rig with positioning motor installed. Check <a href="https://braincogs.github.io/software/virmen_guide.html#set-up-training"> Set up motor positioning subsection </a> for more information.</li>
<li><strong>CagingStatus</strong> Subject-Cage relationship storage.</li>
<li><strong>HealthStatus</strong> Daily health assesment for subject. Fields like normal_behavior, posture_grooming, technician_comments etc.</li>
<li><strong>Allele</strong> All subjects' genotypes in BRAINCoGS.</li>
<li><strong>Cage</strong> Cage list for subjects.</li>
</ul>
<h2 id="behavior-dbs" tabindex="-1"><a class="header-anchor" href="#behavior-dbs"><span>Behavior DBs</span></a></h2>
<h3 id="_1-u19-acquisition" tabindex="-1"><a class="header-anchor" href="#_1-u19-acquisition"><span><strong>1. u19_acquisition:</strong></span></a></h3>
<ul>
<li>Stores all reference and general information of behavior sessions. Other tables in this DB also stores reference to blocks, trials, manipulation and subtasks of a behavior session.</li>
</ul>
<h4 id="main-tables-2" tabindex="-1"><a class="header-anchor" href="#main-tables-2"><span>Main tables</span></a></h4>
<ul>
<li><strong>SessionStarted</strong> Reference to all sessions that are started with training GUI. Path to behavior file ia located here.</li>
<li><strong>Session</strong> Basic information (performance, experiment code used, etc.) for a behavior session. Record written after training is finished</li>
<li><strong>SessionBlock</strong> Basic reference to all blocks from all behavior sessions.</li>
<li><strong>SessionBlockTrial</strong> Basic reference to all trials from all behavior sessions.</li>
<li><strong>SessionManipulation</strong> Reference to which manipulation (if any) was performed for a behavior session. Check <a href="https://braincogs.github.io/software/manipulation_pipeline.html">manipulation pipeline section</a> for more information.</li>
<li><strong>SessioSubtask</strong> Reference to which subtask (if any) was performed for a behavior session. Check <a href="https://braincogs.github.io/software/subtask_pipeline.html">subtask pipeline section</a> for more information.</li>
<li><strong>SessionVideo</strong> Reference to video adquisition if performed while behavior session. Check <a href="https://braincogs.github.io/software/pupillometry_guide.html">Pupillometry Pipeline Guide</a> for more information.</li>
</ul>
<h3 id="_2-u19-action" tabindex="-1"><a class="header-anchor" href="#_2-u19-action"><span><strong>2. u19_action:</strong></span></a></h3>
<ul>
<li>Stores daily, recurrent and specific actions performed to subjects.</li>
</ul>
<h4 id="main-tables-3" tabindex="-1"><a class="header-anchor" href="#main-tables-3"><span>Main tables</span></a></h4>
<ul>
<li><strong>Weighing</strong> Records daily weight of subjects. Written by weighingGUI used by technicians.</li>
<li><strong>WaterAdministration</strong> Records daily water administration to subjects. Earned water written at the end of training. Supplement water Written by weighingGUI used by technicians.</li>
<li><strong>Surgery</strong> Records from surgeries performed to subjects. Written by <a href="https://braincogs.github.io/software/automation_pipeline.html">Ephys/Imaging automation pipeline section</a></li>
<li><strong>SurgeryLocation</strong> Records device locations implanted to subjects from surgeries (eg. NeuroPixel probes). . Written by <a href="https://braincogs.github.io/software/automation_pipeline.html">Ephys/Imaging automation pipeline section</a></li>
<li><strong>DaiyPositionData</strong> For subjects with automatic motor positioning on rig, stores daily ml,ap &amp; dv coordinates. If cameras are present on rig a lateral and tops reference images are also stored.</li>
</ul>
<h3 id="_3-u19-behavior" tabindex="-1"><a class="header-anchor" href="#_3-u19-behavior"><span><strong>3. u19_behavior:</strong></span></a></h3>
<ul>
<li>Stores detailed data for behavior sessions. DB built to support Towers Task data but stores data from all behavior sessions.</li>
</ul>
<h4 id="main-tables-4" tabindex="-1"><a class="header-anchor" href="#main-tables-4"><span>Main tables</span></a></h4>
<ul>
<li><strong>TowersBlock</strong> Specific block data from behavior sessions. (level, main_level, block_performance, etc).</li>
<li><strong>TowersBlockTrial</strong> Specific trial data from behavior sessions. (towers positions, trial_type, choice, position, velocity etc).</li>
<li><strong>SpatialTimeBlobs</strong> Efficient time, position, velocity storage (per session and not by trial). Check <a href="https://braincogs.github.io/software/db_analysis.html#matlab">get_full_trial_data with SpatialTimeBlobs </a> to know how to use this.</li>
<li><strong>Towers Session/Subject ** Psych</strong> Group of tables with Psychometric Curves parameters per session, block_type (main, guiding), subject, etc. Check <a href="https://braincogs.github.io/software/db_analysis.html">Using psychometric data</a> to know how to use this. Check <a href="https://braincogs01.pni.princeton.edu/">BRAINCoGS Data viewer </a> to check psychometric curves.</li>
</ul>
<h3 id="_4-u19-behavior-subtask" tabindex="-1"><a class="header-anchor" href="#_4-u19-behavior-subtask"><span><strong>4. u19_behavior_subtask:</strong></span></a></h3>
<ul>
<li>Stores specific data for different subtask sessions. . Check <a href="https://braincogs.github.io/software/subtask_pipeline.html">subtask pipeline section</a> for more information.</li>
</ul>
<h3 id="_5-u19-optogenetics" tabindex="-1"><a class="header-anchor" href="#_5-u19-optogenetics"><span><strong>5. u19_optogenetics</strong></span></a></h3>
<ul>
<li>Optogenetic manipulation data. Review <a href="https://braincogs.github.io/software/manipulation_pipeline.html">Manipulation pipeline section</a> for more information and examples.</li>
</ul>
<h4 id="main-tables-5" tabindex="-1"><a class="header-anchor" href="#main-tables-5"><span>Main tables</span></a></h4>
<ul>
<li><strong>OptogeneticSession</strong> Reference to a behavior session that is also an optogenetic session. Stores which protocol and software parameter set were used fot the session.</li>
<li><strong>OptogeneticSessionTrial</strong> Stores specific optogenetic data on a trial by trial basis.</li>
<li><strong>OptogeneticSoftwareParameters</strong> MATLAB Structure with parameters to be used during the behavior session specific for a subset of optogenetic sessions.</li>
<li><strong>OptogeneticProtocol</strong> Describes metadata that will be associated with optogenetic sessions. (e.g. laser wavelength, stimulation frequency, etc.)</li>
</ul>
<h3 id="_6-u19-thermal" tabindex="-1"><a class="header-anchor" href="#_6-u19-thermal"><span><strong>6. u19_thermal</strong></span></a></h3>
<ul>
<li>Thermal manipulation data. Review <a href="https://braincogs.github.io/software/manipulation_pipeline.html">Manipulation pipeline section</a> for more information and examples. Identical structure as Optogenetic DB.</li>
</ul>
<h3 id="_7-u19-puffs" tabindex="-1"><a class="header-anchor" href="#_7-u19-puffs"><span><strong>7. u19_puffs</strong></span></a></h3>
<ul>
<li>Air puff task sessions specific data.</li>
</ul>
<h4 id="main-tables-6" tabindex="-1"><a class="header-anchor" href="#main-tables-6"><span>Main tables</span></a></h4>
<ul>
<li><strong>PuffsSession</strong> Reference to a behavior session that is also a puff session.</li>
<li><strong>PuffsSessionTrial</strong> Stores specific puffs data on a trial by trial basis.</li>
</ul>
<h2 id="ephys-imaging-dbs" tabindex="-1"><a class="header-anchor" href="#ephys-imaging-dbs"><span>Ephys/Imaging DBs</span></a></h2>
<h3 id="_1-u19-recording" tabindex="-1"><a class="header-anchor" href="#_1-u19-recording"><span><strong>1. u19_recording:</strong></span></a></h3>
<ul>
<li>Stores all reference to any recording (ephys &amp; imaging) performed on BRAINCoGS. Check <a href="https://braincogs.github.io/software/automation_pipeline.html">Automation pipeline section</a> for more information.</li>
</ul>
<h4 id="main-tables-7" tabindex="-1"><a class="header-anchor" href="#main-tables-7"><span>Main tables</span></a></h4>
<ul>
<li><strong>Recording</strong> Reference to all recordings. Stores information like location, status_recording &amp; recording directory on the network drives.</li>
<li><strong>RecordingBehaviorSessions</strong> Relationship between recordings and behavior sessions. <strong>(recording_id &lt;-&gt; session_key (subject, date, #)</strong></li>
<li><strong>RecordingRecordingSession</strong> Relationship between recordings and subject/date. Used when no behavior is attached to recording.</li>
<li><strong>Modality</strong> List of all possible modalities supported by the automation pipeline.</li>
</ul>
<h3 id="_2-u19-recording-process" tabindex="-1"><a class="header-anchor" href="#_2-u19-recording-process"><span><strong>2. u19_recording_process:</strong></span></a></h3>
<ul>
<li>Stores all reference to all processing jobs for ephys &amp; imaging on the automation pipeline. Almost all information in this table is shown in the <a href="https://braincogs.github.io/software/automation_pipeline.html#monitor-jobs">Automation pipeline GUI </a>.</li>
</ul>
<h4 id="main-tables-8" tabindex="-1"><a class="header-anchor" href="#main-tables-8"><span>Main tables</span></a></h4>
<ul>
<li><strong>Processing</strong> Reference to all processing jobs. For ephys it has a one to one relationship with recording probes. For imaging it has a one to one relationship with Field of View. Stores <strong>status_processing, raw_path (recording_process_pre_path), processed_path (recording_process_post_path)</strong> for each of these &quot;fragments&quot; of recording.</li>
<li><strong>ProcessingEphysParams</strong> Relationship between jobs &amp; which ephys processing parameters were used for that job.</li>
<li><strong>ProcessingImagingParams</strong> Relationship between jobs &amp; which imaging processing parameters were used for that job.</li>
<li><strong>LogStatus</strong> Stores all status change for processing jobs and corresponding messages &amp; exceptions if applicable.</li>
</ul>
<h3 id="_3-u19-ephys-pipeline" tabindex="-1"><a class="header-anchor" href="#_3-u19-ephys-pipeline"><span><strong>3. u19_ephys_pipeline:</strong></span></a></h3>
<ul>
<li>Basic reference to recordings and behavior synchronization data.</li>
</ul>
<h4 id="main-tables-9" tabindex="-1"><a class="header-anchor" href="#main-tables-9"><span>Main tables</span></a></h4>
<ul>
<li><strong>EphysPipelineSession</strong> List of recording_ids that correspond with ephys recordings.</li>
<li><strong>BehaviorSync</strong> Synchronization data between ephys recording and behavior session. <strong>trial_index_nidq &amp; iteration_index_nidq</strong> are trial and iteration # for each sample on the electrophysiology data.</li>
</ul>
<h3 id="_4-u19-pipeline-ephys-element" tabindex="-1"><a class="header-anchor" href="#_4-u19-pipeline-ephys-element"><span><strong>4. u19_pipeline_ephys_element:</strong></span></a></h3>
<ul>
<li>Datajoint element array electrophysiology DB. Database schema is designed to store all data from an ephys recording and subsequent kilosort processing. More info: <a href="https://datajoint.com/docs/elements/element-array-ephys/0.2/">Datajoint element array electrophysiology docs</a>. For BRAINCoGS <strong>ephys_precluster</strong> schema was used.</li>
</ul>
<h4 id="main-tables-10" tabindex="-1"><a class="header-anchor" href="#main-tables-10"><span>Main tables</span></a></h4>
<ul>
<li><strong>ClusteringParamSet</strong> Table that contains a list of parameter dictionaries/structures used for sorting process.</li>
<li><strong>PreClusterparamSet</strong> Table that contains a list of parameter dictionaries/structures used for preprocessing steps.</li>
<li><strong>PreClusterparamSteps</strong> Table that contains lists of lists of preCluster param Sets that form a preprocessing sequence for recordings.
preprocessing steps. (e.g. catgt)</li>
<li><strong>CuratedClusteringUnit</strong> Main data for all the units found in sorting process. (<strong>spike_times, cluster_quality_label</strong>, etc.)</li>
<li><strong>LFPElectrode</strong> LFP data for each of the electrodes in recording.</li>
<li><strong>WaveformSetWaveform</strong> All waveforms from a unit captured by each electrode in recording.</li>
<li><strong>ProbeInsertion</strong> Records which probe was used for the corresponding recording-insertion_number pair. Check <strong>5. u19_pipeline_probe_element</strong>.</li>
</ul>
<h3 id="_5-u19-pipeline-probe-element" tabindex="-1"><a class="header-anchor" href="#_5-u19-pipeline-probe-element"><span><strong>5. u19_pipeline_probe_element:</strong></span></a></h3>
<ul>
<li>Datajoint element array electrophysiology DB for probes. Database schema is designed to store probes and electorde configurations used in recordings. More info: <a href="https://datajoint.com/docs/elements/element-array-ephys/0.2/">Datajoint element array electrophysiology docs</a>. For BRAINCoGS <strong>ephys_precluster</strong> schema was used.</li>
</ul>
<h4 id="main-tables-11" tabindex="-1"><a class="header-anchor" href="#main-tables-11"><span>Main tables</span></a></h4>
<ul>
<li><strong>Probe</strong> Table that contains all physicial probes used in recordings.</li>
<li><strong>ProbeTypElectrode</strong> Table that contains coordinates, shank# and id for each electrode in a probe.</li>
</ul>
<h3 id="_6-u19-imaging-pipeline" tabindex="-1"><a class="header-anchor" href="#_6-u19-imaging-pipeline"><span><strong>6. u19_imaging_pipeline:</strong></span></a></h3>
<ul>
<li>Reference to all imaging recordings and subsequent fields of view (FOV) identification and splitting for processing.</li>
</ul>
<h4 id="main-tables-12" tabindex="-1"><a class="header-anchor" href="#main-tables-12"><span>Main tables</span></a></h4>
<ul>
<li><strong>ImagingPipelineSession</strong> List of recording_ids that correspond with imaging recordings.</li>
<li><strong>TiffSplit</strong> Identified fields of view for a single recording (regularly 2photon = 1 FOV, mesoscope = 3 FOV). Each FOV is processed separately.</li>
<li><strong>AcquiredTiff</strong> TIFF file header metadata for each FOV.</li>
<li><strong>SyncImagingBehavior</strong> Synchronization data between imaging recording and behavior session. <strong>sync_behav_%%_by_im_frame</strong> = Correspoding behavior block, trial and iteration for each imaging frame.
<strong>sync_im_frame_span_by_behav_%%</strong> = Fist and last imaging frame for each behavior block, trial and iteration.</li>
</ul>
<h3 id="_7-u19-pipeline-imaging-element" tabindex="-1"><a class="header-anchor" href="#_7-u19-pipeline-imaging-element"><span><strong>7. u19_pipeline_imaging_element:</strong></span></a></h3>
<ul>
<li>Datajoint element calcium imaging DB. Database schema is designed to store all data from an imaging recording and subsequent segmentation process. More info: <a href="https://datajoint.com/docs/elements/element-calcium-imaging/0.5/">Datajoint element calcium imaging docs</a>.</li>
</ul>
<h4 id="main-tables-13" tabindex="-1"><a class="header-anchor" href="#main-tables-13"><span>Main tables</span></a></h4>
<ul>
<li><strong>ProcessingParamSet</strong> Table that contains a list of parameter dictionaries/structures used for segmentation process.</li>
<li><strong>ActivityTrace</strong> Activity trace signals for all masks identified in segmentation process.</li>
<li><strong>FluorescenceTrace</strong> Fluorescence trace signals for all masks identified in segmentation process.</li>
<li><strong>MaskClassificationMaskType</strong> Mask types (soma, blob, doughnut, etc) and confidence for each mask identified in segmentation process.</li>
<li><strong>MotionCorrection(non)RigidMotionCorrection</strong> Motion correction details (shifts, outlier_frames, etc) performed durinc processing.</li>
<li><strong>MotionCorrectionSummary</strong> Summary (average, correlation, max_proj) images for each field and channel after motion correction.</li>
</ul>
<h3 id="_8-u19-pipeline-scan-element" tabindex="-1"><a class="header-anchor" href="#_8-u19-pipeline-scan-element"><span><strong>8. u19_pipeline_scan_element:</strong></span></a></h3>
<ul>
<li>Datajoint element calcium imaging DB. Database schema is designed to store scan info and metadata from imaging files. More info: <a href="https://datajoint.com/docs/elements/element-calcium-imaging/0.5/">Datajoint element calcium imaging docs</a>.</li>
</ul>
<h4 id="main-tables-14" tabindex="-1"><a class="header-anchor" href="#main-tables-14"><span>Main tables</span></a></h4>
<ul>
<li><strong>ScanInfo</strong> Similar to <strong>u19_imaging_pipeline.Acquiredtiff</strong>. General data and metadata from scans.</li>
<li><strong>ScanInfoField</strong> Data specific to each of the fields of the scan.</li>
<li><strong>ScanInfoScanFile</strong> All files that are part of a scan.</li>
</ul>
<h3 id="_9-u19-pupillometry" tabindex="-1"><a class="header-anchor" href="#_9-u19-pupillometry"><span><strong>9. u19_pupillometry:</strong></span></a></h3>
<ul>
<li>Stores all thing related to pupillometry recordings. From reference to behavior sessions to final results. Check <a href="https://braincogs.github.io/software/pupillometry_guide.html"> Pupillometry Pipeline Guide </a> for more information.</li>
</ul>
<h4 id="main-tables-15" tabindex="-1"><a class="header-anchor" href="#main-tables-15"><span>Main tables</span></a></h4>
<ul>
<li><strong>PupillometrySession</strong> Reference to behavior session that had pupillometry acquisition.</li>
<li><strong>PupillometryModels</strong> Training models ready to use for processing pupillometry data.</li>
<li><strong>PupillometrySyncBehavior</strong> Time correspondence between each trial-iteration in behavior file and each video frame.</li>
<li><strong>PupillometrySyncBehavior</strong> Time correspondence between each trial-iteration in behavior file and each video frame.</li>
<li><strong>PupillometrySessionModel</strong> Reference to which model was used to process a behavior session (More than one model can be used to process data from a session).</li>
<li><strong>PupillometrySessionModelData</strong> Status of pupillometry processing and final result storage.</li>
</ul>
</div></template>


