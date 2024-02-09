import { compile } from "./compiler-dom";
import {
  InternalRenderFunction,
  registerRuntimeCompiler,
} from "./runtime-core/component";
import * as runtimeDom from "./runtime-dom";

function compileToFunction(template: string): InternalRenderFunction {
  const code = compile(template);
  return new Function("ChibiVue", code)(runtimeDom);
}

registerRuntimeCompiler(compileToFunction);

export * from "./runtime-core";
export * from "./runtime-dom";
export * from "./reactivity";
