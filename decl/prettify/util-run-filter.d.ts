export interface IRunFilterArgs {
    command: string;
    args: string[];
    cwd: string;
    stdin?: string;
}
export declare function runFilter({command, args, cwd, stdin}: IRunFilterArgs): Promise<{}>;
