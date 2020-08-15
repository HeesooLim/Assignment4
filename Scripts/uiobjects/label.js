
    /*
      Author: Heesoo Lim
      Date: August 14, 2020
      File Name: label.js
      File Description: jsfile related to labels in slot machine game page
    */

    var UIObjects;
(function (UIObjects) {
    class Label extends createjs.Text {
        // CONSTRUCTOR(S)
        constructor(text = "", font_size = "20px", font_family = "Arial", font_color = "#000000", x = 0, y = 0, isCentered = false) {
            super(text, font_size + " " + font_family, font_color);
            this.isCentered = isCentered;
            this.x = x;
            this.y = y;
        }
        // PUBLIC PROPERTIES
        get isCentered() {
            return this.m_isCentered;
        }
        set isCentered(value) {
            if (value) {
                this.m_recalculateSize();
            }
            else {
                this.regX = 0;
                this.regY = 0;
            }
            this.m_isCentered = value;
        }
        // PRIVATE METHOD(S)(
        m_recalculateSize() {
            this.regX = this.getMeasuredWidth() * 0.5;
            this.regY = this.getMeasuredHeight() * 0.5;
        }
        // PUBLIC METHOD(S)
        setText(new_text) {
            this.text = new_text;
            if (this.isCentered) {
                this.m_recalculateSize();
            }
        }
    }
    UIObjects.Label = Label;
})(UIObjects || (UIObjects = {}));
//# sourceMappingURL=label.js.map