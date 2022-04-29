# DESARROLLO DE SISTEMAS INFORMATICOS  
## Práctica 10 - Sistema de ficheros y creación de procesos en Node.js  
## Jonay Estévez Díaz  
  
# Ejercicios Propuestos  
  
## Ejercicio 1:  
  
En este ejercicio, se propuso la ejecución y análisis de un código presentado en el propio guión de la práctica. Además se necesitó el fichero `helloworld,txt`, el cual se podrá encontrar en la carpeta del proyecto de nombre `database`. Por lo tanto, se procedió a la ejecución del sigueinte código:  
  
```typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
  
En las siguientes tablas se irá relatando la traza del código anteriormente mencionado la pila de llamada, el registro de eventeos de la API y la cola e manejadores:  
* Paso Inicial:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| -- | -- | -- |

* Paso 1:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| main | -- | -- |

* Paso 2:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| access | -- | -- |
| main | -- | -- |

* Paso 3:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| main | access | -- |

* Paso 4:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| -- | callback (access) | -- |

* Paso 5:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| callback (access) | -- | -- |

* Paso 6:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| console.log (Línea 12) | -- | -- |
| callback (access) | -- | -- |

* Paso 7:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| callback (access) | -- | -- |

* Paso 8:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| watch(process.argv[2]) (Línea 14) | -- | -- |
| callback (access) | -- | -- |

* Paso 9:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| callback (access) | -- | -- |

* Paso 10:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| watcher.on('change') (Línea 16 - 18) | -- | -- |
| callback (access) | -- | -- |

* Paso 11:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| callback (access) | watcher.on('change') (Línea 16 - 18) | -- |

* Paso 12:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| console.log() (Línea 20) | watcher.on('change') (Línea 16 - 18) | -- |
| callback (access) | watcher.on('change') (Línea 16 - 18) | -- |

* Paso 13:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| watcher.on('change') (Línea 16 - 18) | -- | helloworld.txt no es observado |

* Paso 14:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| watcher.on('change') (Línea 16 - 18) | callback (watcher.on) | -- |

* Paso 15:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| callback (watcher.on) | watcher.on('change') (Línea 16 - 18) | -- |

* Paso 16:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| console.log() (Línea 17) | -- | -- |
| callback (watcher.on) | watcher.on('change') (Línea 16 - 18) | -- |

* Paso 17:

| Pila de llamadas | Registro de eventos | Cola de manejadores |
| -- | -- | -- |
| watcher.on('change') (Línea 16 - 18) | -- | helloworld fue modificado |

* Pasos 18, 19, 20 y 21 son una repetición de los últimos pasos trazados.
  
### Función Access:  
  
Método utilizado para comprobar los permidos de un archivo/directorio concreto. Éstos, que son comprobados, pueden ser especificados como un parámetro usando las constantes de acceso a archivos/directorios.  
  
### Objeto Constanst:
  
Es usado en las operaciones del sistemas de archivos, pues éste contiene las constantes utilizadas para llevar a cabo todas las operaciones de este tipo.
  
## Ejercicio 2: 
  
Para el desarrollo de este ejercicio, hemos usado las herramientas de `yargs`, `child_process` y `fs`.  
  
Se creó el comando `occ`, al cual le tenemos que pasar 3 argumentos, el primero de nombre `path`, de tipo `string` al que le pasaremos la ruta el archivo donde queremos ver las ocurrencias. En segundo lugar, tenemos como argumento, otro `string`
que será el elemtneo que necesitamos machear con la informacion que contiene el fichero. Por último, tenemos una opcion de tipo `boolana` con la que diremos si el programa hará uso o no del método `pipe`. Por tanto, el código desarrollado quedó de la siguiente manera:

```typescript
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
```
  
> node dist/Ejercicio_2/ejercicio_2.js occ --path="Ruta Archivo" --word="Expresión" --pipe=true/false
  
El método `withPipe()` recibe como atributos la ruta del fichero y la palabra a encontrar. En principio comprobamos que la ruta y el archivo existen o no. En caso afirmativo, realizamos dos métodos `spawn`, el primero para el comando `cat` y el segundo para `grep`. Con ello lo que conseguimos es redirigir la salida del comando `cat` hacia el comando `grep` que nos devolverá el número de coincidencias.  
  
```typescript
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
```
  
El método `withoutPipe()` recibe como parámetros, los mismos que la funcion `withPipe()`. Al igual que entes, comprobamos si el archivo existe, y si es así, creamos un `spawn` para el comando `cat`, y dado que no usamos `pipe` almacenamos la informacion de salida en la variable `output`, para luego tratarlo como un array y obtener de esta manera, el contenido del fichero y luego comprobamos con un `forEach()` si cada uno de esos elementos son ocurrencias.  
  
```typescript
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
```
  
## Ejercicio 3: 
  
Para el desarrollo de este ejercicio, hemos usado las herramientas de `yargs`, `child_process` y `fs`. 
  
Se creó el comando `watch`, que recibe como parametros `user`, string que recibe el usuario de las notas, y `path`, string con la ruta del directorio del usuario a observar. Para la creacion, al igual que en el ejercicio anterior, se usó la creacon de comandos con yargs. En este caso, no se creó ninguna funcion auxiliar, si no que se trabajó directamente en el `handler`del comando creado.  
  
Se usó la función `readdir()` que es asíncrona, especificandole la ruta ingresada por linea de comandos, para obtener el tamaño de la carpeta, en cado de que el `callback` diera error, se muestra por pantalla que el directorio no se ha podido leer correctamente.  
  
Tras ello, haciendo usao de la funcion `access`, comprobamos si el usuario tiene los permisos necesarios para abrir la carpeta, en caso contrario, al igual que antes, se mostrará un mensaje de error. En caso afirmativo, se hará usao de la función `watch` para observar los cambior que pueda tener el directorio, ya sea adición de un nuevo fichero, modificacion o eliminacion de uno existente.  
  
Como por el camino, se ha obtenido el tamaño de la carpeta, el código puede deducir, si se ha añadido un nuevo fichero, pero tambien, se puede obtener por los eventos, si se han realizado las otrras operaciones antes mencionadas.  
  
Finalmente, a función asíncrona `setTimeout` la usamos para que no se muestren mensajes duplicados.  
  
```typescript
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
```
  
## Ejercicio 4: 
  
No se pudo realizar.  
