import * as etch from 'etch'

type TDirection = 'horizontal' | 'vertical'

export class ProgressBar {
  private direction: TDirection
  private progress: number
  constructor ({orientation = 'horizontal'}: {orientation?: TDirection} = {}) {
    this.direction = orientation
    this.progress = NaN
    etch.initialize(this)
  }

  public render () {
    return (
      <ide-haskell-progress-bar className={isNaN(this.progress) ? '' : 'visible'}>
        <span style={`${this.direction === 'horizontal' ? 'width' : 'height'}: ${this.progress * 100}%`}>
        </span>
      </ide-haskell-progress-bar>
    )
  }

  public update ({orientation = 'horizontal'}: {orientation?: TDirection} = {}) {
    this.direction = orientation
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
