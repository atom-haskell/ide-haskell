"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const atom_1 = require("atom");
const utils_1 = require("../utils");
class ResultItem {
    constructor(providerId, { uri, message, severity, position, context }) {
        this.providerId = providerId;
        this.uri = uri;
        this.message = utils_1.MessageObject.fromObject(message);
        this.severity = severity;
        this.position = position && atom_1.Point.fromObject(position);
        this.context = context;
        this._isValid = true;
    }
    isValid() {
        return this._isValid;
    }
    setValid(isValid) {
        this._isValid = isValid;
    }
    hash() {
        const h = crypto_1.createHash('md5');
        h.update(JSON.stringify({
            uri: this.uri, position: this.position && this.position.serialize(),
            message: this.message.raw(), severity: this.severity,
            context: this.context
        }));
        return h.digest('base64');
    }
}
exports.ResultItem = ResultItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVzdWx0cy1kYi9yZXN1bHQtaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFpQztBQUNqQywrQkFBMEI7QUFDMUIsb0NBQXNDO0FBRXRDO0lBT0UsWUFBNkIsVUFBa0IsRUFBRSxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQWtCO1FBQWhGLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLFlBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7SUFDdEIsQ0FBQztJQUVNLE9BQU87UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUN0QixDQUFDO0lBRU0sUUFBUSxDQUFFLE9BQWdCO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFBO0lBQ3pCLENBQUM7SUFFTSxJQUFJO1FBQ1QsTUFBTSxDQUFDLEdBQUcsbUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMzQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDdEIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDbkUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3BELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDLENBQUMsQ0FBQTtRQUNILE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzNCLENBQUM7Q0FDRjtBQWpDRCxnQ0FpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NyZWF0ZUhhc2h9IGZyb20gJ2NyeXB0bydcbmltcG9ydCB7UG9pbnR9IGZyb20gJ2F0b20nXG5pbXBvcnQge01lc3NhZ2VPYmplY3R9IGZyb20gJy4uL3V0aWxzJ1xuXG5leHBvcnQgY2xhc3MgUmVzdWx0SXRlbSB7XG4gIHB1YmxpYyByZWFkb25seSB1cmk/OiBzdHJpbmdcbiAgcHVibGljIHJlYWRvbmx5IHBvc2l0aW9uPzogUG9pbnRcbiAgcHVibGljIHJlYWRvbmx5IG1lc3NhZ2U6IFVQSS5JTWVzc2FnZU9iamVjdFxuICBwdWJsaWMgcmVhZG9ubHkgc2V2ZXJpdHk6IFVQSS5UU2V2ZXJpdHlcbiAgcHVibGljIHJlYWRvbmx5IGNvbnRleHQ/OiBzdHJpbmdcbiAgcHJpdmF0ZSBfaXNWYWxpZDogYm9vbGVhblxuICBjb25zdHJ1Y3RvciAocHVibGljIHJlYWRvbmx5IHByb3ZpZGVySWQ6IG51bWJlciwge3VyaSwgbWVzc2FnZSwgc2V2ZXJpdHksIHBvc2l0aW9uLCBjb250ZXh0fTogVVBJLklSZXN1bHRJdGVtKSB7XG4gICAgdGhpcy51cmkgPSB1cmlcbiAgICB0aGlzLm1lc3NhZ2UgPSBNZXNzYWdlT2JqZWN0LmZyb21PYmplY3QobWVzc2FnZSlcbiAgICB0aGlzLnNldmVyaXR5ID0gc2V2ZXJpdHlcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb24gJiYgUG9pbnQuZnJvbU9iamVjdChwb3NpdGlvbilcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0XG4gICAgdGhpcy5faXNWYWxpZCA9IHRydWVcbiAgfVxuXG4gIHB1YmxpYyBpc1ZhbGlkICgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNWYWxpZFxuICB9XG5cbiAgcHVibGljIHNldFZhbGlkIChpc1ZhbGlkOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNWYWxpZCA9IGlzVmFsaWRcbiAgfVxuXG4gIHB1YmxpYyBoYXNoICgpIHtcbiAgICBjb25zdCBoID0gY3JlYXRlSGFzaCgnbWQ1JylcbiAgICBoLnVwZGF0ZShKU09OLnN0cmluZ2lmeSh7XG4gICAgICB1cmk6IHRoaXMudXJpLCBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbiAmJiB0aGlzLnBvc2l0aW9uLnNlcmlhbGl6ZSgpLFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLnJhdygpLCBzZXZlcml0eTogdGhpcy5zZXZlcml0eSxcbiAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dFxuICAgIH0pKVxuICAgIHJldHVybiBoLmRpZ2VzdCgnYmFzZTY0JylcbiAgfVxufVxuIl19