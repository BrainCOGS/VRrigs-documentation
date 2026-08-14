---
title: ViRMEn Developer Guide
lang: en-US
---

# {{ $frontmatter.title }}

 + This documentation helps BRAINCoGS Software Developers maintain, improve, and navigate the old and new ViRMEn code.

## Old training GUI

Here is an overview of the main functions, in the order they run:

+ Program scripts (Program-wrapper-file): 
  Script created by each researcher that defines main data path, experiment name, and cohort name, and calls the **runCohortExperiment** function. Check the <a href='https://braincogs.github.io/software/virmen_guide.html#program-wrapper-file'> Program-Wrapper-File </a> section for more info.

+ runCohortExperiment
  Main function in charge of preparing and starting training. Its main tasks:

    1. Opens **"Old Training GUI" (TrainingRegiment)**
    ```vr.regiment   = TrainingRegiment( experName ...  ```
    2. Starts training **trainAnimal** function. Next line indicates trainAnimal is executed when "Train" button is pressed.
    ```vr.regiment.guiSelectAnimal({'TRAIN', 'Training'}, @trainAnimal, @cleanup);```
    3. Creates the **trainee** variable, which holds all data the training experiment needs to run correctly, including:
        1. **vr.trainee.experiment:** Path to the ViRMEn world function. Loading the world file creates the *exper* structure:
            1. **exper.transformationFunction:** Which transformation is used for world projection.
            2. **exper.movementFunction:** Which function controls subject movement (e.g. keyboard, arduinoSensor).
            3. **exper.variables:** Variables defined in the ViRMEn GUI (on world creation) that control parts of the experiment (e.g. trialEndPauseDuration).
        2. **vr.trainee.stimulationProtocol & vr.trainee.softwareParams** for optogenetics experiments, if chosen in the GUI.
        3. **vr.trainee.RewardFactor**: reward multiplier, depending on which level the subject is training.
    4. Inserts an **acquisition.SessionStarted** record in the DB.
    5. Starts training: ```status = exper.run();```

 ## New Training GUI

 ### TrainingToday
  Function that runs daily on training rigs at startup.
  Location: <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/TrainingFlowGUI/TrainingTodayFunctions/TrainingToday.m">Training Today function</a>
    1. Fetches scheduled subjects for the rig from the schedule.Schedule table.
    2. Runs RigTester (**TestVRRig_2** function) if it hasn't run that day.
    3. Runs **TrainingFlow_GUI** to start training for each subject.

 ### TestVRRig_2 (Rig Tester)
  Rig Tester GUI. Tests all corresponding IOs for the current schedule.
  Location: <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/Test_VRrigs/%40TestVRRig_2/TestVRRig_2.m">TestVRRig_2 function</a>

  #### Before adding a new rig (or updating an IO for a given rig) to use *Rig Tester*

  1. Add a corresponding record to **lab.Location** for the new rig. Easiest is to copy a record from another behavior rig.
  2. Add corresponding records to **scheduler.RigStatus** for the rig: 
   - Copy all IO records from another rig.
   - Set **OK** for all IOs that will be used in that rig.
   - Set **N/A** for all IOs that won't be used in that rig.
   (If updating a single IO, only change that record to **OK** or **N/A**.)
   3. Add mandatory params to the **C:\Experiments\extras\RigParameters.m** file based on the **schedule.InputOutputRigParameters** table and corresponding IOs. 

  #### To add a new IO for experiments:

  1. Add a corresponding record to the **scheduler.InputOutputRig** table.
  2. Add corresponding rigParameters params for the IO in **scheduler.InputOutputRigParameters**.
  3. For all rig records, add a corresponding record with this new IO in the **scheduler.RigStatus** table:
    - current_status = N/A for rigs that won't have the new IO
    - current_status = OK for rigs that will have it
  4. If needed (rarely the case), add a new test function in the <a href="https://github.com/BrainCOGS/ViRMEn/tree/master/experiments/utility/Test_VRrigs/TestSensorsFunctions">TestSensorsFunctions </a> directory.
  5. Add a corresponding entry in RigTester's <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/Test_VRrigs/%40TestVRRig_2/createComponents.m">createComponents code</a>.

  #### Rig Tester operation

  - Creates a TestTable where each row corresponds to an Input or Output enabled across all rigs, via <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/Test_VRrigs/%40TestVRRig_2/createComponents.m">createComponents function</a>.
    1. Each IO row has components to interact with and perform its corresponding task (button, switch, function to perform, parameters for each IO, etc.).
  - The TestTable is filtered by the corresponding IOs:
    1. If used in **TrainingToday**: IOs = corresponding IOs for all subjects to train in that rig, taken from the IO Profiles of the subjects in the schedule.
    2. If called on its own via "TestVRRig_2": IOs = all IOs registered for the rig (all IOs with status != N/A in *scheduler.RigStatus*).

  #### IO Malfunction    

  - When an IO isn't working properly and is reported through the Rig Tester, the corresponding record for that IO in **scheduler.RigStatus** is set to "current_status = 'Not OK'".
  - Whenever a successful RigTester run completes for all IOs, the corresponding records for all IOs of that rig in **scheduler.RigStatus** are set to "current_status = 'OK'".


 ### Training Flow GUI
  GUI to start the corresponding experiment for a given scheduled subject.
  Location: <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/TrainingFlowGUI/%40TrainingFlow_GUI/TrainingFlow_GUI.m">Training Flow GUI function</a>
  Main tasks:

  1. **get_subject_schedule():** Gets the subject schedule by merging **scheduler.Schedule and scheduler.TrainingProfile**.
  2. **create_subject_timeslot_table():** Based on the schedule, creates a table that integrates everything shown on screen, from training instructions to performance plots.
    - create_subject_performance_plot & getPastSessionsPerformanceTraining(): Get all training data for the subject from the DB: acquisition.SessionStarted & behavior.TowersSession & behavior.TowersBlock.
  3. **update_subject_training_icons() & get_rig_io_subject_status():** Checks IO status for experiments for all subjects on the rig, and updates the status/icon for each subject to inform the user of training availability. 
  4. **start_subject_setup_and_training():** Triggers RigSetup and the experiment when the train button is pushed.
    - Runs **TestVRRig_Setup** for rig setup.
    - Runs **runExperiment()**, the main function that triggers the experiment.
  5. **AddTestTrainingDialog**: small GUI to add test subjects to TrainingFlow GUI.
    - GUI to manually select a training profile to test, copy a training profile from an existing scheduled subject, or copy the last 20 behavioral sessions of an existing scheduled subject along with its training profile. The result is a new entry in **subject_timeslot_table**, so TrainingFlow GUI treats it as an extra subject to train.

 ### Rig Setup (TestVRRig_Setup)
  GUI to visually verify subject positioning and sensor functionality before the experiment.
   Location: <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/Test_VRrigs/%40TestVRRig_Setup/TestVRRig_Setup.m">TestVRRig_Setup function</a>
  Main tasks:

  - **getSubjectMotorPosition():** Gets the motor position for the rig-subject combination from *subject.HeadMotorPosition*. If there is none, calculates the average position from the latest subjects on that rig.
  - **setMotorsPosition():** Uses the Zaber motor library to adjust the motor to the desired position.
  - **startCameras():** If cameras are present, starts them for visual feedback of subject position.
  - **updateSensorPlot():** Plots the Arduino movement sensor output to verify "correct" x/y displacement for subjects.
  - **get_if_rig_double_valve() & get_if_rig_puffs():** Checks whether the rig has a double valve or puffs installed and adds an interface for them, to verify valve calibration and final puff output.
  - **fillPreTrainingInstructionsPanel():** When pre-training instructions are set for the subject, shows them here; setup can't finish until they're all checked as completed.
  - **confirmSetup():** Executes **storeDailySubjectMotorPositionData()**, which stores motor position and lateral/top camera images for reference in **action.DailySubjectPositionData**, then proceeds to subject training.

