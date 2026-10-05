---
title: Subtask pipeline
lang: en-US
---

# {{ $frontmatter.title }}

+ This guide walks researchers through creating a new subtask pipeline.
+ At BRAIN CoGS, the DB currently stores data from our well-known "VR Towers Task".
+ New behavior paradigms include new variables that were not part of our original design:
  + Context task
  + Doorstop task
  + Movie/Stationary task
+ As a result, only a subset of their data is stored in the DB.
+ The subtask pipeline solves this problem by storing subtask-specific variables in a separate set of tables in the DB.

## What does the “subtask” pipeline include? {#what-does-the-subtask-pipeline-include}

+ A minimal data framework for storing all relevant data from "VR Towers Task" variants in a DB.
+ Behavior integration: the training system includes the subtask as an option that can be selected for a behavior session.

## Prerequisites

+ To create a new subtask, you need to:
  + be able to connect to the <a href="/software/db_access.html#db-access-for-matlab-repository">datajoint00.pni.princeton.edu DB</a>, and
  + have the latest version of the U19-pipeline-matlab repository installed.

## Initial setup {#initial-set-up}

+ Connect to the database: `connect_datajoint00`
+ Create the base code for the new subtask (replace `subtask_name` with the actual subtask name): `create_new_subtask_classes('(subtask_name)')`
+ This creates the table code templates for the subtask — **(Subtask)Session.m, (Subtask)Block.m & (Subtask)Trial.m** — in the `U19-pipeline-matlab/schemas/+behavior_subtask` directory.
+ (We use the **"Twolickspouts" subtask** as the example.)

 ![Files created for the Twolickspouts subtask in the U19-pipeline-matlab/schemas/+behavior\_subtask directory](./assets/images/subtask_pipeline/Twolickspouts_subtask_files.png)

## Table description

+ Throughout this section, we use an existing, working subtask pipeline (Twolickspouts) as the example.

### task.Subtask table

+ This table registers all subtasks created with this pipeline.

### acquisition.SessionSubtask table

+ This table stores the subtask record for a specific behavior session. It "links" the task.Subtask table with the acquisition.Session table.

### "Subtask" Session table

+ The Session table stores information related to the entire session (see acquisition.Session for a related example).

### "Subtask" Block table

+ The Block table stores information related to each block of the session (see behavior.TowersBlock for a related example).

### "Subtask" BlockTrial table

+ The BlockTrial table stores information related to each trial of the session (see behavior.TowersBlockTrial for a related example).

## Adding code to "Subtask" tables

+ For each subtask, you can add all the needed variables from the behavior file to the "Subtask" tables.
+ Example for the **"Twolickspouts" subtask**:

### TwolickspoutsSession table code

 ```matlab
  %{
 # Session level data for a twolickspouts subtask session
 -> acquisition.Session
 ---
 %}

 classdef TwolickspoutsSession < dj.Imported
 ```

+ There are no extra fields at the session level, so no code is added to the file.

### TwolickspoutsBlock table code

 ```matlab
%{
# Block level data for a twolickspouts subtask session
-> behavior_subtask.TwolickspoutsSession
-> acquisition.SessionBlock
---
sublevel                  : int                           # sublevel for the block
trial_params              : blob                          # maze features of current block
%}
 .
 .

 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 %%%% fill here read corresponding TestSubtask data for each block
 tuple.sublevel = block_data.sublevel;
 tuple.trial_params = block_data.trialParams;
 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 ```

+ In this example, two fields were added to the TwolickspoutsBlock table (sublevel & trial_params).
+ Two things are needed:
  1. Add them to the table definition (the 1st part of the code block).
  2. Set how these fields are read from the **block_data** variable (search for the **fill here** section in the code). `block_data` holds all the block data from the behavior file.

### TwolickspoutsBlockTrial table code

 ```matlab
  %{
  # Trial level data for a twolickspouts subtask session
  -> behavior_subtask.TwolickspoutsBlock
  -> acquisition.SessionBlockTrial
  ---
  licks                        : tinyblob                      # all iterations with lick detected and side
  trial_difficult_type         : varchar(16)                   # trial type label (easy, medium, difficult, etc)
  forced_automatic_reward=null : tinyint                       # 1 if reward was forced for trial 0 otherwise
  %}
  .
  .
  %%%%%%%%%%%%%%%%%%%%%%%
  %%%% fill here read corresponding Twolickspouts data for each trial
  trial_data.licks = curr_trial.licks;
  if isfield(curr_trial, 'forced_automatic_reward')
    trial_data.forced_automatic_reward = curr_trial.forced_automatic_reward;
  else
    trial_data.forced_automatic_reward = NaN;
  end
  if isfield(curr_trial, 'trialDifficultyType')
    trial_data.trial_difficult_type = curr_trial.trialDifficultyType;  
  else
    trial_data.trial_difficult_type = '';
  end
  %%%%%%%%%%%%%%%%%%%%%%%%
  ```

+ In this example, three fields were added to the TwolickspoutsBlockTrial table (licks, trial_difficult_type & forced_automatic_reward).
+ Two things are needed:
  1. Add them to the table definition (the 1st part of the code block).
  2. Set how these fields are read from the **trial_data** variable (search for the **fill here** section in the code). `trial_data` holds all the trial data from the behavior file.

### Create tables

+ Once the code for the "Subtask"Session, "Subtask"Block and "Subtask"BlockTrial classes is written, create the tables in the DB.
+ Execute: `create_new_subtask_tables('(subtask_name)')`

### Training with a new subtask {#training-with-new-subtask}

+ Once all the code for the new subtask has been set up and the tables have been created, the researcher can select the subtask in an animal's training schedule, and subsequent behavior sessions will use it.

 ![Subtask selection for a training schedule of a subject.](./assets/images/subtask_pipeline/subtask_trainingGUI.png)

### Fetching data {#fetching-data}

+ After training, all relevant data is available in the corresponding tables of the behavior_subtask DB.
+ <a href="https://docs.datajoint.org/matlab/queries/03-Fetch.html">DataJoint fetch guide</a>
+ Example to fetch all Twolickspouts data for a single session:

```matlab
key = struct('subject_fullname', 'testuser_T01', 'session_date', '2022-12-27')
fetch(behavior_subtask.TwolickspoutsSession * behavior_subtask.TwolickspoutsBlock ...
* behavior_subtask.TwolickspoutsBlockTrial & key, '*')

ans =

  5×1 struct array with fields:

    subject_fullname
    session_date
    session_number
    subtask
    block
    trial_idx
    sublevel
    trial_params
    licks
    trial_difficult_type
    forced_automatic_reward
```
