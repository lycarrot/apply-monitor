

declare module "koa-validate" {
   import * as Koa from "koa";
   function Validate(app: Koa): void;
   namespace Validate {
    class Validator {}
  }

  export = Validate;
}