import EditorJS from "@editorjs/editorjs";
import type { EditorConfig, OutputData } from "@editorjs/editorjs";
import CodeTool from "@editorjs/code";
import Header from "@editorjs/header";
import List from "@editorjs/list";

export type EditorStore = {
  instance?: EditorJS;
  save?: () => void;
  render?: (data: OutputData) => void;
  clear?: () => void;
};

export type EditorStoreAction = ((
  node: HTMLElement,
  parameters?: EditorConfig
) => {
  destroy?: () => void;
}) &
  EditorStore;

export type EditorResponse = {
  use: EditorStoreAction;
  get isReady(): boolean;
  get data(): OutputData;
};

export type SvelteEditorConfig = Omit<EditorConfig, "holder" | "holderId">;

export function createEditor(
  configuration: SvelteEditorConfig = {}
): EditorResponse {
  const initialData = configuration.data ?? {
    time: new Date().getTime(),
    blocks: [],
  };
  let editorInstance: EditorJS | undefined = $state(undefined);
  let editor: EditorStore = {};
  let isReady = $state(false);
  let data: OutputData = $state(initialData);

  function getEditor(node: HTMLElement, parameters: SvelteEditorConfig = {}) {
    async function setup() {
      if (typeof window === "undefined") return;
      const instance = new EditorJS({
        ...configuration,
        ...parameters,
        tools: {
          header: Header,
          list: List,
          code: CodeTool,
        },
        holder: node,
        onChange: async () => {
          data = await instance.save();
        },
      });
      instance.isReady
        .then(() => {
          editorInstance = instance;
          if (parameters.data) data = parameters.data;

          const save = async () => {
            const d = await instance.save();
            data = d;
          };

          const clear = async () => {
            instance.clear();
            data = {
              ...data,
              time: new Date().getTime(),
              blocks: [],
            };
          };

          const render = async (data: OutputData) => {
            instance.render(data);
          };

          editor = {
            instance,
            save,
            render,
            clear,
          };
          isReady = true;
        })
        .catch(console.error);
    }
    setup();
    return {
      destroy() {
        editorInstance?.destroy();
      },
    };
  }
  let ed: EditorStoreAction = getEditor;

  ed.instance = editorInstance;
  ed.save = editor.save;
  ed.render = editor.render;
  ed.clear = editor.clear;
  return {
    use: ed,
    get isReady() {
      return isReady;
    },
    get data() {
      return data;
    },
  };
}
