---
title: Database Organization
lang: en-US
---

# {{ $frontmatter.title }}

The following sections describe all databases on the BRAINCoGS host (datajoint00.pni.princeton.edu). The databases are subdivided into these categories:

1. Lab & subject DBs
2. Behavior DBs
3. Ephys & Imaging DBs

## Lab, Subject & Schedule DBs

### **1. u19_lab**

+ Stores all general information that applies across entire BRAINCoGS projects. It also stores general information about researchers.

#### Main tables

+ **User** Stores general information for all researchers and technicians in BRAINCoGS. Being registered in this table is a requirement to add subjects on your behalf. Check <a href="https://braincogs.github.io/software/db_access.html#add-researcher-to-user-table.html"> here </a> for more information. Important fields include user_id (NETID), active_gui_user, and slack_webhook URLs for users (for notifications). Check <a href="https://braincogs.github.io/software/alert_system.html#set-up-custom-slack-alerts.html"> set slack alerts </a> for more info.
+ **Location** All systems associated with rigs, recordings, and technician use. Every behavior session is associated with one of the systems recorded here, and each recording (ephys/imaging) is associated with a system recorded here.
+ **Path** Paths for the cup drives in BRAINCoGS. Paths are divided by OS and by local or network system type.
+ **AcquisitionType** All possible acquisition modalities in BRAINCoGS (each location in Path is associated with one modality as well). Modalities include behavior, electrophysiology, 2photon, mesoscope, etc.
+ **DjCustomVariables** Configuration variables for DataJoint, mainly paths for special directories. This table is used in the background when DB access is configured for a system. Check <a href="https://braincogs.github.io/software/db_access.html#db-access-for-matlab-repository"> DB Access section </a>.
+ **DjStores** External storage path locations on the network drives (cup) for several DataJoint tables. This table is used in the background when DB access is configured for a system. Check <a href="https://braincogs.github.io/software/db_access.html#db-access-for-matlab-repository"> DB Access section </a>.
+ **InsertionDevice** Device types for insertion in subjects (from ephys electrodes to optogenetic cannulae). Paired with the u19_action.SurgeryLocation table.
+ **SlackWebhooks** Slack webhook URLs for general notifications. Check <a href="https://braincogs.github.io/software/alert_system.html#set-up-custom-slack-alerts.html"> set slack alerts </a> for more info.

### **2. u19_subject**

+ Stores all general information for subjects (mice) registered for experiments.

#### Main tables

+ **Subject** Stores general information for all subjects in BRAINCoGS. Being registered in this table is a requirement to train and run behavior sessions.
+ **LickometerMotorPosition** Stores ml, ap, and dv motor coordinates for a subject in a rig with a positioning motor installed. Check <a href="https://braincogs.github.io/software/virmen_guide.html#set-up-training"> Set up motor positioning subsection </a> for more information.
+ **CagingStatus** Subject-cage relationship storage.
+ **HealthStatus** Daily health assessment for a subject. Fields include normal_behavior, posture_grooming, technician_comments, etc.
+ **Allele** All subjects' genotypes in BRAINCoGS.
+ **Cage** Cage list for subjects.

### **3. u19_scheduler**

+ Stores everything related to scheduling future sessions for subjects in the <a href="https://braincogs.github.io/software/virmen_developer.html#new-training-gui"> "NewTrainingGUI" model </a>.
+ It includes current rig IOs, training profiles for all experiments, and the schedule calendar for future sessions.

#### Main tables

+ **Schedule** Records which subjects are scheduled to train, on which date, on which rig, and which training profile they are assigned.
+ **TrainingProfile** All variables for a given experiment (e.g. experiment world, protocol, rewardFactor). Check <a href="https://braincogs.github.io/software/virmen_developer.html#testvrrig-2-rig-tester"> Rig Tester </a> documentation for more information.
+ **InputOutputRig** All IO "types" defined for every rig (e.g. Reward, LeftAirPuff, Arduino). Check <a href="https://braincogs.github.io/software/virmen_developer.html#testvrrig-2-rig-tester"> Rig Tester </a> documentation for more information.
+ **InputOutputRigParameters** All RigParameters.m parameters needed for a given IO.
+ **InputOutputProfile** Defines which IOs are needed for a specific rig and/or task.

