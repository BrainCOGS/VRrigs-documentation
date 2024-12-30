<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<h2 id="configure-new-behavior-rig-system" tabindex="-1"><a class="header-anchor" href="#configure-new-behavior-rig-system"><span>Configure new behavior rig system</span></a></h2>
<h3 id="first-steps" tabindex="-1"><a class="header-anchor" href="#first-steps"><span>First steps</span></a></h3>
<h4 id="mount-cup-pni-drives" tabindex="-1"><a class="header-anchor" href="#mount-cup-pni-drives"><span>Mount cup PNI drives</span></a></h4>
<ol>
<li>From Windows Explorer, select &quot;Map Network Drive&quot; and enter:</li>
</ol>
<ul>
<li><code v-pre>\\cup.pni.princeton.edu\braininit\</code> (for braininit)</li>
<li><code v-pre>\\cup.pni.princeton.edu\u19_dj\</code> (for u19_dj)</li>
</ul>
<ol start="2">
<li>Authenticate with your NetID and PU password (NOT your PNI password, which may be different). When prompted for your username, enter PRINCETON\netid (note that PRINCETON can be upper or lower case) where netid is your PU NetID.</li>
</ol>
<h4 id="install-matlab-2019-or-higher" tabindex="-1"><a class="header-anchor" href="#install-matlab-2019-or-higher"><span>Install MATLAB 2019 or higher</span></a></h4>
<h4 id="download-and-install-nidaqmx-from-national-instruments-website" tabindex="-1"><a class="header-anchor" href="#download-and-install-nidaqmx-from-national-instruments-website"><span>Download and install NiDAQmx from <a href="ni.com/r/downloaddaqmx">National Instruments website </a></span></a></h4>
<h4 id="download-and-install-microsoft-visual-studio-community-2019-make-sure-to-select-the-option-desktop-development-with-c" tabindex="-1"><a class="header-anchor" href="#download-and-install-microsoft-visual-studio-community-2019-make-sure-to-select-the-option-desktop-development-with-c"><span>Download and install Microsoft visual studio community 2019. Make sure to select the option desktop development with C++</span></a></h4>
<h4 id="instal-git-for-windows" tabindex="-1"><a class="header-anchor" href="#instal-git-for-windows"><span>Instal Git for Windows</span></a></h4>
<ol>
<li>Install from this <a href="https://git-for-windows.github.io/">link</a></li>
</ol>
<h5 id="installation-options" tabindex="-1"><a class="header-anchor" href="#installation-options"><span>Installation options:</span></a></h5>
<ul>
<li>Use Git from the Windows Command Prompt (5th pane)</li>
<li>Checkout as-is, commit as-is (6th pane)</li>
</ul>
<h4 id="create-ssh-key-to-clone-repositories" tabindex="-1"><a class="header-anchor" href="#create-ssh-key-to-clone-repositories"><span>Create ssh key to clone repositories</span></a></h4>
<ol>
<li>Open Git Bash</li>
<li><code v-pre>ssh-keygen -t ed25519 -C &quot;vrrigsbi@princeton.edu&quot;</code></li>
<li>Leave empty passphrase (Hit Enter two times)</li>
<li><code v-pre>eval &quot;$(ssh-agent -s)&quot;</code></li>
<li><code v-pre>ssh-add ~/.ssh/id_ed25519</code></li>
</ol>
<h4 id="add-key-to-virmen-user-in-github" tabindex="-1"><a class="header-anchor" href="#add-key-to-virmen-user-in-github"><span>Add key to virmen user in github</span></a></h4>
<ol>
<li>Copy ssh public key to clipboard in Git Bash <code v-pre>clip &lt; ~/.ssh/id_ed25519.pub</code></li>
<li>Open <a href="github.com">https://github.com/login</a></li>
<li>Login with vrrigs user (ask your Lab Manager for password)</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/configure_systems/vrrigs_login.png'>
  <center><figcaption>Vrrigs GitHub login</figcaption></center>
 </figure>
<ol start="3">
<li>Access Settings -&gt; SSH and GPG Keys</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/configure_systems/vrrigs_ssh_keys.png'>
  <center><figcaption>Vrrigs ssh keys section</figcaption></center>
 </figure>
