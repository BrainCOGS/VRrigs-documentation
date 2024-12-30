<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<ul>
<li>This documentation will guide the researcher through the process of creating a new subtask pipeline.</li>
<li>Currently in BRAINCoGS data from our well known &quot;VR Towers Task&quot; is stored in the DB.</li>
<li>New behavior paradigms include new variables that are not included on our original design:</li>
<li>Context task</li>
<li>Doorstop task</li>
<li>Movie/Stationary task</li>
<li>This results on having only a subset of entire data stored on the DB.</li>
<li>The subtask pipeline was created to solve this issue. Its goal is to store specific subtask variables in a different subset of tables in the DB.</li>
</ul>
<h2 id="what-does-the-subtask-pipeline-include" tabindex="-1"><a class="header-anchor" href="#what-does-the-subtask-pipeline-include"><span>What does the “subtask” pipeline include:</span></a></h2>
<ul>
<li>Minimum data framework to store in a DB all relevant data from &quot;VR Towers Task&quot; variants.</li>
<li>Behavior integration. Training system will include the subtask as an option to be selected for a behavior session.</li>
</ul>
<h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites"><span>Prerequisites</span></a></h2>
<ul>
<li>In order to create a new manipulation it’s assumed that:</li>
<li>The researcher is able to connect to <a href="https://braincogs.github.io/software/db_access.html#db-access-for-matlab-repository">datajoint00.pni.princeton.edu DB</a></li>
<li>Latest version of u19_pipeline_matlab repository.</li>
</ul>
<h2 id="initial-set-up" tabindex="-1"><a class="header-anchor" href="#initial-set-up"><span>Initial set-up</span></a></h2>
<ul>
<li>Connect to database <code v-pre>connect_datajoint00</code></li>
<li>Create new subtask base code (substitute subtask_name with the real name of the subtask: <code v-pre>create_new_subtask_classes('(subtask_name)')</code></li>
<li>This will create table codes templates for subtask : <strong>(Subtask)Session.m, (Subtask)Block.m &amp; (Subtask)Trial.m</strong> on the <code v-pre>U19-pipeline-matlab/schemas/+behavior_subtask</code> directory:</li>
<li>(We will use <strong>“Twolickspouts” subtask</strong> for this example).</li>
</ul>
 <figure>
  <img src='@source/software/assets/images/subtask_pipeline/Twolickspouts_subtask_files.png'>
  <center><figcaption>Files created for Twolickspouts subtask on U19-pipeline-matlab/schemas/+behavior_subtask directory</figcaption></center>
 </figure>
<h2 id="table-description" tabindex="-1"><a class="header-anchor" href="#table-description"><span>Table description</span></a></h2>
<ul>
<li>Throughout the table description chapter we are going to give an example of an already working subtask pipeline. (Twolicksspouts).</li>
</ul>
<h3 id="task-subtask-table" tabindex="-1"><a class="header-anchor" href="#task-subtask-table"><span>task.Subtask table</span></a></h3>
<ul>
<li>This table registers all subtasks being created with this pipeline.</li>
</ul>
<h3 id="acquisition-sessionsubtask-table" tabindex="-1"><a class="header-anchor" href="#acquisition-sessionsubtask-table"><span>acquisition.SessionSubtask table</span></a></h3>
<ul>
<li>This table stores subtask register for a specific behavior session. This table “links” a Task.subtask table with acquisition.Sesison table.</li>
</ul>
<h3 id="subtask-session-table" tabindex="-1"><a class="header-anchor" href="#subtask-session-table"><span>&quot;Subtask&quot; Session table</span></a></h3>
<ul>
<li>The Session table stores related information for the entire session (review acquisition.Session for a related example).</li>
</ul>
<h3 id="subtask-block-table" tabindex="-1"><a class="header-anchor" href="#subtask-block-table"><span>&quot;Subtask&quot; Block table</span></a></h3>
<ul>
<li>The Block table stores related information for each block of the session (review behavior.TowersBlock for a related example).</li>
</ul>
<h3 id="subtask-blocktrial-table" tabindex="-1"><a class="header-anchor" href="#subtask-blocktrial-table"><span>&quot;Subtask&quot; BlockTrial table</span></a></h3>
<ul>
<li>The BlockTrial table stores related information for each trial of the session (review behavior.TowersBlockTrial for a related example).</li>
</ul>
<h2 id="adding-code-to-subtask-tables" tabindex="-1"><a class="header-anchor" href="#adding-code-to-subtask-tables"><span>Adding code to &quot;Subtask&quot; tables</span></a></h2>
<ul>
<li>For each subtask you can add all needed variables from the behavior file to the &quot;Subtask&quot; tables.</li>
<li>Example for <strong>“Twolickspouts” subtask</strong></li>
</ul>
<h3 id="twolickspoutssession-table-code" tabindex="-1"><a class="header-anchor" href="#twolickspoutssession-table-code"><span>TwolickspoutsSession table code</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line"> %{</span>
<span class="line"># Session level data for a twolickspouts subtask session</span>
<span class="line">-> acquisition.Session</span>
<span class="line">---</span>
<span class="line">%}</span>
<span class="line"></span>
<span class="line">classdef TwolickspoutsSession &lt; dj.Imported</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>There is no extra field to add at session level, no code added to the file.</li>
</ul>
<h3 id="twolickspoutsblock-table-code" tabindex="-1"><a class="header-anchor" href="#twolickspoutsblock-table-code"><span>TwolickspoutsBlock table code</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">%{</span>
<span class="line"># Block level data for a twolickspouts subtask session</span>
<span class="line">-> behavior_subtask.TwolickspoutsSession</span>
<span class="line">-> acquisition.SessionBlock</span>
<span class="line">---</span>
<span class="line">sublevel                  : int                           # sublevel for the block</span>
<span class="line">trial_params              : blob                          # maze features of current block</span>
<span class="line">%}</span>
<span class="line">.</span>
<span class="line">.</span>
<span class="line"></span>
<span class="line">%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%</span>
<span class="line">%%%% fill here read corresponding TestSubtask data for each block</span>
<span class="line">tuple.sublevel = block_data.sublevel;</span>
<span class="line">tuple.trial_params = block_data.trialParams;</span>
<span class="line">%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>In this example two fields were added to TwolickspoutsBlock table: (sublevel &amp; trial_params)</li>
<li>Two things are needed:</li>
</ul>
<ol>
<li>Adding them to the table definition (1st part of the code block)</li>
<li>Add how this fields are being set from <strong>block_data</strong> variable: (search for <strong>fill here</strong> section on the code). block_data has all block data from behavior file.</li>
</ol>
<h3 id="twolickspoutsblocktrial-table-code" tabindex="-1"><a class="header-anchor" href="#twolickspoutsblocktrial-table-code"><span>TwolickspoutsBlockTrial table code</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line"> %{</span>
<span class="line"> # Trial level data for a twolickspouts subtask session</span>
<span class="line"> -> behavior_subtask.TwolickspoutsBlock</span>
<span class="line"> -> acquisition.SessionBlockTrial</span>
<span class="line"> ---</span>
<span class="line"> licks                        : tinyblob                      # all iterations with lick detected and side</span>
<span class="line"> trial_difficult_type         : varchar(16)                   # trial type label (easy, medium, difficult, etc)</span>
<span class="line"> forced_automatic_reward=null : tinyint                       # 1 if reward was forced for trial 0 otherwise</span>
<span class="line"> %}</span>
<span class="line"> .</span>
<span class="line"> .</span>
<span class="line"> %%%%%%%%%%%%%%%%%%%%%%%</span>
<span class="line"> %%%% fill here read corresponding Twolickspouts data for each trial</span>
<span class="line"> trial_data.licks = curr_trial.licks;</span>
<span class="line"> if isfield(curr_trial, 'forced_automatic_reward')</span>
<span class="line">   trial_data.forced_automatic_reward = curr_trial.forced_automatic_reward;</span>
<span class="line"> else</span>
<span class="line">   trial_data.forced_automatic_reward = NaN;</span>
<span class="line"> end</span>
<span class="line"> if isfield(curr_trial, 'trialDifficultyType')</span>
<span class="line">   trial_data.trial_difficult_type = curr_trial.trialDifficultyType;  </span>
<span class="line"> else</span>
<span class="line">   trial_data.trial_difficult_type = '';</span>
<span class="line"> end</span>
<span class="line"> %%%%%%%%%%%%%%%%%%%%%%%%</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>In this example three fields were added to TwolickspoutsBlockTrial table: (licks &amp; trial_difficult_type, forced_automatic_reward)</li>
<li>Two things are needed:</li>
</ul>
<ol>
<li>Adding them to the table definition (1st part of the code block)</li>
<li>Add how this fields are being set from <strong>trial_data</strong> variable: (search for <strong>fill here</strong> section on the code). trial_data has all trial data from behavior file.</li>
</ol>
<h3 id="create-tables" tabindex="-1"><a class="header-anchor" href="#create-tables"><span>Create tables</span></a></h3>
<ul>
<li>After all code has been written on &quot;Subtask&quot;Session, &quot;Subtask&quot;Block &amp; &quot;Subtas&quot;BlockTrial codebase it is needed to actually create the tables in the DB.</li>
<li>Execute: <code v-pre>create_new_subtask_tables('(subtask_name)')</code></li>
</ul>
<h3 id="training-with-new-subtask" tabindex="-1"><a class="header-anchor" href="#training-with-new-subtask"><span>Training with new subtask</span></a></h3>
<ul>
<li>After all code for new sbutask has been set up and tables have been created the researcher will be able to select a specific subtask that will be associated with the schedule for a given animal. Subsequent behavior sessions will correspond to that selection.</li>
</ul>
 <figure>
  <img src='@source/software/assets/images/subtask_pipeline/subtask_trainingGUI.png'>
  <center><figcaption>Subtask selection for a training schedule of a subject.</figcaption></center>
 </figure>
