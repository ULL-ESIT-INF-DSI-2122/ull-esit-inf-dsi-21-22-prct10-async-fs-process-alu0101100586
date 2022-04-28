[![Test](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101100586/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101100586/actions/workflows/node.js.yml)<space><space>
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101100586/badge.svg)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101100586)<space><space>
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101100586&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101100586)<space><space>

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
  