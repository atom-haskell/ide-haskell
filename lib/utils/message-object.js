"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const highlight = require("atom-highlight");
const cast = require("./cast");
const lodash_decorators_1 = require("lodash-decorators");
class MessageObject {
    constructor(msg) {
        this.msg = msg;
    }
    static fromObject(message) {
        if (cast.isIMessageObject(message)) {
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
__decorate([
    lodash_decorators_1.Memoize(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], MessageObject.prototype, "toHtml", null);
__decorate([
    lodash_decorators_1.Memoize(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], MessageObject.prototype, "toPlain", null);
exports.MessageObject = MessageObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1vYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvbWVzc2FnZS1vYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBNEM7QUFDNUMsK0JBQThCO0FBRTlCLHlEQUEyQztBQUUzQztJQUNFLFlBQW9CLEdBQWlCO1FBQWpCLFFBQUcsR0FBSCxHQUFHLENBQWM7SUFFckMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBMEM7UUFDakUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFBO1FBQ2hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNuQyxDQUFDO0lBQ0gsQ0FBQztJQUdNLE1BQU07UUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDekQsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDO2dCQUNyQixZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJO2dCQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXO2dCQUMvQixJQUFJLEVBQUUsS0FBSztnQkFDWCxRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUE7WUFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTtZQUVyQixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUE7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxJQUFZLENBQUE7WUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7WUFDdEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO1lBQ2pCLENBQUM7WUFDRCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3pDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO1lBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFBO1FBQ3RCLENBQUM7SUFDSCxDQUFDO0lBR00sT0FBTztRQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3pDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7WUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUE7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxJQUFZLENBQUE7WUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7WUFDdEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO1lBQ2pCLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQztJQUNILENBQUM7SUFFTSxHQUFHO1FBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUE7UUFDakIsQ0FBQztJQUNILENBQUM7Q0FDRjtBQXJEQztJQURDLDJCQUFPLEVBQUU7Ozs7MkNBMEJUO0FBR0Q7SUFEQywyQkFBTyxFQUFFOzs7OzRDQWVUO0FBeERILHNDQW1FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBoaWdobGlnaHQgPSByZXF1aXJlKCdhdG9tLWhpZ2hsaWdodCcpXG5pbXBvcnQgKiBhcyBjYXN0IGZyb20gJy4vY2FzdCdcbmltcG9ydCAqIGFzIFVQSSBmcm9tICdhdG9tLWhhc2tlbGwtdXBpJ1xuaW1wb3J0IHsgTWVtb2l6ZSB9IGZyb20gJ2xvZGFzaC1kZWNvcmF0b3JzJ1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZU9iamVjdCBpbXBsZW1lbnRzIFVQSS5JTWVzc2FnZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbXNnOiBVUEkuVE1lc3NhZ2UpIHtcbiAgICAvLyBub29wXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZyb21PYmplY3QobWVzc2FnZTogVVBJLlRNZXNzYWdlIHwgVVBJLklNZXNzYWdlT2JqZWN0KTogVVBJLklNZXNzYWdlT2JqZWN0IHtcbiAgICBpZiAoY2FzdC5pc0lNZXNzYWdlT2JqZWN0KG1lc3NhZ2UpKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IE1lc3NhZ2VPYmplY3QobWVzc2FnZSlcbiAgICB9XG4gIH1cblxuICBATWVtb2l6ZSgpXG4gIHB1YmxpYyB0b0h0bWwoKTogc3RyaW5nIHtcbiAgICBpZiAoY2FzdC5pc1RleHRNZXNzYWdlKHRoaXMubXNnKSAmJiB0aGlzLm1zZy5oaWdobGlnaHRlcikge1xuICAgICAgY29uc3QgaHRtbCA9IGhpZ2hsaWdodCh7XG4gICAgICAgIGZpbGVDb250ZW50czogdGhpcy5tc2cudGV4dCxcbiAgICAgICAgc2NvcGVOYW1lOiB0aGlzLm1zZy5oaWdobGlnaHRlcixcbiAgICAgICAgbmJzcDogZmFsc2UsXG4gICAgICAgIGxpbmVEaXZzOiBmYWxzZSxcbiAgICAgIH0pXG4gICAgICBpZiAoaHRtbCkgcmV0dXJuIGh0bWxcblxuICAgICAgdGhpcy5tc2cuaGlnaGxpZ2h0ZXIgPSB1bmRlZmluZWRcbiAgICAgIHJldHVybiB0aGlzLnRvSHRtbCgpXG4gICAgfSBlbHNlIGlmIChjYXN0LmlzSFRNTE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICByZXR1cm4gdGhpcy5tc2cuaHRtbFxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdGV4dDogc3RyaW5nXG4gICAgICBpZiAoY2FzdC5pc1RleHRNZXNzYWdlKHRoaXMubXNnKSkge1xuICAgICAgICB0ZXh0ID0gdGhpcy5tc2cudGV4dFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dCA9IHRoaXMubXNnXG4gICAgICB9XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgZGl2LmlubmVyVGV4dCA9IHRleHRcbiAgICAgIHJldHVybiBkaXYuaW5uZXJIVE1MXG4gICAgfVxuICB9XG5cbiAgQE1lbW9pemUoKVxuICBwdWJsaWMgdG9QbGFpbigpOiBzdHJpbmcge1xuICAgIGlmIChjYXN0LmlzSFRNTE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgZGl2LmlubmVySFRNTCA9IHRoaXMubXNnLmh0bWxcbiAgICAgIHJldHVybiBkaXYuaW5uZXJUZXh0XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0ZXh0OiBzdHJpbmdcbiAgICAgIGlmIChjYXN0LmlzVGV4dE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICAgIHRleHQgPSB0aGlzLm1zZy50ZXh0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0ID0gdGhpcy5tc2dcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJhdygpOiBzdHJpbmcge1xuICAgIGlmIChjYXN0LmlzVGV4dE1lc3NhZ2UodGhpcy5tc2cpKSB7XG4gICAgICByZXR1cm4gdGhpcy5tc2cudGV4dFxuICAgIH0gZWxzZSBpZiAoY2FzdC5pc0hUTUxNZXNzYWdlKHRoaXMubXNnKSkge1xuICAgICAgcmV0dXJuIHRoaXMubXNnLmh0bWxcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubXNnXG4gICAgfVxuICB9XG59XG4iXX0=