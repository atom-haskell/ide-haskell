import * as etch from 'etch'

export class ProgressBar {
  private progress: number
  constructor () {
    this.progress = NaN
    etch.initialize(this)
  }

  public render () {
    return (
      <ide-haskell-progress-bar className={isNaN(this.progress) ? '' : 'visible'}>
        <span style={{width: `${this.progress * 100}%`, height: `${this.progress * 100}%`}}>
        </span>
      </ide-haskell-progress-bar>
    )
  }

  public update () {
    return etch.update(this)
  }

  public setProgress (progress: number) {
    this.progress = progress
    this.update()
  }

  public async destroy () {
    await etch.destroy(this)
  }
}
