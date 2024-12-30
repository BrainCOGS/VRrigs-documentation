<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<h2 id="matlab" tabindex="-1"><a class="header-anchor" href="#matlab"><span>MATLAB</span></a></h2>
<h3 id="prerequesites" tabindex="-1"><a class="header-anchor" href="#prerequesites"><span>Prerequesites</span></a></h3>
<ol>
<li>U19-pipeline-matlab repo added to MATLAB path</li>
<li>Mounted network cup drives (braininit, u19_dj)</li>
</ol>
<ul>
<li>Check (see <a href="https://braincogs.github.io/software/db_access.html">Database access section</a> ) for more info.</li>
</ul>
<h3 id="recommended-tutorial" tabindex="-1"><a class="header-anchor" href="#recommended-tutorial"><span>Recommended tutorial</span></a></h3>
<ul>
<li>Go through <code v-pre>U19-pipeline-matlab/tutorials/202103/session01_queries_fetches.mlx</code> to learn basic tips on datajoint.</li>
</ul>
<h3 id="useful-scripts-and-functions-for-reseacher-general-use" tabindex="-1"><a class="header-anchor" href="#useful-scripts-and-functions-for-reseacher-general-use"><span><strong>Useful scripts and functions</strong> for reseacher general use:</span></a></h3>
<h3 id="read-behavior-file" tabindex="-1"><a class="header-anchor" href="#read-behavior-file"><span>Read behavior file:</span></a></h3>
<ol>
<li>Execute: (change key for desired session)</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'testuser_T06', 'session_date', '2022-04-20');</span>
<span class="line">[status,data] = lab.utils.read_behavior_file(key)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>If successful <code v-pre>status = 1</code> and <code v-pre>data = log behavioral file</code></li>
</ol>
<h3 id="get-behavior-file-location-local-for-spock-scotty" tabindex="-1"><a class="header-anchor" href="#get-behavior-file-location-local-for-spock-scotty"><span>Get behavior file location (local &amp; for spock/scotty)</span></a></h3>
<ol>
<li>If you only need to know the path of behavior file use:</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'testuser_T06', 'session_date', '2022-04-20');</span>
<span class="line">baseDir = fetch1(acquisition.SessionStarted &amp; key, 'new_remote_path_behavior_file');</span>
<span class="line">[bucket_path, local_path] =  lab.utils.get_path_from_official_dir(baseDir)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="get-full-trial-data-with-spatialtimeblobs" tabindex="-1"><a class="header-anchor" href="#get-full-trial-data-with-spatialtimeblobs"><span>get_full_trial_data with SpatialTimeBlobs</span></a></h3>
<ul>
<li>Get trial data (position, velocity, etc) efficiently with DB.</li>
<li>New method to retrieve all trial data for multiple sessions faster.</li>
</ul>
<ol>
<li>Execute:</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'testuser_T06', 'session_date', '2022-04-20');</span>
<span class="line">get_full_trial_data(key)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Get trial data from joined tables as well (e.g. <strong>TowersBlock</strong>):</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'testuser_T06', 'session_date', '2022-04-20');</span>
<span class="line">get_full_trial_data(key, behavior.TowersBlockTrial * behavior.TowersBlock)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Get data from subtasks as well (e.g. <strong>Twolickspouts</strong> subtask)</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'efonseca_ef114_act114', 'session_date', '2023-01-11');</span>
<span class="line">all_tables = behavior.TowersBlockTrial * behavior.TowersBlock * behavior_subtask.TwolickspoutsBlockTrial * behavior_subtask.TwolickspoutsBlock</span>
<span class="line">get_full_trial_data(key, all_tables)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="get-stats-from-session" tabindex="-1"><a class="header-anchor" href="#get-stats-from-session"><span>get stats from session</span></a></h3>
<ul>
<li>To get behavior file like stats (on the trial level) for a single or multiple sessions use this function</li>
<li>Stats include, but not limited to: (<code v-pre>correct_left, correct_right, cum_correct_trials, performance, goodFraction, numPerMin, numRewardsPerMin, bias</code>)</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'testuser_T06', 'session_date', '2022-04-20');</span>
<span class="line">stat_struct = get_stats_from_session(key, "all")</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="get-behaviorfile-as-db" tabindex="-1"><a class="header-anchor" href="#get-behaviorfile-as-db"><span>get behaviorfile as db</span></a></h3>
<ul>
<li>Function to unnest behavior file structure to get a plain trial table (with block data merged).</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'testuser_T06', 'session_date', '2022-04-20');</span>
<span class="line">data_struct = get_behaviorfile_as_db(key)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="get-time-from-iteration-variable" tabindex="-1"><a class="header-anchor" href="#get-time-from-iteration-variable"><span>get time from iteration variable</span></a></h3>
<ul>
<li>Example of how to &quot;translate&quot; a variable from iteration# to trial_time</li>
<li>In this case, 1st row of variable licks (iteration#) is translated to lick_times and then added to original trial structure</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'efonseca_ef114_act114', 'session_date', '2023-01-11');</span>
<span class="line">trial_data = get_full_trial_data(key, behavior.TowersBlockTrial * behavior_subtask.TwolickspoutsBlockTrial);</span>
<span class="line">licks_time_struct = struct;</span>
<span class="line">for i=1:length(trial_data)</span>
<span class="line">   licks_time_struct(i,1).lick_times = get_time_from_iter(trial_data(i).trial_time, trial_data(i).licks(1,:));</span>
<span class="line">end</span>
<span class="line">trial_data = cat_struct(trial_data, licks_time_struct);</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="plot-framerate-frequency-sessions" tabindex="-1"><a class="header-anchor" href="#plot-framerate-frequency-sessions"><span>plot framerate frequency sessions</span></a></h3>
<ul>
<li>Plot trial by trial framerate of multiple sessions for comparison</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = 'subject_fullname like "mioffe%" and session_date > "2022-01-01" and session_date &lt; "2022-01-30"';</span>
<span class="line">analyze_iteration_time(key)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div> <figure>
  <img src='@source/software/assets/images/db_analysis/plot_frequency_sessions1.png'>
  <center><figcaption>Framerate trial by trial sessions</figcaption></center>
 </figure>
<h3 id="plot-framerate-frequency-levels-and-rigs" tabindex="-1"><a class="header-anchor" href="#plot-framerate-frequency-levels-and-rigs"><span>plot framerate frequency levels and rigs</span></a></h3>
<ul>
<li>Plot mean framerate by level and rig for multiple sessions</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = 'subject_fullname like "mioffe%" and session_date > "2022-01-01" and session_date &lt; "2022-12-10"';</span>
<span class="line">analyze_iteration_time_level_rig(key)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div> <figure>
  <img src='@source/software/assets/images/db_analysis/plot_frequency_sessions2.png'>
  <center><figcaption>Mean framerate by level and rig </figcaption></center>
 </figure>
<h3 id="plot-velocity-sessions" tabindex="-1"><a class="header-anchor" href="#plot-velocity-sessions"><span>plot velocity sessions</span></a></h3>
<ul>
<li>Plot mean - max range velocity by session for multiple behavior sessions</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'emdiamanti_gps7');</span>
<span class="line">plot_velocity_session(key)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div> <figure>
  <img src='@source/software/assets/images/db_analysis/velocity_subject.png'>
  <center><figcaption>Velocity plot for multiple sessions</figcaption></center>
 </figure>
