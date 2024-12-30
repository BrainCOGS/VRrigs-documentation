<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<h2 id="first-steps" tabindex="-1"><a class="header-anchor" href="#first-steps"><span>First steps</span></a></h2>
<ul>
<li>Fill the next <a href="https://frevvo-prod.princeton.edu/frevvo/web/tn/pu.nplc/u/5a6d697c-0163-4307-b751-fcc0742900a9/app/_sO14QHzSEemyQZ_M7RLPOg/formtype/_-XYdEEK2Eeqtf7JjRFmYDQ/popupform">Datajoint host access form</a></li>
<li>Fill the next <a href="https://frevvo-prod.princeton.edu/frevvo/web/tn/pu.nplc/u/5a6d697c-0163-4307-b751-fcc0742900a9/app/_sO14QHzSEemyQZ_M7RLPOg/formtype/_b4L9oHz4EemyQZ_M7RLPOg/popupform">PNI account form</a></li>
<li>Clone repostiory:
<ul>
<li>For <strong>Python</strong>: <a href="https://github.com/BrainCOGS/U19-pipeline_python">https://github.com/BrainCOGS/U19-pipeline_python</a></li>
<li>For <strong>MATLAB</strong>: <a href="https://github.com/BrainCOGS/U19-pipeline-matlab">https://github.com/BrainCOGS/U19-pipeline-matlab</a></li>
</ul>
</li>
</ul>
<h2 id="mount-file-server-volumes" tabindex="-1"><a class="header-anchor" href="#mount-file-server-volumes"><span>Mount file server volumes</span></a></h2>
<ul>
<li>
<p>There are several xxxxxxxxxxx data files (behavior, imaging &amp; electrophysiology) that are referenced in the database</p>
</li>
<li>
<p>To access these files you should mount PNI file server volumes on your system.</p>
</li>
<li>
<p>There are three main file servers across PNI where data is stored (braininit, Bezos &amp; u19_dj)</p>
</li>
</ul>
<h3 id="on-windows-systems" tabindex="-1"><a class="header-anchor" href="#on-windows-systems"><span>On windows systems</span></a></h3>
<ol>
<li>From Windows Explorer, select &quot;Map Network Drive&quot; and enter:</li>
</ol>
<ul>
<li><code v-pre>\\cup.pni.princeton.edu\braininit\</code> (for braininit)</li>
<li><code v-pre>\\cup.pni.princeton.edu\Bezos-center\</code> (for Bezos)</li>
<li><code v-pre>\\cup.pni.princeton.edu\u19_dj\</code> (for u19_dj)</li>
</ul>
<ol start="2">
<li>Authenticate with your NetID and PU password (NOT your PNI password, which may be different). When prompted for your username, enter PRINCETON\netid (note that PRINCETON can be upper or lower case) where netid is your PU NetID.</li>
</ol>
<h3 id="on-os-x-systems" tabindex="-1"><a class="header-anchor" href="#on-os-x-systems"><span>On OS X systems</span></a></h3>
<ol>
<li>Select &quot;Go-&gt;Connect to Server...&quot; from Finder and enter:</li>
</ol>
<ul>
<li><code v-pre>smb://cup.pni.princeton.edu/braininit/</code> (for braininit)</li>
<li><code v-pre>smb://cup.pni.princeton.edu/Bezos-center/</code> (for Bezos)</li>
<li><code v-pre>smb://cup.pni.princeton.edu/u19_dj/</code> (for u19_dj)</li>
</ul>
<ol start="2">
<li>Authenticate with your NetID and PU password (NOT your PNI password, which may be different).</li>
</ol>
<h3 id="on-linux-systems" tabindex="-1"><a class="header-anchor" href="#on-linux-systems"><span>On Linux systems</span></a></h3>
<ol>
<li>Follow extra steps depicted in this: <a href="https://npcdocs.princeton.edu/index.php/Mounting_the_PNI_file_server_on_your_desktop">link</a></li>
</ol>
<h2 id="db-access-for-python-repository" tabindex="-1"><a class="header-anchor" href="#db-access-for-python-repository"><span>DB Access for Python repository</span></a></h2>
<h3 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites"><span>Prerequisites</span></a></h3>
  <details>
    <summary>Click to expand details</summary>
