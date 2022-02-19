# Haven_Engine
`Version a3.0` (Alpha 3.0)

*A 2d-based game engine intended for absolute beginners.*

***TODO:***
- [ ] Import core functions from version `a2.0`.
  - [ ] Extract minified HTML page for the canvas to display on.
    - [ ] Import files allowing Replit to run the project for testing.
  - [ ] Import canvas graphical library.
    - [ ] Impliment more complex shapes for debug and development purposes.
  - [ ] Math script library.
    - [ ] Convert line trace to work outside of Khan.
  - [ ] Import camera system, but do not include screenshot/recording festures.
- [ ] Create new collision system based on `a2.0`'s, but instead of the previous step-based system, simplify using line traces-- this allows for line-based collision without too much further development needed, which is turn allows for complex and even convex shapes. This is a trade off however since each face on a collision mass will require more processing. (better method possible?)
  - [ ] Correct collision errors by correcting a players position if they are found to be overlapping a colliding object.
  - [ ] Allow for a more percice collision using the step-based method to prevent the player from falling though objects that are too small to be detected by line traces.
  - [ ] Enable a multi collision system in which the collision method used will change depending on the size of the object, preventing the player from falling through thin or small objects.
- [ ] Produce shaders (lighting systems) to improve the look and feel of games made with the engine.
  = [ ] Overlay shaders (built), a simple overlay image with bloom around lights, darkness not around lights. Light is not blocked by walls, and will simply pass through it.
  - [ ] Simple shaders (real-time), bloom around lights, darkness not around lights. Light is not blocked by walls, and will simply pass through it.
  - [ ] Pixel shader (real-time), Bloom and shadows blocked by walls in a grid-based system, causing light to spill slightly around corners, similar to Minecraft's lighting system, but 2d-- meaning you can add infinite lights without effecting processing significantly.
  - [ ] Built Traced shader (built), light consists of rays cast out from a light source, only objects with line of seight to the light source are lit. (light rays pass through objects marked as 'transparent')
  - [ ] Traced shader (real-time), light consists of rays cast out from a light source, only objects with line of seight to the light source are lit. (light rays pass through objects marked as 'transparent')
  - [ ] Built raytraced shader (built), Light again consists of rays, however light is reflected (until it looses power) when it hits a wall reflecting the wall's color onto nearby objects, and illuminating objects that may not otherwise be visble.
  - [ ] Raytraced shader (real-time), Light consists of rays, however light is reflected (a specific ammount of times) when it hits a wall reflecting the wall's color onto nearby objects, and illuminating objects that may not otherwise be visble
- [ ] Produce post-processing.
  - [ ] Antialising, while likely not needed-- should be avalible.
  - [ ] Pixelise, Blur, Tint, Invert, desaturate, saturate, brighten, darken, contrast, baseline filters.
  - [ ] Posterise (reduce the number of colors in an image)
  - [ ] Edge-detect, can be used to make outlines on objects.