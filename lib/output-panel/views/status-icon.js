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
const etch = require("etch");
const atom_1 = require("atom");
class StatusIcon {
    constructor(props) {
        this.statusMap = props.statusMap;
        this.disposables = new atom_1.CompositeDisposable();
        etch.initialize(this);
        this.disposables.add(atom.tooltips.add(this.element, {
            class: 'ide-haskell-status-tooltip',
            title: () => {
                const res = [];
                for (const [plugin, { status, detail }] of this.statusMap.entries()) {
                    res.push(`
          <ide-haskell-status-item>
            <ide-haskell-status-icon data-status="${status}">${plugin}</ide-haskell-status-icon>
            <ide-haskell-status-detail>${detail || ''}</ide-haskell-status-detail>
          </ide-haskell-status-item>
          `);
                }
                return res.join('');
            }
        }));
    }
    render() {
        return (etch.dom("ide-haskell-status-icon", { dataset: { status: this.calcCurrentStatus() } }));
    }
    update(props) {
        if (props) {
            this.statusMap = props.statusMap;
            etch.update(this);
        }
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
            this.statusMap.clear();
        });
    }
    calcCurrentStatus() {
        const prio = {
            progress: 5,
            error: 20,
            warning: 10,
            ready: 0
        };
        const stArr = Array.from(this.statusMap.values());
        const [consensus] = stArr.sort((a, b) => prio[b.status] - prio[a.status]);
        return consensus ? consensus.status : 'ready';
    }
}
exports.StatusIcon = StatusIcon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWljb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL3N0YXR1cy1pY29uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBQzVCLCtCQUF3QztBQWlCeEM7SUFLRSxZQUFhLEtBQXdDO1FBQ25ELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQTtRQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUU1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRXJCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkQsS0FBSyxFQUFFLDRCQUE0QjtZQUNuQyxLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFBO2dCQUNkLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDbEUsR0FBRyxDQUFDLElBQUksQ0FBQzs7b0RBRWlDLE1BQU0sS0FBSyxNQUFNO3lDQUM1QixNQUFNLElBQUksRUFBRTs7V0FFMUMsQ0FBQyxDQUFBO2dCQUNKLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDckIsQ0FBQztTQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FDTCxzQ0FBeUIsT0FBTyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFDLEdBQUcsQ0FDeEUsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNLENBQUUsS0FBeUM7UUFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUVWLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQTtZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUM7SUFDSCxDQUFDO0lBRVksT0FBTzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDeEIsQ0FBQztLQUFBO0lBRU8saUJBQWlCO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHO1lBQ1gsUUFBUSxFQUFFLENBQUM7WUFDWCxLQUFLLEVBQUUsRUFBRTtZQUNULE9BQU8sRUFBRSxFQUFFO1lBQ1gsS0FBSyxFQUFFLENBQUM7U0FDVCxDQUFBO1FBQ0QsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDakQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ3pFLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUE7SUFDL0MsQ0FBQztDQUNGO0FBMURELGdDQTBEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcbmltcG9ydCB7Q29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcblxuZXhwb3J0IGludGVyZmFjZSBJTm9ybWFsU3RhdHVzIHtcbiAgc3RhdHVzOiAncmVhZHknIHwgJ2Vycm9yJyB8ICd3YXJuaW5nJ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9ncmVzc1N0YXR1cyB7XG4gIHN0YXR1czogJ3Byb2dyZXNzJ1xuICAvKipcbiAgZmxvYXQgYmV0d2VlbiAwIGFuZCAxLCBvbmx5IHJlbGV2YW50IHdoZW4gc3RhdHVzIGlzICdwcm9ncmVzcydcbiAgaWYgMCBvciB1bmRlZmluZWQsIHByb2dyZXNzIGJhciBpcyBub3Qgc2hvd25cbiAgKi9cbiAgcHJvZ3Jlc3M/OiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgSVN0YXR1cyA9IChJTm9ybWFsU3RhdHVzIHwgSVByb2dyZXNzU3RhdHVzKSAmIHtkZXRhaWw6IHN0cmluZ31cblxuZXhwb3J0IGNsYXNzIFN0YXR1c0ljb24ge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bmluaXRpYWxpemVkLWNsYXNzLXByb3BlcnRpZXNcbiAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBwcml2YXRlIHN0YXR1c01hcDogTWFwPHN0cmluZywgSVN0YXR1cz5cbiAgY29uc3RydWN0b3IgKHByb3BzOiB7c3RhdHVzTWFwOiBNYXA8c3RyaW5nLCBJU3RhdHVzPn0pIHtcbiAgICB0aGlzLnN0YXR1c01hcCA9IHByb3BzLnN0YXR1c01hcFxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGF0b20udG9vbHRpcHMuYWRkKHRoaXMuZWxlbWVudCwge1xuICAgICAgY2xhc3M6ICdpZGUtaGFza2VsbC1zdGF0dXMtdG9vbHRpcCcsXG4gICAgICB0aXRsZTogKCkgPT4ge1xuICAgICAgICBjb25zdCByZXMgPSBbXVxuICAgICAgICBmb3IgKGNvbnN0IFtwbHVnaW4sIHtzdGF0dXMsIGRldGFpbH1dIG9mIHRoaXMuc3RhdHVzTWFwLmVudHJpZXMoKSkge1xuICAgICAgICAgIHJlcy5wdXNoKGBcbiAgICAgICAgICA8aWRlLWhhc2tlbGwtc3RhdHVzLWl0ZW0+XG4gICAgICAgICAgICA8aWRlLWhhc2tlbGwtc3RhdHVzLWljb24gZGF0YS1zdGF0dXM9XCIke3N0YXR1c31cIj4ke3BsdWdpbn08L2lkZS1oYXNrZWxsLXN0YXR1cy1pY29uPlxuICAgICAgICAgICAgPGlkZS1oYXNrZWxsLXN0YXR1cy1kZXRhaWw+JHtkZXRhaWwgfHwgJyd9PC9pZGUtaGFza2VsbC1zdGF0dXMtZGV0YWlsPlxuICAgICAgICAgIDwvaWRlLWhhc2tlbGwtc3RhdHVzLWl0ZW0+XG4gICAgICAgICAgYClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLmpvaW4oJycpXG4gICAgICB9XG4gICAgfSkpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXN0YXR1cy1pY29uIGRhdGFzZXQ9e3tzdGF0dXM6IHRoaXMuY2FsY0N1cnJlbnRTdGF0dXMoKX19Lz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlIChwcm9wcz86IHtzdGF0dXNNYXA6IE1hcDxzdHJpbmcsIElTdGF0dXM+fSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgLy8gVE9ETzogRGlmZiBhbGdvXG4gICAgICB0aGlzLnN0YXR1c01hcCA9IHByb3BzLnN0YXR1c01hcFxuICAgICAgZXRjaC51cGRhdGUodGhpcylcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gICAgdGhpcy5zdGF0dXNNYXAuY2xlYXIoKVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjQ3VycmVudFN0YXR1cyAoKTogJ3JlYWR5JyB8ICd3YXJuaW5nJyB8ICdlcnJvcicgfCAncHJvZ3Jlc3MnIHtcbiAgICBjb25zdCBwcmlvID0ge1xuICAgICAgcHJvZ3Jlc3M6IDUsXG4gICAgICBlcnJvcjogMjAsXG4gICAgICB3YXJuaW5nOiAxMCxcbiAgICAgIHJlYWR5OiAwXG4gICAgfVxuICAgIGNvbnN0IHN0QXJyID0gQXJyYXkuZnJvbSh0aGlzLnN0YXR1c01hcC52YWx1ZXMoKSlcbiAgICBjb25zdCBbY29uc2Vuc3VzXSA9IHN0QXJyLnNvcnQoKGEsIGIpID0+IHByaW9bYi5zdGF0dXNdIC0gcHJpb1thLnN0YXR1c10pXG4gICAgcmV0dXJuIGNvbnNlbnN1cyA/IGNvbnNlbnN1cy5zdGF0dXMgOiAncmVhZHknXG4gIH1cbn1cbiJdfQ==