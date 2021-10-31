class Exception extends Error {
    code:number ;
    constructor(code: number, message: string) {
      super();
  
      this.code = code;
      this.message = message;
    }
  }
  
  export { Exception };