### PostTrainingGUI
  GUI to start the corresponding experiment for a given scheduled subject.
  Location: <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/utility/Test_VRrigs/%40PostTrainingGUI/PostTrainingGUI.m">PostTrainingGUI main function</a>
  Main tasks:

  - **store_motor_image_reference():** Stores the end-of-training motor position and image for future reference in **action.DailySubjectPositionData**.
  - **get_stats_from_session_local_beh_file():** Opens the behavior file and gets stats such as performance and bias to show in the GUI.
  - **fillStatsSession() & fillPlotsSession():** Shows relevant data to the user based on stats from the behavior file; mainly used to alert technicians to a suspiciously low trial count or low performance.
  - **insertErrorLabel() insertErrorMessage():** If an error occurred during the training experiment, shows it for the relevant user action.
  - **fillPostTrainingCheckBoxes():** If post-training instructions were set, shows them and prevents further action until they're all checked.


### NewTrainingGUI_BackwardCompatibility
- A "compatibility" layer was created to integrate existing experiment code and auxiliary classes with the new Training GUI structure.
  Location: <a href="https://github.com/BrainCOGS/ViRMEn/tree/master/experiments/common/NewTrainingGUI_BackwardCompatibility"> NewTrainingGUI_BackwardCompatibility </a>
  Main tasks:

