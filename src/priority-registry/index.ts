import { TextEditor, Disposable, Range } from 'atom'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType

interface SpecDefinition<T> {
  priority: number
  eventTypes?: TEventRangeType[]
  handler: (
    editor: TextEditor,
    crange: Range,
    type: TEventRangeType,
  ) => T | undefined | Promise<T | undefined>
}

export class PriorityRegistry<Spec> {
  protected providers: Array<
    SpecDefinition<Spec> & {
      pluginName: string
      eventTypes: TEventRangeType[]
    }
  > = []

  public dispose() {
    this.providers = []
  }

  public register(
    pluginName: string,
    provider: SpecDefinition<Spec>,
  ): Disposable {
    const idx = this.providers.findIndex(
      ({ priority }) => priority < provider.priority,
    )
    const defaultEvT: TEventRangeType[] = [
      TEventRangeType.selection,
      TEventRangeType.mouse,
      TEventRangeType.context,
    ]
    const record = {
      pluginName,
      eventTypes: provider.eventTypes ? provider.eventTypes : defaultEvT,
      priority: provider.priority,
      handler: provider.handler,
    }
    if (idx === -1) {
      this.providers.push(record)
    } else {
      this.providers.splice(idx, 0, record)
    }
    return new Disposable(() => {
      const ix = this.providers.indexOf(record)
      this.providers.splice(ix, 1)
    })
  }
}
