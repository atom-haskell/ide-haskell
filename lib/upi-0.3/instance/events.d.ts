import { CompositeDisposable, Disposable, TextBuffer } from 'atom';
import { PluginManager } from '../../plugin-manager';
export declare type TextBufferCallback = (buffer: TextBuffer) => void;
export interface IMainInterface {
    onWillSaveBuffer(callback: TextBufferCallback): Disposable;
    onDidSaveBuffer(callback: TextBufferCallback): Disposable;
    onDidStopChanging(callback: TextBufferCallback): Disposable;
}
export declare function create(pluginManager: PluginManager, disposables: CompositeDisposable): IMainInterface;
