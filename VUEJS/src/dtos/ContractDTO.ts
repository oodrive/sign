export default class ContractDTO {
  name: string;
  message_title: string;
  message_body: string;
  auto_close: number;

  constructor(name: string = '', message_title: string = '', message_body: string = '', auto_close: number = 0) {
    this.name = name;
    this.message_title = message_title;
    this.message_body = message_body;
    this.auto_close = auto_close;
  }
}
