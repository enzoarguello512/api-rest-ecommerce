export default class Resta {
  private resultado: number = 0;

  constructor(a: number, b: number) {
    this.resultado = a - b;
  }

  public ver() {
    return this.resultado;
  }
}
