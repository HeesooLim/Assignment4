(function(){
    // Function scoped Variables
    let stage: createjs.Stage;
    let helloLabel: createjs.Text;
    let clickMeButton: createjs.Bitmap;

    // config and initialization
    function Start():void
    {
        console.log("App Started . . .");
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667ms
        createjs.Ticker.on('tick', Update);

        stage.enableMouseOver(20);

        Main();
    }

    // called every frame
    function Update():void
    {
        // helloLabel.rotation -= 5;

        stage.update();
    }

    // app logic goes here
    function Main(): void
    {
        // label
        helloLabel = new createjs.Text('Holla, Mundo!', '60px Consolas', '#000000');
        helloLabel.regX = helloLabel.getMeasuredWidth() * 0.5;
        helloLabel.regY = helloLabel.getMeasuredHeight() * 0.5;
        
        
        helloLabel.x = 320;
        helloLabel.y = 240;

        stage.addChild(helloLabel);

        // button
        clickMeButton = new createjs.Bitmap("/Assets/images/ClickMeButton.png");
        clickMeButton.regX = clickMeButton.getBounds().width * 0.5;
        clickMeButton.regY = clickMeButton.getBounds().height * 0.5;
        
        clickMeButton.x = 320;
        clickMeButton.y = 340;
        
        stage.addChild(clickMeButton);

        clickMeButton.on("click", () => {
            if(helloLabel.text == "Adios, Mundo cruel!")
            {
                helloLabel.text = "Holla, Mundo!";
                helloLabel.regX = helloLabel.getBounds().width * 0.5;
                helloLabel.regY = helloLabel.getBounds().height * 0.5;           
            }
            else
            {
                helloLabel.text = "Adios, Mundo cruel!";
                helloLabel.regX = helloLabel.getBounds().width * 0.5;
                helloLabel.regY = helloLabel.getBounds().height * 0.5;           
            }
        });

        clickMeButton.on("mouseover", () =>{
            clickMeButton.alpha = 0.7; // 70% opaque
        });

        clickMeButton.on("mouseout", () =>{
            clickMeButton.alpha = 1.0; // 100% opaque
        });

    }


    window.addEventListener("load", Start);
}());