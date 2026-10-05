---
title: Database Access
lang: en-US
---

# {{ $frontmatter.title }}

## First steps

+ Fill out the <a href="https://frevvo-prod.princeton.edu/frevvo/web/tn/pu.nplc/u/5a6d697c-0163-4307-b751-fcc0742900a9/app/_sO14QHzSEemyQZ_M7RLPOg/formtype/_-XYdEEK2Eeqtf7JjRFmYDQ/popupform">DataJoint host access form</a>.
+ Fill out the <a href="https://frevvo-prod.princeton.edu/frevvo/web/tn/pu.nplc/u/5a6d697c-0163-4307-b751-fcc0742900a9/app/_sO14QHzSEemyQZ_M7RLPOg/formtype/_b4L9oHz4EemyQZ_M7RLPOg/popupform">PNI account form</a>.
+ Clone the repository:
   - For **Python**: <a href="https://github.com/BrainCOGS/U19-pipeline-python">https://github.com/BrainCOGS/U19-pipeline-python</a>
   - For **MATLAB**: <a href="https://github.com/BrainCOGS/U19-pipeline-matlab">https://github.com/BrainCOGS/U19-pipeline-matlab</a>

## Mount file server volumes

+ The database references many data files (behavior, imaging and electrophysiology).

+ To access these files, mount the PNI file server volumes on your system.

+ Data is stored on three main PNI file server volumes (braininit, Bezos and u19_dj).

### On Windows {#on-windows-systems}
1. From Windows Explorer, select "Map Network Drive" and enter:
 + `\\cup.pni.princeton.edu\braininit\` (for braininit)
 + `\\cup.pni.princeton.edu\Bezos-center\` (for Bezos)
 + `\\cup.pni.princeton.edu\u19_dj\` (for u19_dj)
2. Authenticate with your NetID and PU password (NOT your PNI password, which may be different). When prompted for your username, enter `PRINCETON\netid` (PRINCETON can be upper or lower case), where `netid` is your PU NetID.

### On macOS {#on-os-x-systems}
1. In Finder, select "Go -> Connect to Server..." and enter:
 + `smb://cup.pni.princeton.edu/braininit/` (for braininit)
 + `smb://cup.pni.princeton.edu/Bezos-center/` (for Bezos)
 + `smb://cup.pni.princeton.edu/u19_dj/` (for u19_dj)
2. Authenticate with your NetID and PU password (NOT your PNI password, which may be different).

### On Linux {#on-linux-systems}
1. Follow the extra steps described in this <a href="https://npcdocs.princeton.edu/index.php/Mounting_the_PNI_file_server_on_your_desktop">link</a>.


## DB access for Python repository {#db-access-for-python-repository}

