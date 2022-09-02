export class Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;

  constructor(red: number, green: number, blue: number, alpha: number = 255) {
    this.red = red % 256;
    this.green = green % 256;
    this.blue = blue % 256;
    this.alpha = alpha % 256;
  }

  withAlpha(alpha: number): Color {
    if (alpha > 0 && alpha < 1) {
      alpha *= 256;
    }
    return new Color(this.red, this.green, this.blue, alpha);
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

export class CssColors {
  static aliceblue = new Color(241, 248, 255);
  static antiquewhite = new Color(250, 235, 215);
  static aqua = new Color(0, 255, 255);
  static aquamarine = new Color(127, 255, 212);
  static azure = new Color(240, 255, 255);
  static beige = new Color(245, 245, 220);
  static bisque = new Color(255, 228, 196);
  static black = new Color(0, 0, 0);
  static blanchedalmond = new Color(255, 235, 205);
  static blue = new Color(0, 0, 255);
  static blueviolet = new Color(138, 43, 226);
  static brown = new Color(165, 42, 42);
  static burlywood = new Color(222, 184, 135);
  static cadetblue = new Color(95, 158, 160);
  static chartreuse = new Color(127, 255, 0);
  static chocolate = new Color(210, 105, 30);
  static coral = new Color(255, 127, 80);
  static cornflowerblue = new Color(100, 149, 237);
  static cornsilk = new Color(255, 248, 220);
  static crimson = new Color(220, 20, 60);
  static cyan = new Color(0, 255, 255);
  static darkblue = new Color(0, 0, 139);
  static darkcyan = new Color(0, 139, 139);
  static darkgoldenrod = new Color(184, 134, 11);
  static darkgray = new Color(169, 169, 169);
  static darkgreen = new Color(0, 100, 0);
  static darkgrey = new Color(169, 169, 169);
  static darkkhaki = new Color(189, 183, 107);
  static darkmagenta = new Color(139, 0, 139);
  static darkolivegreen = new Color(85, 107, 47);
  static darkorange = new Color(255, 140, 0);
  static darkorchid = new Color(153, 50, 204);
  static darkred = new Color(139, 0, 0);
  static darksalmon = new Color(233, 150, 122);
  static darkseagreen = new Color(143, 188, 143);
  static darkslateblue = new Color(72, 61, 139);
  static darkslategray = new Color(47, 79, 79);
  static darkslategrey = new Color(47, 79, 79);
  static darkturquoise = new Color(0, 206, 209);
  static darkviolet = new Color(148, 0, 211);
  static deeppink = new Color(255, 20, 147);
  static deepskyblue = new Color(0, 191, 255);
  static dimgray = new Color(105, 105, 105);
  static dimgrey = new Color(105, 105, 105);
  static dodgerblue = new Color(30, 144, 255);
  static firebrick = new Color(178, 34, 34);
  static floralwhite = new Color(255, 250, 240);
  static forestgreen = new Color(34, 139, 34);
  static fuchsia = new Color(255, 0, 255);
  static gainsboro = new Color(220, 220, 220);
  static ghostwhite = new Color(248, 248, 255);
  static gold = new Color(255, 215, 0);
  static goldenrod = new Color(218, 165, 32);
  static gray = new Color(128, 128, 128);
  static green = new Color(0, 128, 0);
  static greenyellow = new Color(173, 255, 47);
  static grey = new Color(128, 128, 128);
  static honeydew = new Color(240, 255, 240);
  static hotpink = new Color(255, 105, 180);
  static indianred = new Color(205, 92, 92);
  static indigo = new Color(75, 0, 130);
  static ivory = new Color(255, 255, 240);
  static khaki = new Color(240, 230, 140);
  static lavender = new Color(230, 230, 250);
  static lavenderblush = new Color(255, 240, 245);
  static lawngreen = new Color(124, 252, 0);
  static lemonchiffon = new Color(255, 250, 205);
  static lightblue = new Color(173, 216, 230);
  static lightcoral = new Color(240, 128, 128);
  static lightcyan = new Color(224, 255, 255);
  static lightgoldenrodyellow = new Color(250, 250, 210);
  static lightgray = new Color(211, 211, 211);
  static lightgreen = new Color(144, 238, 144);
  static lightgrey = new Color(211, 211, 211);
  static lightpink = new Color(255, 182, 193);
  static lightsalmon = new Color(255, 160, 122);
  static lightseagreen = new Color(32, 178, 170);
  static lightskyblue = new Color(135, 206, 250);
  static lightslategray = new Color(119, 136, 153);
  static lightslategrey = new Color(119, 136, 153);
  static lightsteelblue = new Color(176, 196, 222);
  static lightyellow = new Color(255, 255, 224);
  static lime = new Color(0, 255, 0);
  static limegreen = new Color(50, 205, 50);
  static linen = new Color(250, 240, 230);
  static magenta = new Color(255, 0, 255);
  static maroon = new Color(128, 0, 0);
  static mediumaquamarine = new Color(102, 205, 170);
  static mediumblue = new Color(0, 0, 205);
  static mediumorchid = new Color(186, 85, 211);
  static mediumpurple = new Color(147, 112, 219);
  static mediumseagreen = new Color(60, 179, 113);
  static mediumslateblue = new Color(123, 104, 238);
  static mediumspringgreen = new Color(0, 250, 154);
  static mediumturquoise = new Color(72, 209, 204);
  static mediumvioletred = new Color(199, 21, 133);
  static midnightblue = new Color(25, 25, 112);
  static mintcream = new Color(245, 255, 250);
  static mistyrose = new Color(255, 228, 225);
  static moccasin = new Color(255, 228, 181);
  static navajowhite = new Color(255, 222, 173);
  static navy = new Color(0, 0, 128);
  static oldlace = new Color(253, 245, 230);
  static olive = new Color(128, 128, 0);
  static olivedrab = new Color(107, 142, 35);
  static orange = new Color(255, 165, 0);
  static orangered = new Color(255, 69, 0);
  static orchid = new Color(218, 112, 214);
  static palegoldenrod = new Color(238, 232, 170);
  static palegreen = new Color(152, 251, 152);
  static paleturquoise = new Color(175, 238, 238);
  static palevioletred = new Color(219, 112, 147);
  static papayawhip = new Color(255, 239, 213);
  static peachpuff = new Color(255, 218, 185);
  static peru = new Color(205, 133, 63);
  static pink = new Color(255, 192, 203);
  static plum = new Color(221, 160, 221);
  static powderblue = new Color(176, 224, 230);
  static purple = new Color(128, 0, 128);
  static red = new Color(255, 0, 0);
  static rosybrown = new Color(188, 143, 143);
  static royalblue = new Color(65, 105, 225);
  static saddlebrown = new Color(139, 69, 19);
  static salmon = new Color(250, 128, 114);
  static sandybrown = new Color(244, 164, 96);
  static seagreen = new Color(46, 139, 87);
  static seashell = new Color(255, 245, 238);
  static sienna = new Color(160, 82, 45);
  static silver = new Color(192, 192, 192);
  static skyblue = new Color(135, 206, 235);
  static slateblue = new Color(106, 90, 205);
  static slategray = new Color(112, 128, 144);
  static slategrey = new Color(112, 128, 144);
  static snow = new Color(255, 250, 250);
  static springgreen = new Color(0, 255, 127);
  static steelblue = new Color(70, 130, 180);
  static tan = new Color(210, 180, 140);
  static teal = new Color(0, 128, 128);
  static thistle = new Color(216, 191, 216);
  static tomato = new Color(255, 99, 71);
  static turquoise = new Color(64, 224, 208);
  static violet = new Color(238, 130, 238);
  static wheat = new Color(245, 222, 179);
  static white = new Color(255, 255, 255);
  static whitesmoke = new Color(245, 245, 245);
  static yellow = new Color(255, 255, 0);
  static yellowgreen = new Color(154, 205, 50);

  static find(cssColorName: string): Color {
    const newLocal = this[cssColorName.toLowerCase()];
    if (newLocal) {
      return newLocal;
    } else {
      throw new Error("Css color with name " + cssColorName + " not found!");
    }
  }
}
