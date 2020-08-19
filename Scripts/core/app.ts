(function(){
    // Function scoped Variables
    let stage: createjs.Stage;
    let assets: createjs.LoadQueue;
    let slotMachineBackground: Core.GameObject;
    let spinButton: UIObjects.Button;
    let bet1Button: UIObjects.Button;
    let bet10Button: UIObjects.Button;
    let bet100Button: UIObjects.Button;
    let betMaxButton: UIObjects.Button;
    let jackPotLabel: UIObjects.Label;
    let creditLabel: UIObjects.Label;
    let winningsLabel: UIObjects.Label;
    let betLabel: UIObjects.Label;
    let leftReel: Core.GameObject;
    let middleReel: Core.GameObject;
    let rightReel: Core.GameObject;
    let betLine: Core.GameObject;

    let playerMoney: number = 1000;
    let winnings: number = 0;
    let jackpot: number = 5000;
    let turn = 0;
    let playerBet: number = 0;
    let winNumber = 0;
    let lossNumber = 0;
    let spinResult;
    let fruits = "";
    let winRatio = 0;
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;

    let manifest: Core.Item[] = [
        {id: "background", src: "./Assets/images/background.png"},
        {id: "banana", src: "./Assets/images/banana.gif"},
        {id: "bar", src: "./Assets/images/bar.gif"},
        {id: "bell", src: "./Assets/images/bell.gif"},
        {id: "bet_line", src: "./Assets/images/bet_line.gif"},
        {id: "bet1Button", src: "./Assets/images/bet1Button.png"},
        {id: "bet10Button", src: "./Assets/images/bet10Button.png"},
        {id: "bet100Button", src: "./Assets/images/bet100Button.png"},
        {id: "betMaxButton", src: "./Assets/images/betMaxButton.png"},
        {id: "blank", src: "./Assets/images/blank.gif"},
        {id: "cherry", src: "./Assets/images/cherry.gif"},
        {id: "grapes", src: "./Assets/images/grapes.gif"},
        {id: "orange", src: "./Assets/images/orange.gif"},
        {id: "seven", src: "./Assets/images/seven.gif"},
        {id: "spinButton", src: "./Assets/images/spinButton.png"},
    ];

    // This function triggers first and 'Preloads' all the assets
    function Preload()
    {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on('complete', Start);

        assets.loadManifest(manifest);
    }


    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start():void
    {
        console.log("App Started . . .");
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667ms
        createjs.Ticker.on('tick', Update);

        stage.enableMouseOver(20);

        Config.Globals.AssetManifest = assets;

        Main();
    }

    // called every frame
    function Update():void
    {
        stage.update();
    }

    function createProbability(): string[]
    {
        let blanks = Array<string>(27).fill('blank');
        let grapes = Array<string>(10).fill('grapes');
        let bananas = Array<string>(9).fill('banana');
        let oranges = Array<string>(8).fill('orange');
        let cherries = Array<string>(5).fill('cherry');
        let bars = Array<string>(3).fill('bar');
        let bells = Array<string>(2).fill('bell');
        let probabilities: string[] = [].concat(blanks, grapes, bananas, oranges, cherries, bars, bells, 'seven');
        return probabilities;
    }

    function spinReels(probabilityArray: string[]): string[]
    {
        let reels: string[] = ["", "", ""];
        for (let index = 0; index < 3; index++) 
        {
            reels[index] = probabilityArray[Math.floor(Math.random() * 64 + 1)];
            
        }
        console.log(reels);
        checkWinning(reels);
        
        return reels;
    }

    function disableButtons()
    {
        if(playerMoney < 100)
        {
            bet100Button.greyButton(true);

            if(playerMoney < 10)
            {
                bet10Button.greyButton(true);

                if(playerMoney < 1)
                {
                    bet1Button.greyButton(true);

                    if(playerMoney <= 0)
                    {
                        spinButton.greyButton(true);
                        betMaxButton.greyButton(true);
                        replenishPlayerMoney();
                    }
                }
            }
        }
        
    }

    function replenishPlayerMoney()
    {
        // Button is not changed to original color -- needed to be fixed
        window.alert("You don't have enough money. Do you want to play again?");
        playerMoney = 1000;
        creditLabel.setText(playerMoney.toString());
        bet100Button.greyButton(false);
        bet10Button.greyButton(false);
        bet1Button.greyButton(false);
        betMaxButton.greyButton(false);
        spinButton.greyButton(false);
    }

    function checkWinning(reels: string[])
    {
        winnings = 0;
        let duplicateNum = 0;
        let duplicatedValue = "";
        let multiplyNum = 0;
        
        if(reels[0] === reels[1])
        {
            duplicateNum++;
            duplicatedValue = reels[0];
        }
        if(reels[0] === reels[2])
        {
            duplicateNum++;
            duplicatedValue = reels[0];
        }
        if(reels[1] === reels[2] && duplicateNum <= 1)
        {
            duplicateNum++;
            duplicatedValue = reels[1];
        }

        if(duplicateNum >= 2)
        {
            switch (duplicatedValue) 
            {
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
                    multiplyNum = 0;
                    break;
            }
        }

        else if(duplicateNum === 1)
        {
            switch (duplicatedValue) 
            {
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
                    multiplyNum = 0;
                    break;
            }

            if(reels.indexOf('seven') > -1 && duplicatedValue !== 'seven')
            {
                winnings = playerBet * 5;
            }
        }
        else
        {
            if(reels.indexOf('seven') > -1)
            {
                winnings = playerBet * 5;
            }
        }

        winnings += playerBet * multiplyNum;

        playerMoney += winnings;

        creditLabel.setText(playerMoney.toString());

        winningsLabel.setText(winnings.toString());
    }

    function betMoney(betAmount: number): void
    {
        if(playerMoney >= betAmount)
        {
            playerMoney -= betAmount;
            playerBet += betAmount;
            betLabel.setText(playerBet.toString());
            creditLabel.setText(playerMoney.toString());
        }
    }

    function buildInterface(): void
    {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CERTER_Y, true );
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

        // Labels
        jackPotLabel = new UIObjects.Label('99999999', '20px', 'Consolas', '#FF0000', Config.Screen.CENTER_X, Config.Screen.CERTER_Y - 175, true);
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

    function interfaceLogic(): void
    {

        spinButton.on('click', () => {

            let probability: string[] = createProbability();
            // reel test
            let reels = spinReels(probability);

            if(playerBet > 0)
            {
                // example of how to replace the images in the reels
                leftReel.image = assets.getResult(reels[0]) as HTMLImageElement;
                middleReel.image = assets.getResult(reels[1]) as HTMLImageElement;
                rightReel.image = assets.getResult(reels[2]) as HTMLImageElement;
                playerBet = 0;
                betLabel.setText(playerBet.toString());
                disableButtons();
            }
        });

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
    function Main(): void
    {
        buildInterface();
        interfaceLogic();
    }

    


    window.addEventListener("load", Preload);
}());