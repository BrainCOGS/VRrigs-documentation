---
title: ViRMEn Developer Guide
lang: en-US
---

# {{ $frontmatter.title }}

 + This documentation will help the BRAINCoGS Software Developer to maintain, improve and guide through the old and new ViRMEN code.

## Old training GUI

Here is an overview of which main functions are run ordered chronogically:

+ Program scripts (Program-wrapper-file): 
  Script created by each researcher that defines main data path, experiment name, cohort name and calls **runCohortExperiment** function. Check  <a href='https://braincogs.github.io/software/virmen_guide.html#program-wrapper-file'> Program-Wrapper-File </a> section for more info.

+ runCohortExperiment
  Main function in charge of prepare and start training. List of main tasks of it

    1. Opens **"Old Training GUI" (TrainingRegiment)**
    ```vr.regiment   = TrainingRegiment( experName ...  ```
    2. Starts training **trainAnimal** function. Next line indicates trainAnimal is executed when "Train" button is pressed.
    ```vr.regiment.guiSelectAnimal({'TRAIN', 'Training'}, @trainAnimal, @cleanup);```
    3. Creates **trainee** variable. Trainee variable has all data for training experiment to function correctly, this info includes:
        1. **vr.trainee.experiment:** Path to Virmen world function. Loading world file creates *exper* structure:
            1. **exper.transformationFunction:** Which kind of transformation is used for world projection
            2. **exper.movementFunction:** What function is used to control subject movement. (e.g. keyboard, arduinoSensor).
            3. **exper.variables:** Variables defined in virmen GUI (on world creation) that controls parts of the experiment (e.g. trialEndPauseDuration).
        2. **vr.trainee.stimulationProtocol & vr.trainee.softwareParams** for optogenetics experiments if chosen in GUI.
        3. **vr.trainee.RewardFactor** reward multiplier depending on which level subject is training.
    4. Inserts **acquisition.SessionStarted** record on DB.
    5. Starts training  ```status        = exper.run();```

 ## New Training GUI

 ### TrainingToday
  Function that runs daily on training Rigs on startup.
  Location: <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/TrainingFlowGUI/TrainingTodayFunctions/TrainingToday.m">Training Today function</a>
    1. Fetchs scheduled subjects for rig from schedule.Schedule table.
    2. Runs RigTester (**TestVRRig_2** function) if it hasn't been ran that day.
    3. Runs **TrainingFlow_GUI** to start training for each subject.

 ### TestVRRig_2 (Rig Tester)
  Rig Tester GUI. Tests all corresponding IOs for the current schedule.
  Location: <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/Test_VRrigs/%40TestVRRig_2/TestVRRig_2.m">TestVRRig_2 function</a>

  #### Tasks to do before adding a new rig (or updating an IO for a given rig) to use *Rig Tester*

  1. Add corresponding record to **lab.Location** for new rig. Easiest is to copy one record from other behavior rig.
  2. Add corresponding records to **scheduler.RigStatus** for rig. 
   - Copy all IOs records from another rig.
   - Set to **OK** all IOs that will be used in that rig.
   - Set to **N/A** all IOs that won't be used in that rig
   (If updating an IO only change corresponding record to **OK** or **N/A**)
   3. Add mandatory params to **C:\Experiments\extras\RigParameters.m** file based on **schedule.InputOutputRigParameters** table and corresponding IOs. 

  #### Things to do to add a new IO for experiments:

  1. Add corresponding record to **scheduler.InputOutputRig** table.
  2. Add corresponding rigParameters params for IO on **scheduler.InputOutputRigParameters**
  3. Add, for all rig records, a corresponding record with this new IO in **scheduler.RigStatus** table.
    - current_status = N/A for all rigs that will not have new IO
    - current_status = OK for all rigs that will contain IO
  4. If neeeded (rarely the case), add a new test function in <a href="https://github.com/BrainCOGS/ViRMEn/tree/master/experiments/utility/Test_VRrigs/TestSensorsFunctions">TestSensorsFunctions </a> directory.
  5. Add corresponding entry in RigTester, <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/Test_VRrigs/%40TestVRRig_2/createComponents.m">createComponents code</a>

  #### Rig Tester operation:

  - Creates a TestTable where each row correspond to a all Inputs and Outputs enabled across all rigs <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/Test_VRrigs/%40TestVRRig_2/createComponents.m">createComponents function</a>
    1. Each IO row have components to intearct & perform their corresponding task (button, switch, function to perform, parameters for each IO, etc.)
  - The TestTable is filtered with the corresponding IOs:
    1. If used in **TrainingToday**: IOs = Corresponding IOs for all subjects to train in that Rig. The corresponding IOs are taken from InputOutput Profiles of the subjects in the schedule.
    2. If called on its own "TestVRRig_2": IOs = All IOs registered for rig (all IOs with status != N/A on *scheduler.RigStatus*)

  #### IO Malfunction    

  - When an IO is not working properly and IO is reported through the Rig Tester, the corresponding record for that IO in **scheduler.RigStatus** table is set to "current_status = 'Not OK;".
  - Whenever a successful run in RigTester is done for all IOs the corresponding records for all IOs of that rig in **scheduler.RigStatus** table are set to "current_status = 'OK'".


 ### Training Flow GUI
  GUI to start corresponding experiments for a given scheduled subject.
  Location: <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/TrainingFlowGUI/%40TrainingFlow_GUI/TrainingFlow_GUI.m">Training Flow GUI function</a>
  List of main tasks:

  1. **get_subject_schedule():** Get subject schedule merging **scheduler.Schedule and scheduler.TrainingProfile**
  2. **create_subject_timeslot_table():** Based on the schedule, create a table that integrates all things shown in screen. From training instructions to performance plots.
    - create_subject_performance_plot & getPastSessionsPerformanceTraining(): Get all training data for subject from DB: acquisition.SessionStarted & behavior.TowersSession & behavior.TowersBlock
  3. **update_subject_training_icons() & get_rig_io_subject_status():** Check IO status for experiments for all subjects of the rig. Update status & icon for each subject to inform user about training availability. 
  3. **start_subject_setup_and_training():** Function that triggers RigSetup & experiment when train button is pushed.
    - Runs **TestVRRig_Setup** for rig setup
    - Runs **runExperiment()** main function that triggers experiment.
  4. **AddTestTrainingDialog**: small GUI to add test subjects to TrainingFlow GUI.
    - GUI to manually select a training profile to test, copy training profile from an existing scheduled subject or even copy last 20 behavioral sessions of an existing scheduled subject with its training profile. Ending result is a new entry on **subject_timeslot_table** for TrainingFlow GUI to be treated as an extra subject to train.

  
 ### Rig Setup (TestVRRig_Setup)
  GUI to visually verify subject positioning and sensor functionality prior to experiment.
   Location: <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/Test_VRrigs/%40TestVRRig_Setup/TestVRRig_Setup.m">TestVRRig_Setup function</a>
  List of main tasks:

  - **getSubjectMotorPosition():** Gets motor position for rig-subject combination from *subject.HeadMotorPosition*. If there is none, calculates the average position for latest subjects on that rig.
  - **setMotorsPosition():** Uses zaber motor library to adjust desired motor position.
  - **startCameras():** If cameras are present, start them to have a visual feedback of subject position.
  - **updateSensorPlot():** Plot arduino movement sensor output to verify "correct" displacement on x & y for subjects.
  - **get_if_rig_double_valve() & get_if_rig_puffs():** Checks if rig has double valve or puffs installed and adds interface for them. To check if valves remained calibrated and final puff output check.
  - **fillPreTrainingInstructionsPanel():** When pre-training instructions are set for subject, they are shown by this function and setup cannot finish until those are checked as completed.
  - **confirmSetup():** Executes **storeDailySubjectMotorPositionData()** that stores motor potosition & lateral and/or top camera images for reference in **action.DailySubjectPositionData**. Proceeds to subject training.

