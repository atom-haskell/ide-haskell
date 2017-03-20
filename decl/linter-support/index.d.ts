import { ResultsDB } from '../results-db';
import * as Linter from './linter';
export * from './linter';
export declare class LinterSupport {
    private linter;
    private resultDb;
    private disposables;
    constructor(linter: Linter.ILinter, resultDb: ResultsDB);
    destroy(): void;
    update(): void;
    private messages();
}
