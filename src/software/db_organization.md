---
title: Database Organization
lang: en-US
---

# {{ $frontmatter.title }}

 + The next sections will describe all DBs on the BRAINCoGS host (datajoint00.pni.princeton.edu). DBs are subdivided in these categories:
 1. Lab & subject DBs
 2. Behavior DBs
 3. Ephys & Imaging DBs

## Lab & Subject DBs

 ### **1. u19_lab**
  +  Stores all general information that apply for entire BRAINCoGS projects. Aditionally general information for researchers are stored here.
 #### Main tables
 + **User** Stores general information for all researchers and technicians in BRAINCoGS. Being registered in this table is a requirement to add subjects in your behalf  Check <a href="https://braincogs.github.io/software/db_access.html#add-researcher-to-user-table.html"> here </a> for more information. Important fields include, user_id (NETID), active_gui_user & slack_webhook URLS for users (for notifications). Check <a href="https://braincogs.github.io/software/alert_system.html#set-up-custom-slack-alerts.html"> set slack alerts </a> for more info.
 + **Location** All systems associated with rigs, recordings & technician use. All behavior sessions are associated with one of the systems recorded here, each recording (ephys/imaging) is associated with a system recorded here. Check <a href="https://braincogs.github.io/software/db_access.html#add-researcher-to-user-table.html"> here </a> for more information. Important fields include, user_id (NETID), active_gui_user & slack_webhook (for notifications). Check <a href="https://braincogs.github.io/software/alert_system.html#configure_systems.html"> Configure systems section </a> for more info.
 + **Path** Paths for the cup drives in BRAINCoGS. Paths are divided by OS and local or network system types.
 + **AcquisitionType** All possible acquisitions modalities in BRAINCoGS. (Each location in Path is associated with one modality as well). Modalities include: behavior, electrophysiology, 2photon, mesoscope, etc).
 + **DjCustomVariables** Configuration variables for datajoint, mainly paths for special directories. This table is used in the background when DB access configuration is set for a system is made. Check <a href="https://braincogs.github.io/software/db_access.html#db-access-for-matlab-repository"> DB Access section </a>
 + **DjStores** External storage path locations on the network drives (cup) for several Datajoint tables. This table is used in the background when DB access configuration is set for a system is made. Check <a href="https://braincogs.github.io/software/db_access.html#db-access-for-matlab-repository"> DB Access section </a>
 + **InsertionDevice** Device types for insertion in subjects. (From ephys electrodes, to optogenetic cannula). Paired with u19_action.SurgeryLocation table.
 + **SlackWebhooks** Slack webhooks URLs for general notifications. Check <a href="https://braincogs.github.io/software/alert_system.html#set-up-custom-slack-alerts.html"> set slack alerts </a> for more info.

 ### **2. u19_subject**
  +  Stores all general information for subjects (mice) registered for experiments. 
 #### Main tables
  + **Subject** Stores general information for all subjects in BRAINCoGS. Being registered in this table is a requirement to train and perform behavior sessions.
  + **LickometerMotorPosition** Stores ml, ap, & dv motor coordinates for a subject in a rig with positioning motor installed. Check <a href="https://braincogs.github.io/software/virmen_guide.html#set-up-training"> Set up motor positioning subsection </a> for more information.
  + **CagingStatus** Subject-Cage relationship storage.
  + **HealthStatus** Daily health assesment for subject. Fields like normal_behavior, posture_grooming, technician_comments etc.
  + **Allele** All subjects' genotypes in BRAINCoGS.
  + **Cage** Cage list for subjects. 

