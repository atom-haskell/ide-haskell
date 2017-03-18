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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3VwaS0wLjMvaW5zdGFuY2UvcGFyYW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFpREEsZ0JBQXdCLFVBQWtCLEVBQUUsYUFBNEI7SUFDdEUsTUFBTSxDQUFDO1FBQ0wsR0FBRyxDQUFFLElBQUk7WUFDUCxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDL0QsQ0FBQztRQUNLLEdBQUcsQ0FBRSxHQUFHLElBQVc7O2dCQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7Z0JBQzFCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUE7Z0JBQzNCLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUMzRCxDQUFDO1NBQUE7UUFDSyxHQUFHLENBQUUsR0FBRyxJQUFXOztnQkFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUMxQixDQUFDO2dCQUNELE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQTtnQkFDbEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUNsRSxDQUFDO1NBQUE7S0FDRixDQUFBO0FBQ0gsQ0FBQztBQXBCRCx3QkFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Rpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5pbXBvcnQge1BsdWdpbk1hbmFnZXJ9IGZyb20gJy4uLy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHtJUGFyYW1TcGVjfSBmcm9tICcuLi8uLi9jb25maWctcGFyYW1zJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYWluSW50ZXJmYWNlIHtcbiAgLyoqXG4gIGFkZENvbmZpZ1BhcmFtXG4gICAgcGFyYW1fbmFtZTpcbiAgICAgIG9uQ2hhbmdlZDogY2FsbGJhY2sgdm9pZCh2YWx1ZSlcbiAgICAgIGl0ZW1zOiBBcnJheSBvciBjYWxsYmFjayBBcnJheSh2b2lkKVxuICAgICAgaXRlbVRlbXBsYXRlOiBjYWxsYmFjaywgU3RyaW5nKGl0ZW0pLCBodG1sIHRlbXBsYXRlXG4gICAgICBpdGVtRmlsdGVyS2V5OiBTdHJpbmcsIGl0ZW0gZmlsdGVyIGtleVxuICAgICAgZGVzY3JpcHRpb246IFN0cmluZyBbb3B0aW9uYWxdXG4gICAgICBkaXNwbGF5TmFtZTogU3RyaW5nIFtvcHRpb25hbCwgY2FwaXRhbGl6ZWQgcGFyYW1fbmFtZSBkZWZhdWx0XVxuICAgICAgZGlzcGxheVRlbXBsYXRlOiBjYWxsYmFjaywgU3RyaW5nKGl0ZW0pLCBzdHJpbmcgdGVtcGxhdGVcbiAgICAgIGRlZmF1bHQ6IGl0ZW0sIGRlZmF1bHQgdmFsdWVcblxuICBSZXR1cm5zXG4gICAgZGlzcDogRGlzcG9zYWJsZVxuICAgIGNoYW5nZTogb2JqZWN0IG9mIGNoYW5nZSBmdW5jdGlvbnMsIGtleXMgYmVpbmcgcGFyYW1fbmFtZVxuICAqL1xuICBhZGQgKHNwZWM6IHtbcGFyYW1OYW1lOiBzdHJpbmddOiBJUGFyYW1TcGVjPGFueT59KTogRGlzcG9zYWJsZVxuXG4gIC8qKlxuICBnZXRDb25maWdQYXJhbShwYXJhbU5hbWUpIG9yIGdldENvbmZpZ1BhcmFtKHBsdWdpbk5hbWUsIHBhcmFtTmFtZSlcblxuICByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHBhcmFtZXRlclxuICB2YWx1ZS5cblxuICBQcm9taXNlIGNhbiBiZSByZWplY3RlZCB3aXRoIGVpdGhlciBlcnJvciwgb3IgJ3VuZGVmaW5lZCcuIExhdHRlclxuICBpbiBjYXNlIHVzZXIgY2FuY2VscyBwYXJhbSBzZWxlY3Rpb24gZGlhbG9nLlxuICAqL1xuICBnZXQ8VD4gKHBsdWdpbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBQcm9taXNlPFQ+XG4gIGdldDxUPiAobmFtZTogc3RyaW5nKTogUHJvbWlzZTxUPlxuXG4gIC8qKlxuICBzZXRDb25maWdQYXJhbShwYXJhbU5hbWUsIHZhbHVlKSBvciBzZXRDb25maWdQYXJhbShwbHVnaW5OYW1lLCBwYXJhbU5hbWUsIHZhbHVlKVxuXG4gIHZhbHVlIGlzIG9wdGlvbmFsLiBJZiBvbWl0dGVkLCBhIHNlbGVjdGlvbiBkaWFsb2cgd2lsbCBiZSBwcmVzZW50ZWQgdG8gdXNlci5cblxuICByZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHBhcmFtZXRlciB2YWx1ZS5cblxuICBQcm9taXNlIGNhbiBiZSByZWplY3RlZCB3aXRoIGVpdGhlciBlcnJvciwgb3IgJ3VuZGVmaW5lZCcuIExhdHRlclxuICBpbiBjYXNlIHVzZXIgY2FuY2VscyBwYXJhbSBzZWxlY3Rpb24gZGlhbG9nLlxuICAqL1xuICBzZXQ8VD4gKHBsdWdpbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlPzogVCk6IFByb21pc2U8VD5cbiAgc2V0PFQ+IChuYW1lOiBzdHJpbmcsIHZhbHVlPzogVCk6IFByb21pc2U8VD5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSAocGx1Z2luTmFtZTogc3RyaW5nLCBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKTogSU1haW5JbnRlcmZhY2Uge1xuICByZXR1cm4ge1xuICAgIGFkZCAoc3BlYykge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmFkZChwbHVnaW5OYW1lLCBzcGVjKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0ICguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgMikge1xuICAgICAgICBhcmdzLnVuc2hpZnQocGx1Z2luTmFtZSlcbiAgICAgIH1cbiAgICAgIGNvbnN0IFtwbHVnaW4sIG5hbWVdID0gYXJnc1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmdldChwbHVnaW4sIG5hbWUpXG4gICAgfSxcbiAgICBhc3luYyBzZXQgKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICBpZiAoYXJncy5sZW5ndGggPCAzKSB7XG4gICAgICAgIGFyZ3MudW5zaGlmdChwbHVnaW5OYW1lKVxuICAgICAgfVxuICAgICAgY29uc3QgW3BsdWdpbiwgbmFtZSwgdmFsdWVdID0gYXJnc1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLnNldChwbHVnaW4sIG5hbWUsIHZhbHVlKVxuICAgIH1cbiAgfVxufVxuIl19