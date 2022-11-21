---
title: Ephys/Imaging Automation Pipeline
lang: en-US
---

# {{ $frontmatter.title }}

 ## Automation GUI Manual

  + The automation GUI is located on the desktop in all microscope/ephys recording system across BRAINCoGS. You can identify it by a desktop BRAINCoGS icon called "Recording_Automation_GUI".
  + It is encouraged to register & process every recording with the Automation GUI just after recording has ended.

  ### Default use case

  1 Open the GUI just after recording has ended.
  2 Select the recording directory from dropdown list in section 1.
  3 Check "Add surgery & insertion device if missing" checkbox if you want to add electrode/microscope/optic fiber insertion coordinates.
  4 Select behavior session corresponding to recording from dropdown list in section 2.
  5 Click Register Recording button.

  <figure>
   <img src='./assets/images/automation_gui/Automation_GUI_main_screen.png'>
   <center><figcaption><small>Automation GUI main screen</small></figcaption></center>
  </figure>


   + If no surgery data is found for the subject, a small form to insert surgery and device insertion coordinates will be shown.

  <figure>
   <img src='./assets/images/automation_gui/Add_surgery_data.png'>
   <center><figcaption><small>Add surgery data form</small></figcaption></center>
  </figure>

   + Common coordinates for previous recordings:

  | **Area**         | ml(mm) | ap(mm) | depth(mm) | theta(°) | phi(°) | rho(°) |
  |-----------------:|-------:|-------:|----------:|---------:|-------:|-------:|
  | **mPFC L HEMIS** |   -0.6 |    1.8 |       3.8 |      -45 |     -9 |    180 |
  | **mPFC R HEMIS** |    0.6 |    1.8 |       3.8 |       45 |      9 |      0 |
  | **HPC  L HEMIS** |   -1.5 |      2 |       1.8 |      -45 |     -9 |    180 |
  | **HPC  R HEMIS** |    1.5 |      2 |       1.8 |       45 |      9 |      0 |

  + Wait until recording has been copied to PNI storage resources (cup).

  <figure>
   <img src='./assets/images/automation_gui/Copying_session_dialog.png'>
   <center><figcaption><small>Dialog shown while copying session</small></figcaption></center>
  </figure>

  #### Notes

   + This use case assumes that default parameters will be used to process the recording.

  ### "Advanced" (select parameters) use case
  
  1. Follow 1-4 from Default use case
  2. Uncheck "Use default processing parameters for recording?" checkbox
  3. Click "Select parameters >>>" button

  <figure>
   <img src='./assets/images/automation_gui/Select_parameters.png'>
   <center><figcaption><small></small>Parameter selection main screen</figcaption></center>
  </figure>

  4. On the "Select parameters" tab (assume that all probes/fovs are going to be processed with same parameters)
      1. Select a Preprocessing Param list from the dropdown in section 1.
        + You can check which preprocessing steps are defined for that list on the listbox to the right)
        + If you select a preprocessing step from the listbox you can check the specific parameters for that preprocessing step on the text area to the right.
      2. Select a Processing parameter from the dropdown in section 2.
        + If you select a processing parameter from the dropdown you can check the specific parameters for it on the text area to the right.
  5. Click Register Recording button.