## Behavior DBs 

 ### **1. u19_acquisition:** 
 + Stores all reference and general information of behavior sessions. Other tables in this DB also stores reference to blocks, trials, manipulation and subtasks of a behavior session.
 #### Main tables
  + **SessionStarted** Reference to all sessions that are started with training GUI. Path to behavior file ia located here.
  + **Session** Basic information (performance, experiment code used, etc.) for a behavior session. Record written after training is finished  
  + **SessionBlock** Basic reference to all blocks from all behavior sessions.
  + **SessionBlockTrial** Basic reference to all trials from all behavior sessions.
  + **SessionManipulation** Reference to which manipulation (if any) was performed for a behavior session. Check <a href="https://braincogs.github.io/software/manipulation_pipeline.html">manipulation pipeline section</a> for more information.
  + **SessioSubtask** Reference to which subtask (if any) was performed for a behavior session. Check <a href="https://braincogs.github.io/software/subtask_pipeline.html">subtask pipeline section</a> for more information.
 
 ### **2. u19_action:**
 + Stores daily, recurrent and specific actions performed to subjects.
 #### Main tables
 + **Weighing** Records daily weight of subjects. Written by weighingGUI used by technicians.
 + **WaterAdministration** Records daily water administration to subjects. Earned water written at the end of training. Supplement water Written by weighingGUI used by technicians.
 + **Surgery** Records from surgeries performed to subjects. Written by <a href="https://braincogs.github.io/software/automation_pipeline.html">Ephys/Imaging automation pipeline section</a>
 + **SurgeryLocation** Records device locations implanted to subjects from surgeries (eg. NeuroPixel probes). . Written by <a href="https://braincogs.github.io/software/automation_pipeline.html">Ephys/Imaging automation pipeline section</a>
  + **DaiyPositionData** For subjects with automatic motor positioning on rig, stores daily ml,ap & dv coordinates. If cameras are present on rig a lateral and tops reference images are also stored.
 
 ### **3. u19_behavior:**
 + Stores detailed data for behavior sessions. DB built to support Towers Task data but stores data from all behavior sessions.
 #### Main tables
 + **TowersBlock** Specific block data from behavior sessions. (level, main_level, block_performance, etc).
 + **TowersBlockTrial** Specific trial data from behavior sessions. (towers positions, trial_type, choice, position, velocity etc).
 + **SpatialTimeBlobs** Efficient time, position, velocity storage (per session and not by trial). Check <a href="https://braincogs.github.io/software/db_analysis.html">Using SpatialTimeBlobs section</a> to know how to use this.
 + **Towers Session/Subject ** Psych** Group of tables with Psychometric Curves parameters per session, block_type (main, guiding), subject, etc. Check <a href="https://braincogs.github.io/software/db_analysis.html">Using psychometric data</a> to know how to use this. Check <a href="https://braincogs01.pni.princeton.edu/">BRAINCoGS Data viewer </a> to check psychometric curves. 
 
 ### **4. u19_behavior_subtask:**
  + Stores specific data for different subtask sessions. . Check <a href="https://braincogs.github.io/software/subtask_pipeline.html">subtask pipeline section</a> for more information.
 
 ### **5. u19_optogenetics**
  + Optogenetic manipulation data. Review <a href="https://braincogs.github.io/software/manipulation_pipeline.html">Manipulation pipeline section</a> for more information and examples.

 #### Main tables
  + **OptogeneticSession** Reference to a behavior session that is also an optogenetic session. Stores which protocol and software parameter set were used fot the session.
  + **OptogeneticSessionTrial** Stores specific optogenetic data on a trial by trial basis.
  + **OptogeneticSoftwareParameters** MATLAB Structure with parameters to be used during the behavior session specific for a subset of optogenetic sessions.
  + **OptogeneticProtocol** Describes metadata that will be associated with optogenetic sessions. (e.g. laser wavelength, stimulation frequency, etc.)

 ### **6. u19_thermal**
  + Thermal manipulation data. Review <a href="https://braincogs.github.io/software/manipulation_pipeline.html">Manipulation pipeline section</a> for more information and examples. Identical structure as Optogenetic DB.

 ### **7. u19_puffs**
  + Air puff task sessions specific data.
 #### Main tables
  + **PuffsSession** Reference to a behavior session that is also a puff session. 
  + **PuffsSessionTrial** Stores specific puffs data on a trial by trial basis.

