---
title: Configure behavior & recording systems
lang: en-US
---

# {{ $frontmatter.title }}

 ## Configure new behavior rig system

 ### First steps
 
 #### Mount cup PNI drives

 1. From Windows Explorer, select "Map Network Drive" and enter:
  + `\\cup.pni.princeton.edu\braininit\` (for braininit)
  + `\\cup.pni.princeton.edu\u19_dj\` (for u19_dj)
 2. Authenticate with your NetID and PU password (NOT your PNI password, which may be different). When prompted for your username, enter PRINCETON\netid (note that PRINCETON can be upper or lower case) where netid is your PU NetID.

 #### Install MATLAB 2019 or higher

 #### Configure behavior backup task

 1. Open Task Scheduler
 2. Select "Create Task ..."
 3. Name new task as "new_data_backup"
 4. On **"Trigger"** tab create a new daily trigger set daily at 11:00 pm
 5. On **"Acitions"** tab write `C:\Experiments\U19-pipeline-matlab\scripts\cmd_copy_behavior_files` on the **Program/Script** edit

 #### Instal Git for Windows

 1. Install from this <a href="https://git-for-windows.github.io/">link</a> 
 ##### Installation options:
  + Use Git from the Windows Command Prompt (5th pane)
  + Checkout as-is, commit as-is (6th pane)

 #### Configure 

 ### Virmen Repository

 1. Create `C:\Experiments` directory
 2. Open Git Bash and execute: `cd /c/Experiments`
 

