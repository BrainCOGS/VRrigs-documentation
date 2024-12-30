<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<ul>
<li>This documentation will guide the researcher through the process of creating a new manipulation pipeline.</li>
<li>At BRAINCoGS optogenetics and thermal manipulation are currently supported.</li>
</ul>
<h2 id="what-does-the-manipulation-pipeline-include" tabindex="-1"><a class="header-anchor" href="#what-does-the-manipulation-pipeline-include"><span>What does the “manipulation” pipeline include:</span></a></h2>
<ul>
<li>Minimum data framework to store in a DB all relevant data from a specific manipulation.</li>
<li>Behavior integration. Training system will include the manipulation as an option to be selected for a behavior session.</li>
<li>Generic software parameters to be used in behavior code.</li>
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
<li>Create new manipulation schema (substitute manipulation_name with the real name of the manipulation: <code v-pre>create_new_manipulation_schema('(manipulation_name)', 1)</code></li>
<li>This will create a new schema “base” code on the <code v-pre>U19-pipeline-matlab/schemas</code> directory:</li>
<li>(We will use “thermal” manipulation for this example).</li>
</ul>
 <figure>
  <img src='@source/software/assets/images/manipulation_pipeline/Thermal_schema_files.png'>
 </figure>
 <figure>
  <img src='@source/software/assets/images/manipulation_pipeline/Thermal_pipeline_ERD.png'>
  <center><figcaption>Thermal manipulation file creation & Entity-Relationship diagram on the BRAINCoGS DB</figcaption></center>
 </figure>
<h2 id="table-description" tabindex="-1"><a class="header-anchor" href="#table-description"><span>Table description</span></a></h2>
<ul>
<li>Throughout the table description chapter we are going to give an example of an already working manipulation pipeline. (Optogenetics)</li>
</ul>
<h3 id="manipulation-protocol-table" tabindex="-1"><a class="header-anchor" href="#manipulation-protocol-table"><span>&quot;Manipulation&quot; Protocol table</span></a></h3>
<ul>
<li>
<p>The protocol table stores related information that defines the current manipulation “type” to be used on a behavior session.</p>
</li>
<li>
<p>Here is the minimum table definition for a manipulation protocol table, it is composed by an id to identify the protocol and a description field.</p>
</li>
<li>
<p>Generic <strong>&quot;Manipulation&quot; Protocol.m</strong></p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">%{</span>
<span class="line"># Defined &lt;manipulation> protocols for training</span>
<span class="line">&lt;manipulation>_protocol_id     : int AUTO_INCREMENT</span>
<span class="line">---</span>
<span class="line">protocol_description        : varchar(256)                  </span>
<span class="line">%}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="adding-features-to-manipulation-protocol-table" tabindex="-1"><a class="header-anchor" href="#adding-features-to-manipulation-protocol-table"><span>Adding features to &quot;Manipulation&quot; Protocol table</span></a></h3>
<ul>
<li>
<p>For each manipulation protocol it is possible to add from 0 to n “features” that will define &amp; describe the protocol. We are going to describe all features added for <strong>OptogeneticsProtocol</strong> as an example:</p>
</li>
<li>
<p>It is important to know from an optogenetic experiment what kind of stimulation was given to the subject: Frequency, wavelength, power etc. All these variables can be stored into a “feature” table and be categorized as StimulationParameters.</p>
</li>
<li>
<p>What if stimulation was not a square pulse ? We can create a “feature” table to define (if needed) specific waveforms for a given session. (OptogeneticsWaveform)</p>
</li>
<li>
<p>What if different rooms have different laser systems models ? We can create a “feature” table to store all possible devices to be used in an optogenetic experiment (OptogeneticsDevice).</p>
</li>
<li>
<p>For each of these features we need to create a new table that encompasses the needed information for that feature. We will call all these extra tables a protocol “feature” table.</p>
</li>
<li>
<p>For a guide on how to define DJ tables go to: <a href="https://docs.datajoint.org/matlab/definition/02-Creating-Tables.html">this link</a>.</p>
</li>
</ul>
 <figure>
  <img src='@source/software/assets/images/manipulation_pipeline/Optogenetics_pipeline.png'>
  <center><figcaption>Tables that define an optogenetic protocol for a session.</figcaption></center>
 </figure>
