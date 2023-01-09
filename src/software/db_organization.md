---
title: Database Organization
lang: en-US
---

# {{ $frontmatter.title }}

 + The next sections will describe all DBs on the BRAINCoGS host (datajoint00.pni.princeton.edu). DBs are subdivided in these categories:
  + Lab & subject DBs
  + Behavior DBs
  + Ephys & Imaging DBs

 ## Lab & subject DBs

  1. **u19_lab**
   +  Stores all general information that apply for entire BRAINCoGS projects. Aditionally general information for researchers are stored here.
  ### Main tables


 ## Behavior DBs 

 1. **u19_acquisition:** 
  + Stores all reference and general information of behavior sessions. Other tables in this DB also stores reference to blocks, trials, manipulation and subtasks of a behavior session.
  ### Main tables
   + **SessionStarted** Reference to all sessions that are started with training GUI. Path to behavior file ia located here.
   + **Session** Basic information (performance, experiment code used, etc.) for a behavior session. Record written after training is finished  
   + **SessionBlock** Basi reference to all blocks from all behavior sessions.
   + **SessionBlockTrial** Basic reference to all trials from all behavior sessions.
   + **SessionManipulation** Reference to which manipulation (if any) was performed for a behavior session. Check <a href="https://braincogs.github.io/software/manipulation_pipeline.html">manipulation pipeline section</a> for more information.
   + **SessioSubtask** Reference to which subtask (if any) was performed for a behavior session. Check <a href="https://braincogs.github.io/software/subtask_pipeline.html">subtask pipeline section</a> for more information.
 2. **u19_action:**
  + Stores daily, recurrent and specific actions performed to subjects.
 ### Main tables
 + **Weighing** Records daily weight of subjects. Written by weighingGUI used by technicians.
 + **WaterAdministration** Records daily water administration to subjects. Earned water written at the end of training. Supplement water Written by weighingGUI used by technicians.
 + **Surgery** Records from surgeries performed to subjects. Written by <a href="https://braincogs.github.io/software/automation_pipeline.html">Ephys/Imaging automation pipeline section</a>
 + **SurgeryLocation** Records device locations implanted to subjects from surgeries (eg. NeuroPixel probes). . Written by <a href="https://braincogs.github.io/software/automation_pipeline.html">Ephys/Imaging automation pipeline section</a>
 + **DaiyPositionData** For subjects with automatic motor positioning on rig, stores daily ml,ap & dv coordinates. If cameras are present on rig a lateral and tops reference images are also stored.
 3. **u19_behavior:**
  + Stores detailed data for behavior sessions. DB built to support Towers Task data but stores data from all behavior sessions.
 ### Main tables
 + **TowersBlock** Specific block data from behavior sessions. (level, main_level, block_performance, etc).
 + **TowersBlockTrial** Specific trial data from behavior sessions. (towers positions, trial_type, choice, position, velocity etc).
 + **SpatialTimeBlobs** Efficient time, position, velocity storage (per session and not by trial). Check <a href="https://braincogs.github.io/software/db_analysis.html">Using SpatialTimeBlobs section</a> to know how to use this.
 + **Towers Session/Subject ** Psych** Group of tables with Psychometric Curves parameters per session, block_type (main, guiding), subject, etc. Check <a href="https://braincogs.github.io/software/db_analysis.html">Using psychometric data</a> to know how to use this. Check <a href="https://braincogs01.pni.princeton.edu/">BRAINCoGS Data viewer </a> to check psychometric curves. 
 4. **u19_behavior_subtask:**
  + Stores specific data for different subtask sessions. . Check <a href="https://braincogs.github.io/software/subtask_pipeline.html">subtask pipeline section</a> for more information.
 5. **u19_**
