'use babel';
Object.defineProperty(exports, "__esModule", { value: true });
class ResultItem {
    constructor(parent, { uri, message, severity, position }) {
        this.parent = parent;
        this.uri = uri;
        this.message = message;
        this.severity = severity;
        this.position = position;
    }
    destroy() {
        if (this.parent)
            this.parent.removeResult(this);
    }
}
exports.default = ResultItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVzdWx0cy1kYi9yZXN1bHQtaXRlbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUE7O0FBRVg7SUFDRSxZQUFhLE1BQU0sRUFBRSxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0lBQzFCLENBQUM7SUFFRCxPQUFPO1FBQ0wsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2pELENBQUM7Q0FDRjtBQVpELDZCQVlDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdWx0SXRlbSB7XG4gIGNvbnN0cnVjdG9yIChwYXJlbnQsIHt1cmksIG1lc3NhZ2UsIHNldmVyaXR5LCBwb3NpdGlvbn0pIHtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudFxuICAgIHRoaXMudXJpID0gdXJpXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZVxuICAgIHRoaXMuc2V2ZXJpdHkgPSBzZXZlcml0eVxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvblxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB0aGlzLnBhcmVudC5yZW1vdmVSZXN1bHQodGhpcylcbiAgfVxufVxuIl19