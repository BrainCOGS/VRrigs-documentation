---
title: Stage
lang: en-US
---

# {{ $frontmatter.title }}

The stage holds a 3D printed cup where the optical flow sensor is placed at the bottom and a hose is connected to deliver a constant air flow to make a styrofoam ball float at the top. The mice is head fixed on top of the ball, allowing it to run, while the optical flow sensor update the virtual world projected on the screen.

The stage has 2 main components, a pair of optical breadboard that set the proper height of the styrofoam ball and hence the proper position of the mice regarding the virtual world; and the 3D printed cup that hold the optical flow sensor and redirects the air flow toward the bottom of the styrofoam ball to make it float.

<figure>
  <img src='./assets/images/stage/stage.png'>
  <center><figcaption><small>Stage assembly with 3D printed cup.</small></figcaption></center>
</figure>

## Cup with optical flow sensor

The cup has 2 main components, the cup itself that includes a circular arm through which a constant air flow will be introduced to the inner part and a connector that will transmit the power and data from the sensor to the arduino that is part of the control module of the training mini VR. The second main component is the bottom plate, that has attached the optical flow sensor, a mirror, and a LED printed circuit board (PCB).

<figure>
  <img src='./assets/images/stage/cup-with-optical-flow-sensor.png'>
  <center><figcaption><small>Cup with optical flow sensor.</small></figcaption></center>
</figure>

### Cup

We use a 3D printing external service to manufacture the cup, Nylon 12 works fine and ideally the top curved surface of the cup should be smooth (smoothing it manually with fine sandpaper does the work).

#### Cup assembly

1. Use a transparent epoxy to place a small ammount aroung the circular hole in the middle of the cup from the bottom up and place the 30 mm gorilla glass window, gently press the window making sure the epoxy covers the edges to avoid air leakage but making sure it doesn't spread into the middle of the mirror.

<figure>
  <img src='./assets/images/stage/cup-assembly-1.png'>
</figure>

<figure>
  <img src='./assets/images/stage/cup-assembly-2.png'>
</figure>

2. Cut the cables from the 8 pin connector to 4 inches and remove the tip of the plastic protective cover, place a female crimp pin in each cable one at the time and use the crimping tool following the instructions [here](https://www.pololu.com/product/1928).

    ::: tip
     The strain relief barrel sometimes ends up a little overly flattened, making it too wide to fit comfortably into the crimp pin housing. In such situations, you can use a pair of pliers to gently squeeze the wider axis of the barrel into a more cylindrical shape that will slide easily into the housing. This tip is taken directly from the [source](https://www.pololu.com/product/1928)
    :::

3. Insert each crimped cable into the housing with the correct position.

4. Insert the connector into the cup hole and screw.

## Parts list
1. Structural Adhesive, Epoxy, 3M 1838L, 4 FL. oz. Tube from [McMaster-Carr](https://www.mcmaster.com/75065A73/)
2. 30mm Diameter Uncoated, Gorilla Glass® Window from [Edmund Optics](https://www.edmundoptics.com/p/30mm-diameter-uncoated-gorilla-glassreg-window/26510/)
3. Connector - rear mount better
4. female crimp pins
5. Crimping tool

## Drawings