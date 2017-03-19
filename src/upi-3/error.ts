export class UPIError extends Error {
  constructor (message: string) {
    super(message)
    Object.defineProperty(this, 'name', {value: this.constructor.name})
    Object.defineProperty(this, 'message', {value: message})
    Error.captureStackTrace(this, this.constructor)
  }
}
