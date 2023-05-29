---
title: Automated cronjobs in BRAINCoGS (Developer Guide)
lang: en-US
---

# {{ $frontmatter.title }}

 + There are some processes that are triggered automatically in BRAINCoGS.
 + All these processes are handled by **u19proc** virtual machine administered by PNI Help. Contact Garrett T. McGrath gmcgrath@princeton.edu for permissions to it.
 + All processes are handled by **u19prod** user account so it's not linked to any personal account.
 
 ## List of automate processes in BRAINCoGS

  + Behavior, Manipulation, Optogenetics, Pupillometry tables ingestion
  + Alert system daily routine
  + Ephys/Imaging Automation Pipeline process

## Behavior, Manipulation, Optogenetics, Pupillometry tables ingestion

 + **Execution schedule:** daily at 4:00 am
 + **Location in u19proc:** /home/u19prod\@pu.win.princeton.edu/Datajoint_projs/U19-pipeline-matlab/scripts/call_u19_night_cronjob.sh
 + **Overview:** Call <a href='https://github.com/BrainCOGS/U19-pipeline-matlab/blob/master/scripts/populate_tables.m '> populate_tables.m script</a>. Ingest all Behavior related tables from acquision.SessionStarted & acquisition.Session new records from that day. Check the populate_tables.m script for more information

## Alert system daily routine

 + **Execution schedule:** daily at 3:00 am
 + **Location in u19proc:** /home/u19prod\@pu.win.princeton.edu/Datajoint_projs/U19-pipeline_python/u19_pipeline/alert_system/call_cronjob_alert.sh
 + **Overview:** Call <a href='https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/alert_system/cronjob_alert.py '> cronjob_alert.py script </a>. Read <a href="https://braincogs.github.io/software/alert_system.html"'> Alert System section </a> for more information. 

## Ephys/Imaging Automation Pipeline process

 + **Called when:** every 30 minutes.
 + **Location in u19proc:** /home/u19prod\@pu.win.princeton.edu/Datajoint_projs/U19-pipeline_python/u19_pipeline/automatic_job/call_cronjob_automatic_job.sh
 + **Overview:** Call <a href='https://github.com/BrainCOGS/U19-pipeline_python/blob/masteru19_pipeline/automatic_job/cronjob_automatic_job.py'> cronjob_automatic_job.py (Ephys Imaging cronjob script) </a>. Check if a new recording has been added from <a href='https://github.com/BrainCOGS/RecordingProcessJobGUI '> RecordingProcessJobGUI </a>  or a job (recording process) has advanced to a new status. If any of these have occurred the "next" function or process is called for the recording and/or job.


 ## System Architecture

 ## Workflow management description

 ## How to add steps on workflow management 

 ## Add new sorter for Ephys Processing

 ## Add new preprocessing steps for Ephys Processing

 ## Add new segmentation algorithm for Imaging Processing

 ## Add new preprocessing steps for Imaging Processing