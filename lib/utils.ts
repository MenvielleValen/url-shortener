


export class Base62Converter {
  static base62Chars: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  static toBase62(num: number): string {
      if (num === 0) return "0";

      let result: string = "";

      while (num > 0) {
          let remainder: number = num % 62;
          result = this.base62Chars[remainder] + result;
          num = Math.floor(num / 62);
      }

      return result;
  }
}