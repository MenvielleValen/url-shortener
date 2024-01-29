export class Base62Converter {
  static base62Chars: string =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  static toBase62(num: number | null = null): string {

    if(num === null){
        num = Math.floor(Math.random() * 1000000); // Número aleatorio entre 0 y 999999
    }

    if (num === 0) return Base62Converter.toBase62();

    let result: string = "";

    while (num > 0) {
      let remainder: number = num % 62;
      result = this.base62Chars[remainder] + result;
      num = Math.floor(num / 62);
    }

    return result;
  }
}
