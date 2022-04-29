import { Notes } from "./notes";
import * as chalk from 'chalk';
import * as fs from 'fs';

const error_exist: string = 'ERROR: The Note Does Not Exist';
const error_path: string = 'ERROR: The Path Does Not Exist';

export class Gestor {
  private path: string;
  private slash: string;
  private ext: string;

  constructor() { 
    this.path = 'database/';
    this.slash = '/';
    this.ext = '.json';
  }

  /**
   * Funcion que añade una nueva nota y comprueba que existe un directorio donde 
   * se almacena y la crea, en caso de que no exista, se creará el directorio y 
   * se añadirá la nota
   * @param note Objeto de tipo nota que debemos añadir
   * @param user usuario que ha creado la nota
   */
  add(note: Notes, user: string) {
    if(fs.existsSync(this.path + user)) {
      if(fs.existsSync(this.path + user + this.slash + note.getTitle() + this.ext)) {
        console.log(chalk.red.inverse('ERROR: The Note Already Exits'));
      } else {
        const note_data = {"title": note.getTitle(), "text": note.getText(), "color": note.getColor()};
        const aux_note_data = JSON.stringify(note_data);
        fs.writeFileSync(this.path + user + this.slash + note.getTitle() + this.ext, aux_note_data);
        console.log(chalk.green.inverse('The Note Has Been Created Successfully'));
      }
    } else {
      fs.mkdirSync(this.path + user);
      const note_data = {"title": note.getTitle(), "text": note.getText(), "color": note.getColor()};
      const aux_note_data = JSON.stringify(note_data);
      fs.writeFileSync(this.path + user + this.slash + note.getTitle() + this.ext, aux_note_data);
      console.log(chalk.green.inverse('The Note Has Been Created Successfully'));
    }
  }

  /**
   * Funcion que permite modificar una nota y comprueba si el directorio y el 
   * fichero donde se almacena existan, y si es así elimina la anterior y pone 
   * la nueva informacion
   * @param note 
   * @param user 
   */
  modify(note: Notes, user: string) {
    if(fs.existsSync(this.path + user)) {
      if(fs.existsSync(this.path + user + this.slash + note.getTitle() + this.ext)) {
        fs.rmSync(this.path + user + this.slash + note.getTitle() + this.ext);
        const note_data = {"title": note.getTitle(), "text": note.getText(), "color": note.getColor()};
        const aux_note_data = JSON.stringify(note_data);
        fs.writeFileSync(this.path + user + this.slash + note.getTitle() + this.ext, aux_note_data);
        console.log(chalk.green.inverse('The Note Has Been Modified Successfully'));
      } else {
        console.log(chalk.red.inverse(error_exist));
      }
    } else {
      console.log(chalk.red.inverse(error_path));
    }
  }

  /**
   * Funcion que permite eliminar una nota almacenada, si es que existe su 
   * directorio y fichero
   * @param note 
   * @param user 
   */
  remove(note_title: string, user: string) {
    if(fs.existsSync(this.path + user)) {
      if(fs.existsSync(this.path + user + this.slash + note_title + this.ext)) {
        fs.rmSync(this.path + user + this.slash + note_title + this.ext);
        console.log(chalk.green.inverse('The Note Has Been Successfully Deleted'))
      } else {
        console.log(chalk.red.inverse(error_exist));
      }
    } else {
      console.log(chalk.red.inverse(error_path));
    }
  }

  /**
   * Lista los titulos de las notas del usuario en concreto
   * @param user
   */
  listHeads(user: string) {
    if(fs.existsSync(this.path + user)) {
      const notes_files = fs.readdirSync(this.path + user);
      notes_files.forEach((item) => {
        const single_note = fs.readFileSync(this.path + user + this.slash + item, 'utf-8');
        const aux_single_note = JSON.parse(single_note);
        const note = new Notes(aux_single_note['title'], aux_single_note['text'], aux_single_note['color']);
        note.printHead();
      });
    } else {
      console.log(chalk.red.inverse(`ERROR: User ${user} Has No Notes Created`));
    }
  }

  /**
   * Funcion que lee una nota en concreto de un usuario en concreto
   * @param note_title 
   * @param user 
   */
  read(note_title: string, user: string) {
    if(fs.existsSync(this.path + user)) {
      if(fs.existsSync(this.path + user + this.slash + note_title + this.ext)) {
        const single_note = fs.readFileSync(this.path + user + this.slash + note_title + this.ext, 'utf-8');
        const aux_single_note = JSON.parse(single_note);
        const note = new Notes(aux_single_note['title'], aux_single_note['text'], aux_single_note['color']);
        note.printHead();
        note.printText();
      } else {
        console.log(chalk.red.inverse(error_exist));
      }
    } else {
      console.log(chalk.red.inverse('ERROR: The Path Does Not Exist'));
    }
  }
}