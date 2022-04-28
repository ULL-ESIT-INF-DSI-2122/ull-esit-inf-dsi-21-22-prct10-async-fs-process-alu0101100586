import * as yargs from 'yargs';
import * as fs from 'fs';
import {spawn} from 'child_process';
import * as chalk from 'chalk'

yargs.command({
  command: 'occ',
  describe: 'Devuelve el numero de ocurrencias de una palabra en un archivo especificado',
  builder: {
    path: {
      describe: 'Ruta del archivo a analizar',
      demandOption: true,
      type: 'string',
    },
    word: {
      describe: 'Palabra a la que buscar concurrencias',
      demandOption: true,
      type: 'string',
    },
    pipe: {
      describe: 'Opcion que le dice al programa el método de ejecucion',
      demandOption: true,
      type: 'boolean',
    },
  },
  handler (argv) {
    if (typeof argv.path === 'string' && typeof argv.word === 'string' && 
        typeof argv.pipe === 'boolean') {
      if(argv.pipe) withPipe(argv.path, argv.word);
      else withoutPipe(argv.path, argv.word);
    } else {
      console.log(chalk.red.inverse('ERROR: Argumentos no permitidos o insuficientes'));
    }
  },
});

yargs.parse();

function withPipe(path: string, word: string) {
  if(fs.existsSync(path)) {
    console.log('Ocurrencias: ');
    let cat = spawn('cat', [path]);
    let grep = spawn('grep', ['-c', word]);
    cat.stdout.pipe(grep.stdin);
    grep.stdout.pipe(process.stdin);
  } else {
    console.log(chalk.red.inverse('ERROR: El archivo ingresado no existe o no se puede encontrar'));
  }
}

function withoutPipe(path: string, word: string) {
  if(fs.existsSync(path)) {
    let occ: number = 0;
    let cat = spawn('cat', [path]);
    let output = '';
    cat.stdout.on('data', (item) => output += item);
    
    cat.on('close', () => {
      console.log('Ocurrencias: ');
      let output_array = output.split(/\s+/);
      output_array.forEach((item) => {if (item == word) occ++});
      console.log(chalk.blue(occ)); 
    });
  } else {
    console.log(chalk.red.inverse('ERROR: El archivo ingresado no existe o no se puede encontrar'));
  }
}