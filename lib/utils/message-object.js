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
    static fromObject(message) {
        if (message instanceof MessageObject) {
            return message;
        }
        else {
            return new MessageObject(message);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1vYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvbWVzc2FnZS1vYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQTRDO0FBQzVDLCtCQUE4QjtBQUU5Qix5REFBMkM7QUFFM0M7SUFDRSxZQUFvQixHQUFpQjtRQUFqQixRQUFHLEdBQUgsR0FBRyxDQUFjO0lBRXJDLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQXFDO1FBQzVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBWSxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxPQUFPLENBQUE7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ25DLENBQUM7SUFDSCxDQUFDO0lBR00sTUFBTTtRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN6RCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBQ3JCLFlBQVksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7Z0JBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVc7Z0JBQy9CLElBQUksRUFBRSxLQUFLO2dCQUNYLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQTtZQUNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFBO1lBRXJCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQTtZQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLElBQVksQ0FBQTtZQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtZQUN0QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7WUFDakIsQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDekMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7WUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUE7UUFDdEIsQ0FBQztJQUNILENBQUM7SUFHTSxPQUFPO1FBQ1osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDekMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtZQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQTtRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLElBQVksQ0FBQTtZQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtZQUN0QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7WUFDakIsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDYixDQUFDO0lBQ0gsQ0FBQztJQUVNLEdBQUc7UUFDUixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUNqQixDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBckRDO0lBREMsMkJBQU8sRUFBRTs7OzsyQ0EwQlQ7QUFHRDtJQURDLDJCQUFPLEVBQUU7Ozs7NENBZVQ7QUF4REgsc0NBbUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGhpZ2hsaWdodCA9IHJlcXVpcmUoJ2F0b20taGlnaGxpZ2h0JylcbmltcG9ydCAqIGFzIGNhc3QgZnJvbSAnLi9jYXN0J1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5pbXBvcnQgeyBNZW1vaXplIH0gZnJvbSAnbG9kYXNoLWRlY29yYXRvcnMnXG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlT2JqZWN0IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtc2c6IFVQSS5UTWVzc2FnZSkge1xuICAgIC8vIG5vb3BcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbU9iamVjdChtZXNzYWdlOiBVUEkuVE1lc3NhZ2UgfCBNZXNzYWdlT2JqZWN0KTogTWVzc2FnZU9iamVjdCB7XG4gICAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBNZXNzYWdlT2JqZWN0KSB7XG4gICAgICByZXR1cm4gbWVzc2FnZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IE1lc3NhZ2VPYmplY3QobWVzc2FnZSlcbiAgICB9XG4gIH1cblxuICBATWVtb2l6ZSgpXG4gIHB1YmxpYyB0b0h0bWwoKTogc3RyaW5nIHtcbiAgICBpZiAoY2FzdC5pc1RleHRNZXNzYWdlKHRoaXMubXNnKSAmJiB0aGlzLm1zZy5oaWdobGlnaHRlcikge1xuICAgICAgY29uc3QgaHRtbCA9IGhpZ2hsaWdodCh7XG4gICAgICAgIGZpbGVDb250ZW50czogdGhpcy5tc2cudGV4dCxcbiAgICAgICAgc2NvcGVOYW1lOiB0aGlzLm1zZy5oaWdobGlnaHRlcixcbiAgICAgICAgbmJzcDogZmFsc2UsXG4gICAgICAgIGxpbmVEaXZzOiBmYWxzZSxcbiAgICAgIH0pXG4gICAgICBpZiAoaHRtbCkgcmV0dXJuIGh0bWxcblxuICAgICAgdGhpcy5tc2cuaGlnaGxpZ2h0ZXIgPSB1bmRlZmluZWRcbiAgICAgIHJldHVybiB0aGlzLnRvSHRtbCgpXG4gICAgfSBlbHNlIGlmIChjYXN0LmlzSFRNTE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICByZXR1cm4gdGhpcy5tc2cuaHRtbFxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdGV4dDogc3RyaW5nXG4gICAgICBpZiAoY2FzdC5pc1RleHRNZXNzYWdlKHRoaXMubXNnKSkge1xuICAgICAgICB0ZXh0ID0gdGhpcy5tc2cudGV4dFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dCA9IHRoaXMubXNnXG4gICAgICB9XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgZGl2LmlubmVyVGV4dCA9IHRleHRcbiAgICAgIHJldHVybiBkaXYuaW5uZXJIVE1MXG4gICAgfVxuICB9XG5cbiAgQE1lbW9pemUoKVxuICBwdWJsaWMgdG9QbGFpbigpOiBzdHJpbmcge1xuICAgIGlmIChjYXN0LmlzSFRNTE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgZGl2LmlubmVySFRNTCA9IHRoaXMubXNnLmh0bWxcbiAgICAgIHJldHVybiBkaXYuaW5uZXJUZXh0XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0ZXh0OiBzdHJpbmdcbiAgICAgIGlmIChjYXN0LmlzVGV4dE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICAgIHRleHQgPSB0aGlzLm1zZy50ZXh0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0ID0gdGhpcy5tc2dcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJhdygpOiBzdHJpbmcge1xuICAgIGlmIChjYXN0LmlzVGV4dE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICByZXR1cm4gdGhpcy5tc2cudGV4dFxuICAgIH0gZWxzZSBpZiAoY2FzdC5pc0hUTUxNZXNzYWdlKHRoaXMubXNnKSkge1xuICAgICAgcmV0dXJuIHRoaXMubXNnLmh0bWxcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubXNnXG4gICAgfVxuICB9XG59XG4iXX0=