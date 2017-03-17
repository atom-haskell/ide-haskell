'use babel';
import { BufferedProcess } from 'atom';
export default function ({ command, args, cwd, stdin }) {
    return new Promise((resolve, reject) => {
        let lines = [];
        let stderr = [];
        let proc = new BufferedProcess({
            command: command,
            args: args,
            options: { cwd },
            stdout: (line) => { lines.push(line); },
            stderr: (line) => { stderr.push(line); },
            exit: (code) => {
                if (stderr.length > 0) {
                    atom.notifications.addError('Prettifier problems', {
                        message: 'Prettifier reported some problems',
                        detail: stderr.join(''),
                        dismissable: true
                    });
                }
                if (code === 0) {
                    resolve(lines.join(''));
                }
                else {
                    reject(new Error(`Prettifier exited with non-zero exit status ${code}`));
                }
            }
        });
        proc.onWillThrowError(({ error, handle }) => {
            console.error(error);
            reject(error);
            handle();
        });
        if (stdin) {
            proc.process.stdin.write(stdin);
            proc.process.stdin.end();
        }
    });
}
