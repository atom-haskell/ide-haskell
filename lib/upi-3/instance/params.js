"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function create(pluginName, pluginManager) {
    return {
        add(spec) {
            return pluginManager.configParamManager.add(pluginName, spec);
        },
        get(...args) {
            return __awaiter(this, void 0, void 0, function* () {
                if (args.length < 2) {
                    args.unshift(pluginName);
                }
                const [plugin, name] = args;
                return pluginManager.configParamManager.get(plugin, name);
            });
        },
        set(...args) {
            return __awaiter(this, void 0, void 0, function* () {
                if (args.length < 3) {
                    args.unshift(pluginName);
                }
                const [plugin, name, value] = args;
                return pluginManager.configParamManager.set(plugin, name, value);
            });
        }
    };
}
exports.create = create;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3VwaS0zL2luc3RhbmNlL3BhcmFtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBaURBLGdCQUF3QixVQUFrQixFQUFFLGFBQTRCO0lBQ3RFLE1BQU0sQ0FBQztRQUNMLEdBQUcsQ0FBRSxJQUFJO1lBQ1AsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQy9ELENBQUM7UUFDSyxHQUFHLENBQUUsR0FBRyxJQUFXOztnQkFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUMxQixDQUFDO2dCQUNELE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFBO2dCQUMzQixNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDM0QsQ0FBQztTQUFBO1FBQ0ssR0FBRyxDQUFFLEdBQUcsSUFBVzs7Z0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtnQkFDMUIsQ0FBQztnQkFDRCxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUE7Z0JBQ2xDLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDbEUsQ0FBQztTQUFBO0tBQ0YsQ0FBQTtBQUNILENBQUM7QUFwQkQsd0JBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXNwb3NhYmxlfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHtQbHVnaW5NYW5hZ2VyfSBmcm9tICcuLi8uLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7SVBhcmFtU3BlY30gZnJvbSAnLi4vLi4vY29uZmlnLXBhcmFtcydcblxuZXhwb3J0IGludGVyZmFjZSBJTWFpbkludGVyZmFjZSB7XG4gIC8qKlxuICBhZGRDb25maWdQYXJhbVxuICAgIHBhcmFtX25hbWU6XG4gICAgICBvbkNoYW5nZWQ6IGNhbGxiYWNrIHZvaWQodmFsdWUpXG4gICAgICBpdGVtczogQXJyYXkgb3IgY2FsbGJhY2sgQXJyYXkodm9pZClcbiAgICAgIGl0ZW1UZW1wbGF0ZTogY2FsbGJhY2ssIFN0cmluZyhpdGVtKSwgaHRtbCB0ZW1wbGF0ZVxuICAgICAgaXRlbUZpbHRlcktleTogU3RyaW5nLCBpdGVtIGZpbHRlciBrZXlcbiAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcgW29wdGlvbmFsXVxuICAgICAgZGlzcGxheU5hbWU6IFN0cmluZyBbb3B0aW9uYWwsIGNhcGl0YWxpemVkIHBhcmFtX25hbWUgZGVmYXVsdF1cbiAgICAgIGRpc3BsYXlUZW1wbGF0ZTogY2FsbGJhY2ssIFN0cmluZyhpdGVtKSwgc3RyaW5nIHRlbXBsYXRlXG4gICAgICBkZWZhdWx0OiBpdGVtLCBkZWZhdWx0IHZhbHVlXG5cbiAgUmV0dXJuc1xuICAgIGRpc3A6IERpc3Bvc2FibGVcbiAgICBjaGFuZ2U6IG9iamVjdCBvZiBjaGFuZ2UgZnVuY3Rpb25zLCBrZXlzIGJlaW5nIHBhcmFtX25hbWVcbiAgKi9cbiAgYWRkIChzcGVjOiB7W3BhcmFtTmFtZTogc3RyaW5nXTogSVBhcmFtU3BlYzxhbnk+fSk6IERpc3Bvc2FibGVcblxuICAvKipcbiAgZ2V0Q29uZmlnUGFyYW0ocGFyYW1OYW1lKSBvciBnZXRDb25maWdQYXJhbShwbHVnaW5OYW1lLCBwYXJhbU5hbWUpXG5cbiAgcmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBwYXJhbWV0ZXJcbiAgdmFsdWUuXG5cbiAgUHJvbWlzZSBjYW4gYmUgcmVqZWN0ZWQgd2l0aCBlaXRoZXIgZXJyb3IsIG9yICd1bmRlZmluZWQnLiBMYXR0ZXJcbiAgaW4gY2FzZSB1c2VyIGNhbmNlbHMgcGFyYW0gc2VsZWN0aW9uIGRpYWxvZy5cbiAgKi9cbiAgZ2V0PFQ+IChwbHVnaW46IHN0cmluZywgbmFtZTogc3RyaW5nKTogUHJvbWlzZTxUPlxuICBnZXQ8VD4gKG5hbWU6IHN0cmluZyk6IFByb21pc2U8VD5cblxuICAvKipcbiAgc2V0Q29uZmlnUGFyYW0ocGFyYW1OYW1lLCB2YWx1ZSkgb3Igc2V0Q29uZmlnUGFyYW0ocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCB2YWx1ZSlcblxuICB2YWx1ZSBpcyBvcHRpb25hbC4gSWYgb21pdHRlZCwgYSBzZWxlY3Rpb24gZGlhbG9nIHdpbGwgYmUgcHJlc2VudGVkIHRvIHVzZXIuXG5cbiAgcmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBwYXJhbWV0ZXIgdmFsdWUuXG5cbiAgUHJvbWlzZSBjYW4gYmUgcmVqZWN0ZWQgd2l0aCBlaXRoZXIgZXJyb3IsIG9yICd1bmRlZmluZWQnLiBMYXR0ZXJcbiAgaW4gY2FzZSB1c2VyIGNhbmNlbHMgcGFyYW0gc2VsZWN0aW9uIGRpYWxvZy5cbiAgKi9cbiAgc2V0PFQ+IChwbHVnaW46IHN0cmluZywgbmFtZTogc3RyaW5nLCB2YWx1ZT86IFQpOiBQcm9taXNlPFQ+XG4gIHNldDxUPiAobmFtZTogc3RyaW5nLCB2YWx1ZT86IFQpOiBQcm9taXNlPFQ+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUgKHBsdWdpbk5hbWU6IHN0cmluZywgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlcik6IElNYWluSW50ZXJmYWNlIHtcbiAgcmV0dXJuIHtcbiAgICBhZGQgKHNwZWMpIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5hZGQocGx1Z2luTmFtZSwgc3BlYylcbiAgICB9LFxuICAgIGFzeW5jIGdldCAoLi4uYXJnczogYW55W10pIHtcbiAgICAgIGlmIChhcmdzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgYXJncy51bnNoaWZ0KHBsdWdpbk5hbWUpXG4gICAgICB9XG4gICAgICBjb25zdCBbcGx1Z2luLCBuYW1lXSA9IGFyZ3NcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5nZXQocGx1Z2luLCBuYW1lKVxuICAgIH0sXG4gICAgYXN5bmMgc2V0ICguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgMykge1xuICAgICAgICBhcmdzLnVuc2hpZnQocGx1Z2luTmFtZSlcbiAgICAgIH1cbiAgICAgIGNvbnN0IFtwbHVnaW4sIG5hbWUsIHZhbHVlXSA9IGFyZ3NcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5zZXQocGx1Z2luLCBuYW1lLCB2YWx1ZSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==