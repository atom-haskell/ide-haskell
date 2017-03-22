declare module 'atom-select-list' {
    export = SelectListView
}
declare class SelectListView<T> {
  constructor(props: IProps<T>)
  element: HTMLElement
  focus(): void
}
declare interface IProps<T> {
  skipCommandsRegistration?: boolean
  items?: any[]
  maxResults?: number
  filter?: (items: T[], query: string) => T[]
  filterQuery?: (query: any) => string
  order?: (a: T, b: T) => number
  emptyMessage?: string | JSX.Element | JSX.Element[]
  errorMessage?: string | JSX.Element | JSX.Element[]
  infoMessage?: string | JSX.Element | JSX.Element[]
  loadingMessage?: string | JSX.Element | JSX.Element[]
  loadingBadge?: string | JSX.Element | JSX.Element[]
  itemsClassList?: string[]
  elementForItem: (item: any) => HTMLElement
  didChangeQuery?: (query: string) => void
  filterKeyForItem?: (item: T) => string
  didChangeSelection?: (item: T) => void
  didConfirmSelection?: (item: T) => void
  didConfirmEmptySelection?: () => void
  didCancelSelection?: () => void
}