### PostTrainingGUI
  GUI to start corresponding experiments for a given scheduled subject.
  Location: <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/Test_VRrigs/%40PostTrainingGUI/PostTrainingGUI.m">PostTrainingGUI main function</a>
  List of main tasks:

  - **store_motor_image_reference():** Stores end of training motor and image for future referencein *action.DailySubjectPositionData**.
  - **get_stats_from_session_local_beh_file():** Open behavior file and get stats such as performance & bias to show in GUI.
  - **fillStatsSession() & fillPlotsSession():** Based on stats from behavior file show relevant data to user. Mainly used if when suspicious low trial count or low performance to alert tecnicians.
  - **insertErrorLabel() insertErrorMessage():** If an error occured in training experiment show them for relevant user action.
  - **fillPostTrainingCheckBoxes():** If post-training instructions were set, show them and prevent futher action until of all them are checked.


### NewTrainingGUI_BackwardCompatibility
- To integrate existing experiments codes and auxiliar classes with new Training GUI structure a "compatibility" layer was created.
  Location: <a href="https://github.com/BrainCOGS/ViRMEn/tree/master/experiments/common/NewTrainingGUI_BackwardCompatibility"> NewTrainingGUI_BackwardCompatibility </a>
  List of main tasks:

- **runExperiment():** Main function of compatibility layer. Triggered from **TrainingFlowGUI** to start training. Functions that runExperiment performs
  1. **loadTrainingProfile()**: Loads all training profile info from *scheduler.TrainingProfile* table.
  2. **loadWaterAlloc()**: Get **water_per_day** requirement from **action.SubjectStatus**.
  3. Assigns training profile as trainee variable: **vr.trainee  = training_profile**. Trainee variable is widely used accross experiment codes.
  4. Load post-training-instructions (for later use in **PostTrainingGUI** call)
  5. Write hardcoded "dummy" variables for **vr.trainee** (e.g. vr.trainee.sessionIndex = 1)
  6. Load protocol function **vr.trainee.protocol = str2func(vr.trainee.protocol)** [Protocol Reference](./virmen_guide.md#new-task-creation) 
  7. If in 165 room EnableLiveStats **vr.trainee.EnableLiveStats = true**  <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/classes/ExperimentLog.m#L630"> Use of LiveStats </a>
  8. Checks if level and/or sublevel will be overrided by user (from TrainingFlowGUI selection). **vr.trainee.overrideMazeID & vr.trainee.overrideSubMazeID** 
  9. Creates minimal substitute for *TrainingRegiment* class **vr.regiment = TrainingRegiment_DBGUI;** (used mainly for creating filePath for behaviorFile).
  10. loads experiment code in memory **load(vr.trainee.experiment)**. Loads to **exper** variable
  11. **getTransformationFunction & getMovementFunction** for exper variable.
  12. For future use load Manipulation (e.g. optogenetics) parameters **getExperimentManipulationVariables**
  13. Check if rewardFactor variable is appropiate length for all mazes **checkRewardFactor**
  14. if Mesoscope recording enable UDP communication **check_connectionToSI**
  15. if Ephys recording set-up (RigParameters.SyncPulses = true or RigParameters.hasParallelCommNew = true initialize corresponding NIDAQ ports from **initializeCommPulses**
  16. Insert record in **acquisition.SessionStarted** table: insertNewSessionStartExperiment(). 
  Get behavior file full path from **regiment.whichLog()** function.
  17. Create behavior file directory if non existent. **mkdir(experiment_dir)**
  18. For experiment code to work out starting level & sublevel get previous subject performance with oldTrainingGUI format: **vr.trainee.data = getPerformanceSubjectAsRegimentData()**
  19. Save on exper.userdata vr variable **exper.userdata = vr**. userdata used in some parts of experiment code
  20. Finally, run experiment: **error_status = exper.run();**
  21. If error during virmen, send slack notification **error_training_notification_slack** and keep record in DB on **acquisition.SessionErrorLog** table via **send_error_session_log** function.
  22. If experiment could not start do the same as 21 but prepare variables to open **PostTrainingGUI** as well.
  23. Open **PostTrainingGUI**.


### ViRMEn Offline

- To keep running experiments capability even in a DB or internet outage a ViRMEn Offline mode was implemented.
- Here is a description of all parts that make this mode possible:

1. In <a href="https://github.com/BrainCOGS/U19-pipeline-python/blob/master/u19_pipeline/alert_system/noDB_backup_creation/noDB_backup_creation_script.py"> No DB backup creation script </a> this script creates the following auxiliary files to cut training DB dependency:
  - **DJCustomVariables.csv:** copy of **lab.DJCustomVariables** table. It is composed of paths to root directories (behavior, ephys, imaging, etc).
  - **SlackChannels.csv:** copy of **lab.SlackWebhooks** table. This is used to get slack urls to raise alerts in case training failed. Aditionally, webhooks url are encoded for security reasons.
  - **UserSlack.csv:** A subset of **lab.User** table. 
  - **RigStatusTable.csv:** A copy of **scheduler.RigStatus** table. To know which IO are installed for every rig.
  - **ScheduleDay.csv:** A copy of **scheduler.Schedule * scheduler.TrainingProfile** to know schedule and training profiles for today's training.
  - **PastSessions.csv:** Query from **acquisition.SessionStarted, acquisition.Session, behavior.TowersSession &behavior.TowersBlock** to get past performance. (For performanc plot and current level calculation)
  - **SubjectMotorPosition.csv:** Query from **subject.HeadMotorPosition** to get latest stored motor position for each subject
  - **Weighing_GUI_Replacement_SpreadSheet.xlsx:** Excel file with minimal data for technicians to use instead of Weighing GUI.

All these files are stored in **braininit/Shared/NoDBVirmenBackup** by this script.

2. **Copy files to local machines:**. A task is scheduled (**copyNODBFiles** in task Scheduler) in all rig machines daily at 5:55 am to copy files mentioned in 1. to local path: **C:/Experiments/ViRMEn/extras**

3. In <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/extras/GeneralParameters.m">GeneralParameters </a> there is a reference to all the files in 1. to be named inside ViRMEn repository

4. **Local "replacement" functions** When DB is not found a set of "local" functions are used throughout the ViRMEn repository to replicate necessary functionality for normal subject training. Here is a list of all those functions:  

- ViRMEn\experiments\common\NewTrainingGUI_BackwardCompatibility\createNewRemoteBehaviorFilenameLocal.m		
- ViRMEn\experiments\common\NewTrainingGUI_BackwardCompatibility\loadScheduleLocal.m		
- ViRMEn\experiments\common\NewTrainingGUI_BackwardCompatibility\loadTrainingProfileLocal.m		
- ViRMEn\experiments\common\NewTrainingGUI_BackwardCompatibility\loadWaterAllocLocal.m		
- ViRMEn\experiments\utility\Test_VRrigs\@PostTrainingGUI\getLocalDataPosttrainingGUI.m		
- ViRMEn\experiments\utility\Test_VRrigs\@TestVRRig_2\getLocalFileTests.m		
- ViRMEn\experiments\utility\Test_VRrigs\@TestVRRig_Setup\getSubjectMotorPositionLocal.m		
- ViRMEn\experiments\utility\Test_VRrigs\@TestVRRig_Setup\get_if_rig_double_valve_local.m		
- ViRMEn\experiments\utility\Test_VRrigs\@TestVRRig_Setup\get_if_rig_puffs_local.m		
- ViRMEn\experiments\utility\TrainingFlowGUI\@TrainingFlow_GUI\get_rig_io_subject_status_local.m		
- ViRMEn\experiments\utility\TrainingFlowGUI\@TrainingFlow_GUI\get_subject_already_trained_status_local.m		
- ViRMEn\experiments\utility\find_remote_name_from_local_name.m		
- ViRMEn\experiments\utility\get_if_rig_double_valve_local.m		
- ViRMEn\notifications\error_training_notification_slack_local.m		


## Initialize Trial World Sequence

- The Initialize trial world sequence is at the very core of a ViRMEn experiment. It coordinates multiple vital functions (maze advancement, trial generation, towers positioning) for ViRMEn operation.
- There are two "modes" to execute Trial World Sequence. "Classic" (inside experiment code and dependent of StimulusBank file) & "NoStimBank" mode.


#### High-Level Comparison

| Area | Stim Bank dependency | NoStimBank |
|----------|----------|----------|
| Primary Goal | Present evidence using Poisson stimulus trains | Generate configurable cue-based navigation trials |
| Trial Source | Pre-generated Poisson stimulus sequence | Dynamically generated trial configuration |
| Trial Generator | `vr.poissonStimuli.nextTrial()` | `TG_generateTrialFull()` |
| Difficulty Control | Embedded in stimulus train generation | Explicit difficulty pipeline |
| World Rebuild | Only when maze changes | Only when maze changes |
| Cue Generation | Derived from Poisson stimulus bank | Generated per-trial |
| Reward Scaling | Dynamic reward adjustment | Protocol reward scaling |
| Flexibility | Stimulus-driven | Configuration-driven |

---

####  Lifecycle Comparison

##### NoStimBank

```text
Trial End
    │
    ▼
TrialSetup
NSB_initializeTrialWorld
    │
    ├── decideMazeAdvancement
    ├── getSubLevels
    ├── TG_getTrialConfig
    ├── TG_setDifficulty
    ├── TG_generateTrialFull
    ├── TG_get_trial_difficulty_type
    ├── NSB_computeWorld
    ├── drawTrial
    ├── NSB_drawCueSequence
    └── configureCues
```

##### Stim Bank dependency

```text
Trial End
    │
    ▼
TrialSetup
initializeTrialWorld
    │
    ├── decideMazeAdvancement
    ├── computeWorld
    ├── drawTrial
    ├── poissonStimuli.nextTrial
    ├── drawCueSequence
    ├── configureCues
    └── autoAdjustReward
```

---

####  Trial Creation Architecture

##### NoStimBank – Configuration-Based Generation

```text
Trial Configuration
        │
        ▼
TG_getTrialConfig
        │
        ▼
TG_setDifficulty
        │
        ▼
TG_generateTrialFull
        │
        ▼
Generated Trial
```

#### Advantages

- Highly configurable
- Easy difficulty manipulation
- Multiple cue strategies
- Flexible evidence structures

#### Disadvantages

- More computational overhead
- More dependencies

---

##### Stim Bank dependency – Stimulus-Bank Generation

```text
PoissonStimulusTrain
        │
        ▼
nextTrial()
        │
        ▼
Trial Returned
```

#### Advantages

- Fast
- Consistent evidence generation
- Easier statistical control

#### Disadvantages

- Less flexible
- Coupled to stimulus bank design

---

####  Difficulty Management

##### NoStimBank

```matlab
cfg = TG_setDifficulty(cfg, vr);
```

followed by

```matlab
TG_get_trial_difficulty_type(...)
```

Difficulty becomes part of the generated trial.

#### Stored Variable

```matlab
vr.trialDifficultyType
```

---

##### Stim Bank dependency

Difficulty is embedded within:

```matlab
vr.poissonStimuli
```

The evidence structure originates from the stimulus train itself.

```text
Stimulus Generator
        │
        ▼
Difficulty Emerges
```

---

####  Evidence Generation

##### NoStimBank

```text
Generated Trial
        │
        ▼
NSB_drawCueSequence
        │
        ▼
Cue Pattern
```

Produces:

- Cue counts
- Cue side assignment
- Evidence weight

---

##### Stim Bank dependency

```text
PoissonStimulusTrain
        │
        ▼
Trial
        │
        ▼
drawCueSequence
```

Cue generation visualizes evidence already present in the stimulus train.

---

####  World Generation

Both systems share a similar world reconstruction stage.

```text
Maze Change
        │
        ▼
computeWorld
```

or

```text
Maze Change
        │
        ▼
NSB_computeWorld
```

Both rebuild:

- Geometry
- Visibility
- Reward locations
- Cue placement structures

---

####  Reward Logic

##### NoStimBank

```matlab
vr.protocol.updateRewardScale(...)
```

Reward values are managed by the protocol.

##### Stim Bank dependency

```matlab
autoAdjustReward(...)
```

Reward magnitude may adapt to recent performance.

---

####  Protocol Interaction

##### NoStimBank

Heavy protocol dependence:

```matlab
setDrawMethod
drawTrial
reset_statistics
updateRewardScale
```

##### Stim Bank dependency

Primary protocol interaction:

```matlab
drawTrial
```

while evidence generation is delegated to the stimulus generator.

---

####  State Variables

##### Shared Variables

```matlab
mazeID
sublevel
trialType
trialProb
wrongChoice
experimentEnded
```

##### NoStimBank-Specific

```matlab
trialDifficultyType
trialWeight
repeat_trial
```

##### Poisson-Specific

```matlab
poissonStimuli
```

---

####  Call Graph Comparison

##### NoStimBank

```text
NSB_initializeTrialWorld
│
├── decideMazeAdvancement
├── getSubLevels
├── TG_getTrialConfig
├── TG_setDifficulty
├── TG_generateTrialFull
├── TG_get_trial_difficulty_type
├── NSB_computeWorld
├── drawTrial
├── reset_statistics
├── NSB_drawCueSequence
└── configureCues
```

##### Stim Bank dependency

```text
initializeTrialWorld
│
├── decideMazeAdvancement
├── computeWorld
├── drawTrial
├── poissonStimuli.nextTrial
├── drawCueSequence
├── configureCues
└── autoAdjustReward
```

---

####  Architectural Difference

##### NoStimBank – Trial-First Architecture

```text
Create Trial
      │
      ▼
Generate Evidence
      │
      ▼
Display Evidence
```

The trial is built dynamically and cues are added afterward.

---

##### Stim Bank dependency – Evidence-First Architecture

```text
Generate Evidence
      │
      ▼
Create Trial
      │
      ▼
Display Evidence
```

The evidence stream already exists inside `PoissonStimulusTrain`, and the trial becomes a visualization of that stream.

---

####  Developer Takeaway

If you are debugging maze progression, world generation, or trial side selection, both systems behave similarly.

If you are debugging evidence generation, the workflows diverge significantly:

- **NoStimBank:** start at `TG_generateTrialFull()` and trace through `NSB_drawCueSequence()`.
- **Stim Bank dependency:** start at `PoissonStimulusTrain.nextTrial()` and trace how the resulting stimulus sequence is converted into cues.

In practice:

- `NSB_initializeTrialWorld` is a general-purpose trial construction engine.
- `initializeTrialWorld` in Stim Bank dependency is a stimulus-driven trial presentation engine.


## Most common errors handling

Errors occurring during training are registed in **acquisition.SessionErrorLog** table. 
The next list comprehends the most common errors and a way to fix them.

#### Invalid or deleted object

  + **Cause:** Error commonly caused by closing LaserSetupGUI by technician before optogenetic session.
  + **Solution:** There is no known solution, just attention by users. This error does not affect training.

#### Serial write error:  Unknown

  + **Cause:** Error commonly caused by misscommunication with Arduino Serial port for movement sensor.
  + **Solution:** Restart MATLAB
  + Similar Errors:  
    + Timed out while waiting for a reply.
    + Serial communications have not been properly initiated.

#### NI-DAQ task has not been set up. Call 'init' before ...

  + **Cause:** Use of compiled C++ function before calling init first.
  + **Solution:** Check why appropiate initialize_daq functions was not called.
  + Initialize daq common functions:
        + C:\Experiments\ViRMEn\experiments\common\NewTrainingGUI_BackwardCompatibility\initializeCommPulses.m
        + C:\Experiments\ViRMEn\experiments\common\initializeArduinoReader.m
        + C:\Experiments\ViRMEn\experiments\common\initializeDAQ.m
        + C:\Experiments\ViRMEn\experiments\common\initializeDAQ_2LickSpouts.m
        + C:\Experiments\ViRMEn\experiments\common\initializeDAQ_laser.m
        + C:\Experiments\ViRMEn\experiments\common\initializeDAQ_widefield.m
        + C:\Experiments\ViRMEn\experiments\common\initializeLickCounterInput.m
        + C:\Experiments\ViRMEn\experiments\common\initializeLickCounterInput_6501.m
        + C:\Experiments\ViRMEn\experiments\common\initializeVRRig_laser.m

#### No supported formats found for this device. See IMAQHWINFO(ADAPTORNAME).

  + **Cause:** Camera is not properly configured.
  + **Solution:** Most common cause is that an image acqusition toolbox was not installed. Check <a href='https://braincogs.github.io/software/configure_systems.html#matlab-add-ons'> MATLAB Add-Ons </a> section for more info.


#### Multiple image acquisition objects cannot access the same device simultaneously.

  + **Cause:** Video acquisition was not stopped correctly.
  + **Solution:** Restart MATLAB.


#### Open failed: Port: COM(x) is not available. Available ports: COM(y).

  + **Cause:** Most likely Arduino Sensor COM port was updated.
  + **Solution:** Update **arduinoPort** variable in RigParameters to correct port.


#### Unrecognized field name "x"

  + **Cause:** Most likely experimenter added a variable that was not properly initialized in vr structure.
  + **Solution:** Check with experimenter.


## cpp NI DAQ functions

- In **C:\Experiments\ViRMEn\experiments\daq** directory there is a set of cpp functions that are a low level MEX compiled function to directly set up tasks on NIDAQ Card for a "real-time" IO control on Virmen.
- If there is a need to create a new task for NIDAQ, these are the most basic recommendations steps to follow:
  1. Copy a "similar" task from the ones already created in daq folder.
  2. Check <a href='https://www.ni.com/docs/en-US/bundle/ni-daqmx-c-api-ref/page/group__ni-daqmx__c__functions.html'> NIDAQ C api reference </a> for all functions and properties that can be used for NIDAQ cards.
  3. When ready to test open **C:\Experiments\ViRMEn\compile_daqcomm.m** file and add the newly created function to the .cpp list of functions to compile (Lines 13-34 approximately).
  4. Run **C:\Experiments\ViRMEn\compile_daqcomm.m** to compile newly created function.
  5. Remember that these functions normally are run like this:
        - **function ('init', ...)** to initialize nidaq function
        - **function ((specific functionality read, on, off, etc))** to execute function
        - **function ('end')** to end functionality and close port for the next task


## Scheduled tasks
- Several daily tasks for rig computers have been created for common daily tasks in rig computers.
- These tasks are stored in **braininit/Shared/TasksScheduler** directory
- Scheduled tasks are set up for a rig computer via PowerShell scripts saved in:
  + C:\Experiments\ViRMEn\extras\import_scheduled_tasks.ps1 ()
  + C:\Experiments\ViRMEn\extras\import_main_scheduled_tasks.ps1

### Lists of current Scheduled tasks

#### CopyNODBFiles.xml
 - **Description:** Copies **braininit/Shared/NoDBVirmenBackup** csv files to **C:/Experiments/ViRMEn/extras** directory. These files are used as a DB replacement and continue training in case of a DB outage.
 - **Script Run:** C:\Experiments\U19-pipeline-matlab\scripts\cmd_copy_noDB_files 
 - **Schedule:** Daily at 5:55 am 
 - **Which Rigs:** All rigs

#### new_data_backup.xml
 - **Description:** Copies local behavior files to **braininit/Data/Raw/behavior** directory
 - **Script Run:** C:\Experiments\U19-pipeline-matlab\scripts\cmd_copy_behavior_files 
 - **Schedule:** Daily at 11:00 pm 
 - **Which Rigs:** All rigs

 #### video_backup.xml
 - **Description:** Copies local video files to **braininit/Data/Raw/video_pupillometry** directory
 - **Script Run:** C:\Experiments\U19-pipeline-matlab\scripts\cmd_copy_video_files
 - **Schedule:** Daily at 11:55 am 
 - **Which Rigs:** All rigs

 #### RestartComputer.xml
 - **Description:** Restart computer automatically
 - **Script Run:** shutdown  /r /f /t 0
 - **Schedule:** Daily at 7:00 am 
 - **Which Rigs:** "165" Rigs

 #### start_matlab.xml
 - **Description:** Latest Matlab version is started automatically
 - **Script Run:** C:\Experiments\ViRMEn\extras\start_latest_matlab.ps1
 - **Schedule:** At user log on
 - **Which Rigs:** "165" Rigs



### Steps to create new Scheduled task for Rigs

1. Manually create a new scheduled task via Task Scheduler in a Windows Machine.
2. Export the task to a xml file via menu Action->Export Button
3. Copy the xml file to **braininit/Shared/TasksScheduler** directory
4. Modify PowerShell script to include newly created task:
  + C:\Experiments\ViRMEn\extras\import_scheduled_tasks.ps1 (for 165 room rig)
  + C:\Experiments\ViRMEn\extras\import_main_scheduled_tasks.ps1 (for acquisition rigs)
5. Open MATLAB as administrator 
6. Run:
 + `import_scheduled_tasks(1)` if this is a 165 room rig (or mainly managed by techs)
 + `import_scheduled_tasks(0)` if this is an acquisition (ephys/imaging) rig or rig managed by researchers
7. Repeat steps 5-6 for all rigs where this task will be scheduled. 

