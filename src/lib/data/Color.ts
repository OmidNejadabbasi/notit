export class Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;

  constructor(red, green, blue, alpha = 255) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }

  static cssC(cssColorName) {
    return CssColors.find(cssColorName);
  }

  s(): string {
    return `#${Color.decToHex(this.red)}${Color.decToHex(
      this.green
    )}${Color.decToHex(this.blue)}${Color.decToHex(this.alpha)}`;
  }

  private static decToHex(a: number, digits = 2): string {
    let res: string = "";
    a = Math.floor(a);
    while (a > 0) {
      res = "0123456789abcdef"[a % 16] + res;
      a /= 16;
      a = Math.floor(a);
    }
    res = res.padEnd(digits, "0");
    return res;
  }
}

class CssColors {
  static list = {
    red: new Color(255, 0, 0),
  };

  static find(cssColorName) {
    const newLocal = this.list[cssColorName];
    if (newLocal) {
      return newLocal;
    } else {
      throw new Error("Css color with name " + cssColorName + " not found!");
    }
  }
}