<h4 id="install-an-integrated-development-environment" tabindex="-1"><a class="header-anchor" href="#install-an-integrated-development-environment"><span>Install an integrated development environment</span></a></h4>
<ul>
<li>
<p>DataJoint development and use can be done with a plain text editor in the
terminal. However, an integrated development environment (IDE) can improve your
experience. Several IDEs are available.</p>
</li>
<li>
<p>In this setup example, we will use Microsoft's Visual Studio Code.
<a href="https://code.visualstudio.com/download" target="_blank" rel="noopener noreferrer">Installation instructions here.<ExternalLinkIcon/></a></p>
</li>
<li>
<p>Install the Jupyter extension for VS Code.</p>
</li>
</ul>
<h4 id="install-a-virtual-environment" tabindex="-1"><a class="header-anchor" href="#install-a-virtual-environment"><span>Install a virtual environment</span></a></h4>
<ul>
<li>
<p>A virtual environment allows you to install the packages required for a
specific project within an isolated environment on your computer.</p>
</li>
<li>
<p>It is highly recommended to create a virtual environment to run the workflow.</p>
</li>
<li>
<p>Conda and virtualenv are virtual environment managers and you can use either
option.  Below are the commands for Conda.</p>
</li>
<li>
<p>If you are setting up the pipeline on your local machine follow the instructions below for Conda.  If you are using <code v-pre>spock.pni.princeton.edu</code> or <code v-pre>scotty.pni.princeton.edu</code>, Conda is preinstalled and you can access it by running <code v-pre>module load anacondapy/2021.11</code>.</p>
</li>
<li>
<p>We will install Miniconda which is a minimal installer for conda.</p>
</li>
<li>
<p>Select the <a href="https://conda.io/en/latest/miniconda.html" target="_blank" rel="noopener noreferrer">Miniconda installer link<ExternalLinkIcon/></a> for your operating system and follow the instructions.</p>
<ul>
<li>
<p>You may need to add the Miniconda directory to the PATH environment
variable</p>
<ul>
<li>
<p>First locate the Miniconda directory</p>
</li>
<li>
<p>Then modify and run the following command</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">"&lt;absolute-path-to-miniconda-directory>/bin:<span class="token environment constant">$PATH</span>"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>Create a new conda environment</p>
<ul>
<li>
<p>Type the following command into a terminal window</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line">conda create <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>environment_name<span class="token operator">></span> <span class="token assign-left variable">python</span><span class="token operator">=</span><span class="token operator">&lt;</span>version<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>Example command to create a conda environment</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line">conda create <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>environment_name<span class="token operator">></span> <span class="token assign-left variable">python</span><span class="token operator">=</span><span class="token number">3.9</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>Activate the conda environment</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line">conda activate <span class="token operator">&lt;</span>environment_name<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
<h4 id="other-installs" tabindex="-1"><a class="header-anchor" href="#other-installs"><span>Other installs</span></a></h4>
<ul>
<li><strong>Git:</strong> Linux and Mac operating systems have Git preinstalled. If running in Windows get <a href="https://gitforwindows.org/" target="_blank" rel="noopener noreferrer">Git<ExternalLinkIcon/></a>.</li>
<li><strong>Graphviz:</strong> To display DataJoint Diagrams, <a href="https://graphviz.org/download/" target="_blank" rel="noopener noreferrer">install graphviz<ExternalLinkIcon/></a>.</li>
<li>Clone the <a href="https://github.com/BrainCOGS/U19-pipeline_python">U19-pipeline_python repository</a></li>
</ul>
</li>
</ul>
  </details>
<h3 id="first-time-configuration" tabindex="-1"><a class="header-anchor" href="#first-time-configuration"><span>First time configuration</span></a></h3>
<ul>
<li>The following instructions will configure DJ and connect to DB.</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line">conda activate <span class="token operator">&lt;</span>environment_name<span class="token operator">></span></span>
<span class="line"><span class="token builtin class-name">cd</span> U19-pipeline_python</span>
<span class="line">pip <span class="token function">install</span> <span class="token parameter variable">-e</span> <span class="token builtin class-name">.</span></span>
<span class="line">python initial_conf.py</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(Username and password will be prompted at this moment: Princeton NETiD &amp; NetiD password usually works)</p>
<ul>
<li>The <code v-pre>initial_conf.py</code>  script will store a local file with credtentials to access DB and configuration variables/filepaths.</li>
<li>Now that the virtual modules are created to access the tables in the database, you can query and fetch from the database.</li>
</ul>
<h3 id="connection-after-configuration" tabindex="-1"><a class="header-anchor" href="#connection-after-configuration"><span>Connection after configuration</span></a></h3>
<ul>
<li>The following instructions will load DJ configuration and connect to DB</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line">conda activate <span class="token operator">&lt;</span>environment_name<span class="token operator">></span></span>
<span class="line">python</span>
<span class="line">from scripts.conf_file_finding <span class="token function">import</span> try_find_conf_file</span>
<span class="line">try_find_conf_file<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token function">import</span> datajoint as dj</span>
<span class="line">dj.conn<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="db-access-for-matlab-repository" tabindex="-1"><a class="header-anchor" href="#db-access-for-matlab-repository"><span>DB Access for MATLAB repository</span></a></h2>
<h3 id="prerequisites-1" tabindex="-1"><a class="header-anchor" href="#prerequisites-1"><span>Prerequisites</span></a></h3>
  <details>
  <summary>Click to expand details</summary>
<ul>
<li>Install DataJoint for MATLAB</li>
<li>Utilize MATLAB built-in GUI i.e. Top Ribbon -&gt; Add-Ons -&gt; Get Add-Ons</li>
<li>Search, select, and install DataJoint</li>
<li>Clone the <a href="https://github.com/BrainCOGS/U19-pipeline-matlab">U19-pipeline-matlab repository</a></li>
</ul>
  </details>
