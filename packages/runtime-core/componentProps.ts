import { reactive } from "../reactivity";
import { ComponentInternalInstance, Data } from "./component";

export type Props = Record<string, PropOptions | null>;

export interface PropOptions<T = any> {
  type?: PropType<T> | true | null;
  required?: boolean;
  default?: null | undefined | object;
}

export type PropType<T> = { new (...args: any[]): T & {} };

export function initProps(
  instance: ComponentInternalInstance,
  rawProps: Data | null
) {
  const props: Data = {};
  setFullProps(instance, rawProps, props);
  instance.props = reactive(props);
}

function setFullProps(
  instance: ComponentInternalInstance,
  rawProps: Data | null,
  props: Data
) {
  const options = instance.propsOptions;

  if (rawProps) {
    for (let key in rawProps) {
      const value = rawProps[key];
      if (options && options[key]) {
        props[key] = value;
      }
    }
  }
}
