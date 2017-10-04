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
        this.props = props;
        this.disposables = new atom_1.CompositeDisposable();
        etch.initialize(this);
        this.disposables.add(atom.tooltips.add(this.element, {
            class: 'ide-haskell-status-tooltip',
            title: () => {
                const res = [];
                for (const [plugin, { status, detail }] of this.props.statusMap.entries()) {
                    res.push(`
          <ide-haskell-status-item>
            <ide-haskell-status-icon data-status="${status}">${plugin}</ide-haskell-status-icon>
            <ide-haskell-status-detail>${detail || ''}</ide-haskell-status-detail>
          </ide-haskell-status-item>
          `);
                }
                return res.join('');
            },
        }));
    }
    render() {
        return (etch.dom("ide-haskell-status-icon", { dataset: { status: this.calcCurrentStatus() } }));
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            this.props.statusMap = props.statusMap;
            return etch.update(this);
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
            this.props.statusMap.clear();
        });
    }
    calcCurrentStatus() {
        const prio = {
            progress: 5,
            error: 20,
            warning: 10,
            ready: 0,
        };
        const stArr = Array.from(this.props.statusMap.values());
        const [consensus] = stArr.sort((a, b) => prio[b.status] - prio[a.status]);
        return consensus ? consensus.status : 'ready';
    }
}
exports.StatusIcon = StatusIcon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWljb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL3N0YXR1cy1pY29uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBQzVCLCtCQUEwQztBQUkxQztJQUlFLFlBQW1CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBRTVDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNuRCxLQUFLLEVBQUUsNEJBQTRCO1lBQ25DLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ1YsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFBO2dCQUNkLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzFFLEdBQUcsQ0FBQyxJQUFJLENBQUM7O29EQUVpQyxNQUFNLEtBQUssTUFBTTt5Q0FDNUIsTUFBTSxJQUFJLEVBQUU7O1dBRTFDLENBQUMsQ0FBQTtnQkFDSixDQUFDO2dCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3JCLENBQUM7U0FDRixDQUFDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsc0NBQXlCLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxHQUFJLENBQzNFLENBQUE7SUFDSCxDQUFDO0lBRVksTUFBTSxDQUFDLEtBQWE7O1lBRS9CLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUE7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRVksT0FBTzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzlCLENBQUM7S0FBQTtJQUVPLGlCQUFpQjtRQUN2QixNQUFNLElBQUksR0FBRztZQUNYLFFBQVEsRUFBRSxDQUFDO1lBQ1gsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsRUFBRTtZQUNYLEtBQUssRUFBRSxDQUFDO1NBQ1QsQ0FBQTtRQUNELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUN2RCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ3pFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtJQUMvQyxDQUFDO0NBQ0Y7QUF0REQsZ0NBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIGV4dGVuZHMgSlNYLlByb3BzIHsgc3RhdHVzTWFwOiBNYXA8c3RyaW5nLCBVUEkuSVN0YXR1cz4gfVxuXG5leHBvcnQgY2xhc3MgU3RhdHVzSWNvbiBpbXBsZW1lbnRzIEpTWC5FbGVtZW50Q2xhc3Mge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bmluaXRpYWxpemVkXG4gIHByaXZhdGUgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgY29uc3RydWN0b3IocHVibGljIHByb3BzOiBJUHJvcHMpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLmVsZW1lbnQsIHtcbiAgICAgIGNsYXNzOiAnaWRlLWhhc2tlbGwtc3RhdHVzLXRvb2x0aXAnLFxuICAgICAgdGl0bGU6ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzID0gW11cbiAgICAgICAgZm9yIChjb25zdCBbcGx1Z2luLCB7IHN0YXR1cywgZGV0YWlsIH1dIG9mIHRoaXMucHJvcHMuc3RhdHVzTWFwLmVudHJpZXMoKSkge1xuICAgICAgICAgIHJlcy5wdXNoKGBcbiAgICAgICAgICA8aWRlLWhhc2tlbGwtc3RhdHVzLWl0ZW0+XG4gICAgICAgICAgICA8aWRlLWhhc2tlbGwtc3RhdHVzLWljb24gZGF0YS1zdGF0dXM9XCIke3N0YXR1c31cIj4ke3BsdWdpbn08L2lkZS1oYXNrZWxsLXN0YXR1cy1pY29uPlxuICAgICAgICAgICAgPGlkZS1oYXNrZWxsLXN0YXR1cy1kZXRhaWw+JHtkZXRhaWwgfHwgJyd9PC9pZGUtaGFza2VsbC1zdGF0dXMtZGV0YWlsPlxuICAgICAgICAgIDwvaWRlLWhhc2tlbGwtc3RhdHVzLWl0ZW0+XG4gICAgICAgICAgYClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLmpvaW4oJycpXG4gICAgICB9LFxuICAgIH0pKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXN0YXR1cy1pY29uIGRhdGFzZXQ9e3sgc3RhdHVzOiB0aGlzLmNhbGNDdXJyZW50U3RhdHVzKCkgfX0gLz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHByb3BzOiBJUHJvcHMpIHtcbiAgICAvLyBUT0RPOiBEaWZmIGFsZ29cbiAgICB0aGlzLnByb3BzLnN0YXR1c01hcCA9IHByb3BzLnN0YXR1c01hcFxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gICAgdGhpcy5wcm9wcy5zdGF0dXNNYXAuY2xlYXIoKVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjQ3VycmVudFN0YXR1cygpOiAncmVhZHknIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJyB8ICdwcm9ncmVzcycge1xuICAgIGNvbnN0IHByaW8gPSB7XG4gICAgICBwcm9ncmVzczogNSxcbiAgICAgIGVycm9yOiAyMCxcbiAgICAgIHdhcm5pbmc6IDEwLFxuICAgICAgcmVhZHk6IDAsXG4gICAgfVxuICAgIGNvbnN0IHN0QXJyID0gQXJyYXkuZnJvbSh0aGlzLnByb3BzLnN0YXR1c01hcC52YWx1ZXMoKSlcbiAgICBjb25zdCBbY29uc2Vuc3VzXSA9IHN0QXJyLnNvcnQoKGEsIGIpID0+IHByaW9bYi5zdGF0dXNdIC0gcHJpb1thLnN0YXR1c10pXG4gICAgcmV0dXJuIGNvbnNlbnN1cyA/IGNvbnNlbnN1cy5zdGF0dXMgOiAncmVhZHknXG4gIH1cbn1cbiJdfQ==