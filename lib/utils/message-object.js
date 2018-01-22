"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const highlight = require("atom-highlight");
const cast = require("./cast");
const lodash_decorators_1 = require("lodash-decorators");
class MessageObject {
    constructor(msg) {
        this.msg = msg;
    }
    toHtml() {
        if (cast.isTextMessage(this.msg) && this.msg.highlighter !== undefined) {
            const html = highlight({
                fileContents: this.msg.text,
                scopeName: this.msg.highlighter,
                nbsp: false,
                lineDivs: false,
            });
            if (html)
                return html;
            this.msg.highlighter = undefined;
            return this.toHtml();
        }
        else if (cast.isHTMLMessage(this.msg)) {
            return this.msg.html;
        }
        else {
            let text;
            if (cast.isTextMessage(this.msg)) {
                text = this.msg.text;
            }
            else {
                text = this.msg;
            }
            const div = document.createElement('div');
            div.innerText = text;
            return div.innerHTML;
        }
    }
    toPlain() {
        if (cast.isHTMLMessage(this.msg)) {
            const div = document.createElement('div');
            div.innerHTML = this.msg.html;
            return div.innerText;
        }
        else {
            let text;
            if (cast.isTextMessage(this.msg)) {
                text = this.msg.text;
            }
            else {
                text = this.msg;
            }
            return text;
        }
    }
    raw() {
        if (cast.isTextMessage(this.msg)) {
            return this.msg.text;
        }
        else if (cast.isHTMLMessage(this.msg)) {
            return this.msg.html;
        }
        else {
            return this.msg;
        }
    }
}
MessageObject.fromObject = (message) => {
    if (message instanceof MessageObject) {
        return message;
    }
    else {
        return new MessageObject(message);
    }
};
tslib_1.__decorate([
    lodash_decorators_1.Memoize(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", String)
], MessageObject.prototype, "toHtml", null);
tslib_1.__decorate([
    lodash_decorators_1.Memoize(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", String)
], MessageObject.prototype, "toPlain", null);
exports.MessageObject = MessageObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1vYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvbWVzc2FnZS1vYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQTRDO0FBQzVDLCtCQUE4QjtBQUU5Qix5REFBMkM7QUFFM0M7SUFDRSxZQUFvQixHQUFpQjtRQUFqQixRQUFHLEdBQUgsR0FBRyxDQUFjO0lBRXJDLENBQUM7SUFhTSxNQUFNO1FBQ1gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN2RSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBQ3JCLFlBQVksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7Z0JBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVc7Z0JBQy9CLElBQUksRUFBRSxLQUFLO2dCQUNYLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQTtZQUNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFBO1lBRXJCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQTtZQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLElBQVksQ0FBQTtZQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtZQUN0QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7WUFDakIsQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDekMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7WUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUE7UUFDdEIsQ0FBQztJQUNILENBQUM7SUFHTSxPQUFPO1FBQ1osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDekMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtZQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQTtRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLElBQVksQ0FBQTtZQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtZQUN0QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7WUFDakIsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDYixDQUFDO0lBQ0gsQ0FBQztJQUVNLEdBQUc7UUFDUixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUNqQixDQUFDO0lBQ0gsQ0FBQzs7QUEvRGEsd0JBQVUsR0FBRyxDQUN6QixPQUFxQyxFQUN0QixFQUFFO0lBQ2pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBWSxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxPQUFPLENBQUE7SUFDaEIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ25DLENBQUM7QUFDSCxDQUFDLENBQUE7QUFHRDtJQURDLDJCQUFPLEVBQUU7Ozs7MkNBMEJUO0FBR0Q7SUFEQywyQkFBTyxFQUFFOzs7OzRDQWVUO0FBMURILHNDQXFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBoaWdobGlnaHQgPSByZXF1aXJlKCdhdG9tLWhpZ2hsaWdodCcpXG5pbXBvcnQgKiBhcyBjYXN0IGZyb20gJy4vY2FzdCdcbmltcG9ydCAqIGFzIFVQSSBmcm9tICdhdG9tLWhhc2tlbGwtdXBpJ1xuaW1wb3J0IHsgTWVtb2l6ZSB9IGZyb20gJ2xvZGFzaC1kZWNvcmF0b3JzJ1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbXNnOiBVUEkuVE1lc3NhZ2UpIHtcbiAgICAvLyBub29wXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21PYmplY3QgPSAoXG4gICAgbWVzc2FnZTogVVBJLlRNZXNzYWdlIHwgTWVzc2FnZU9iamVjdCxcbiAgKTogTWVzc2FnZU9iamVjdCA9PiB7XG4gICAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBNZXNzYWdlT2JqZWN0KSB7XG4gICAgICByZXR1cm4gbWVzc2FnZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IE1lc3NhZ2VPYmplY3QobWVzc2FnZSlcbiAgICB9XG4gIH1cblxuICBATWVtb2l6ZSgpXG4gIHB1YmxpYyB0b0h0bWwoKTogc3RyaW5nIHtcbiAgICBpZiAoY2FzdC5pc1RleHRNZXNzYWdlKHRoaXMubXNnKSAmJiB0aGlzLm1zZy5oaWdobGlnaHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBodG1sID0gaGlnaGxpZ2h0KHtcbiAgICAgICAgZmlsZUNvbnRlbnRzOiB0aGlzLm1zZy50ZXh0LFxuICAgICAgICBzY29wZU5hbWU6IHRoaXMubXNnLmhpZ2hsaWdodGVyLFxuICAgICAgICBuYnNwOiBmYWxzZSxcbiAgICAgICAgbGluZURpdnM6IGZhbHNlLFxuICAgICAgfSlcbiAgICAgIGlmIChodG1sKSByZXR1cm4gaHRtbFxuXG4gICAgICB0aGlzLm1zZy5oaWdobGlnaHRlciA9IHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIHRoaXMudG9IdG1sKClcbiAgICB9IGVsc2UgaWYgKGNhc3QuaXNIVE1MTWVzc2FnZSh0aGlzLm1zZykpIHtcbiAgICAgIHJldHVybiB0aGlzLm1zZy5odG1sXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0ZXh0OiBzdHJpbmdcbiAgICAgIGlmIChjYXN0LmlzVGV4dE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICAgIHRleHQgPSB0aGlzLm1zZy50ZXh0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0ID0gdGhpcy5tc2dcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBkaXYuaW5uZXJUZXh0ID0gdGV4dFxuICAgICAgcmV0dXJuIGRpdi5pbm5lckhUTUxcbiAgICB9XG4gIH1cblxuICBATWVtb2l6ZSgpXG4gIHB1YmxpYyB0b1BsYWluKCk6IHN0cmluZyB7XG4gICAgaWYgKGNhc3QuaXNIVE1MTWVzc2FnZSh0aGlzLm1zZykpIHtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBkaXYuaW5uZXJIVE1MID0gdGhpcy5tc2cuaHRtbFxuICAgICAgcmV0dXJuIGRpdi5pbm5lclRleHRcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRleHQ6IHN0cmluZ1xuICAgICAgaWYgKGNhc3QuaXNUZXh0TWVzc2FnZSh0aGlzLm1zZykpIHtcbiAgICAgICAgdGV4dCA9IHRoaXMubXNnLnRleHRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgPSB0aGlzLm1zZ1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRleHRcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmF3KCk6IHN0cmluZyB7XG4gICAgaWYgKGNhc3QuaXNUZXh0TWVzc2FnZSh0aGlzLm1zZykpIHtcbiAgICAgIHJldHVybiB0aGlzLm1zZy50ZXh0XG4gICAgfSBlbHNlIGlmIChjYXN0LmlzSFRNTE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICByZXR1cm4gdGhpcy5tc2cuaHRtbFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5tc2dcbiAgICB9XG4gIH1cbn1cbiJdfQ==