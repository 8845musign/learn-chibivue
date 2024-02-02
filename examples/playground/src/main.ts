import { createApp, h, reactive } from "chibivue";

const MyComponent = {
  props: { message: { type: String } },

  setup(props: { message: string }) {
    return () => h("div", { id: "my-app" }, [`message: ${props.message}`]);
  },
};

const app = createApp({
  setup() {
    const state = reactive({ message: "hello" });

    return () =>
      h("div", { id: "my-app" }, [
        h(MyComponent, { message: state.message }, []),
      ]);
  },
});

app.mount("#app");
