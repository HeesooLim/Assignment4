module UIObjects
{
    /*
      Author: Heesoo Lim
      Date: August 20, 2020
      File Name: button.ts
      Website Name: Slot Machine
      File Description: button object in slot machine game page
   */

    export class Button extends Core.GameObject
    {
        // PRIVATE FIELDS (CLASS MEMBERS)

        // PUBLIC PROPERTIES

        // CONSTRUCTOR(S)

        constructor(bitmap_asset: string, x: number = 0, y: number = 0, isCentered: boolean = false)
        {
            super(bitmap_asset, x, y, isCentered)

            this.isCentered = isCentered;

            // mouse events
            this.on("mouseover", this.m_mouseOver);
    
            this.on("mouseout", this.m_mouseOut);
        }

        private m_mouseOver(): void
        {
            this.alpha = 0.7; // 70% opaque
        }

        private m_mouseOut(): void
        {
            this.alpha = 1.0; // 100% opaque
        }

        // PUBLIC METHOD(S)

        // change mouse enabled status and add a color filter
        public greyButton(isGrey: boolean): void
        {
            if(isGrey)
            {
                this.filters = [ new createjs.ColorFilter(0.5,0.5,0.5,1,1,1,1,1)];
                this.cache(0, 0, 100, 100);
                this.mouseEnabled = false;
            }
            else
            {
                this.filters = [ new createjs.ColorFilter(1,1,1,1,1,1,1,1)];
                this.cache(0, 0, 100, 100);
                this.mouseEnabled = true;
            }
            
        }
    }
}