## Behavior DBs

### **1. u19_acquisition:**

+ Stores all reference and general information for behavior sessions. Other tables in this database also store references to the blocks, trials, manipulations, and subtasks of a behavior session.

#### Main tables

+ **SessionStarted** Reference to all sessions started with the training GUI. The path to the behavior file is located here.
+ **Session** Basic information (performance, experiment code used, etc.) for a behavior session. The record is written after training is finished.
+ **SessionBlock** Basic reference to all blocks from all behavior sessions.
+ **SessionBlockTrial** Basic reference to all trials from all behavior sessions.
+ **SessionManipulation** Reference to which manipulation (if any) was performed for a behavior session. Check <a href="https://braincogs.github.io/software/manipulation_pipeline.html">manipulation pipeline section</a> for more information.
+ **SessionSubtask** Reference to which subtask (if any) was performed for a behavior session. Check <a href="https://braincogs.github.io/software/subtask_pipeline.html">subtask pipeline section</a> for more information.
+ **SessionVideo** Reference to video acquisition, if performed during a behavior session. Check <a href="https://braincogs.github.io/software/pupillometry_guide.html">Pupillometry Pipeline Guide</a> for more information.

### **2. u19_action:**

+ Stores daily, recurrent, and specific actions performed on subjects.

#### Main tables

+ **Weighing** Records the daily weight of subjects. Written by the weighingGUI used by technicians.
+ **WaterAdministration** Records daily water administration to subjects. Earned water is written at the end of training. Supplement water is written by the weighingGUI used by technicians.
+ **Surgery** Records of surgeries performed on subjects. Written by the <a href="https://braincogs.github.io/software/automation_pipeline.html">Ephys/Imaging automation pipeline section</a>.
+ **SurgeryLocation** Records device locations implanted in subjects during surgeries (e.g. NeuroPixel probes). Written by the <a href="https://braincogs.github.io/software/automation_pipeline.html">Ephys/Imaging automation pipeline section</a>.
+ **DailyPositionData** For subjects with automatic motor positioning on a rig, stores daily ml, ap, and dv coordinates. If cameras are present on the rig, lateral and top reference images are also stored.

### **3. u19_behavior:**

+ Stores detailed data for behavior sessions. Built to support Towers Task data, but stores data from all behavior sessions.

#### Main tables

+ **TowersBlock** Specific block data from behavior sessions (level, main_level, block_performance, etc.).
+ **TowersBlockTrial** Specific trial data from behavior sessions (tower positions, trial_type, choice, position, velocity, etc.).
+ **SpatialTimeBlobs** Efficient time, position, and velocity storage (per session, not per trial). Check <a href="https://braincogs.github.io/software/db_analysis.html#matlab">get_full_trial_data with SpatialTimeBlobs </a> to learn how to use this.
+ **Towers Session/Subject Psych** Group of tables with psychometric curve parameters per session, block_type (main, guiding), subject, etc. Check <a href="https://braincogs.github.io/software/db_analysis.html">Using psychometric data</a> to learn how to use this. Check <a href="https://braincogs01.pni.princeton.edu/">BRAINCoGS Data viewer </a> to view psychometric curves.

### **4. u19_behavior_subtask:**

+ Stores specific data for different subtask sessions. Check <a href="https://braincogs.github.io/software/subtask_pipeline.html">subtask pipeline section</a> for more information.

### **5. u19_optogenetics**

+ Optogenetic manipulation data. Review <a href="https://braincogs.github.io/software/manipulation_pipeline.html">Manipulation pipeline section</a> for more information and examples.

