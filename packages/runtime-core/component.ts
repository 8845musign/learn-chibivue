import { ReactiveEffect } from "../reactivity";
import { emit } from "./componentEmits";
import { ComponentOptions } from "./componentOptions";
import { Props, initProps } from "./componentProps";
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
  emit: (event: string, ...args: any[]) => void;

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
    emit: null!,
  };

  instance.emit = emit.bind(null, instance);
  return instance;
}

type CompilerFunction = (template: string) => InternalRenderFunction;
let compile: CompilerFunction | undefined;

export function registerRuntimeCompiler(_compile: any) {
  compile = _compile;
}

export const setupComponent = (instance: ComponentInternalInstance) => {
  const { props } = instance.vnode;
  initProps(instance, props);

  const component = instance.type as Component;
  if (component.setup) {
    instance.render = component.setup(instance.props, {
      emit: instance.emit,
    }) as InternalRenderFunction;
  }

  if (compile && !component.render) {
    const template = component.template ?? "";

    if (template) {
      instance.render = compile(template);
    }
  }
};
