---
title: Database Access
lang: en-US
---

# {{ $frontmatter.title }}

 ## First steps

 + Fill the next <a href="https://frevvo-prod.princeton.edu/frevvo/web/tn/pu.nplc/u/84fd5e8d-587a-4f6a-a802-0c3d2819e8fe/app/_sO14QHzSEemyQZ_M7RLPOg/formtype/_-XYdEEK2Eeqtf7JjRFmYDQ/popupform">Datajoint host access form</a> 
 + Clone repostiory:
    - For **Python**: <a href="https://github.com/BrainCOGS/U19-pipeline_python">https://github.com/BrainCOGS/U19-pipeline_python</a> 
    - For **MATLAB**: <a href="https://github.com/BrainCOGS/U19-pipeline-matlab">https://github.com/BrainCOGS/U19-pipeline-matlab</a> 

 ## Mount file server volumes

+ There are several data files (behavior, imaging & electrophysiology) that are referenced in the database

+ To access these files you should mount PNI file server volumes on your system.

+ There are three main file servers across PNI where data is stored (braininit, Bezos & u19_dj)

 ### On windows systems
 1. From Windows Explorer, select "Map Network Drive" and enter:
  + `\\cup.pni.princeton.edu\braininit\` (for braininit)
  + `\\cup.pni.princeton.edu\Bezos-center\` (for Bezos)
  + `\\cup.pni.princeton.edu\u19_dj\` (for u19_dj)
 2. Authenticate with your NetID and PU password (NOT your PNI password, which may be different). When prompted for your username, enter PRINCETON\netid (note that PRINCETON can be upper or lower case) where netid is your PU NetID.

 ### On OS X systems
  1. Select "Go->Connect to Server..." from Finder and enter:
   + `smb://cup.pni.princeton.edu/braininit/` (for braininit)
   + `smb://cup.pni.princeton.edu/Bezos-center/` (for Bezos)
   + `smb://cup.pni.princeton.edu/u19_dj/` (for u19_dj)
  2. Authenticate with your NetID and PU password (NOT your PNI password, which may be different).

 ### On Linux systems
  1. Follow extra steps depicted in this: <a href="https://npcdocs.princeton.edu/index.php/Mounting_the_PNI_file_server_on_your_desktop">link</a> 
 

 ## DB Access for Python repository

 ### Prerequisites
  
  <details>
    <summary>Click to expand details</summary>
  
  #### Install an integrated development environment

  + DataJoint development and use can be done with a plain text editor in the
      terminal. However, an integrated development environment (IDE) can improve your
      experience. Several IDEs are available.

  + In this setup example, we will use Microsoft's Visual Studio Code.
      [Installation instructions here.](https://code.visualstudio.com/download)

  + Install the Jupyter extension for VS Code.

  #### Install a virtual environment

  + A virtual environment allows you to install the packages required for a 
    specific project within an isolated environment on your computer.

  + It is highly recommended to create a virtual environment to run the workflow.

  + Conda and virtualenv are virtual environment managers and you can use either 
    option.  Below are the commands for Conda.

  + If you are setting up the pipeline on your local machine follow the instructions below for Conda.  If you are using `spock.pni.princeton.edu` or `scotty.pni.princeton.edu`, Conda is preinstalled and you can access it by running `module load anacondapy/2021.11`.

  + We will install Miniconda which is a minimal installer for conda.
  + Select the [Miniconda installer link](https://conda.io/en/latest/miniconda.html) for your operating system and follow the instructions.

      + You may need to add the Miniconda directory to the PATH environment 
      variable

        + First locate the Miniconda directory

        + Then modify and run the following command
          ```bash
          export PATH="<absolute-path-to-miniconda-directory>/bin:$PATH"
          ```

    + Create a new conda environment
      + Type the following command into a terminal window
        ```bash
        conda create -n <environment_name> python=<version>
        ```

      + Example command to create a conda environment
        ```bash
        conda create -n <environment_name> python=3.9
        ```

    + Activate the conda environment
      ```bash
      conda activate <environment_name>
      ```

    #### Other installs

    + **Git:** Linux and Mac operating systems have Git preinstalled. If running in Windows get [Git](https://gitforwindows.org/).
    + **Graphviz:** To display DataJoint Diagrams, [install graphviz](https://graphviz.org/download/).
    + Clone the <a href="https://github.com/BrainCOGS/U19-pipeline_python">U19-pipeline_python repository</a> 

  </details>

 ### First time configuration
        
 + The following instructions will configure DJ and connect to DB.
    
  ```bash
  conda activate <environment_name>
  cd U19-pipeline_python
  pip install -e .
  python initial_conf.py
  ```
  (Username and password will be prompted at this moment: Princeton NETiD & NetiD password usually works)
      
  + The `initial_conf.py`  script will store a local file with credtentials to access DB and configuration variables/filepaths.
  + Now that the virtual modules are created to access the tables in the database, you can query and fetch from the database.

 ### Connection after configuration
        
 + The following instructions will load DJ configuration and connect to DB
    
  ```bash
  conda activate <environment_name>
  python
  from scripts.conf_file_finding import try_find_conf_file
  try_find_conf_file()
  import datajoint as dj
  dj.conn()
  ```

 ## DB Access for MATLAB repository

 ### Prerequisites

  <details>
  <summary>Click to expand details</summary>

  + Install DataJoint for MATLAB 
  + Utilize MATLAB built-in GUI i.e. Top Ribbon -> Add-Ons -> Get Add-Ons
  + Search, select, and install DataJoint
  + Clone the <a href="https://github.com/BrainCOGS/U19-pipeline-matlab">U19-pipeline-matlab repository</a> 

  </details>

 ### First time configuration

  + Add this repository to MATLAB Path or cd to this repository folder.
  + Run ```dj_initial_conf(1)```
  + Insert user and password for the DB

  **Note** if you are configuring repository on a public computer, there are two options: 
   + Run```dj_initial_conf(0)``` instead, to not store user & pass in configuration file.
   + Run```dj_initial_conf(1)``` and login to the DB with a public user like u19tech.

 ### Connection after configuration

  + Add this repository to MATLAB Path or cd to this repository folder.
  + ```connect_datajoint00```


 ## DB Access for MATLAB repository (cluster computing)

 ### Prerequisites

  <details>
  <summary>Click to expand details</summary>

  + Clone the <a href="https://github.com/BrainCOGS/U19-pipeline-matlab">U19-pipeline-matlab repository</a> 
  + Create a directory on same location named ```datajoint_matlab_libs```
  + Change directory to ```datajoint_matlab_libs``` and clone the following repositories:
    + <a href="https://github.com/datajoint/datajoint-matlab.git">https://github.com/datajoint/datajoint-matlab.git</a>
    + <a href="https://github.com/datajoint/mym.git">https://github.com/datajoint/mym.git</a>
    + <a href="https://github.com/datajoint/GHToolbox.git">https://github.com/datajoint/GHToolbox.git</a>
    + <a href="https://github.com/guzman-raphael/compareVersions.git">https://github.com/guzman-raphael/compareVersions.git</a>
    
  </details>

 ### First time configuration

  + Add this repository to MATLAB Path
  + Run ```startup_virtual_machine.m```
  + Run ```dj_initial_conf(1)```
  + Insert user and password for the DB

  **Note** if you are configuring repository on a public computer, there are two options: 
  + Run```dj_initial_conf(0)``` instead, to not store user & pass in configuration file.
  + Run```dj_initial_conf(1)``` and login to the DB with a public user like u19tech.

 ### Connection after configuration

  + Add this repository to MATLAB Path
  + Run ```startup_virtual_machine.m```


## Add researcher to user table

  + This set of instructions only apply for users that will have subjects on his/her supervision:

  ### Add researcher to user table with MATLAB

  + Connect to DB
  + Run ```lab.utils.add_researcher_user_table('NETID', 'full name', 'email', 'phone')```
  + **Note:** (All data in function call should be written inside quotes)

  ### Add researcher to user table with PYTHON

  + Activate conda environment and start a python command line
  + ```import u19_pipeline.utils.insert_miscelaneous_db as imd```
    ```imd.add_researcher_user_table('NETID', 'full name', 'email', 'phone')```
  + **Note:** (All data in function call should be written inside quotes)