<ol start="4">
<li>Click <code v-pre>New SSH Key</code> button</li>
<li>Add a meaningful title to the key and paste public key from the clipboard in &quot;Key&quot; text area.</li>
<li>Click <code v-pre>Add SSH Key</code> button</li>
</ol>
<h4 id="compiler" tabindex="-1"><a class="header-anchor" href="#compiler"><span>Compiler</span></a></h4>
<ol>
<li>Install Visual Studio Code Compiler; make sure to select C++ support from the menu.  <a href="https://visualstudio.microsoft.com/downloads/`">https://visualstudio.microsoft.com/downloads/</a></li>
<li>In MATLAB, Run <code v-pre>mex -setup -v</code>. This sets up the compiler. It should output something like found &quot;Microsoft Visual C++ 2015&quot;</li>
</ol>
<h3 id="u19-pipeline-matlab-repository" tabindex="-1"><a class="header-anchor" href="#u19-pipeline-matlab-repository"><span>U19-pipeline-matlab Repository</span></a></h3>
<ol>
<li>Open Git Bash and execute: <code v-pre>cd /c/Experiments</code></li>
<li>Clone <strong>U19-pipeline-matlab</strong> Repository, <code v-pre>git clone git@github.com:BrainCOGS/U19-pipeline-matlab.git</code></li>
</ol>
<h4 id="matlab-instructions" tabindex="-1"><a class="header-anchor" href="#matlab-instructions"><span>MATLAB Instructions</span></a></h4>
<ol start="3">
<li>Run <code v-pre>dj_initial_conf(0)</code></li>
<li>Insert user and password for the DB</li>
</ol>
<h3 id="virmen-repository" tabindex="-1"><a class="header-anchor" href="#virmen-repository"><span>Virmen Repository</span></a></h3>
<ol>
<li>Create <code v-pre>C:\Experiments</code> directory</li>
<li>Open Git Bash and execute: <code v-pre>cd /c/Experiments</code>.</li>
<li>Execute in <code v-pre>git config --global user.email &quot;alvaroluna.pni@gmail.com&quot;</code>.</li>
<li>Clone Virmen Repository, called <strong>TankMouseVR</strong> <code v-pre>git clone https://github.com/BrainCOGS/TankMouseVR.git</code>.</li>
<li>Rename directory <code v-pre>C:\Experiments\TankMouseVR</code> to <code v-pre>C:\Experiments\ViRMEn</code>.</li>
</ol>
<h4 id="matlab-instructions-1" tabindex="-1"><a class="header-anchor" href="#matlab-instructions-1"><span>MATLAB Instructions</span></a></h4>
<ol start="6">
<li>run <code v-pre>install_virmen</code> inside <code v-pre>C:\Experiments\ViRMEn</code></li>
</ol>
<ul>
<li>If compilation fails. Run <code v-pre>mex -setup c++</code> to select <strong>Visual Studio C++ Compiler</strong></li>
</ul>
<ol start="7">
<li>Open file <code v-pre>C:\Experiments\ViRMEn\RigParameters.m</code> and edit corresponding variables:</li>
</ol>
<ul>
<li><strong>rig:</strong> (RigName on the format: <code v-pre>Room#-&quot;Rig&quot;#-T</code>)</li>
<li><strong>rig_type:</strong> (<code v-pre>miniVR</code> or <code v-pre>NormalVR</code>)</li>
<li><strong>add NIDAQ Channles in corresponding variables</strong> (Ask lab manager about these parameters)</li>
<li><strong>Mini VR projection parameters</strong> (Ask lab manager about these parameters)</li>
</ul>
<ol start="8">
<li>run <code v-pre>lab.utils.add_behavior_rig(RigParameters.rig)</code>.</li>
<li>run <code v-pre>live_calibration</code> experiment  (Ask lab manager about this process).</li>
<li>Create a MATLAB shortcut and set <strong>Start in</strong> as  <code v-pre>C:\Experiments\ViRMEn</code>.</li>
<li>Add this shortcut to the Windows task bar in the bottom.</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/configure_systems/Matlab_shorcut.png'>
  <center><figcaption>MATLAB Shorcut example</figcaption></center>
 </figure>
<h3 id="behavior-data-backup-task-schedule" tabindex="-1"><a class="header-anchor" href="#behavior-data-backup-task-schedule"><span>Behavior data backup task schedule</span></a></h3>
<ol>
<li>On Windows type <strong>&quot;Task Scheduler&quot;</strong></li>
<li>Open <strong>Task Scheduler</strong> &quot;App&quot;</li>
<li>On right hand side menu, click on <strong>&quot;Create Task&quot;</strong> Action</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/configure_systems/Menu_task_scheduler.png'>
  <center><figcaption>Task scheduler menu</figcaption></center>
 </figure>
<ol start="4">
<li>Name new task as <strong>new_data_backup</strong></li>
</ol>
 <figure>
  <img src='@source/software/assets/images/configure_systems/General_tab_task_scheduler.png'>
  <center><figcaption>Task scheduler General Tab</figcaption></center>
 </figure>
<ol start="5">
<li>Add a trigger to run task daily at 11:00 pm</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/configure_systems/Trigger_tab_task_scheduler.png'>
  <center><figcaption>Task scheduler Trigger Tab</figcaption></center>
 </figure>
<ol start="6">
<li>Add an action: add this line to the Program/script edit: <code v-pre>C:\Experiments\U19-pipeline-matlab\scripts\cmd_copy_behavior_files</code></li>
</ol>
 <figure>
  <img src='@source/software/assets/images/configure_systems/Action_tab_task_scheduler.png'>
  <center><figcaption>Task scheduler Action Tab</figcaption></center>
 </figure>
<ol start="7">
<li>Hit <strong>OK</strong> button</li>
</ol>
<h2 id="configure-new-recording-system" tabindex="-1"><a class="header-anchor" href="#configure-new-recording-system"><span>Configure new recording system</span></a></h2>
<ul>
<li>First install all things necessary for appropiate recording modality. (Spike GLX for electrophysiology, ScanImage for imaging).</li>
</ul>
<ol>
<li>From Windows Explorer, select &quot;Map Network Drive&quot; and enter:</li>
</ol>
<ul>
<li><code v-pre>\\cup.pni.princeton.edu\braininit\</code> (for braininit)</li>
<li><code v-pre>\\cup.pni.princeton.edu\u19_dj\</code> (for u19_dj)</li>
</ul>
<ol start="2">
<li>Authenticate with your NetID and PU password (NOT your PNI password, which may be different). When prompted for your username, enter PRINCETON\netid (note that PRINCETON can be upper or lower case) where netid is your PU NetID.</li>
<li>Copy Automation GUI files: copy <code v-pre>\\cup.pni.princeton.edu\braininit\Shared\AutomationGUI_Installation\AutomationGUI_update</code> to the Desktop.</li>
<li>Run <code v-pre>Desktop\AutomationGUI_update\firstTimeAutomationGUI.BAT</code></li>
</ol>
<ul>
<li>Install git bash and anaconda from it.</li>
</ul>
 <figure>
  <img src='@source/software/assets/images/configure_systems/anaconda_add_PATH.png'>
  <center><figcaption>Anaconda avanced options step</figcaption></center>
 </figure>
<ul>
<li>On Anaconda advanced options step: check <strong>&quot;Add Anaconda3 to my PATH environment variable&quot;</strong> checkbox.</li>
</ul>
<ol start="5">
<li>Run <code v-pre>Desktop\AutomationGUI_update\update_AutomationGUI.BAT</code></li>
<li>Follow instructions to install Recording Automation GUI. (Also called Workflow Console GUI).</li>
</ol>
 <figure>
  <img src='@source/software/assets/images/configure_systems/recording_automation_GUI_installer.png'>
  <center><figcaption>Anaconda avanced options step</figcaption></center>
 </figure>
<h3 id="register-recording-system" tabindex="-1"><a class="header-anchor" href="#register-recording-system"><span>Register recording system</span></a></h3>
<ul>
<li>On a computer with access to the database (e.g. any Rig Computer).</li>
</ul>
<ol>
<li>Open MATLAB</li>
<li>Execute: <code v-pre>lab.utils.add_recording_system((recording_system_name), (modality))</code> where:</li>
</ol>
<ul>
<li><strong>recording_system_name:</strong> (on the format: <code v-pre>Room#-Recording</code>).</li>
<li><strong>modality:</strong> (one of the following: <code v-pre>electrophysiology, 2photon, 3photon, mesoscope</code>).</li>
</ul>
</div></template>


