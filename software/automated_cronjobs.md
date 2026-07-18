---
title: Automated cronjobs in BRAINCoGS (Developer Guide)
lang: en-US
---

# {{ $frontmatter.title }}

+ Some processes in BRAINCoGS are triggered automatically.
+ All these processes are handled by the **u19proc2** (g-bcogs-u19proc2.pni.princeton.edu) virtual machine, administered by PNI Help. Contact Garrett T. McGrath (gmcgrath@princeton.edu) for permissions.
+ All processes run under the **u19prod** user account, so they are not linked to any personal account.

## List of automated processes in BRAINCoGS

+ Behavior, Manipulation, Optogenetics, Pupillometry tables ingestion
+ Alert system daily routine
+ Ephys/Imaging Automation Pipeline process


## Alert system daily routine

+ **Execution schedule:** daily at 3:00 am
+ **Location in u19proc2:** /home/u19prod/Datajoint_projs/U19-pipeline_python/u19_pipeline/alert_system/call_cronjob_alert.sh
+ **Overview:** Call <a href='https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/alert_system/cronjob_alert.py '> cronjob_alert.py script </a>.
+ Executes **main_old_log_deletion()**: deletes old logs (> 2 weeks) from all the cronjobs in their main log directory.
+ Executes **main_live_session_stats_deletion()**: moves "old" (> 2 weeks) records from acquisition.LiveSessionStats to acquisition.HistoricSessionStats to keep the former table lightweight for the live stats monitor routine.
+ Executes **main_noDB_backup**: copies auxiliary files for offline ViRMEn mode. <a href='https://braincogs.github.io/software/virmen_developer.html#virmen-offline'> More info here </a>
+ (Deprecated) Custom alert system for users. <a href="https://braincogs.github.io/software/alert_system.html"> Alert System section </a>.
+ **Log files:** /home/u19prod/log/cronlog_alert/night_cron_log_(datetime execution)

## Behavior, Manipulation, Optogenetics, Pupillometry tables ingestion (MATLAB Cronjob)

+ **Execution schedule:** daily at 4:00 am
+ **Location in u19proc2:** /home/u19prod/Datajoint_projs/U19-pipeline-matlab/scripts/call_u19_night_cronjob.sh
+ **Overview:** Call <a href='https://github.com/BrainCOGS/U19-pipeline-matlab/blob/master/scripts/populate_tables.m '> populate_tables.m script</a>. Ingests all behavior-related tables from acquisition.SessionStarted and acquisition.Session for new records created that day, and ingests the schedule for the next day. Check the populate_tables.m script for more information.
+ **Log files:** /home/u19prod/log/night_cronjob_log/night_cron_log2_(datetime execution)


## Tech Alert

+ **Execution schedule:** daily at 7:00 am
+ **Location in u19proc2:** /home/u19prod/Datajoint_projs/U19-pipeline_python/u19_pipeline/alert_system/tech_alert/call_cronjob_tech_alert.sh
+ **Overview:** Call <a href='https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/tech_alert/tech_alert.py '> tech_alert.py script </a>.
+ **Log files:** /home/u19prod/log/tech_alert/ta_log_(datetime execution)
+ Executes **tech_alert.py()**
+ Executes **cronjob_locked_tables_alert()**: checks whether there are locked tables at startup (in theory, locked tables indicate a non-writable DB). Sends a dev-notifications alert.
+ Executes **cronjob_schedule_check()**: checks whether no subjects are scheduled for training the next day. If that happens, the schedule population script most likely failed. Sends a dev-notifications alert.

## Rig Maintenance

+ **Execution schedule:** daily at 7:00 am
+ **Location in u19proc2:** /home/u19prod/Datajoint_projs/U19-pipeline_python/u19_pipeline/alert_system/rig_maintenance/call_cronjob_check_rig_maintenance.sh
+ **Overview:** Call <a href='https://github.com/BrainCOGS/U19-pipeline-python/blob/master/u19_pipeline/alert_system/rig_maintenance/check_rig_maintenance.py#L532'> rig_maintenance.py script </a>.
+ **Log files:** /home/u19prod/log/rig_maintenance_alert/rma_log_$(datetime execution)

## Missing Sync Behavior

