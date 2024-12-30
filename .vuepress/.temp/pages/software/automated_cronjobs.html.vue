<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<ul>
<li>There are some processes that are triggered automatically in BRAINCoGS.</li>
<li>All these processes are handled by <strong>u19proc</strong> virtual machine administered by PNI Help. Contact Garrett T. McGrath gmcgrath@princeton.edu for permissions to it.</li>
<li>All processes are handled by <strong>u19prod</strong> user account so it's not linked to any personal account.</li>
</ul>
<h2 id="list-of-automate-processes-in-braincogs" tabindex="-1"><a class="header-anchor" href="#list-of-automate-processes-in-braincogs"><span>List of automate processes in BRAINCoGS</span></a></h2>
<ul>
<li>Behavior, Manipulation, Optogenetics, Pupillometry tables ingestion</li>
<li>Alert system daily routine</li>
<li>Ephys/Imaging Automation Pipeline process</li>
</ul>
<h2 id="behavior-manipulation-optogenetics-pupillometry-tables-ingestion-matlab-cronjob" tabindex="-1"><a class="header-anchor" href="#behavior-manipulation-optogenetics-pupillometry-tables-ingestion-matlab-cronjob"><span>Behavior, Manipulation, Optogenetics, Pupillometry tables ingestion (MATLAB Cronjob)</span></a></h2>
<ul>
<li><strong>Execution schedule:</strong> daily at 4:00 am</li>
<li><strong>Location in u19proc:</strong> /home/u19prod@pu.win.princeton.edu/Datajoint_projs/U19-pipeline-matlab/scripts/call_u19_night_cronjob.sh</li>
<li><strong>Overview:</strong> Call <a href='https://github.com/BrainCOGS/U19-pipeline-matlab/blob/master/scripts/populate_tables.m '> populate_tables.m script</a>. Ingest all Behavior related tables from acquision.SessionStarted &amp; acquisition.Session new records from that day. Check the populate_tables.m script for more information</li>
</ul>
<h2 id="alert-system-daily-routine" tabindex="-1"><a class="header-anchor" href="#alert-system-daily-routine"><span>Alert system daily routine</span></a></h2>
<ul>
<li><strong>Execution schedule:</strong> daily at 3:00 am</li>
<li><strong>Location in u19proc:</strong> /home/u19prod@pu.win.princeton.edu/Datajoint_projs/U19-pipeline_python/u19_pipeline/alert_system/call_cronjob_alert.sh</li>
<li><strong>Overview:</strong> Call <a href='https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/alert_system/cronjob_alert.py '> cronjob_alert.py script </a>.</li>
<li>Read <a href="https://braincogs.github.io/software/alert_system.html"> Alert System section </a> for more information.</li>
</ul>
<h2 id="ephys-imaging-automation-pipeline-process" tabindex="-1"><a class="header-anchor" href="#ephys-imaging-automation-pipeline-process"><span>Ephys/Imaging Automation Pipeline process</span></a></h2>
<ul>
<li><strong>Called when:</strong> at every 30th minute.</li>
<li><strong>Location in u19proc:</strong> /home/u19prod@pu.win.princeton.edu/Datajoint_projs/U19-pipeline_python/u19_pipeline/automatic_job/call_cronjob_automatic_job.sh</li>
<li><strong>Overview:</strong> Call <a href='https://github.com/BrainCOGS/U19-pipeline_python/blob/masteru19_pipeline/automatic_job/cronjob_automatic_job.py'> cronjob_automatic_job.py (Ephys Imaging cronjob script) </a>. Check if a new recording has been added from <a href='https://github.com/BrainCOGS/RecordingProcessJobGUI '> RecordingProcessJobGUI </a>  or a job (recording process) has advanced to a new status. If any of these have occurred the &quot;next&quot; function or process is called for the recording and/or job.</li>
</ul>
<h2 id="pupillometry-pipeline-queue-process" tabindex="-1"><a class="header-anchor" href="#pupillometry-pipeline-queue-process"><span>Pupillometry Pipeline Queue process</span></a></h2>
<ul>
<li><strong>Called when:</strong> at every 20th minute.</li>
<li><strong>Location in u19proc:</strong> /home/u19prod@pu.win.princeton.edu/Datajoint_projs/U19-pipeline_python/u19_pipeline/automatic_job/call_pupillometry_queue_jobs.sh</li>
<li><strong>Overview:</strong> Call <a href='https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/pupillometry_handler.py#L256'> pupillometry handler check_pupillometry_sessions_queue </a>. Queue new job to <code v-pre>spockvm2</code> for pupillometry session.</li>
</ul>
<h2 id="pupillometry-pipeline-check-process" tabindex="-1"><a class="header-anchor" href="#pupillometry-pipeline-check-process"><span>Pupillometry Pipeline Check process</span></a></h2>
<ul>
<li><strong>Called when:</strong> daily at 2:00 am</li>
<li><strong>Location in u19proc:</strong> /home/u19prod@pu.win.princeton.edu/Datajoint_projs/U19-pipeline_python/u19_pipeline/automatic_job/call_pupillometry_check_jobs.sh</li>
<li><strong>Overview:</strong> Call <a href='https://github.com/BrainCOGS/U19-pipeline_python/blob/master/u19_pipeline/automatic_job/pupillometry_handler.py#L338'> pupillometry handler check_processed_pupillometry_sessions </a>. Check if job in <code v-pre>spockvm2</code> for pupillometry has finished and retrieve data to ingest in <code v-pre>pupillometry_session_model_data</code> table.</li>
</ul>
</div></template>