<ul>
<li>For the current guide we will only show OptogeneticsStimulationParameters definition as an example:</li>
</ul>
<h3 id="optogeneticsstimulationparameters-m" tabindex="-1"><a class="header-anchor" href="#optogeneticsstimulationparameters-m"><span>OptogeneticsStimulationParameters.m:</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line"> %{</span>
<span class="line"> # Parameters related to laser stimulation</span>
<span class="line"> stim_parameter_set_id       : int AUTO_INCREMENT  # </span>
<span class="line"> ---</span>
<span class="line"> stim_parameter_description  : varchar(256)        #</span>
<span class="line"> stim_wavelength             : decimal(5,1)        # (nm)</span>
<span class="line"> stim_power                  : decimal(4,1)        # (mW)</span>
<span class="line"> stim_frequency              : decimal(6,2)        # (Hz)</span>
<span class="line"> stim_pulse_width            : decimal(5,1)        # (ms)</span>
<span class="line"> %}</span>
<span class="line"> </span>
<span class="line"> classdef OptogeneticStimulationParameter &lt; dj.Lookup</span>
<span class="line">   properties</span>
<span class="line">   end</span>
<span class="line"> end</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>Fields needed for a protocol “feature” table:</p>
</li>
<li>
<p><strong>id field:</strong> as an int AUTO_INCREMENT type as the only primary key  (e.g. stim_parameter_set_id).</p>
</li>
<li>
<p><strong>extra_fields:</strong> Any other field that helps to define the feature.</p>
</li>
<li>
<p>After all feature tables are defined they should be added to the &quot;Manipulation&quot; Protocol table.</p>
</li>
<li>
<p>For our Optogenetics example:</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">% Declare new "feature" table</span>
<span class="line">optogenetics.OptogeneticsStimulationParameters</span>
<span class="line">% Add the feature -> protocol table</span>
<span class="line">add_feature_key_protocol_table(optogenetics.OptogeneticsProtocol, ... optogenetics.OptogeneticsStimulationParameters)</span>
<span class="line">% Sync definition from DB to .m file</span>
<span class="line">syncDef(optogenetics.OptogeneticsProtocol);</span>
<span class="line">% clear previous connection and connect again</span>
<span class="line">clear all</span>
<span class="line">connect_datajoint00</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>After the “features” tables are added to the &quot;Manipulation&quot; Protocol table we are ready to add protocols to be “ready” and selectable for a behavior session:</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line"> % Insert stim parameter record</span>
<span class="line"> stim_parameter_rec.stim_parameter_description = 'cool stims'</span>
<span class="line"> stim_parameter_rec.stim_wavelength = 473</span>
<span class="line"> stim_parameter_rec.stim_power = 10                </span>
<span class="line"> stim_parameter_rec.stim_frequency = 100        </span>
<span class="line"> stim_parameter_rec.stim_pulse_width = 1</span>
<span class="line"> insert(optogenetics.OptogeneticsStimulationParameters, stim_parameter_rec)  </span>
<span class="line"></span>
<span class="line"> % get last inserted stim_id</span>
<span class="line"> stim_id = fetch(optogenetics.OptogeneticsStimulationParameters, 'ORDER BY stim_parameter_set_id desc LIMIT 1');</span>
<span class="line"></span>
<span class="line"> % or look for a previously inserted parameter</span>
<span class="line"> all_stim_params = fetch(optogenetics.OptogeneticsStimulationParameters, '*')</span>
<span class="line"> stim_id = 1;</span>
<span class="line"></span>
<span class="line"> % Insert new protocol with new stimulation parameter</span>
<span class="line"> new_protocol.protocol_description = 'this_is_new_protocol'</span>
<span class="line"> new_protocol.stim_parameter_set_id = stim_id;</span>
<span class="line"> insert(optogenetics.OptogeneticsProtocol, new_protocol)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="manipulation-softwareparameters-table" tabindex="-1"><a class="header-anchor" href="#manipulation-softwareparameters-table"><span>&quot;Manipulation&quot; SoftwareParameters table</span></a></h3>
<ul>
<li>The software parameters table stores a set of parameters (a matlab struct, a python dictionary) that the code that handles the behavior will use during the session.</li>
<li>We will show how to insert new software parameters:</li>
<li>This for the <strong>optogenetics.OptogeneticSoftwareParameter</strong> table</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">param_struct = struct();</span>
<span class="line">param_struct.software_parameter_description =  'stimulation_sequence # 1';</span>
<span class="line"> </span>
<span class="line">% All parameters goes in here </span>
<span class="line">%(P_on and lsrepoch are the common and needed for current opto experiments)</span>
<span class="line">param_struct.software_parameters.P_on      = 0.21;</span>
<span class="line">param_struct.software_parameters.lsrepoch  = 'cue';</span>
<span class="line">  </span>
<span class="line">%Insert parameter</span>
<span class="line">software_param_id = try_insert(optogenetics.OptogeneticSoftwareParameter, param_struct)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Check <a href="https://github.com/BrainCOGS/U19-pipeline-matlab/blob/master/scripts/insert_software_parameters/insert_optogenetic_software_parameter.m">insert_optogenetic_software_parameter</a> script to use as example.</li>
<li>How to read software parameters on experiment code (ViRMEn)</li>
<li>Example to get software parameters on the initializatonCodeFun on virmen:</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">function vr = initializationCodeFun(vr)</span>
<span class="line"></span>
<span class="line">vr.software_params     = vr.exper.userdata.trainee.softwareParams.software_parameters;</span>
<span class="line">vr.lsrepoch = vr.software_params.lsrepoch;</span>
<span class="line">vr.P_on = vr.software_params.P_on;</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="manipulation-session-table" tabindex="-1"><a class="header-anchor" href="#manipulation-session-table"><span>&quot;Manipulation&quot; Session table</span></a></h3>
<ul>
<li>This table stores manipulation data for a specific behavior session. This table “links” a manipulationProtocol &amp; manipulationSoftwareParameters with a behavior Session.</li>
<li>This table does not need any additional code on it. (Unless extra fields from the behavior file are needed to be stored). <strong>Researcher should contact DB designer if that is their intention</strong></li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">OptogeneticSession.m </span>
<span class="line">%{</span>
<span class="line"># Information of a optogenetic session</span>
<span class="line">-> acquisition.Session</span>
<span class="line">---</span>
<span class="line">-> acquisition.SessionManipulation</span>
<span class="line">-> optogenetics.OptogeneticProtocol</span>
<span class="line">-> optogenetics.OptogeneticSoftwareParameter</span>
<span class="line">%}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="manipulation-sessiontrial-table" tabindex="-1"><a class="header-anchor" href="#manipulation-sessiontrial-table"><span>&quot;Manipulation&quot; SessionTrial table</span></a></h3>
<ul>
<li>This table stores data, on a trial by trial basis, corresponding to the manipulation performed during the behavior session.</li>
<li>There is a section on any  &quot;Manipulation&quot; SessionTrial class on the get_manipulation_trial_data function code where researcher has to add lines to fetch specific trial manipulation data:</li>
</ul>
<p>Code extract  from <strong>OptogeneticSessionTrial</strong> table</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">function trial_structure = get_manipulation_trials_data(~,session_key, log)</span>
<span class="line">.</span>
<span class="line">.</span>
<span class="line">for itrial = 1:nTrials</span>
<span class="line"></span>
<span class="line">  curr_trial = log.block(iBlock).trial(itrial);                            </span>
<span class="line">  trial_data = session_key;</span>
<span class="line">  trial_data.stim_on           = curr_trial.lsrON;</span>
<span class="line">  trial_data.t_stim_on  = time_trial(curr_trial.iLaserOn);</span>
<span class="line">  trial_data.stim_epoch = num2str(curr_trial.LaserTrialType);</span>
<span class="line">  trial_structure(total_trials) = trial_data;</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="training-with-new-manipulation" tabindex="-1"><a class="header-anchor" href="#training-with-new-manipulation"><span>Training with new manipulation</span></a></h3>
<ul>
<li>After all code for new manipulation has been set up the researcher will be able to select a specific manipulation type, protocol &amp; software parameters that will be associated with the schedule for a given animal. Subsequent behavior sessions will correspond to that selection.</li>
</ul>
<figure>
 <img src='@source/software/assets/images/manipulation_pipeline/manipulation_trainingGUI.png'>
 <center><figcaption>Parameter selection (manipulation, protocol & software Parameter) for a training schedule of a subject.</figcaption></center>
</figure>
<h3 id="fetching-data" tabindex="-1"><a class="header-anchor" href="#fetching-data"><span>Fetching Data</span></a></h3>
<ul>
<li>After training has occurred all relevant data will be accessible in the corresponding tables of the database.</li>
<li><a href="https://docs.datajoint.org/matlab/queries/03-Fetch.html">Datajoint fetch guide</a></li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">key = struct('subject_fullname', 'sbolkan_a2a_492', 'session_date', '2022-06-27')</span>
<span class="line">fetch(optogenetics.OptogeneticSessionTrial * optogenetics.OptogeneticSession &amp; key,'*')</span>
<span class="line"></span>
<span class="line">ans = </span>
<span class="line"></span>
<span class="line">  363×1 struct array with fields:</span>
<span class="line"></span>
<span class="line">    subject_fullname</span>
<span class="line">    session_date</span>
<span class="line">    session_number</span>
<span class="line">    block</span>
<span class="line">    trial_idx</span>
<span class="line">    stim_on</span>
<span class="line">    t_stim_on</span>
<span class="line">    t_stim_off</span>
<span class="line">    stim_epoch</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


