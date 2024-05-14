geofs.animation.values.fbwPitch = 0;
geofs.animation.values.fbwYaw = 0;
geofs.animation.values.fbwRoll = 0;
let lastRotation = geofs.animation.values.heading360;
let rotationInt = 0;
let rotationDelta = 0;
let pitchOutput = 0;
let rollOutput = 0;
let rollTarget = 0;
let pitchTarget = 0;
function getRotationDelta() {
    if (rotationInt == 5) {
        lastRotation = geofs.animation.values.heading360;
        rotationInt = 0;
    }
    else {
        rotationInt = rotationInt + 1;
    }
    if (rotationInt == 2) {
        rotationDelta = lastRotation - geofs.animation.values.heading360;
    }
}

function getPitchOutputs() {
    pitchTarget = 20 * -geofs.animation.values.pitch;
    pitchOutput = pitchTarget - geofs.animation.values.atilt;
}

function getRollOutputs() {
    rollTarget = 20 * -geofs.animation.values.roll;
    rollOutput = rollTarget - geofs.animation.values.aroll;
}


function assignFBWOutputs() {
    if ((rotationDelta) <= 0.25) {
        geofs.animation.values.fbwYaw = rotationDelta / 10 + geofs.animation.values.yaw;
    } else {
		geofs.animation.values.fbwYaw = geofs.animation.values.yaw;
	}
    geofs.animation.values.fbwPitch = -pitchOutput / 50;
    geofs.animation.values.fbwRoll = -rollOutput / 50;
}

geofs.aircraft.instance.parts.tailrotor.animations[2].value = "fbwYaw";
geofs.aircraft.instance.parts.cyclicLeft.animations[1].value = "fbwPitch";
geofs.aircraft.instance.parts.cyclicRight.animations[1].value = "fbwPitch";
geofs.aircraft.instance.parts.cyclicRotorNegative.animations[0].value = 'fbwPitch';
geofs.aircraft.instance.parts.cyclicRotorPositive.animations[0].value = 'fbwPitch';
geofs.aircraft.instance.parts.cyclicLeft.animations[0].value = "fbwRoll";
geofs.aircraft.instance.parts.cyclicRight.animations[0].value = "fbwRoll";
geofs.aircraft.instance.parts.cyclicRotorNegative.animations[1].value = 'fbwRoll';
geofs.aircraft.instance.parts.cyclicRotorPositive.animations[1].value = 'fbwRoll';

let mainInterval = setInterval(function () {
    getPitchOutputs();
    getRollOutputs()
    getRotationDelta();
    assignFBWOutputs();
})
