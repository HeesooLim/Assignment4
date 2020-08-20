(function () {
    // Function scoped Variables
    let stage;
    let assets;
    let slotMachineBackground;
    let spinButton;
    let bet1Button;
    let bet10Button;
    let bet100Button;
    let betMaxButton;
    let replenishButton;
    let stopPlayButton;
    let jackPotLabel;
    let creditLabel;
    let winningsLabel;
    let betLabel;
    let leftReel;
    let middleReel;
    let rightReel;
    let betLine;
    let playerMoney = 1000;
    let winnings = 0;
    let jackpot = 0;
    let playerBet = 0;
    let manifest = [
        { id: "background", src: "./Assets/images/background.png" },
        { id: "banana", src: "./Assets/images/banana.gif" },
        { id: "bar", src: "./Assets/images/bar.gif" },
        { id: "bell", src: "./Assets/images/bell.gif" },
        { id: "bet_line", src: "./Assets/images/bet_line.gif" },
        { id: "bet1Button", src: "./Assets/images/bet1Button.png" },
        { id: "bet10Button", src: "./Assets/images/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/images/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/images/betMaxButton.png" },
        { id: "blank", src: "./Assets/images/blank.gif" },
        { id: "cherry", src: "./Assets/images/cherry.gif" },
        { id: "grapes", src: "./Assets/images/grapes.gif" },
        { id: "orange", src: "./Assets/images/orange.gif" },
        { id: "seven", src: "./Assets/images/seven.gif" },
        { id: "spinButton", src: "./Assets/images/spinButton.png" },
        { id: "replenishButton", src: "./Assets/images/replenishButton.png" },
        { id: "stopPlayButton", src: "./Assets/images/StopPlayButton.png" }
    ];
    // This function triggers first and 'Preloads' all the assets
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on('complete', Start);
        assets.loadManifest(manifest);
    }
    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started . . .");
        let canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667ms
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Config.Globals.AssetManifest = assets;
        Main();
    }
    // called every frame
    function Update() {
        stage.update();
    }
    // create an array of symbols and return the probability array
    function createProbability() {
        let blanks = Array(27).fill('blank');
        let grapes = Array(10).fill('grapes');
        let bananas = Array(9).fill('banana');
        let oranges = Array(8).fill('orange');
        let cherries = Array(5).fill('cherry');
        let bars = Array(3).fill('bar');
        let bells = Array(2).fill('bell');
        let probabilities = [].concat(blanks, grapes, bananas, oranges, cherries, bars, bells, 'seven');
        return probabilities;
    }
    // return a reels array
    function spinReels(probabilityArray) {
        let reels = ["", "", ""];
        for (let index = 0; index < 3; index++) {
            reels[index] = probabilityArray[Math.floor(Math.random() * 64 + 1)];
        }
        checkWinning(reels);
        return reels;
    }
    function checkWinning(reels) {
        winnings = 0;
        let duplicateNum = 0;
        let duplicatedSymbol = "";
        let multiplyNum = 0;
        // compare symbols in the reels
        if (reels[0] === reels[1]) {
            duplicateNum++;
            duplicatedSymbol = reels[0];
        }
        if (reels[0] === reels[2]) {
            duplicateNum++;
            duplicatedSymbol = reels[0];
        }
        if (reels[1] === reels[2] && duplicateNum <= 1) {
            duplicateNum++;
            duplicatedSymbol = reels[1];
        }
        // if there is a blank, winnings is 0
        if (reels.indexOf('blank') > -1) {
            winnings = 0;
        }
        else {
            // 3 same symbols
            if (duplicateNum >= 2) {
                switch (duplicatedSymbol) {
                    case 'grapes':
                        multiplyNum = 10;
                        break;
                    case 'banana':
                        multiplyNum = 20;
                        break;
                    case 'orange':
                        multiplyNum = 30;
                        break;
                    case 'cherry':
                        multiplyNum = 40;
                        break;
                    case 'bar':
                        multiplyNum = 50;
                        break;
                    case 'bell':
                        multiplyNum = 75;
                        break;
                    case 'seven':
                        multiplyNum = 100;
                        break;
                    default:
                        multiplyNum = 1;
                        break;
                }
            }
            // 2 same symbols
            else if (duplicateNum === 1) {
                switch (duplicatedSymbol) {
                    case 'grapes':
                        multiplyNum = 2;
                        break;
                    case 'banana':
                        multiplyNum = 2;
                        break;
                    case 'orange':
                        multiplyNum = 3;
                        break;
                    case 'cherry':
                        multiplyNum = 4;
                        break;
                    case 'bar':
                        multiplyNum = 5;
                        break;
                    case 'bell':
                        multiplyNum = 10;
                        break;
                    case 'seven':
                        multiplyNum = 20;
                        break;
                    default:
                        multiplyNum = 1;
                        break;
                }
                // 2 same symbols && 1 seven
                if (reels.indexOf('seven') > -1 && duplicatedSymbol !== 'seven') {
                    winnings = playerBet * 5;
                }
            }
            else {
                // 1 seven with different symbol
                if (reels.indexOf('seven') > -1) {
                    winnings = playerBet * 5;
                }
                // different symbols without blanks
                else {
                    winnings = playerBet;
                }
            }
        }
        winnings += playerBet * multiplyNum;
        playerMoney += winnings;
        creditLabel.setText(playerMoney.toString());
        // Special message for the player wins the jackpot
        if (winnings === jackpot) {
            winningsLabel.setText("JP" + winnings.toString());
        }
        else {
            winningsLabel.setText(winnings.toString());
        }
    }
    function buttonCheck() {
        enableButton(true);
        // according to the player's money, button is disabled
        if (playerMoney < 100) {
            bet100Button.greyButton(true);
            if (playerMoney < 10) {
                bet10Button.greyButton(true);
                if (playerMoney < 1) {
                    bet1Button.greyButton(true);
                    spinButton.greyButton(true);
                    betMaxButton.greyButton(true);
                    replenishButton.greyButton(false);
                }
            }
        }
    }
    function enableButton(isEnabled) {
        bet100Button.greyButton(!isEnabled);
        bet10Button.greyButton(!isEnabled);
        bet1Button.greyButton(!isEnabled);
        betMaxButton.greyButton(!isEnabled);
        spinButton.greyButton(!isEnabled);
        replenishButton.greyButton(true);
    }
    function stopGame() {
        enableButton(false);
        leftReel.image = assets.getResult('blank');
        middleReel.image = assets.getResult('blank');
        rightReel.image = assets.getResult('blank');
    }
    function resumeGame() {
        enableButton(true);
        if (playerMoney <= 0) {
            replenishButton.greyButton(false);
        }
    }
    function betMoney(betAmount) {
        if (playerMoney >= betAmount) {
            // calculate player's current money, betting money, jackpot money
            playerMoney -= betAmount;
            playerBet += betAmount;
            jackpot += betAmount * 100;
            betLabel.setText(playerBet.toString());
            creditLabel.setText(playerMoney.toString());
            jackPotLabel.setText(jackpot.toString());
            // when the player bet money, spin button is enabled
            spinButton.greyButton(false);
        }
    }
    function buildInterface() {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CERTER_Y, true);
        stage.addChild(slotMachineBackground);
        // Buttons
        spinButton = new UIObjects.Button('spinButton', Config.Screen.CENTER_X + 135, Config.Screen.CERTER_Y + 176, true);
        stage.addChild(spinButton);
        bet1Button = new UIObjects.Button('bet1Button', Config.Screen.CENTER_X - 135, Config.Screen.CERTER_Y + 176, true);
        stage.addChild(bet1Button);
        bet10Button = new UIObjects.Button('bet10Button', Config.Screen.CENTER_X - 67, Config.Screen.CERTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet100Button = new UIObjects.Button('bet100Button', Config.Screen.CENTER_X, Config.Screen.CERTER_Y + 176, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIObjects.Button('betMaxButton', Config.Screen.CENTER_X + 68, Config.Screen.CERTER_Y + 176, true);
        stage.addChild(betMaxButton);
        replenishButton = new UIObjects.Button('replenishButton', 65, 100, true);
        stage.addChild(replenishButton);
        stopPlayButton = new UIObjects.Button('stopPlayButton', 65, 40, true);
        stage.addChild(stopPlayButton);
        // Labels
        jackPotLabel = new UIObjects.Label(jackpot.toString(), '20px', 'Consolas', '#FF0000', Config.Screen.CENTER_X, Config.Screen.CERTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        creditLabel = new UIObjects.Label(playerMoney.toString(), '20px', 'Consolas', '#FF0000', Config.Screen.CENTER_X - 95, Config.Screen.CERTER_Y + 107, true);
        stage.addChild(creditLabel);
        winningsLabel = new UIObjects.Label(winnings.toString(), '20px', 'Consolas', '#FF0000', Config.Screen.CENTER_X + 94, Config.Screen.CERTER_Y + 107, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label(playerBet.toString(), '20px', 'Consolas', '#FF0000', Config.Screen.CENTER_X, Config.Screen.CERTER_Y + 107, true);
        stage.addChild(betLabel);
        // Reel GameObjects
        leftReel = new Core.GameObject('bell', Config.Screen.CENTER_X - 79, Config.Screen.CERTER_Y - 12, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject('bar', Config.Screen.CENTER_X, Config.Screen.CERTER_Y - 12, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject('banana', Config.Screen.CENTER_X + 78, Config.Screen.CERTER_Y - 12, true);
        stage.addChild(rightReel);
        // Bet Line
        betLine = new Core.GameObject('bet_line', Config.Screen.CENTER_X, Config.Screen.CERTER_Y - 11, true);
        stage.addChild(betLine);
    }
    function interfaceLogic() {
        let isGameStopped = false;
        stopPlayButton.on('click', () => {
            isGameStopped = !isGameStopped;
            if (isGameStopped) {
                stopGame();
            }
            else {
                resumeGame();
            }
        });
        replenishButton.on('click', () => {
            // if the player runs out of money
            if (playerMoney <= 0 && playerBet <= 0) {
                playerMoney = 1000;
                creditLabel.setText(playerMoney.toString());
                enableButton(true);
            }
        });
        // by default, spin button and replenish button are disabled
        spinButton.greyButton(true);
        replenishButton.greyButton(true);
        spinButton.on('click', () => {
            if (playerBet > 0) {
                let probability = createProbability();
                // reel test
                let reels = spinReels(probability);
                // replace the images in the reels
                leftReel.image = assets.getResult(reels[0]);
                middleReel.image = assets.getResult(reels[1]);
                rightReel.image = assets.getResult(reels[2]);
                playerBet = 0;
                betLabel.setText(playerBet.toString());
                jackpot = 0;
                jackPotLabel.setText(jackpot.toString());
                buttonCheck();
                spinButton.greyButton(true);
            }
        });
        // if the user bet money, spin button is enabled
        bet1Button.on('click', () => {
            betMoney(1);
        });
        bet10Button.on('click', () => {
            betMoney(10);
        });
        bet100Button.on('click', () => {
            betMoney(100);
        });
        betMaxButton.on('click', () => {
            betMoney(playerMoney);
        });
    }
    // app logic goes here
    function Main() {
        buildInterface();
        interfaceLogic();
    }
    window.addEventListener("load", Preload);
}());
//# sourceMappingURL=app.js.map