## Ephys/Imaging DBs

 ### **1. u19_recording:** 
 + Stores all reference to any recording (ephys & imaging) performed on BRAINCoGS. Check <a href="https://braincogs.github.io/software/automation_pipeline.html">Automation pipeline section</a> for more information.
 #### Main tables
  + **Recording** Reference to all recordings. Stores information like location, status_recording & recording directory on the network drives.
  + **RecordingBehaviorSessions** Relationship between recordings and behavior sessions. **(recording_id <-> session_key (subject, date, #)** 
  + **RecordingRecordingSession** Relationship between recordings and subject/date. Used when no behavior is attached to recording.
  + **Modality** List of all possible modalities supported by the automation pipeline.

 ### **2. u19_recording_process:** 
 + Stores all reference to all processing jobs for ephys & imaging on the automation pipeline. Almost all information in this table is shown in the <a href="https://braincogs.github.io/software/automation_pipeline.html#monitor-jobs">Automation pipeline GUI </a>.
 #### Main tables
  + **Processing** Reference to all processing jobs. For ephys it has a one to one relationship with recording probes. For imaging it has a one to one relationship with Field of View. Stores **status_processing, raw_path (recording_process_pre_path), processed_path (recording_process_post_path)** for each of these "fragments" of recording.
  + **ProcessingEphysParams** Relationship between jobs & which ephys processing parameters were used for that job.
  + **ProcessingImagingParams** Relationship between jobs & which imaging processing parameters were used for that job.
  + **LogStatus** Stores all status change for processing jobs and corresponding messages & exceptions if applicable.

 ### **3. u19_ephys_pipeline:** 
 + Basic reference to recordings and behavior synchronization data.

 #### Main tables
  + **EphysPipelineSession** List of recording_ids that correspond with ephys recordings.
  + **BehaviorSync** Synchronization data between ephys recording and behavior session. **trial_index_nidq & iteration_index_nidq** are trial and iteration # for each sample on the electrophysiology data.

 ### **4. u19_pipeline_ephys_element:** 
 + Datajoint element array electrophysiology DB. Database schema is designed to store all data from an ephys recording and subsequent kilosort processing. More info: <a href="https://datajoint.com/docs/elements/element-array-ephys/0.2/">Datajoint element array electrophysiology docs</a>. For BRAINCoGS **ephys_precluster** schema was used.

 #### Main tables
  + **ClusteringParamSet** Table that contains a list of parameter dictionaries/structures used for sorting process.
  + **PreClusterparamSet** Table that contains a list of parameter dictionaries/structures used for preprocessing steps.
  + **PreClusterparamSteps** Table that contains lists of lists of preCluster param Sets that form a preprocessing sequence for recordings. 
  preprocessing steps. (e.g. catgt)
  + **CuratedClusteringUnit** Main data for all the units found in sorting process. (**spike_times, cluster_quality_label**, etc.)
  + **LFPElectrode** LFP data for each of the electrodes in recording.
  + **WaveformSetWaveform** All waveforms from a unit captured by each electrode in recording.
  + **ProbeInsertion** Records which probe was used for the corresponding recording-insertion_number pair. Check **5. u19_pipeline_probe_element**.

 ### **5. u19_pipeline_probe_element:** 
 + Datajoint element array electrophysiology DB for probes. Database schema is designed to store probes and electorde configurations used in recordings. More info: <a href="https://datajoint.com/docs/elements/element-array-ephys/0.2/">Datajoint element array electrophysiology docs</a>. For BRAINCoGS **ephys_precluster** schema was used.

 #### Main tables
  + **Probe** Table that contains all physicial probes used in recordings.
  + **ProbeTypElectrode** Table that contains coordinates, shank# and id for each electrode in a probe.

 ### **6. u19_imaging_pipeline:** 
 + Reference to all imaging recordings and subsequent fields of view (FOV) identification and splitting for processing.

 #### Main tables
  + **ImagingPipelineSession** List of recording_ids that correspond with imaging recordings.
  + **TiffSplit** Identified fields of view for a single recording (regularly 2photon = 1 FOV, mesoscope = 3 FOV). Each FOV is processed separately.
  + **AcquiredTiff** TIFF file header metadata for each FOV.
  + **SyncImagingBehavior** Synchronization data between imaging recording and behavior session. **sync_behav_%%_by_im_frame** = Correspoding behavior block, trial and iteration for each imaging frame.
  **sync_im_frame_span_by_behav_%%** = Fist and last imaging frame for each behavior block, trial and iteration.

 ### **7. u19_pipeline_imaging_element:** 
 + Datajoint element calcium imaging DB. Database schema is designed to store all data from an imaging recording and subsequent segmentation process. More info: <a href="https://datajoint.com/docs/elements/element-calcium-imaging/0.5/">Datajoint element calcium imaging docs</a>.

 #### Main tables
  + **ProcessingParamSet** Table that contains a list of parameter dictionaries/structures used for segmentation process.
  + **ActivityTrace** Activity trace signals for all masks identified in segmentation process.
  + **FluorescenceTrace** Fluorescence trace signals for all masks identified in segmentation process.
  + **MaskClassificationMaskType** Mask types (soma, blob, doughnut, etc) and confidence for each mask identified in segmentation process.
  + **MotionCorrection(non)RigidMotionCorrection** Motion correction details (shifts, outlier_frames, etc) performed durinc processing.
  + **MotionCorrectionSummary** Summary (average, correlation, max_proj) images for each field and channel after motion correction.

 ### **8. u19_pipeline_scan_element:** 
 + Datajoint element calcium imaging DB. Database schema is designed to store scan info and metadata from imaging files. More info: <a href="https://datajoint.com/docs/elements/element-calcium-imaging/0.5/">Datajoint element calcium imaging docs</a>.

 #### Main tables
  + **ScanInfo** Similar to **u19_imaging_pipeline.Acquiredtiff**. General data and metadata from scans.
  + **ScanInfoField** Data specific to each of the fields of the scan.
  + **ScanInfoScanFile** All files that are part of a scan.