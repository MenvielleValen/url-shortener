export class MemoryCache {
  static cacheValues: {
    [key: string]: {
      value: string;
      date: Date;
    };
  } = {};

  static getItemValue(key: string) {
    return this.cacheValues[key]?.value || null;
  }

  static setItem(key: string, value: string) {
    if (Object.entries(this.cacheValues).length >= 700) {
      this.reset();
    }

    this.cacheValues[key] = {
      value,
      date: new Date(),
    };
  }

  static reset() {
    this.cacheValues = {};
  }

  static resetByDate(){
    console.log("resetByDate");
    const currentDate = new Date();
    for (const key in this.cacheValues) {
      if (Object.prototype.hasOwnProperty.call(this.cacheValues, key)) {
        const recordDate = this.cacheValues[key].date;
        // Comparamos las fechas
        if (recordDate > currentDate) {
          // Eliminamos el registro
          delete this.cacheValues[key];
        }
      }
    }
  }
}
