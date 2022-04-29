import * as chalk from 'chalk';

/**
 * Clase de nombre Notes que describe una nota y sus cualidades como el título, el cuerpo y el color de la misma
 */
export class Notes {

  /**
   * Contructor de la clase Notes que nos permite instanciar una nueva nota
   * @param title Titulo de la nota
   * @param text Texto de contiene la nota
   * @param color color de la nota, (solo puede ser amarilla, azul, verde o roja)
   */
  constructor(protected title: string, protected text: string, 
    protected color: string) { }
  
  /**
   * Retorna el titulo de la nota
   * @returns string
   */
  getTitle(): string {
    return this.title;
  }

  /**
   * Retorna el texto de la nota
   * @returns string
   */
  getText(): string {
    return this.text;
  }

  /**
   * Retorna el color de la nota
   * @returns string;
   */
  getColor(): string {
    return this.color;
  }

  /**
   * Modifica el titulo de la nota a uno nuevo
   * @param new_title Nuevo titulo de la nota
   */
  setTitle(new_title: string): void {
    this.title = new_title;
  }

  /**
   * Modifica el cuerpo de la nota
   * @param new_text nuevo cuerpo de la nota
   */
  setText(new_text: string): void {
    this.text = new_text;
  }

  /**
   * Modifica el color de la nota
   * @param new_color nuevo color de la nota
   */
  setColor(new_color: string): void {
    this.color = new_color;
  }

  /**
   * Imprime por pantalla el titulo de la nota dependiendo del color. Para el color 
   * rojo o alguno que no sea especificado, se imprimirá siempre en rojo
   */
  printHead(): void {
    switch (this.color) {
      case ('amarillo'||'Amarillo'):
        console.log(chalk.yellow(this.title));
        break;
      
      case ('azul'||'Azul'):
        console.log(chalk.blue(this.title));
        break;

      case ('verde'||'Verde'):
        console.log(chalk.green(this.title));
        break;
    
      default: 
        console.log(chalk.red(this.title));
        break;
    }
  }

  /**
   * Imprime por pantalla el texto de la nota dependiendo del color. Para el color 
   * rojo o alguno que no sea especificado, se imprimirá siempre en rojo
   */
  printText(): void {
    switch (this.color) {
      case ('amarillo'||'Amarillo'):
        console.log(chalk.yellow(this.text));
        break;
      
      case ('azul'||'Azul'):
        console.log(chalk.blue(this.text));
        break;

      case ('verde'||'Verde'):
        console.log(chalk.green(this.text));
        break;
    
      default: 
        console.log(chalk.red(this.text));
        break;
    }
  }
}