+ **Execution schedule:** daily at 7:00 am
+ **Location in u19proc2:** /home/u19prod/Datajoint_projs/U19-pipeline_python/u19_pipeline/alert_system/automatic_job/call_populate_missing_syncbehavior.sh
+ **Overview:** Call <a href='https://github.com/BrainCOGS/U19-pipeline-python/blob/master/u19_pipeline/automatic_job/populate_missing_syncbehavior_ephys.py'> populate_missing_sync_behavior_ephys.py script </a>. Populates the **ephys_pipeline.BehaviorSync** table. Since BehaviorSync requires the session's behavior data to already be present in the DB (done <a href='https://braincogs.github.io/software/automated_cronjobs.html#behavior-manipulation-optogenetics-pupillometry-tables-ingestion-matlab-cronjob'> here </a> at 4 a.m.), this table is populated outside the ephys pipeline, here instead.
+ **Log files:** /home/u19prod/log/missing_syncbehavior_logs/msbhl_$(datetime execution)


## Water-Weight Alert

+ **Execution schedule:** daily at 6:00 & 7:00 pm
+ **Location in u19proc2:** /home/u19prod/Datajoint_projs/U19-pipeline_python/u19_pipeline/alert_system/water_weigh_alert/call_cronjob_water_weigh_alert.sh
+ **Overview:** Call <a href='https://github.com/BrainCOGS/U19-pipeline-python/blob/master/u19_pipeline/alert_system/water_weigh_alert/water_weigh_alert.py#L664'> water_weigh_alert.py script </a>. Checks whether subjects were watered, weighed, trained, and transported according to the current schedule. Alerts for missing actions are sent to the subject-health channel.
+ **Log files:** /home/u19prod/log/water_weigh_alert/wwa_log_$(datetime execution)


## Live Stats Monitor routine

+ **Execution schedule:** every 5th minute
+ **Location in u19proc2:** /home/u19prod/Datajoint_projs/U19-pipeline_python/u19_pipeline/alert_system/live_monitor_alert/call_cronjob_live_monitor_alert.sh
+ **Overview:** Call <a href='https://github.com/BrainCOGS/U19-pipeline-python/blob/master/u19_pipeline/alert_system/live_monitor_alert/live_monitor_alert.py#L67'> Main Live monitor Function </a>. Checks whether any subjects have gone a "long" time (> 20 min) without a valid, successful trial during training. If so, raises an alarm.
+ **Log files:** /home/u19prod/log/live_stats_monitor/lsmlog2_(datetime execution)

## Ephys/Imaging Automation Pipeline process

+ **Execution schedule:** every 30th minute
+ **Location in u19proc2:** /home/u19prod/Datajoint_projs/U19-pipeline_python/u19_pipeline/automatic_job/call_cronjob_automatic_job.sh
+ **Overview:** Call <a href='https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/cronjob_automatic_job.py'> cronjob_automatic_job.py (Ephys Imaging cronjob script) </a>. Checks whether a new recording has been added from <a href='https://github.com/BrainCOGS/RecordingProcessJobGUI '> RecordingProcessJobGUI </a> or whether a job (recording process) has advanced to a new status. If either has occurred, the "next" function or process is called for the recording and/or job.
+ **Log files:** /home/u19prod/log/automation_pipeline_log/aplog_(datetime execution)

## Pupillometry Pipeline Queue process

+ **Execution schedule:** every 20th minute
+ **Location in u19proc2:** /home/u19prod/Datajoint_projs/U19-pipeline_python/u19_pipeline/automatic_job/call_pupillometry_queue_jobs.sh
+ **Overview:** Call <a href='https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/pupillometry_handler.py#L256'> pupillometry handler check_pupillometry_sessions_queue </a>. Queues a new job on `spockvm2` for the pupillometry session.
+ **Log files:** /home/u19prod/log/pupillometry_queue_logs/pqlogs_(datetime execution)

## Pupillometry Pipeline Check process

+ **Execution schedule:** daily at 2:00 am
+ **Location in u19proc2:** /home/u19prod/Datajoint_projs/U19-pipeline_python/u19_pipeline/automatic_job/call_pupillometry_check_jobs.sh
+ **Overview:** Call <a href='https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/pupillometry_handler.py#L338'> pupillometry handler check_processed_pupillometry_sessions </a>. Checks whether a job on `spockvm2` for pupillometry has finished and retrieves the data to ingest into the `pupillometry_session_model_data` table.
+ **Log files:** /home/u19prod/log/pupillometry_check_logs/pclogs_(datetime execution)
