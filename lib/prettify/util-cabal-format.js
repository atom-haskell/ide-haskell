'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import FS from 'fs';
import Temp from 'temp';
import runFilter from './util-run-filter';
function makeTempFile(contents) {
    return new Promise((resolve, reject) => {
        Temp.open({ prefix: 'ide-haskell', suffix: '.cabal' }, (err, info) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            FS.writeSync(info.fd, contents);
            resolve(info);
        });
    });
}
function read(path) {
    return new Promise((resolve, reject) => {
        FS.readFile(path, { encoding: 'utf-8' }, (error, text) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                resolve(text);
            }
        });
    });
}
export default function (text, workingDirectory) {
    return __awaiter(this, void 0, void 0, function* () {
        let { path, fd } = yield makeTempFile(text);
        try {
            yield runFilter({
                command: atom.config.get('ide-haskell.cabalPath'),
                args: ['format', path],
                cwd: workingDirectory
            });
            let contents = yield read(path);
            return contents;
        }
        finally {
            FS.close(fd);
            FS.unlink(path);
        }
    });
}
