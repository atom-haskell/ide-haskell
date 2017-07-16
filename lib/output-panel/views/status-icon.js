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
            }
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
            ready: 0
        };
        const stArr = Array.from(this.props.statusMap.values());
        const [consensus] = stArr.sort((a, b) => prio[b.status] - prio[a.status]);
        return consensus ? consensus.status : 'ready';
    }
}
exports.StatusIcon = StatusIcon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWljb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL3N0YXR1cy1pY29uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBQzVCLCtCQUF3QztBQW1CeEM7SUFJRSxZQUFvQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUU1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRXJCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkQsS0FBSyxFQUFFLDRCQUE0QjtZQUNuQyxLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFBO2dCQUNkLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3hFLEdBQUcsQ0FBQyxJQUFJLENBQUM7O29EQUVpQyxNQUFNLEtBQUssTUFBTTt5Q0FDNUIsTUFBTSxJQUFJLEVBQUU7O1dBRTFDLENBQUMsQ0FBQTtnQkFDSixDQUFDO2dCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3JCLENBQUM7U0FDRixDQUFDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsc0NBQXlCLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBQyxHQUFHLENBQ3hFLENBQUE7SUFDSCxDQUFDO0lBRVksTUFBTSxDQUFFLEtBQWE7O1lBRWhDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUE7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRVksT0FBTzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzlCLENBQUM7S0FBQTtJQUVPLGlCQUFpQjtRQUN2QixNQUFNLElBQUksR0FBRztZQUNYLFFBQVEsRUFBRSxDQUFDO1lBQ1gsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsRUFBRTtZQUNYLEtBQUssRUFBRSxDQUFDO1NBQ1QsQ0FBQTtRQUNELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUN2RCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDekUsTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQTtJQUMvQyxDQUFDO0NBQ0Y7QUF0REQsZ0NBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tICdhdG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElOb3JtYWxTdGF0dXMge1xuICBzdGF0dXM6ICdyZWFkeScgfCAnZXJyb3InIHwgJ3dhcm5pbmcnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb2dyZXNzU3RhdHVzIHtcbiAgc3RhdHVzOiAncHJvZ3Jlc3MnXG4gIC8qKlxuICBmbG9hdCBiZXR3ZWVuIDAgYW5kIDEsIG9ubHkgcmVsZXZhbnQgd2hlbiBzdGF0dXMgaXMgJ3Byb2dyZXNzJ1xuICBpZiAwIG9yIHVuZGVmaW5lZCwgcHJvZ3Jlc3MgYmFyIGlzIG5vdCBzaG93blxuICAqL1xuICBwcm9ncmVzcz86IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBJU3RhdHVzID0gKElOb3JtYWxTdGF0dXMgfCBJUHJvZ3Jlc3NTdGF0dXMpICYge2RldGFpbDogc3RyaW5nfVxuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7c3RhdHVzTWFwOiBNYXA8c3RyaW5nLCBJU3RhdHVzPn1cblxuZXhwb3J0IGNsYXNzIFN0YXR1c0ljb24gaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5pbml0aWFsaXplZC1jbGFzcy1wcm9wZXJ0aWVzXG4gIHByaXZhdGUgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgY29uc3RydWN0b3IgKHB1YmxpYyBwcm9wczogSVByb3BzKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoYXRvbS50b29sdGlwcy5hZGQodGhpcy5lbGVtZW50LCB7XG4gICAgICBjbGFzczogJ2lkZS1oYXNrZWxsLXN0YXR1cy10b29sdGlwJyxcbiAgICAgIHRpdGxlOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IFtdXG4gICAgICAgIGZvciAoY29uc3QgW3BsdWdpbiwge3N0YXR1cywgZGV0YWlsfV0gb2YgdGhpcy5wcm9wcy5zdGF0dXNNYXAuZW50cmllcygpKSB7XG4gICAgICAgICAgcmVzLnB1c2goYFxuICAgICAgICAgIDxpZGUtaGFza2VsbC1zdGF0dXMtaXRlbT5cbiAgICAgICAgICAgIDxpZGUtaGFza2VsbC1zdGF0dXMtaWNvbiBkYXRhLXN0YXR1cz1cIiR7c3RhdHVzfVwiPiR7cGx1Z2lufTwvaWRlLWhhc2tlbGwtc3RhdHVzLWljb24+XG4gICAgICAgICAgICA8aWRlLWhhc2tlbGwtc3RhdHVzLWRldGFpbD4ke2RldGFpbCB8fCAnJ308L2lkZS1oYXNrZWxsLXN0YXR1cy1kZXRhaWw+XG4gICAgICAgICAgPC9pZGUtaGFza2VsbC1zdGF0dXMtaXRlbT5cbiAgICAgICAgICBgKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXMuam9pbignJylcbiAgICAgIH1cbiAgICB9KSlcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtc3RhdHVzLWljb24gZGF0YXNldD17e3N0YXR1czogdGhpcy5jYWxjQ3VycmVudFN0YXR1cygpfX0vPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUgKHByb3BzOiBJUHJvcHMpIHtcbiAgICAvLyBUT0RPOiBEaWZmIGFsZ29cbiAgICB0aGlzLnByb3BzLnN0YXR1c01hcCA9IHByb3BzLnN0YXR1c01hcFxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMucHJvcHMuc3RhdHVzTWFwLmNsZWFyKClcbiAgfVxuXG4gIHByaXZhdGUgY2FsY0N1cnJlbnRTdGF0dXMgKCk6ICdyZWFkeScgfCAnd2FybmluZycgfCAnZXJyb3InIHwgJ3Byb2dyZXNzJyB7XG4gICAgY29uc3QgcHJpbyA9IHtcbiAgICAgIHByb2dyZXNzOiA1LFxuICAgICAgZXJyb3I6IDIwLFxuICAgICAgd2FybmluZzogMTAsXG4gICAgICByZWFkeTogMFxuICAgIH1cbiAgICBjb25zdCBzdEFyciA9IEFycmF5LmZyb20odGhpcy5wcm9wcy5zdGF0dXNNYXAudmFsdWVzKCkpXG4gICAgY29uc3QgW2NvbnNlbnN1c10gPSBzdEFyci5zb3J0KChhLCBiKSA9PiBwcmlvW2Iuc3RhdHVzXSAtIHByaW9bYS5zdGF0dXNdKVxuICAgIHJldHVybiBjb25zZW5zdXMgPyBjb25zZW5zdXMuc3RhdHVzIDogJ3JlYWR5J1xuICB9XG59XG4iXX0=