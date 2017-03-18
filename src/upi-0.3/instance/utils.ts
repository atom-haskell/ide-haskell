import {Point, TextEditor, Range} from 'atom'
import {TEventRangeType} from '../../editor-control'
import {TPosition} from '../../results-db'

interface IEventRangeParams {
  editor: TextEditor
  detail?: any
  eventType: TEventRangeType
  pos: TPosition
  controller: undefined
}
export type TEventRangeCallback<T> = (pars: {pos: Point, crange: Range, eventType: TEventRangeType}) => T
export interface IMainInterface {
  /**
  Utility function to extract event range/type for a given event

  editor: TextEditor, editor that generated event
  detail: event detail, ignored if eventType is set
  eventType: String, event type, one of 'keyboard', 'context', 'mouse'
  pos: Point, or Point-like Object, event position, can be undefined
  controller: leave undefined, this is internal field

  callback: callback({pos, crange}, eventType)
    pos: Point, event position
    crange: Range, event range
    eventType: String, event type, one of 'keyboard', 'context', 'mouse'
  */
  withEventRange<T> (params: IEventRangeParams, callback: TEventRangeCallback<T>): T | undefined
}