<h3 id="first-time-configuration-1" tabindex="-1"><a class="header-anchor" href="#first-time-configuration-1"><span>First time configuration</span></a></h3>
<ul>
<li>Add this repository to MATLAB Path or cd to this repository folder.</li>
<li>Run <code v-pre>dj_initial_conf(1)</code></li>
<li>Insert user and password for the DB</li>
</ul>
<p><strong>Note</strong> if you are configuring repository on a public computer, there are two options:</p>
<ul>
<li>Run<code v-pre>dj_initial_conf(0)</code> instead, to not store user &amp; pass in configuration file.</li>
<li>Run<code v-pre>dj_initial_conf(1)</code> and login to the DB with a public user like u19tech.</li>
</ul>
<h3 id="connection-after-configuration-1" tabindex="-1"><a class="header-anchor" href="#connection-after-configuration-1"><span>Connection after configuration</span></a></h3>
<ul>
<li>Add this repository to MATLAB Path or cd to this repository folder.</li>
<li><code v-pre>connect_datajoint00</code></li>
</ul>
<h2 id="db-access-for-matlab-repository-cluster-computing" tabindex="-1"><a class="header-anchor" href="#db-access-for-matlab-repository-cluster-computing"><span>DB Access for MATLAB repository (cluster computing)</span></a></h2>
<h3 id="prerequisites-2" tabindex="-1"><a class="header-anchor" href="#prerequisites-2"><span>Prerequisites</span></a></h3>
  <details>
  <summary>Click to expand details</summary>
<ul>
<li>Clone the <a href="https://github.com/BrainCOGS/U19-pipeline-matlab">U19-pipeline-matlab repository</a></li>
<li>Create a directory on same location named <code v-pre>datajoint_matlab_libs</code></li>
<li>Change directory to <code v-pre>datajoint_matlab_libs</code> and clone the following repositories:
<ul>
<li><a href="https://github.com/datajoint/datajoint-matlab.git">https://github.com/datajoint/datajoint-matlab.git</a></li>
<li><a href="https://github.com/datajoint/mym.git">https://github.com/datajoint/mym.git</a></li>
<li><a href="https://github.com/datajoint/GHToolbox.git">https://github.com/datajoint/GHToolbox.git</a></li>
<li><a href="https://github.com/guzman-raphael/compareVersions.git">https://github.com/guzman-raphael/compareVersions.git</a></li>
</ul>
</li>
</ul>
  </details>
<h3 id="first-time-configuration-2" tabindex="-1"><a class="header-anchor" href="#first-time-configuration-2"><span>First time configuration</span></a></h3>
<ul>
<li>Add this repository to MATLAB Path</li>
<li>Run <code v-pre>startup_virtual_machine.m</code></li>
<li>Run <code v-pre>dj_initial_conf(1)</code></li>
<li>Insert user and password for the DB</li>
</ul>
<p><strong>Note</strong> if you are configuring repository on a public computer, there are two options:</p>
<ul>
<li>Run<code v-pre>dj_initial_conf(0)</code> instead, to not store user &amp; pass in configuration file.</li>
<li>Run<code v-pre>dj_initial_conf(1)</code> and login to the DB with a public user like u19tech.</li>
</ul>
<h3 id="connection-after-configuration-2" tabindex="-1"><a class="header-anchor" href="#connection-after-configuration-2"><span>Connection after configuration</span></a></h3>
<ul>
<li>Add this repository to MATLAB Path</li>
<li>Run <code v-pre>startup_virtual_machine.m</code></li>
</ul>
<h2 id="add-researcher-to-user-table" tabindex="-1"><a class="header-anchor" href="#add-researcher-to-user-table"><span>Add researcher to user table</span></a></h2>
<ul>
<li>This set of instructions only apply for users that will have subjects on his/her supervision:</li>
</ul>
<h3 id="add-researcher-to-user-table-with-matlab" tabindex="-1"><a class="header-anchor" href="#add-researcher-to-user-table-with-matlab"><span>Add researcher to user table with MATLAB</span></a></h3>
<ul>
<li>Connect to DB</li>
<li>Run <code v-pre>lab.utils.add_researcher_user_table('NETID', 'full name', 'email', 'phone')</code></li>
<li><strong>Note:</strong> (All data in function call should be written inside quotes)</li>
</ul>
<h3 id="add-researcher-to-user-table-with-python" tabindex="-1"><a class="header-anchor" href="#add-researcher-to-user-table-with-python"><span>Add researcher to user table with PYTHON</span></a></h3>
<ul>
<li>Activate conda environment and start a python command line</li>
<li><code v-pre>import u19_pipeline.utils.insert_miscelaneous_db as imd</code>
<code v-pre>imd.add_researcher_user_table('NETID', 'full name', 'email', 'phone')</code></li>
<li><strong>Note:</strong> (All data in function call should be written inside quotes)</li>
</ul>
</div></template>