<h3 id="get-path-table" tabindex="-1"><a class="header-anchor" href="#get-path-table"><span>get path table</span></a></h3>
<ol>
<li>Get default paths for network cup drives for different OS and spock/scotty (bucket)</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'testuser_T06', 'session_date', '2022-04-20');</span>
<span class="line">baseDir = fetch1(acquisition.SessionStarted &amp; key, 'new_remote_path_behavior_file');</span>
<span class="line">[bucket_path, local_path] =  lab.utils.get_path_from_official_dir(baseDir)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div> <figure>
  <img src='@source/software/assets/images/db_analysis/path_table.png'>
  <center><figcaption>Path table data</figcaption></center>
 </figure>
<h3 id="common-errors-and-troubleshooting" tabindex="-1"><a class="header-anchor" href="#common-errors-and-troubleshooting"><span>Common errors and troubleshooting</span></a></h3>
<ol>
<li>When trying to fetch from a table with external storage and corresponding network cup drive is not mounted:</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Error using dj.store_plugins.File (line 89)</span>
<span class="line">Directory `/Volumes/u19_dj/external_dj_blobs` not accessible.</span>
<span class="line"></span>
<span class="line">Error in dj.internal.ExternalTable (line 52)</span>
<span class="line">           self.spec = dj.store_plugins.(storePlugin)(config);</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Error using fread</span>
<span class="line">Invalid file identifier. Use fopen to generate a valid file identifier.</span>
<span class="line"></span>
<span class="line">Error in dj.store_plugins.File.download_buffer (line 63)</span>
<span class="line">           result = fread(fileID);</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Just mount all cup drives and try agian !!</li>
</ul>
<ol start="2">
<li>key reference more than one session when function was supposed to work for single sessions</li>
</ol>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Error using dj.internal.GeneralRelvar/fetch1 (line 250)</span>
<span class="line">fetch1 can only retrieve a single existing tuple.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Just recreate key to reference a single session.</li>
</ul>
<h2 id="python" tabindex="-1"><a class="header-anchor" href="#python"><span>PYTHON</span></a></h2>
<h3 id="common-errors-and-troubleshooting-1" tabindex="-1"><a class="header-anchor" href="#common-errors-and-troubleshooting-1"><span>Common errors and troubleshooting</span></a></h3>
</div></template>


