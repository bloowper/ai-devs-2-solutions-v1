import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

class CommandLineArguments {
    static _taskname = null;
    static _initialized = false;

    static initialize() {
        const argv = yargs(hideBin(process.argv)).argv;
        if (!argv.taskname) {
            throw new Error('taskname argument is not provided. you need to provide --taskname="taskname"');
        }
        this._taskname = argv.taskname;
        this._initialized = true;
    }

    static getTaskName() {
        this._throwIfNotInitialized();
        return this._taskname;
    }

    static _throwIfNotInitialized() {
        if (!this._initialized) {
            throw new Error('CommandLineArguments has not been initialized.');
        }
    }
}

export default CommandLineArguments;