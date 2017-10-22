declare module 'atom-haskell-utils' {
  import { Directory, File, TextBuffer } from 'atom';
  export function isDirectory(dir: File | Directory | string | null): boolean;
  export function getRootDirFallback(file: File | Directory | null): Directory;
  export function getDirEntries(dir: Directory): Promise<Array<Directory | File>>;
  export function getRootDir(input: TextBuffer | File | string | null): Promise<Directory>;
  export function parseDotCabal(cabalSource: string): Promise<IDotCabal | null>;
  export function getComponentFromFile(cabalSource: string, filePath: string): Promise<string[]>;
  export function unlit(filename: string, source: string): Promise<string>;
  export function parseHsModuleImports(source: string): Promise<IModuleImports>;
  export let hsEscapeString: (input: string) => string;
  export interface ITarget {
      type: 'library' | 'executable' | 'test-suite' | 'benchmark';
      name: string;
      target: string;
  }
  export interface IDotCabal {
      name: string;
      version: string;
      targets: ITarget[];
  }
  export interface IImport {
      name: string;
      qualified: boolean;
      hiding: boolean;
      importList: null | Array<string | {
          parent: string;
      }>;
      alias: null | string;
  }
  export interface IModuleImports {
      name: string;
      imports: IImport[];
  }
  export interface IHS {
      parseDotCabal(cabalSource: string, callback: (result: IDotCabal | null) => void): void;
      parseDotCabalSync(cabalSource: string): IDotCabal;
      getComponentFromFile(cabalSource: string, filePath: string, callback: (result: string[]) => void): void;
      getComponentFromFileSync(cabalSource: string, filePath: string): string[];
      unlit(filename: string, source: string, callback: (error: null | string, result: null | string) => void): void;
      unlitSync(filename: string, source: string): string | {
          error: string;
      };
      parseHsModuleImports(source: string, callback: (result: {
          error: string;
      } | IModuleImports) => void): void;
      parseHsModuleImportsSync(source: string): IModuleImports;
      hsEscapeString(input: string): string;
  }
}
