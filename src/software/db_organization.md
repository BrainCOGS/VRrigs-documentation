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
  + **SessionBlock** Basi reference to all blocks from all behavior sessions.
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
 
 ### **5. u19_**
