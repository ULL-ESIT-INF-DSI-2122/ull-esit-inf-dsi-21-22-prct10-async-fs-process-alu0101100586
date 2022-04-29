import * as yargs from 'yargs';
import * as fs from 'fs';
import * as chalk from 'chalk';

yargs.command({
  command: 'watch',
  describe: 'Observa el directorio de un usuario especifico, para ver si existen cambios',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    path: {
      describe: 'Ruta del directorio del usuario a observar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if(typeof argv.user === 'string' && typeof argv.path === 'string') {
      let aux_user: string = argv.user, aux_path: string = argv.path;
      let curr: number = 0, pre: number = 0;

      fs.readdir(aux_path, (err, files) => {
        if(err) console.log(chalk.red.inverse('ERROR: No se puedo leer el directorio'));
        else pre = files.length;
      });

      fs.access(aux_path, fs.constants.F_OK, (err) => {
        let wait: boolean = false;
        if(err) console.log(chalk.red.inverse(`ERROR: ${aux_user} no puede acceder al directorio`));
        else {
          fs.watch(aux_path, (eventType, f_name) => {
            if(wait) return;
            else {
              wait = true;
              fs.readdir(aux_path, (err, files) => {
                if(err) console.log(chalk.red.inverse('ERROR: No se puedo leer el directorio'));
                else {
                  curr = files.length;
                  if(eventType === 'rename') console.log(`La nota ${f_name} fue eliminada`);             
                  else if(eventType === 'change') console.log(`La nota ${f_name} fue modificada`);
                  else if(pre < curr) {
                    console.log(chalk.green.inverse(`La nota ${f_name} fue agregada en el directorio`));
                    pre = curr;
                  }
                }
                setTimeout(() => {
                  wait = false;
                }, 100);
              });
            }
          });
        }
      });
    } else {
      console.log(chalk.red.inverse('ERROR: Argumentos no válidos'));
    }
  },
});

yargs.parse();