- **runExperiment():** Main function of the compatibility layer, triggered from **TrainingFlowGUI** to start training. Steps it performs:
  1. **loadTrainingProfile()**: Loads all training profile info from the *scheduler.TrainingProfile* table.
  2. **loadWaterAlloc()**: Gets the **water_per_day** requirement from **action.SubjectStatus**.
  3. Assigns the training profile to the trainee variable: **vr.trainee = training_profile**. This variable is used widely across experiment code.
  4. Loads post-training instructions (for later use in the **PostTrainingGUI** call).
  5. Writes hardcoded "dummy" variables for **vr.trainee** (e.g. vr.trainee.sessionIndex = 1).
  6. Loads the protocol function: **vr.trainee.protocol = str2func(vr.trainee.protocol)** ([Protocol Reference](./virmen_guide.md#new-task-creation)).
  7. In room 165, enables live stats: **vr.trainee.EnableLiveStats = true** (<a href="https://github.com/BrainCOGS/ViRMEn/blob/master/experiments/classes/ExperimentLog.m#L630"> Use of LiveStats </a>).
  8. Checks whether level and/or sublevel will be overridden by the user (from the TrainingFlowGUI selection): **vr.trainee.overrideMazeID & vr.trainee.overrideSubMazeID**. 
  9. Creates a minimal substitute for the *TrainingRegiment* class: **vr.regiment = TrainingRegiment_DBGUI;** (used mainly to build the filePath for the behavior file).
  10. Loads the experiment code into memory: **load(vr.trainee.experiment)**, into the **exper** variable.
  11. Runs **getTransformationFunction & getMovementFunction** for the exper variable.
  12. Loads Manipulation (e.g. optogenetics) parameters for future use: **getExperimentManipulationVariables**.
  13. Checks that the rewardFactor variable has the appropriate length for all mazes: **checkRewardFactor**.
  14. If Mesoscope recording, enables UDP communication: **check_connectionToSI**.
  15. If Ephys recording is set up (RigParameters.SyncPulses = true or RigParameters.hasParallelCommNew = true), initializes the corresponding NIDAQ ports via **initializeCommPulses**.
  16. Inserts a record into **acquisition.SessionStarted**: insertNewSessionStartExperiment(), then gets the behavior file's full path from **regiment.whichLog()**.
  17. Creates the behavior file directory if it doesn't exist: **mkdir(experiment_dir)**.
  18. To let the experiment code work out the starting level and sublevel, gets previous subject performance in oldTrainingGUI format: **vr.trainee.data = getPerformanceSubjectAsRegimentData()**.
  19. Saves the vr variable to exper.userdata: **exper.userdata = vr**, used in parts of the experiment code.
  20. Finally, runs the experiment: **error_status = exper.run();**.
  21. If an error occurs during ViRMEn, sends a Slack notification via **error_training_notification_slack** and logs it in the DB via **send_error_session_log**, in the **acquisition.SessionErrorLog** table.
  22. If the experiment couldn't start, does the same as step 21, and also prepares variables to open **PostTrainingGUI**.
  23. Opens **PostTrainingGUI**.


### ViRMEn Offline

- A ViRMEn Offline mode was implemented to keep experiments running even during a DB or internet outage.
- Here is a description of the parts that make this mode possible:

1. The <a href="https://github.com/BrainCOGS/U19-pipeline-python/blob/master/u19_pipeline/alert_system/noDB_backup_creation/noDB_backup_creation_script.py"> No DB backup creation script </a> creates the following auxiliary files to remove the training DB dependency:
  - **DJCustomVariables.csv:** copy of the **lab.DJCustomVariables** table, containing paths to root directories (behavior, ephys, imaging, etc).
  - **SlackChannels.csv:** copy of the **lab.SlackWebhooks** table, used to get Slack URLs for raising alerts if training fails. Webhook URLs are encoded for security.
  - **UserSlack.csv:** a subset of the **lab.User** table. 
  - **RigStatusTable.csv:** a copy of the **scheduler.RigStatus** table, to know which IOs are installed on each rig.
  - **ScheduleDay.csv:** a copy of **scheduler.Schedule * scheduler.TrainingProfile**, to know the schedule and training profiles for today's training.
  - **PastSessions.csv:** a query from **acquisition.SessionStarted, acquisition.Session, behavior.TowersSession & behavior.TowersBlock** to get past performance (for the performance plot and current level calculation).
  - **SubjectMotorPosition.csv:** a query from **subject.HeadMotorPosition** to get the latest stored motor position for each subject.
  - **Weighing_GUI_Replacement_SpreadSheet.xlsx:** an Excel file with minimal data for technicians to use instead of the Weighing GUI.

All these files are stored in **braininit/Shared/NoDBVirmenBackup** by this script.

2. **Copy files to local machines:** A task is scheduled (**copyNODBFiles** in Task Scheduler) on all rig machines daily at 5:55 am to copy the files above to the local path: **C:/Experiments/ViRMEn/extras**.

3. <a href="https://github.com/BrainCOGS/ViRMEn/blob/master/extras/GeneralParameters.m">GeneralParameters </a> holds a reference to all the files from step 1, named inside the ViRMEn repository.

4. **Local "replacement" functions:** When the DB isn't found, a set of "local" functions throughout the ViRMEn repository replicate the functionality needed for normal subject training:

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

- The Initialize Trial World sequence is at the core of a ViRMEn experiment. It coordinates the functions vital to ViRMEn operation: maze advancement, trial generation, and towers positioning.
- There are two "modes" for executing the Trial World sequence: "Classic" (inside experiment code, dependent on the StimulusBank file) and "NoStimBank".


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

#### Lifecycle Comparison

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

#### Trial Creation Architecture

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

#### Difficulty Management

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

#### Evidence Generation

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

#### World Generation

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

#### Reward Logic

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

#### Protocol Interaction

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

#### State Variables

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

#### Call Graph Comparison

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

#### Architectural Difference

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

#### Developer Takeaway

If you are debugging maze progression, world generation, or trial side selection, both systems behave similarly.

If you are debugging evidence generation, the workflows diverge significantly:

- **NoStimBank:** start at `TG_generateTrialFull()` and trace through `NSB_drawCueSequence()`.
- **Stim Bank dependency:** start at `PoissonStimulusTrain.nextTrial()` and trace how the resulting stimulus sequence is converted into cues.

In practice:

- `NSB_initializeTrialWorld` is a general-purpose trial construction engine.
- `initializeTrialWorld` in Stim Bank dependency is a stimulus-driven trial presentation engine.


## Most common errors and how to handle them

Errors occurring during training are recorded in the **acquisition.SessionErrorLog** table. 
The list below covers the most common errors and how to fix them.

#### Invalid or deleted object

  + **Cause:** Commonly caused by a technician closing LaserSetupGUI before an optogenetic session.
  + **Solution:** There is no known fix, just user attention. This error does not affect training.

#### Serial write error: Unknown

  + **Cause:** Commonly caused by a miscommunication with the Arduino serial port for the movement sensor.
  + **Solution:** Restart MATLAB.
  + Similar errors:  
    + Timed out while waiting for a reply.
    + Serial communications have not been properly initiated.

#### NI-DAQ task has not been set up. Call 'init' before ...

  + **Cause:** A compiled C++ function was called before `init`.
  + **Solution:** Check why the appropriate initialize_daq function wasn't called.
  + Initialize DAQ common functions:
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
  + **Solution:** Most commonly, an image acquisition toolbox was not installed. Check the <a href='https://braincogs.github.io/software/configure_systems.html#matlab-add-ons'> MATLAB Add-Ons </a> section for more info.


#### Multiple image acquisition objects cannot access the same device simultaneously.

  + **Cause:** Video acquisition was not stopped correctly.
  + **Solution:** Restart MATLAB.


#### Open failed: Port: COM(x) is not available. Available ports: COM(y).

  + **Cause:** Most likely the Arduino sensor's COM port was updated.
  + **Solution:** Update the **arduinoPort** variable in RigParameters to the correct port.


#### Unrecognized field name "x"

  + **Cause:** Most likely the experimenter added a variable that was not properly initialized in the vr structure.
  + **Solution:** Check with the experimenter.


## cpp NI DAQ functions

- The **C:\Experiments\ViRMEn\experiments\daq** directory contains a set of C++ functions, low-level MEX-compiled functions that directly set up tasks on the NIDAQ card for "real-time" IO control in ViRMEn.
- To create a new NIDAQ task, follow these basic steps:
  1. Copy a "similar" task from the ones already in the daq folder.
  2. Check the <a href='https://www.ni.com/docs/en-US/bundle/ni-daqmx-c-api-ref/page/group__ni-daqmx__c__functions.html'> NIDAQ C API reference </a> for all functions and properties available for NIDAQ cards.
  3. When ready to test, open **C:\Experiments\ViRMEn\compile_daqcomm.m** and add the newly created function to the .cpp list of functions to compile (around lines 13-34).
  4. Run **C:\Experiments\ViRMEn\compile_daqcomm.m** to compile the newly created function.
  5. These functions are normally run like this:
        - **function('init', ...)** to initialize the NIDAQ function
        - **function((specific functionality: read, on, off, etc))** to execute the function
        - **function('end')** to end functionality and close the port for the next task


## Scheduled tasks
- Several daily tasks have been created for rig computers.
- These tasks are stored in the **braininit/Shared/TasksScheduler** directory.
- Scheduled tasks are set up on a rig computer via PowerShell scripts saved in:
  + C:\Experiments\ViRMEn\extras\import_scheduled_tasks.ps1
  + C:\Experiments\ViRMEn\extras\import_main_scheduled_tasks.ps1

### List of current scheduled tasks

#### CopyNODBFiles.xml
 - **Description:** Copies **braininit/Shared/NoDBVirmenBackup** csv files to the **C:/Experiments/ViRMEn/extras** directory. These files serve as a DB replacement, allowing training to continue during a DB outage.
 - **Script run:** C:\Experiments\U19-pipeline-matlab\scripts\cmd_copy_noDB_files 
 - **Schedule:** Daily at 5:55 am 
 - **Which rigs:** All rigs

#### new_data_backup.xml
 - **Description:** Copies local behavior files to the **braininit/Data/Raw/behavior** directory.
 - **Script run:** C:\Experiments\U19-pipeline-matlab\scripts\cmd_copy_behavior_files 
 - **Schedule:** Daily at 11:00 pm 
 - **Which rigs:** All rigs

#### video_backup.xml
 - **Description:** Copies local video files to the **braininit/Data/Raw/video_pupillometry** directory.
 - **Script run:** C:\Experiments\U19-pipeline-matlab\scripts\cmd_copy_video_files
 - **Schedule:** Daily at 11:55 am 
 - **Which rigs:** All rigs

#### RestartComputer.xml
 - **Description:** Restarts the computer automatically.
 - **Script run:** shutdown /r /f /t 0
 - **Schedule:** Daily at 7:00 am 
 - **Which rigs:** "165" rigs

#### start_matlab.xml
 - **Description:** Starts the latest MATLAB version automatically.
 - **Script run:** C:\Experiments\ViRMEn\extras\start_latest_matlab.ps1
 - **Schedule:** At user log on
 - **Which rigs:** "165" rigs


### Steps to create a new scheduled task for rigs

1. Manually create a new scheduled task via Task Scheduler on a Windows machine.
2. Export the task to an xml file via the Action -> Export button.
3. Copy the xml file to the **braininit/Shared/TasksScheduler** directory.
4. Modify the PowerShell script to include the newly created task:
  + C:\Experiments\ViRMEn\extras\import_scheduled_tasks.ps1 (for 165 room rigs)
  + C:\Experiments\ViRMEn\extras\import_main_scheduled_tasks.ps1 (for acquisition rigs)
5. Open MATLAB as administrator.
6. Run:
 + `import_scheduled_tasks(1)` if this is a 165 room rig (or mainly managed by techs)
 + `import_scheduled_tasks(0)` if this is an acquisition (ephys/imaging) rig or a rig managed by researchers
7. Repeat steps 5-6 for all rigs where this task will be scheduled.

