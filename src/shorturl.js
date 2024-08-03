export class Codec {
  constructor() {
    this.url2code = {};
    this.code2url = {};
    this.chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  }
  encode(longUrl) {
    while (!this.url2code[longUrl]) {
      let code = "";
      for (let i = 0; i < 6; i++) {
        code += this.chars[Math.floor(Math.random() * this.chars.length)];
      }
      if (!this.code2url[code]) {
        this.code2url[code] = longUrl;
        this.url2code[longUrl] = code;
      }
    }
    return "http://smolUrl.com/" + this.url2code[longUrl];
  }
  decode(shortUrl) {
    return this.code2url[shortUrl.slice(-6)];
  }
}

