import * as etch from 'etch'

export interface IProps extends JSX.Props {
  progress: number[]
}

export class ProgressBar implements JSX.ElementClass {
  constructor(public props: IProps) {
    etch.initialize(this)
  }

  public render() {
    const progress = this.aveProgress()
    return (
      <ide-haskell-progress-bar className={isNaN(progress) ? '' : 'visible'}>
        <span style={{ width: `${progress * 100}%`, height: `${progress * 100}%` }} />
      </ide-haskell-progress-bar>
    )
  }

  public async update(props: IProps) {
    if (this.props.progress !== props.progress) {
      this.props.progress = props.progress
      return etch.update(this)
    } else {
      return Promise.resolve()
    }
  }

  public async destroy() {
    await etch.destroy(this)
  }

  private aveProgress() {
    return this.props.progress.reduce((a, b) => a + b, 0) / this.props.progress.length
  }
}
