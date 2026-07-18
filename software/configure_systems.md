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
2. Authenticate with your NetID and PU password (NOT your PNI password, which may be different). When prompted for your username, enter PRINCETON\netid (note that PRINCETON can be upper or lower case), where netid is your PU NetID.

#### Install MATLAB 2020a or higher

#### Download and install NiDAQmx from <a href="ni.com/r/downloaddaqmx">National Instruments website </a>

#### Download and install Microsoft Visual Studio Community.
  1. Select a version compatible with the installed MATLAB version. This typically means the VS Community year should be older than the MATLAB year (e.g., VS Community 2022 for MATLAB R2024a).
  2. Be sure to install the "Desktop development with C++" option.

#### Install Git for Windows

1. Install from this <a href="https://git-for-windows.github.io/">link</a>
##### Installation options:
  + Use Git from the Windows Command Prompt (5th pane)
  + Checkout as-is, commit as-is (6th pane)

#### Create ssh key to clone repositories

1. Open Git Bash
2. `ssh-keygen -t ed25519 -C "vrrigsbi@princeton.edu"`
3. Leave the passphrase empty (hit Enter twice)
4. `eval "$(ssh-agent -s)"`
5. `ssh-add ~/.ssh/id_ed25519`

#### Add key to virmen user in github

1. Copy the ssh public key to the clipboard in Git Bash: `clip < ~/.ssh/id_ed25519.pub`
2. Open [github](https://github.com/login)
3. Log in with the vrrigs user (ask your Lab Manager for the password)

 <figure>
  <img src='./assets/images/configure_systems/vrrigs_login.png'>
  <center><figcaption>Vrrigs GitHub login</figcaption></center>
 </figure>

4. Go to Settings -> SSH and GPG Keys

 <figure>
  <img src='./assets/images/configure_systems/vrrigs_ssh_keys.png'>
  <center><figcaption>Vrrigs ssh keys section</figcaption></center>
 </figure>

5. Click the `New SSH Key` button
6. Add a meaningful title for the key and paste the public key from the clipboard into the "Key" text area.
7. Click the `Add SSH Key` button

#### Compiler

1. Install the Visual Studio C++ Compiler; make sure to select C++ support from the menu. <a href="https://visualstudio.microsoft.com/downloads/">https://visualstudio.microsoft.com/downloads/</a>
2. In MATLAB, run `mex -setup -v`. This sets up the compiler. It should output something like "Microsoft Visual C++ 202X".


### U19-pipeline-matlab Repository

1. Open Git Bash and execute: `cd /c/Experiments`
2. Clone the **U19-pipeline-matlab** repository: `git clone git@github.com:BrainCOGS/U19-pipeline-matlab.git`
#### MATLAB Instructions
3. Run ```dj_initial_conf(0)```
4. Enter the user and password for the DB

### Virmen Repository

1. Create the `C:\Experiments` directory
2. Open Git Bash and execute: `cd /c/Experiments`.
3. Execute `git config --global user.email "vrrigsbi@princeton.edu"`.
4. Clone the Virmen repository, called **ViRMEn**: `git clone git@github.com:BrainCOGS/ViRMEn.git`.
#### MATLAB Instructions
5. Open MATLAB as Administrator
6. Run `install_virmen` inside `C:\Experiments\ViRMEn`
 + If compilation fails, run `mex -setup c++` to select the **Visual Studio C++ Compiler**
7. Run:
 + `import_scheduled_tasks(1)` if this is a 165 room rig (or one mainly managed by techs)
 + `import_scheduled_tasks(0)` if this is an acquisition (ephys/imaging) rig or a rig managed by researchers
8. Open the file `C:\Experiments\ViRMEn\RigParameters.m` and edit the corresponding variables:
  + **rig:** (RigName in the format: `Room#-"Rig"#-T`)
  + **rig_type:** (`miniVR` or `NormalVR`)
  + **add NIDAQ Channels in corresponding variables** (ask your lab manager about these parameters)
  + **Mini VR projection parameters** (ask your lab manager about these parameters)
9. Run `lab.utils.add_behavior_rig(RigParameters.rig)`.
10. Run the `live_calibration` experiment (ask your lab manager about this process).
11. Create a MATLAB shortcut and set **Start in** to `C:\Experiments\ViRMEn`.
12. Add this shortcut to the Windows taskbar at the bottom.

 <figure>
  <img src='./assets/images/configure_systems/Matlab_shorcut.png'>
  <center><figcaption>MATLAB Shortcut example</figcaption></center>
 </figure>

### MATLAB Add-Ons
If not all toolboxes were installed during MATLAB installation, make sure these Add-Ons are added to MATLAB:

+ Image Acquisition Toolbox
+ Image Processing Toolbox
+ Image Acquisition Toolbox Support Package for GenlCam Interface
+ Image Acquisition Toolbox Support Package for OS Generic Video Interface
+ PsychToolbox
+ Statistics and Machine Learning Toolbox
+ Instrument Control Toolbox
+ Data Acquisition Toolbox
+ Zaber


## Modify the Sleep Behaviors
To prevent the screen from turning off while the subjects are training:
1. Under <a href="https://support.microsoft.com/en-us/windows/how-to-adjust-power-and-sleep-settings-in-windows-26f623b5-4fcc-4194-863d-b824e5ea7679"> ("Power & Sleep") </a> within Windows, set "Turn my screen off after" to the longest option possible.
2. Additionally, set "Make my device Sleep after" to the longest option possible.


## Configure new recording system

+ First, install everything necessary for the appropriate recording modality (SpikeGLX for electrophysiology, ScanImage for imaging).

1. From Windows Explorer, select "Map Network Drive" and enter:
  + `\\cup.pni.princeton.edu\braininit\` (for braininit)
  + `\\cup.pni.princeton.edu\u19_dj\` (for u19_dj)
2. Authenticate with your NetID and PU password (NOT your PNI password, which may be different). When prompted for your username, enter PRINCETON\netid (note that PRINCETON can be upper or lower case), where netid is your PU NetID.
3. Copy the Automation GUI files: copy `\\cup.pni.princeton.edu\braininit\Shared\AutomationGUI_Installation\AutomationGUI_update` to the Desktop.
4. Run `Desktop\AutomationGUI_update\firstTimeAutomationGUI.BAT`
  + Install Git Bash and Anaconda from it.

 <figure>
  <img src='./assets/images/configure_systems/anaconda_add_PATH.png'>
  <center><figcaption>Anaconda avanced options step</figcaption></center>
 </figure>


  + On the Anaconda advanced options step, check the **"Add Anaconda3 to my PATH environment variable"** checkbox.
5. Run `Desktop\AutomationGUI_update\update_AutomationGUI.BAT`
6. Follow the instructions to install the Recording Automation GUI (also called the Workflow Console GUI).

 <figure>
  <img src='./assets/images/configure_systems/recording_automation_GUI_installer.png'>
  <center><figcaption>Recording Automation GUI installer</figcaption></center>
 </figure>

### Register recording system

  + On a computer with access to the database (e.g., any Rig Computer):
  1. Open MATLAB
  2. Execute: `lab.utils.add_recording_system((recording_system_name), (modality))` where:
   + **recording_system_name:** (in the format: `Room#-Recording`).
   + **modality:** (one of the following: `electrophysiology, 2photon, 3photon, mesoscope`).
