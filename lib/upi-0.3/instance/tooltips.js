import { Disposable } from 'atom';
export function create(pluginManager, main, instance) {
    return {
        show({ editor, pos, eventType, detail, tooltip }) {
            const controller = pluginManager.controller(editor);
            main.withEventRange({ controller, pos, detail, eventType }, ({ crange, pos }, eventType) => {
                Promise.resolve(tooltip(crange)).then(({ range, text, persistOnCursorMove }) => controller.showTooltip(pos, range, text, { eventType, subtype: 'external', persistOnCursorMove }))
                    .catch((status = { status: 'warning' }) => {
                    if (status.message) {
                        console.warn(status);
                        status = { status: 'warning' };
                    }
                    if (!status.ignore) {
                        controller.hideTooltip({ eventType });
                        instance.messages.status(status);
                    }
                });
            });
        },
        onShouldShowTooltip(...args) {
            if (args.length < 2) {
                args.unshift(100);
            }
            const [priority, handler] = args;
            const obj = { priority, handler };
            instance.tooltipEvents.add(obj);
            return new Disposable(() => instance.tooltipEvents.delete(obj));
        }
    };
}
