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
        if (cast.isTextMessage(this.msg) && this.msg.highlighter) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1vYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvbWVzc2FnZS1vYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQTRDO0FBQzVDLCtCQUE4QjtBQUU5Qix5REFBMkM7QUFFM0M7SUFDRSxZQUFvQixHQUFpQjtRQUFqQixRQUFHLEdBQUgsR0FBRyxDQUFjO0lBRXJDLENBQUM7SUFXTSxNQUFNO1FBQ1gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQztnQkFDckIsWUFBWSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSTtnQkFDM0IsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVztnQkFDL0IsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7WUFFckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFBO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksSUFBWSxDQUFBO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBO1lBQ3RCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtZQUNqQixDQUFDO1lBQ0QsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUN6QyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtZQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQTtRQUN0QixDQUFDO0lBQ0gsQ0FBQztJQUdNLE9BQU87UUFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUN6QyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBO1lBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFBO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksSUFBWSxDQUFBO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBO1lBQ3RCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtZQUNqQixDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7SUFDSCxDQUFDO0lBRU0sR0FBRztRQUNSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFBO1FBQ2pCLENBQUM7SUFDSCxDQUFDOztBQTdEYSx3QkFBVSxHQUFHLENBQUMsT0FBcUMsRUFBaUIsRUFBRTtJQUNsRixFQUFFLENBQUMsQ0FBQyxPQUFPLFlBQVksYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsT0FBTyxDQUFBO0lBQ2hCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBR0Q7SUFEQywyQkFBTyxFQUFFOzs7OzJDQTBCVDtBQUdEO0lBREMsMkJBQU8sRUFBRTs7Ozs0Q0FlVDtBQXhESCxzQ0FtRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaGlnaGxpZ2h0ID0gcmVxdWlyZSgnYXRvbS1oaWdobGlnaHQnKVxuaW1wb3J0ICogYXMgY2FzdCBmcm9tICcuL2Nhc3QnXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcbmltcG9ydCB7IE1lbW9pemUgfSBmcm9tICdsb2Rhc2gtZGVjb3JhdG9ycydcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VPYmplY3Qge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1zZzogVVBJLlRNZXNzYWdlKSB7XG4gICAgLy8gbm9vcFxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tT2JqZWN0ID0gKG1lc3NhZ2U6IFVQSS5UTWVzc2FnZSB8IE1lc3NhZ2VPYmplY3QpOiBNZXNzYWdlT2JqZWN0ID0+IHtcbiAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIE1lc3NhZ2VPYmplY3QpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgTWVzc2FnZU9iamVjdChtZXNzYWdlKVxuICAgIH1cbiAgfVxuXG4gIEBNZW1vaXplKClcbiAgcHVibGljIHRvSHRtbCgpOiBzdHJpbmcge1xuICAgIGlmIChjYXN0LmlzVGV4dE1lc3NhZ2UodGhpcy5tc2cpICYmIHRoaXMubXNnLmhpZ2hsaWdodGVyKSB7XG4gICAgICBjb25zdCBodG1sID0gaGlnaGxpZ2h0KHtcbiAgICAgICAgZmlsZUNvbnRlbnRzOiB0aGlzLm1zZy50ZXh0LFxuICAgICAgICBzY29wZU5hbWU6IHRoaXMubXNnLmhpZ2hsaWdodGVyLFxuICAgICAgICBuYnNwOiBmYWxzZSxcbiAgICAgICAgbGluZURpdnM6IGZhbHNlLFxuICAgICAgfSlcbiAgICAgIGlmIChodG1sKSByZXR1cm4gaHRtbFxuXG4gICAgICB0aGlzLm1zZy5oaWdobGlnaHRlciA9IHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIHRoaXMudG9IdG1sKClcbiAgICB9IGVsc2UgaWYgKGNhc3QuaXNIVE1MTWVzc2FnZSh0aGlzLm1zZykpIHtcbiAgICAgIHJldHVybiB0aGlzLm1zZy5odG1sXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0ZXh0OiBzdHJpbmdcbiAgICAgIGlmIChjYXN0LmlzVGV4dE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICAgIHRleHQgPSB0aGlzLm1zZy50ZXh0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0ID0gdGhpcy5tc2dcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBkaXYuaW5uZXJUZXh0ID0gdGV4dFxuICAgICAgcmV0dXJuIGRpdi5pbm5lckhUTUxcbiAgICB9XG4gIH1cblxuICBATWVtb2l6ZSgpXG4gIHB1YmxpYyB0b1BsYWluKCk6IHN0cmluZyB7XG4gICAgaWYgKGNhc3QuaXNIVE1MTWVzc2FnZSh0aGlzLm1zZykpIHtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBkaXYuaW5uZXJIVE1MID0gdGhpcy5tc2cuaHRtbFxuICAgICAgcmV0dXJuIGRpdi5pbm5lclRleHRcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRleHQ6IHN0cmluZ1xuICAgICAgaWYgKGNhc3QuaXNUZXh0TWVzc2FnZSh0aGlzLm1zZykpIHtcbiAgICAgICAgdGV4dCA9IHRoaXMubXNnLnRleHRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgPSB0aGlzLm1zZ1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRleHRcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmF3KCk6IHN0cmluZyB7XG4gICAgaWYgKGNhc3QuaXNUZXh0TWVzc2FnZSh0aGlzLm1zZykpIHtcbiAgICAgIHJldHVybiB0aGlzLm1zZy50ZXh0XG4gICAgfSBlbHNlIGlmIChjYXN0LmlzSFRNTE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICByZXR1cm4gdGhpcy5tc2cuaHRtbFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5tc2dcbiAgICB9XG4gIH1cbn1cbiJdfQ==