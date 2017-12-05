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
        if (this._hash) {
            return this._hash;
        }
        const h = crypto_1.createHash('sha1');
        h.update(JSON.stringify({
            uri: this.uri, position: this.position && this.position.serialize(),
            message: this.message.raw(), severity: this.severity,
            context: this.context,
        }));
        this._hash = h.digest('base64');
        return this._hash;
    }
}
exports.ResultItem = ResultItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVzdWx0cy1kYi9yZXN1bHQtaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQywrQkFBNEI7QUFDNUIsb0NBQXdDO0FBR3hDO0lBUUUsWUFBNEIsVUFBa0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQW1CO1FBQWxGLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDNUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLFlBQUssQ0FBQyxVQUFVLENBQUMsUUFBZSxDQUFDLENBQUE7UUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7SUFDdEIsQ0FBQztJQUVNLE9BQU87UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUN0QixDQUFDO0lBRU0sUUFBUSxDQUFDLE9BQWdCO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFBO0lBQ3pCLENBQUM7SUFFTSxJQUFJO1FBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLEdBQUcsbUJBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM1QixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDdEIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDbkUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3BELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDLENBQUMsQ0FBQTtRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0NBQ0Y7QUFwQ0QsZ0NBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gJ2NyeXB0bydcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IE1lc3NhZ2VPYmplY3QgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCAqIGFzIFVQSSBmcm9tICdhdG9tLWhhc2tlbGwtdXBpJ1xuXG5leHBvcnQgY2xhc3MgUmVzdWx0SXRlbSB7XG4gIHB1YmxpYyByZWFkb25seSB1cmk/OiBzdHJpbmdcbiAgcHVibGljIHJlYWRvbmx5IHBvc2l0aW9uPzogUG9pbnRcbiAgcHVibGljIHJlYWRvbmx5IG1lc3NhZ2U6IFVQSS5JTWVzc2FnZU9iamVjdFxuICBwdWJsaWMgcmVhZG9ubHkgc2V2ZXJpdHk6IFVQSS5UU2V2ZXJpdHlcbiAgcHVibGljIHJlYWRvbmx5IGNvbnRleHQ/OiBzdHJpbmdcbiAgcHJpdmF0ZSBfaXNWYWxpZDogYm9vbGVhblxuICBwcml2YXRlIF9oYXNoPzogc3RyaW5nXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBwcm92aWRlcklkOiBudW1iZXIsIHsgdXJpLCBtZXNzYWdlLCBzZXZlcml0eSwgcG9zaXRpb24sIGNvbnRleHQgfTogVVBJLklSZXN1bHRJdGVtKSB7XG4gICAgdGhpcy51cmkgPSB1cmlcbiAgICB0aGlzLm1lc3NhZ2UgPSBNZXNzYWdlT2JqZWN0LmZyb21PYmplY3QobWVzc2FnZSlcbiAgICB0aGlzLnNldmVyaXR5ID0gc2V2ZXJpdHlcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb24gJiYgUG9pbnQuZnJvbU9iamVjdChwb3NpdGlvbiBhcyBhbnkpIC8vIFRPRE86IGZpeCB0aGlzIGFzIHNvb24gYXMgbmV3IHR5cGluZ3MgYXZhaWxhYmxlXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dFxuICAgIHRoaXMuX2lzVmFsaWQgPSB0cnVlXG4gIH1cblxuICBwdWJsaWMgaXNWYWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNWYWxpZFxuICB9XG5cbiAgcHVibGljIHNldFZhbGlkKGlzVmFsaWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc1ZhbGlkID0gaXNWYWxpZFxuICB9XG5cbiAgcHVibGljIGhhc2goKSB7XG4gICAgaWYgKHRoaXMuX2hhc2gpIHsgcmV0dXJuIHRoaXMuX2hhc2ggfVxuICAgIGNvbnN0IGggPSBjcmVhdGVIYXNoKCdzaGExJylcbiAgICBoLnVwZGF0ZShKU09OLnN0cmluZ2lmeSh7XG4gICAgICB1cmk6IHRoaXMudXJpLCBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbiAmJiB0aGlzLnBvc2l0aW9uLnNlcmlhbGl6ZSgpLFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLnJhdygpLCBzZXZlcml0eTogdGhpcy5zZXZlcml0eSxcbiAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICB9KSlcbiAgICB0aGlzLl9oYXNoID0gaC5kaWdlc3QoJ2Jhc2U2NCcpXG4gICAgcmV0dXJuIHRoaXMuX2hhc2hcbiAgfVxufVxuIl19