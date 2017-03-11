'use babel'

export default class ResultItem {
  constructor (parent, {uri, message, severity, position}) {
    this.parent = parent
    this.uri = uri
    this.message = message
    this.severity = severity
    this.position = position
  }

  destroy () {
    if (this.parent) this.parent.removeResult(this)
  }
}
