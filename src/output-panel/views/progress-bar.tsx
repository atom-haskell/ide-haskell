import * as etch from 'etch'

export class ProgressBar {
  private progress: number[]
  constructor (props: {progress: number[]}) {
    this.progress = props.progress
    etch.initialize(this)
  }

  public render () {
    const progress = this.aveProgress()
    return (
      <ide-haskell-progress-bar className={isNaN(progress) ? '' : 'visible'}>
        <span style={{width: `${progress * 100}%`, height: `${progress * 100}%`}}>
        </span>
      </ide-haskell-progress-bar>
    )
  }

  public update (props: {progress: number[]}) {
    if (props && this.progress !== props.progress) {
      this.progress = props.progress
      etch.update(this)
    }
  }

  public async destroy () {
    await etch.destroy(this)
  }

  private aveProgress () {
    return this.progress.reduce((a, b) => a + b, 0) / this.progress.length
  }
}