#### Main tables

+ **OptogeneticSession** Reference to a behavior session that is also an optogenetic session. Stores which protocol and software parameter set were used for the session.
+ **OptogeneticSessionTrial** Stores specific optogenetic data on a trial-by-trial basis.
+ **OptogeneticSoftwareParameters** MATLAB structure with parameters to be used during the behavior session, specific to a subset of optogenetic sessions.
+ **OptogeneticProtocol** Describes metadata associated with optogenetic sessions (e.g. laser wavelength, stimulation frequency, etc.).

### **6. u19_thermal**

+ Thermal manipulation data. Review <a href="https://braincogs.github.io/software/manipulation_pipeline.html">Manipulation pipeline section</a> for more information and examples. Identical structure to the Optogenetic DB.

### **7. u19_puffs**

+ Air puff task session-specific data.

#### Main tables

+ **PuffsSession** Reference to a behavior session that is also a puff session.
+ **PuffsSessionTrial** Stores specific puffs data on a trial-by-trial basis.

## Ephys/Imaging DBs

### **1. u19_recording:**

+ Stores all references to any recording (ephys and imaging) performed on BRAINCoGS. Check <a href="https://braincogs.github.io/software/automation_pipeline.html">Automation pipeline section</a> for more information.

#### Main tables

+ **Recording** Reference to all recordings. Stores information such as location, status_recording, and recording directory on the network drives.
+ **RecordingBehaviorSessions** Relationship between recordings and behavior sessions. **(recording_id <-> session_key (subject, date, #)**
+ **RecordingRecordingSession** Relationship between recordings and subject/date. Used when no behavior is attached to a recording.
+ **Modality** List of all possible modalities supported by the automation pipeline.

### **2. u19_recording_process:**

+ Stores all references to processing jobs for ephys and imaging in the automation pipeline. Almost all information in this table is shown in the <a href="https://braincogs.github.io/software/automation_pipeline.html#monitor-jobs">Automation pipeline GUI </a>.

#### Main tables

+ **Processing** Reference to all processing jobs. For ephys, it has a one-to-one relationship with recording probes. For imaging, it has a one-to-one relationship with the field of view. Stores **status_processing, raw_path (recording_process_pre_path), processed_path (recording_process_post_path)** for each of these "fragments" of a recording.
+ **ProcessingEphysParams** Relationship between jobs and which ephys processing parameters were used for each job.
+ **ProcessingImagingParams** Relationship between jobs and which imaging processing parameters were used for each job.
+ **LogStatus** Stores all status changes for processing jobs, along with the corresponding messages and exceptions if applicable.

### **3. u19_ephys_pipeline:**

+ Basic reference to recordings and behavior synchronization data.

#### Main tables

+ **EphysPipelineSession** List of recording_ids that correspond to ephys recordings.
+ **BehaviorSync** Synchronization data between the ephys recording and the behavior session. **trial_index_nidq & iteration_index_nidq** are the trial and iteration # for each sample in the electrophysiology data.

### **4. u19_pipeline_ephys_element:**

+ DataJoint element array electrophysiology DB. The database schema is designed to store all data from an ephys recording and the subsequent kilosort processing. More info: <a href="https://datajoint.com/docs/elements/element-array-ephys/0.2/">Datajoint element array electrophysiology docs</a>. For BRAINCoGS, the **ephys_precluster** schema was used.

#### Main tables

+ **ClusteringParamSet** Contains a list of parameter dictionaries/structures used for the sorting process.
+ **PreClusterparamSet** Contains a list of parameter dictionaries/structures used for preprocessing steps.
+ **PreClusterparamSteps** Contains lists of lists of PreCluster param sets that form a preprocessing sequence of preprocessing steps for recordings (e.g. catgt).
+ **CuratedClusteringUnit** Main data for all the units found in the sorting process (**spike_times, cluster_quality_label**, etc.).
+ **LFPElectrode** LFP data for each of the electrodes in a recording.
+ **WaveformSetWaveform** All waveforms from a unit captured by each electrode in a recording.
+ **ProbeInsertion** Records which probe was used for the corresponding recording-insertion_number pair. Check **5. u19_pipeline_probe_element**.

### **5. u19_pipeline_probe_element:**

+ DataJoint element array electrophysiology DB for probes. The database schema is designed to store the probes and electrode configurations used in recordings. More info: <a href="https://datajoint.com/docs/elements/element-array-ephys/0.2/">Datajoint element array electrophysiology docs</a>. For BRAINCoGS, the **ephys_precluster** schema was used.

#### Main tables

+ **Probe** Contains all physical probes used in recordings.
+ **ProbeTypeElectrode** Contains coordinates, shank #, and id for each electrode in a probe.

### **6. u19_imaging_pipeline:**

+ Reference to all imaging recordings and the subsequent fields of view (FOV) identification and splitting for processing.

#### Main tables

+ **ImagingPipelineSession** List of recording_ids that correspond to imaging recordings.
+ **TiffSplit** Identified fields of view for a single recording (typically 2photon = 1 FOV, mesoscope = 3 FOV). Each FOV is processed separately.
+ **AcquiredTiff** TIFF file header metadata for each FOV.
+ **SyncImagingBehavior** Synchronization data between the imaging recording and the behavior session. **sync_behav_%%_by_im_frame** = corresponding behavior block, trial, and iteration for each imaging frame. **sync_im_frame_span_by_behav_%%** = first and last imaging frame for each behavior block, trial, and iteration.

### **7. u19_pipeline_imaging_element:**

+ DataJoint element calcium imaging DB. The database schema is designed to store all data from an imaging recording and the subsequent segmentation process. More info: <a href="https://datajoint.com/docs/elements/element-calcium-imaging/0.5/">Datajoint element calcium imaging docs</a>.

#### Main tables

+ **ProcessingParamSet** Contains a list of parameter dictionaries/structures used for the segmentation process.
+ **ActivityTrace** Activity trace signals for all masks identified in the segmentation process.
+ **FluorescenceTrace** Fluorescence trace signals for all masks identified in the segmentation process.
+ **MaskClassificationMaskType** Mask types (soma, blob, doughnut, etc.) and confidence for each mask identified in the segmentation process.
+ **MotionCorrection(non)RigidMotionCorrection** Motion correction details (shifts, outlier_frames, etc.) performed during processing.
+ **MotionCorrectionSummary** Summary (average, correlation, max_proj) images for each field and channel after motion correction.

### **8. u19_pipeline_scan_element:**

+ DataJoint element calcium imaging DB. The database schema is designed to store scan info and metadata from imaging files. More info: <a href="https://datajoint.com/docs/elements/element-calcium-imaging/0.5/">Datajoint element calcium imaging docs</a>.

#### Main tables

+ **ScanInfo** Similar to **u19_imaging_pipeline.AcquiredTiff**. General data and metadata from scans.
+ **ScanInfoField** Data specific to each of the fields of the scan.
+ **ScanInfoScanFile** All files that are part of a scan.

### **9. u19_pupillometry:**

+ Stores everything related to pupillometry recordings, from references to behavior sessions to final results. Check <a href="https://braincogs.github.io/software/pupillometry_guide.html"> Pupillometry Pipeline Guide </a> for more information.

#### Main tables

+ **PupillometrySession** Reference to a behavior session that had pupillometry acquisition.
+ **PupillometryModels** Training models ready to use for processing pupillometry data.
+ **PupillometrySyncBehavior** Time correspondence between each trial-iteration in the behavior file and each video frame.
+ **PupillometrySessionModel** Reference to which model was used to process a behavior session (more than one model can be used to process data from a session).
+ **PupillometrySessionModelData** Status of pupillometry processing and final result storage.
