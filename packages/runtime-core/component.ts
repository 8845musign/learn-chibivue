import { ReactiveEffect } from "../reactivity";
import { ComponentOptions } from "./componentOptions";
import { Props } from "./componentProps";
import { VNode, VNodeChild } from "./vnode";

export type Component = ComponentOptions;

export type Data = Record<string, unknown>;

export interface ComponentInternalInstance {
  type: Component;

  vnode: VNode;
  subTree: VNode;
  next: VNode | null;
  effect: ReactiveEffect;
  render: InternalRenderFunction;
  update: () => void;

  propsOptions: Props;
  props: Data;

  isMounted: boolean;
}

export type InternalRenderFunction = {
  (): VNodeChild;
};

export function createComponentInstance(
  vnode: VNode
): ComponentInternalInstance {
  const type = vnode.type as Component;

  const instance: ComponentInternalInstance = {
    type,
    vnode,
    next: null,
    effect: null!,
    subTree: null!,
    update: null!,
    render: null!,
    isMounted: false,
    propsOptions: type.props || {},
    props: {},
  };

  return instance;
}

type CompilerFunction = (template: string) => InternalRenderFunction;
let compile: CompilerFunction | undefined;

export function registerRuntimeCompiler(_compile: any) {
  compile = _compile;
}
