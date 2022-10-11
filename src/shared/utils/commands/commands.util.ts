/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { spawn } from 'child_process';
import _ from 'lodash';

class Command {
  processList: string[] = [];
  execute(commandLine: string): boolean {
    this.processList.push(commandLine);
    if (this.processList.length === 1) {
      this.processCommand();
      return true
    }
    return false
  }

  processCommand(): boolean {
    if (_.isNil(this.processList[0])) {
      return false;
    }
    const commandLine = this.processList[0];
    const commandArray = commandLine.split(' ');
    const command = commandArray[0];
    const parameters = [...commandArray].filter((_, idx) => idx > 0);

    if (_.isUndefined(command)) return false;

    const commands = spawn(command, parameters);

    commands.stdout.on('data', (data) => {
      if (data.indexOf('Executing') < 0) {
        console.log(`${data}`);
      }
    });

    commands.stderr.on('data', (data) => {
      console.error(`command: ${commandLine}`);
      console.error(`stderr: ${data}`);
      // process.exit();
    });

    commands.on('error', (error) => {
      console.error(`command: ${commandLine}`);
      console.error(`error: ${error.message}`);
      // process.exit();
    });

    commands.on('exit', (code: any, sign: any) => {
      this.processList = this.processList.filter((_, idx) => idx !== 0);
      commands.removeAllListeners();
      process.removeListener('exit', () => { });
      process.removeListener('SIGINT', () => { });
      this.processCommand();
    });

    return true;
  }
}

export { Command }