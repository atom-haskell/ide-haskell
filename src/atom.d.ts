export {}
declare module "atom" {
  interface CommandEvent {
    currentTarget: EventTarget & { getModel(): TextEditor }
  }
  interface Grammar {
    scopeName: string
  }
}
