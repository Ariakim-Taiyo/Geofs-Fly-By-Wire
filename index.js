geofs.animation.values.computedPitch = 0
geofs.animation.values.computedYaw = 0
geofs.animation.values.computedRoll = 0
let lastPitchValue = 0
let gLimitedPitch =  0
let increment = 0
let deadZone = 0.01
let tiltToHold = 0
let pitchStage1 = 0
function computePitch(){
//implement tilt hold
  if (geofs.animation.values.pitch <= deadZone && geofs.animation.values.pitch >= -deadZone){
if (geofs.animation.values.atilt >= tiltToHold){
  pitchStage1 = pitchStage1 + 0.01 * Math.abs(geofs.animation.values.atilt - tiltToHold)
}
  if (geofs.animation.values.atilt <= tiltToHold){
  pitchStage1 = pitchStage1 - 0.01 * Math.abs(geofs.animation.values.atilt - tiltToHold)
}
}
  else{
    tiltToHold = geofs.animation.values.atilt
    pitchStage1 = geofs.animation.values.pitch
  }
  geofs.animation.values.computedPitch = clamp(pitchStage1, -1, 1)
}

let maxBA = 50
let bankToHold = 0
let rollStage1 = 0

function computeRoll(){
    if (geofs.animation.values.roll <= deadZone && geofs.animation.values.roll >= -deadZone){
if (geofs.animation.values.aroll <= bankToHold){
  rollStage1 = rollStage1 - 0.001
}
  if (geofs.animation.values.aroll >= bankToHold){
  rollStage1 = rollStage1 + 0.001
}
    }
    else{
   rollStage1 =  geofs.animation.values.roll
  bankToHold = geofs.animation.values.aroll
    }
  geofs.animation.values.computedRoll = clamp(rollStage1, -1, 1)
}

geofs.aircraft.instance.parts.elevator_left.animations[0].value = "computedPitch"
geofs.aircraft.instance.parts.elevator_right.animations[0].value = "computedPitch"
geofs.aircraft.instance.parts.aileron_left.animations[0].value = "computedRoll"
geofs.aircraft.instance.parts.aileron_right.animations[0].value = "computedRoll"
setInterval(function(){
  computePitch();
    computeRoll();
}, 10)
  