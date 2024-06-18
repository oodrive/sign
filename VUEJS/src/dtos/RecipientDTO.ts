export default class RecipientDTO {
  id: string;
  civility: string;
  firstname: string;
  lastname: string;
  cell_phone: string;
  email: string;
  signature_mode: string;

  constructor(id: string = '', civility: string = '', firstname: string = '', lastname: string = '', cell_phone: string = '', email: string = '', signature_mode: string = '') {
    this.id = id;
    this.civility = civility;
    this.firstname = firstname;
    this.lastname = lastname;
    this.cell_phone = cell_phone;
    this.email = email;
    this.signature_mode = signature_mode;
  }
}