### Prerequisites

  <details>
    <summary>Click to expand details</summary>

  #### Install an integrated development environment

  + You can develop with and use DataJoint from a plain text editor in the
      terminal, but an integrated development environment (IDE) can improve your
      experience. Several IDEs are available.

  + In this setup example, we will use Microsoft's Visual Studio Code.
      [Installation instructions here.](https://code.visualstudio.com/download)

  + Install the Jupyter extension for VS Code.

  #### Install a virtual environment

  + A virtual environment lets you install the packages required for a
    specific project within an isolated environment on your computer.

  + We highly recommend creating a virtual environment to run the workflow.

  + Conda and virtualenv are both virtual environment managers; you can use either.
    Below are the commands for Conda.

  + If you are setting up the pipeline on your local machine, follow the Conda instructions below. On `spock.pni.princeton.edu` or `scotty.pni.princeton.edu`, Conda is preinstalled; load it with `module load anacondapy/2021.11`.

  + We will install Miniconda, a minimal installer for Conda.
  + Select the [Miniconda installer link](https://conda.io/en/latest/miniconda.html) for your operating system and follow the instructions.

      + You may need to add the Miniconda directory to the PATH environment
      variable:

        + First, locate the Miniconda directory.

        + Then edit and run the following command:
          ```bash
          export PATH="<absolute-path-to-miniconda-directory>/bin:$PATH"
          ```

    + Create a new Conda environment:
      + Type the following command into a terminal window:
        ```bash
        conda create -n <environment_name> python=<version>
        ```

      + For example:
        ```bash
        conda create -n <environment_name> python=3.9
        ```

    + Activate the Conda environment:
      ```bash
      conda activate <environment_name>
      ```

    #### Other installs

    + **Git:** Linux and Mac operating systems have Git preinstalled. If running on Windows, get [Git](https://gitforwindows.org/).
    + **Graphviz:** To display DataJoint diagrams, [install Graphviz](https://graphviz.org/download/).
    + Clone the <a href="https://github.com/BrainCOGS/U19-pipeline-python">U19-pipeline-python repository</a>.

  </details>

### First-time configuration {#first-time-configuration}

+ The following commands configure DataJoint and connect to the DB.

  ```bash
  conda activate <environment_name>
  cd U19-pipeline-python
  pip install -e .
  python initial_conf.py
  ```
  (You will be prompted for a username and password; your Princeton NetID and NetID password usually work.)

  + The `initial_conf.py` script stores a local file with the DB credentials and configuration variables/file paths.
  + Once the virtual modules for the database tables are created, you can query and fetch from the database.

### Connection after configuration

+ The following commands load the DataJoint configuration and connect to the DB. In a terminal:

  ```bash
  conda activate <environment_name>
  python
  ```

  Then, in Python:

  ```python
  from scripts.conf_file_finding import try_find_conf_file
  try_find_conf_file()
  import datajoint as dj
  dj.conn()
  ```

## DB access for MATLAB repository {#db-access-for-matlab-repository}

### Prerequisites

  <details>
  <summary>Click to expand details</summary>

  + Install DataJoint for MATLAB:
     + Use MATLAB's built-in Add-On Explorer (top ribbon -> Add-Ons -> Get Add-Ons).
     + Search for, select and install DataJoint.
  + Clone the <a href="https://github.com/BrainCOGS/U19-pipeline-matlab">U19-pipeline-matlab repository</a>.

  </details>

### First-time configuration {#first-time-configuration-1}

  + Add this repository to the MATLAB path, or cd to the repository folder.
  + Run `dj_initial_conf(1)`.
  + Enter the DB user name and password.

  **Note:** if you are configuring the repository on a shared computer, there are two options:
   + Run `dj_initial_conf(0)` instead, so the user name and password are not stored in the configuration file.
   + Run `dj_initial_conf(1)` and log in to the DB with a shared user such as u19tech.

### Connection after configuration {#connection-after-configuration-1}

  + Add this repository to the MATLAB path, or cd to the repository folder.
  + Run `connect_datajoint00`.


## DB access for MATLAB repository (cluster computing) {#db-access-for-matlab-repository-cluster-computing}

### Prerequisites

  <details>
  <summary>Click to expand details</summary>

  + Clone the <a href="https://github.com/BrainCOGS/U19-pipeline-matlab">U19-pipeline-matlab repository</a>.
  + Next to it, create a directory named `datajoint_matlab_libs`.
  + Change to `datajoint_matlab_libs` and clone the following repositories:
    + <a href="https://github.com/datajoint/datajoint-matlab.git">https://github.com/datajoint/datajoint-matlab.git</a>
    + <a href="https://github.com/datajoint/mym.git">https://github.com/datajoint/mym.git</a>
    + <a href="https://github.com/datajoint/GHToolbox.git">https://github.com/datajoint/GHToolbox.git</a>
    + <a href="https://github.com/guzman-raphael/compareVersions.git">https://github.com/guzman-raphael/compareVersions.git</a>

  </details>

### First-time configuration {#first-time-configuration-2}

  + Add this repository to the MATLAB path.
  + Run `startup_virtual_machine.m`.
  + Run `dj_initial_conf(1)`.
  + Enter the DB user name and password.

  **Note:** if you are configuring the repository on a shared computer, there are two options:
  + Run `dj_initial_conf(0)` instead, so the user name and password are not stored in the configuration file.
  + Run `dj_initial_conf(1)` and log in to the DB with a shared user such as u19tech.

### Connection after configuration {#connection-after-configuration-2}

  + Add this repository to the MATLAB path.
  + Run `startup_virtual_machine.m`.


## Add a researcher to the user table {#add-researcher-to-user-table}

  + These instructions only apply to users who will have subjects under their supervision.

  ### With MATLAB {#add-researcher-to-user-table-with-matlab}

  + Connect to the DB.
  + Run `lab.utils.add_researcher_user_table('NETID', 'full name', 'email', 'phone')`.
  + **Note:** all arguments must be quoted strings.

  ### With Python {#add-researcher-to-user-table-with-python}

  + Activate the Conda environment and start a Python shell.
  + Run:
    ```python
    import u19_pipeline.utils.insert_miscellaneous_db as imd
    imd.add_researcher_user_table('NETID', 'full name', 'email', 'phone')
    ```
  + **Note:** all arguments must be quoted strings.
