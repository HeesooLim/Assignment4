/*
      Author: Heesoo Lim
      Date: August 14, 2020
      File Name: button.js
      File Description: jsfile related to buttons in slot machine game page
*/


var UIObjects;
(function (UIObjects) {
    class Button extends Core.GameObject {
        // PRIVATE FIELDS (CLASS MEMBERS)
        // PUBLIC PROPERTIES
        // CONSTRUCTOR(S)
        constructor(bitmap_asset, x = 0, y = 0, isCentered = false) {
            super(bitmap_asset, x, y, isCentered);
            this.isCentered = isCentered;
            // mouse events
            this.on("mouseover", this.m_mouseOver);
            this.on("mouseout", this.m_mouseOut);
        }
        m_mouseOver() {
            this.alpha = 0.7; // 70% opaque
        }
        m_mouseOut() {
            this.alpha = 1.0; // 100% opaque
        }
    }
    UIObjects.Button = Button;
})(UIObjects || (UIObjects = {}));
//# sourceMappingURL=button.js.map