<h3 id="fetching-data" tabindex="-1"><a class="header-anchor" href="#fetching-data"><span>Fetching Data</span></a></h3>
<ul>
<li>After training has occurred all relevant data will be accessible in the corresponding tables on the behavior_subtask DB.</li>
<li><a href="https://docs.datajoint.org/matlab/queries/03-Fetch.html">Datajoint fetch guide</a></li>
<li>Example to fetch all Twolickspouts data for a single session:</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'testuser_T01', 'session_date', '2022-12-27')</span>
<span class="line">fetch(behavior_subtask.TwolickspoutsSession * behavior_subtask.TwolickspoutsBlock ...</span>
<span class="line">* behavior_subtask.TwolickspoutsBlockTrial &amp; key, '*')</span>
<span class="line"></span>
<span class="line">ans = </span>
<span class="line"></span>
<span class="line">  5×1 struct array with fields:</span>
<span class="line"></span>
<span class="line">    subject_fullname</span>
<span class="line">    session_date</span>
<span class="line">    session_number</span>
<span class="line">    subtask</span>
<span class="line">    block</span>
<span class="line">    trial_idx</span>
<span class="line">    sublevel</span>
<span class="line">    trial_params</span>
<span class="line">    licks</span>
<span class="line">    trial_difficult_type</span>
<span class="line">    forced_automatic_reward</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


