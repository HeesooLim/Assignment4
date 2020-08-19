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
        // PUBLIC METHOD(S)
        greyButton(isGrey) {
            if (isGrey) {
                this.filters = [new createjs.ColorFilter(0.6, 0.6, 0.6, 1, 1, 1, -255, 0)];
                this.cache(0, 0, 67, 67);
                this.mouseEnabled = false;
            }
            else {
                this.filters = null;
                this.cache = null;
                this.mouseEnabled = true;
            }
        }
    }
    UIObjects.Button = Button;
})(UIObjects || (UIObjects = {}));
//# sourceMappingURL=button.js.map