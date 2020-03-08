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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1vYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvbWVzc2FnZS1vYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQTRDO0FBQzVDLCtCQUE4QjtBQUU5Qix5REFBMkM7QUFFM0MsTUFBYSxhQUFhO0lBQ3hCLFlBQW9CLEdBQWlCO1FBQWpCLFFBQUcsR0FBSCxHQUFHLENBQWM7SUFFckMsQ0FBQztJQWFNLE1BQU07UUFDWCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUN0RSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBQ3JCLFlBQVksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7Z0JBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVc7Z0JBQy9CLElBQUksRUFBRSxLQUFLO2dCQUNYLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQTtZQUNGLElBQUksSUFBSTtnQkFBRSxPQUFPLElBQUksQ0FBQTtZQUVyQixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUE7WUFDaEMsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7U0FDckI7YUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7U0FDckI7YUFBTTtZQUNMLElBQUksSUFBWSxDQUFBO1lBQ2hCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTthQUNyQjtpQkFBTTtnQkFDTCxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTthQUNoQjtZQUNELE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDekMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7WUFDcEIsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFBO1NBQ3JCO0lBQ0gsQ0FBQztJQUdNLE9BQU87UUFDWixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDekMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtZQUM3QixPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUE7U0FDckI7YUFBTTtZQUNMLElBQUksSUFBWSxDQUFBO1lBQ2hCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTthQUNyQjtpQkFBTTtnQkFDTCxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTthQUNoQjtZQUNELE9BQU8sSUFBSSxDQUFBO1NBQ1o7SUFDSCxDQUFDO0lBRU0sR0FBRztRQUNSLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtTQUNyQjthQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtTQUNyQjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFBO1NBQ2hCO0lBQ0gsQ0FBQzs7QUEvRGEsd0JBQVUsR0FBRyxDQUN6QixPQUFxQyxFQUN0QixFQUFFO0lBQ2pCLElBQUksT0FBTyxZQUFZLGFBQWEsRUFBRTtRQUNwQyxPQUFPLE9BQU8sQ0FBQTtLQUNmO1NBQU07UUFDTCxPQUFPLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQ2xDO0FBQ0gsQ0FBQyxDQUFBO0FBR0Q7SUFEQywyQkFBTyxFQUFFOzs7OzJDQTBCVDtBQUdEO0lBREMsMkJBQU8sRUFBRTs7Ozs0Q0FlVDtBQTFESCxzQ0FxRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaGlnaGxpZ2h0ID0gcmVxdWlyZSgnYXRvbS1oaWdobGlnaHQnKVxuaW1wb3J0ICogYXMgY2FzdCBmcm9tICcuL2Nhc3QnXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcbmltcG9ydCB7IE1lbW9pemUgfSBmcm9tICdsb2Rhc2gtZGVjb3JhdG9ycydcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VPYmplY3Qge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1zZzogVVBJLlRNZXNzYWdlKSB7XG4gICAgLy8gbm9vcFxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tT2JqZWN0ID0gKFxuICAgIG1lc3NhZ2U6IFVQSS5UTWVzc2FnZSB8IE1lc3NhZ2VPYmplY3QsXG4gICk6IE1lc3NhZ2VPYmplY3QgPT4ge1xuICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgTWVzc2FnZU9iamVjdCkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2VcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBNZXNzYWdlT2JqZWN0KG1lc3NhZ2UpXG4gICAgfVxuICB9XG5cbiAgQE1lbW9pemUoKVxuICBwdWJsaWMgdG9IdG1sKCk6IHN0cmluZyB7XG4gICAgaWYgKGNhc3QuaXNUZXh0TWVzc2FnZSh0aGlzLm1zZykgJiYgdGhpcy5tc2cuaGlnaGxpZ2h0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgaHRtbCA9IGhpZ2hsaWdodCh7XG4gICAgICAgIGZpbGVDb250ZW50czogdGhpcy5tc2cudGV4dCxcbiAgICAgICAgc2NvcGVOYW1lOiB0aGlzLm1zZy5oaWdobGlnaHRlcixcbiAgICAgICAgbmJzcDogZmFsc2UsXG4gICAgICAgIGxpbmVEaXZzOiBmYWxzZSxcbiAgICAgIH0pXG4gICAgICBpZiAoaHRtbCkgcmV0dXJuIGh0bWxcblxuICAgICAgdGhpcy5tc2cuaGlnaGxpZ2h0ZXIgPSB1bmRlZmluZWRcbiAgICAgIHJldHVybiB0aGlzLnRvSHRtbCgpXG4gICAgfSBlbHNlIGlmIChjYXN0LmlzSFRNTE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICByZXR1cm4gdGhpcy5tc2cuaHRtbFxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdGV4dDogc3RyaW5nXG4gICAgICBpZiAoY2FzdC5pc1RleHRNZXNzYWdlKHRoaXMubXNnKSkge1xuICAgICAgICB0ZXh0ID0gdGhpcy5tc2cudGV4dFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dCA9IHRoaXMubXNnXG4gICAgICB9XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgZGl2LmlubmVyVGV4dCA9IHRleHRcbiAgICAgIHJldHVybiBkaXYuaW5uZXJIVE1MXG4gICAgfVxuICB9XG5cbiAgQE1lbW9pemUoKVxuICBwdWJsaWMgdG9QbGFpbigpOiBzdHJpbmcge1xuICAgIGlmIChjYXN0LmlzSFRNTE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgZGl2LmlubmVySFRNTCA9IHRoaXMubXNnLmh0bWxcbiAgICAgIHJldHVybiBkaXYuaW5uZXJUZXh0XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0ZXh0OiBzdHJpbmdcbiAgICAgIGlmIChjYXN0LmlzVGV4dE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICAgIHRleHQgPSB0aGlzLm1zZy50ZXh0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0ID0gdGhpcy5tc2dcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJhdygpOiBzdHJpbmcge1xuICAgIGlmIChjYXN0LmlzVGV4dE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICByZXR1cm4gdGhpcy5tc2cudGV4dFxuICAgIH0gZWxzZSBpZiAoY2FzdC5pc0hUTUxNZXNzYWdlKHRoaXMubXNnKSkge1xuICAgICAgcmV0dXJuIHRoaXMubXNnLmh0bWxcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubXNnXG4gICAgfVxuICB9XG59XG4iXX0=