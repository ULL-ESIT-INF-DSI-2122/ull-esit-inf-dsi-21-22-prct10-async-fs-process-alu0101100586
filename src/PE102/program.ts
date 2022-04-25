import { existsSync, watchFile } from "fs";
import { spawn } from 'child_process';
import { argv } from 'process';

/**
 * Clase simple que observa un fichero csv
 */
export class WatchCSV {
    private path: string;
    private col: string;

    /**
     * Contructor de la clase
     * @param file_path 
     * @param col 
     */
    constructor(file_path: string, col: string) {
        this.path = file_path;
        this.col = col;
    }

    /**
     * Funcion que observa el fichero expecificado
     */
    watchCSV() {
      if(existsSync(this.path)){
        watchFile(this.path, (curr, prev) => {
          console.log(`El fichero teniá un tamaño de ${prev.size}`);
          console.log(`Ahora tiene un tamaño de ${curr.size}`);

          let text: string[] = [];
          const cut = spawn('cut', ['-d', ',', '-f', this.col, this.path]);
          cut.stdout.on('data', (item) => text.push(item));

          console.log(text);
        });
      } else {
        console.log('No existe el fichero que quiere observar');
      }
    }
}

let aux = new WatchCSV(argv[2], argv[3]);
aux.watchCSV();