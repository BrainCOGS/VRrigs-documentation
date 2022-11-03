---
title: Ephys/Imaging Automation Pipeline
lang: en-US
---

# {{ $frontmatter.title }}

 ## Automation GUI Manual

  + The automation GUI is located on the desktop in all microscope/ephys recording system across BRAINCoGS. You can identify it by a desktop BRAINCoGS icon called "Recording_Automation_GUI".
  + It is encouraged to register & process every recording with the Automation GUI just after recording has ended.

  ### Default use case

  + Open the GUI just after recording has ended.
  + Select the recording directory from dropdown list in section 1.
  + Check "Add surgery & insertion device if missing" checkbox if you want to add electrode/microscope/optic fiber insertion coordinates.
  + Select behavior session corresponding to recording from dropdown list in section 2.
  + Click Register Recording button.

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
  
  + Open the GUI just after recording has ended.
  + Select the recording directory from dropdown list in section 1.
  + Check "Add surgery & insertion device if missing" checkbox if you want to add electrode/microscope/optic fiber insertion coordinates.
  + Select behavior session corresponding to recording from dropdown list in section 2.
  + Uncheck "Use default processing parameters for recording?" checkbox
