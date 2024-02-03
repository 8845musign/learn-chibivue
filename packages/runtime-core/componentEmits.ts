import { ComponentInternalInstance } from "./component";
import { toHandlerKey, camelize } from "../shared";

export function emit(
  instance: ComponentInternalInstance,
  event: string,
  ...rawArgs: any[]
) {
  const props = instance.vnode.props || {};
  let args = rawArgs;

  let handler =
    props[toHandlerKey(event)] || props[toHandlerKey(camelize(event))];

  if (handler) handler(...args);
}
