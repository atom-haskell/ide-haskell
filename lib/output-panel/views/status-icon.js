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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWljb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL3N0YXR1cy1pY29uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBQzVCLCtCQUEwQztBQU8xQztJQUlFLFlBQW1CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBRTVDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNuRCxLQUFLLEVBQUUsNEJBQTRCO1lBQ25DLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ1YsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFBO2dCQUNkLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzFFLEdBQUcsQ0FBQyxJQUFJLENBQUM7O29EQUVpQyxNQUFNLEtBQUssTUFBTTt5Q0FDNUIsTUFBTSxJQUFJLEVBQUU7O1dBRTFDLENBQUMsQ0FBQTtnQkFDSixDQUFDO2dCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3JCLENBQUM7U0FDRixDQUFDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBRUwsc0NBQXlCLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxHQUFJLENBQzNFLENBQUE7SUFDSCxDQUFDO0lBRVksTUFBTSxDQUFDLEtBQWE7O1lBRS9CLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUE7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRVksT0FBTzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzlCLENBQUM7S0FBQTtJQUVPLGlCQUFpQjtRQUN2QixNQUFNLElBQUksR0FBRztZQUNYLFFBQVEsRUFBRSxDQUFDO1lBQ1gsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsRUFBRTtZQUNYLEtBQUssRUFBRSxDQUFDO1NBQ1QsQ0FBQTtRQUNELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUN2RCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ3pFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtJQUMvQyxDQUFDO0NBQ0Y7QUF2REQsZ0NBdURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMgeyBzdGF0dXNNYXA6IE1hcDxzdHJpbmcsIFVQSS5JU3RhdHVzPiB9XG5cbnR5cGUgRWxlbWVudENsYXNzID0gSlNYLkVsZW1lbnRDbGFzc1xuXG5leHBvcnQgY2xhc3MgU3RhdHVzSWNvbiBpbXBsZW1lbnRzIEVsZW1lbnRDbGFzcyB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuaW5pdGlhbGl6ZWRcbiAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKGF0b20udG9vbHRpcHMuYWRkKHRoaXMuZWxlbWVudCwge1xuICAgICAgY2xhc3M6ICdpZGUtaGFza2VsbC1zdGF0dXMtdG9vbHRpcCcsXG4gICAgICB0aXRsZTogKCkgPT4ge1xuICAgICAgICBjb25zdCByZXMgPSBbXVxuICAgICAgICBmb3IgKGNvbnN0IFtwbHVnaW4sIHsgc3RhdHVzLCBkZXRhaWwgfV0gb2YgdGhpcy5wcm9wcy5zdGF0dXNNYXAuZW50cmllcygpKSB7XG4gICAgICAgICAgcmVzLnB1c2goYFxuICAgICAgICAgIDxpZGUtaGFza2VsbC1zdGF0dXMtaXRlbT5cbiAgICAgICAgICAgIDxpZGUtaGFza2VsbC1zdGF0dXMtaWNvbiBkYXRhLXN0YXR1cz1cIiR7c3RhdHVzfVwiPiR7cGx1Z2lufTwvaWRlLWhhc2tlbGwtc3RhdHVzLWljb24+XG4gICAgICAgICAgICA8aWRlLWhhc2tlbGwtc3RhdHVzLWRldGFpbD4ke2RldGFpbCB8fCAnJ308L2lkZS1oYXNrZWxsLXN0YXR1cy1kZXRhaWw+XG4gICAgICAgICAgPC9pZGUtaGFza2VsbC1zdGF0dXMtaXRlbT5cbiAgICAgICAgICBgKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXMuam9pbignJylcbiAgICAgIH0sXG4gICAgfSkpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5zYWZlLWFueVxuICAgICAgPGlkZS1oYXNrZWxsLXN0YXR1cy1pY29uIGRhdGFzZXQ9e3sgc3RhdHVzOiB0aGlzLmNhbGNDdXJyZW50U3RhdHVzKCkgfX0gLz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHByb3BzOiBJUHJvcHMpIHtcbiAgICAvLyBUT0RPOiBEaWZmIGFsZ29cbiAgICB0aGlzLnByb3BzLnN0YXR1c01hcCA9IHByb3BzLnN0YXR1c01hcFxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gICAgdGhpcy5wcm9wcy5zdGF0dXNNYXAuY2xlYXIoKVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjQ3VycmVudFN0YXR1cygpOiAncmVhZHknIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJyB8ICdwcm9ncmVzcycge1xuICAgIGNvbnN0IHByaW8gPSB7XG4gICAgICBwcm9ncmVzczogNSxcbiAgICAgIGVycm9yOiAyMCxcbiAgICAgIHdhcm5pbmc6IDEwLFxuICAgICAgcmVhZHk6IDAsXG4gICAgfVxuICAgIGNvbnN0IHN0QXJyID0gQXJyYXkuZnJvbSh0aGlzLnByb3BzLnN0YXR1c01hcC52YWx1ZXMoKSlcbiAgICBjb25zdCBbY29uc2Vuc3VzXSA9IHN0QXJyLnNvcnQoKGEsIGIpID0+IHByaW9bYi5zdGF0dXNdIC0gcHJpb1thLnN0YXR1c10pXG4gICAgcmV0dXJuIGNvbnNlbnN1cyA/IGNvbnNlbnN1cy5zdGF0dXMgOiAncmVhZHknXG4gIH1cbn1cbiJdfQ==