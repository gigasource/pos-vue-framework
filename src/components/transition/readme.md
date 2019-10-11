animation: 2 types defined class
1: attention seekers:
    - bounce
    - flash
    - flip
    - heartBeat
    - jello
    - pulse
    - rubberBand
    - shake
    - swing
    - tada
    - wobble
    
  To use these classes: add with "animated" class to element
    Eg: <div class="animated rubberBand"></div>
    
   Another options for delay, duration & infinite defined in animation.scss
   
2: Classes for Vue transition:
    - bounce (Up, Down, Right, Left)
    - fade (Up, Down, Right, Left)
    - flip (X, Y)
    - roll
    - rotate (Up, Down, Right, Left)
    - scroll (X, X reverse, Y, Y reverse)
    - slide (X, X reverse, Y, Y reverse)
    - zoom (Up, Down, Right, Left)
    
  To use these class: add name to transition tag
    Eg: <transition name="bounceIn"></transition>
  
  This file provide @keyframe animation for other custom purpose

To use animation component: wrap the animation component outside 
  Eg: <g-bounce-up-animation>
        <g-button></g-button>
      </g-bounce-up-animation>
  
  The component define 5 props to modify: 
    - group: define <transition-group> tag
    - hideOnLeave: hide the transition on leave (default false)
    - leaveAbsolute: absolute positioning on leave stage (default false)
    - mode: mode of transition (in-out/out-in)
    - origin: transition origin