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
  + Click Register Recording button.
  
  
  
  ### First time use configuration

   + Open the GUI
