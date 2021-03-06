function spinCoin () {
    basic.clearScreen()
    basic.showLeds(`
        . . # . .
        . # . # .
        . # . # .
        . # . # .
        . . # . .
        `)
    basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        `)
}
// Press for details like ID and money
input.onButtonPressed(Button.A, function () {
    if (mode == 0) {
        led.stopAnimation()
        basic.showString("ID: " + blockchain.id())
        basic.showString("MONEY: " + (blockchain.length() - transactedCoins))
        basic.showString("ACCOUNT NO: " + personalTransactGroup)
    }
})
function spinCoinEnd () {
    basic.showLeds(`
        . . # . .
        . # . # .
        . # . # .
        . # . # .
        . . # . .
        `)
    basic.showLeds(`
        . . . . .
        . . # . .
        . # . # .
        . # . # .
        . # . # .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . # . .
        . # . # .
        `)
    basic.clearScreen()
}
// Press for details like ID and money
input.onButtonPressed(Button.B, function () {
    if (mode == 0) {
        led.stopAnimation()
        basic.clearScreen()
        transactToGroup = 0
        mode = 1
        while (!(input.buttonIsPressed(Button.AB))) {
            basic.showNumber(transactToGroup)
            if (input.buttonIsPressed(Button.A)) {
                if (!(transactToGroup == 0)) {
                    transactToGroup += -1
                }
            }
            if (input.buttonIsPressed(Button.B)) {
                if (!(transactToGroup == 255)) {
                    transactToGroup += 1
                }
            }
        }
        mode = 0
        if (blockchain.length() - transactedCoins == 0) {
            basic.showIcon(IconNames.Sad)
            basic.pause(1000)
            basic.clearScreen()
        } else {
            radio.sendValue("transaction", transactToGroup)
            transactedCoins += 1
        }
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "transaction") {
        if (value == personalTransactGroup) {
            led.stopAnimation()
            basic.clearScreen()
            basic.showString("You got a coin!")
            blockchain.addBlock(2)
        }
    }
})
// Mining collectively
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    led.stopAnimation()
    if (randint(0, 3) == 0) {
        blockchain.addBlock(1)
        for (let index = 0; index < 2; index++) {
            spinCoin()
        }
        spinCoinEnd()
    } else {
        basic.showIcon(IconNames.Asleep)
        basic.pause(100)
        basic.clearScreen()
    }
})
let transactToGroup = 0
let personalTransactGroup = 0
let transactedCoins = 0
let mode = 0
mode = 0
transactedCoins = 0
personalTransactGroup = randint(0, 255)
radio.setGroup(167)
basic.showString("A=DETAILS B=TRADE LOGO=MINE")
