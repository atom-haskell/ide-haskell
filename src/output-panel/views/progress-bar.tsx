import * as etch from 'etch'

export interface IProps extends JSX.Props {
  progress: number[]
}

type ElementClass = JSX.ElementClass

export class ProgressBar implements ElementClass {
  constructor(public props: IProps) {
    etch.initialize(this)
  }

  public render() {
    const progress = this.aveProgress()
    if (isNaN(progress)) return <progress style={{ display: 'none' }} />
    else if (progress === 0) return <progress />
    else return <progress value={progress.toString()} max="1" />
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
    return (
      this.props.progress.reduce((a, b) => a + b, 0) /
      this.props.progress.length
    )
  }
}
