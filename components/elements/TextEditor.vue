<template>
  <div id="editor"></div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import "quill/dist/quill.snow.css";

export default {
  props: {
    modelValue: String,
  },
  setup(props, { emit }) {
    const editorContent = ref(props.modelValue);
    let quill = null;

    onMounted(async () => {
      if (process.client) {
        const Quill = (await import("quill")).default;
        quill = new Quill("#editor", {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ script: "sub" }, { script: "super" }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ align: [] }],
              ["blockquote", "code-block"],
              ["link", "image", "video"],
              ["clean"],
            ],
          },
        });

        if (props.modelValue) {
          quill.clipboard.dangerouslyPasteHTML(props.modelValue);
        }
        quill.on("text-change", () => {
          const html = quill.root.innerHTML;
          editorContent.value = html;
          emit("update:modelValue", html);
        });
      }
    });

    watch(
      () => props.modelValue,
      (newValue) => {
        if (quill && newValue !== quill.root.innerHTML) {
          quill.clipboard.dangerouslyPasteHTML(newValue || "");
        }
      }
    );

    return {
      editorContent,
    };
  },
};
</script>

<style>
#editor {
  min-height: 138px;
}
</style>
