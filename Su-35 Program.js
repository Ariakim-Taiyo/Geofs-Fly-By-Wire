geofs.animation.values.computedPitch = 0
geofs.animation.values.computedYaw = 0
geofs.animation.values.computedRoll = 0
let lastPitchValue = 0
let gLimitedPitch =  0
let increment = 0
let deadZone = 0.01
let tiltToHold = 0
let pitchStage1 = 0
let lastRoll = 0
let RollRate = 0
let lastYaw = 0
let YawRate = 0
let holdBank = 0
function computePitch(){
geofs.animation.values.computedPitch = (geofs.animation.values.pitch / 1.5) * (Math.exp(-(0.005 * (geofs.animation.values.ktas / 10) - 0.75), 2)) - (geofs.animation.values.accZ / geofs.animation.values.ktas / 2) + (geofs.animation.values.roll / 10)

//geofs.animation.values.computedPitch = clamp((-geofs.animation.values.aoa * clamp(geofs.animation.values.kias/10, 0, 1) + (geofs.animation.values.pitch)), -1, 1)
}
function computeRoll(){
  geofs.animation.values.computedRoll = clamp(geofs.animation.values.roll + (RollRate/(70+(250*Math.abs(geofs.animation.values.roll)))), -1, 1)
}
function computeYaw(){
  geofs.animation.values.computedYaw = geofs.animation.values.yaw 
}

function getRollRate(){
  if (geofs.animation.values.roll <= -deadZone || geofs.animation.values.roll >= deadZone){
    holdBank = geofs.animation.values.aroll / 11
  }
  RollRate = -(geofs.animation.values.aroll - lastRoll  * 1.1) - holdBank
  lastRoll = geofs.animation.values.aroll
}
function getYawRate(){
  YawRate = geofs.animation.values.yaw - lastYaw * 100
  lastYaw = geofs.animation.values.yaw
}

geofs.aircraft.instance.parts.elevatorleft.animations[0].value = "computedPitch"
geofs.aircraft.instance.parts.elevatorright.animations[0].value = "computedPitch"
geofs.aircraft.instance.parts.elevatorleft.animations[1].value = "computedRoll"
geofs.aircraft.instance.parts.elevatorright.animations[1].value = "computedRoll"
geofs.aircraft.instance.parts.leftEngine.animations[0].value = "computedPitch"
geofs.aircraft.instance.parts.rightEngine.animations[0].value = "computedPitch"
geofs.aircraft.instance.parts.leftAileron.animations[0].value = "computedRoll"
geofs.aircraft.instance.parts.rightAileron.animations[0].value = "computedRoll"
geofs.aircraft.instance.parts.rudderleft.animations[0].value = "computedYaw"
geofs.aircraft.instance.parts.rudderright.animations[0].value = "computedYaw"
setInterval(function(){
  computePitch();
    computeRoll();
  computeYaw()
  getRollRate()
    getYawRate()
}, 10)

  