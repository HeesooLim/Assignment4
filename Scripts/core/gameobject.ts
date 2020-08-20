module Core
{
    /*
      Author: Heesoo Lim
      Date: August 20, 2020
      File Name: gameobject.ts
      Website Name: Slot Machine
      File Description: game objects in slot machine game page
   */

    export class GameObject extends createjs.Bitmap
    {
        // PRIVATE FIELDS (CLASS MEMBERS)
        private m_isCentered: boolean;

        // PUBLIC PROPERTIES
        get isCentered(): boolean
        {
            return this.m_isCentered;
        }
        set isCentered(value: boolean)
        {
            if(value)
            {
                this.m_recalculateSize();
            }
            else
            {
                this.regX = 0;
                this.regY = 0;
            }

            this.m_isCentered = value;
        }

        // CONSTRUCTOR(S)
        constructor(
            bitmap_asset: string, 
            x: number = 0, 
            y: number = 0, 
            isCentered: boolean = false)
        {
            super(Config.Globals.AssetManifest.getResult(bitmap_asset))

            this.isCentered = isCentered;

            this.x = x;
            this.y = y;
        }

        // PRIVATE METHOD(S)
        private m_recalculateSize(): void
        {
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        }

        // PUBLIC METHOD(S)
        
    }
}