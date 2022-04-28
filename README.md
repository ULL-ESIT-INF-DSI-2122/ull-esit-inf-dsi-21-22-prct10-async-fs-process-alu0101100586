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
  
