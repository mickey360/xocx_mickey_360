'use client';

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align"; 
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import ImageResize from "@tiptap/extension-image"
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { useEditorStore } from "@/store/use-editor-store";
import { Ruler } from "./ruler";
// import { FontSizeExtension } from "@/extensions-font-size";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Threads } from "./threads";
import { useStorage } from "@liveblocks/react";

interface EditorProps {
    initialContent?: string | undefined;
};

export const Editor = ({ initialContent }: EditorProps) => {
    const leftMargin = useStorage((root) => root.leftMargin);
    const rightMargin = useStorage((root) => root.rightMargin);

    const liveblocks = useLiveblocksExtension({
        initialContent,
        offlineSupport_experimental: true,
    });
    const { setEditor } = useEditorStore();
    
    const editor = useEditor({
        immediatelyRender: false,

        onCreate({ editor }) {
            setEditor(editor);
        },
        onDestroy() {
            setEditor(null);
        },
        onUpdate({ editor }) {
            setEditor(editor);
        },
        onSelectionUpdate({ editor }) {
            setEditor(editor);
        },
        onTransaction({ editor }) {
            setEditor(editor);
        },
        onFocus({ editor }) {
            setEditor(editor);
        },
        onBlur({ editor }) {
            setEditor(editor);
        },
        onContentError({ editor }) {
            setEditor(editor);
        },


        editorProps: {
            attributes:{
                style: `padding-left: ${leftMargin ?? 56}px; padding-right: ${rightMargin ?? 56}px;`,
                class:"focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text "
            },
        },
        extensions: [
            liveblocks,
            StarterKit.configure({
                history: false,
            }),
            TextAlign.configure({ types: [ "heading", "paragraph" ] }),
            Link.configure({ openOnClick: false, autolink: true, defaultProtocol: "https" }),
            Color,
            Highlight.configure({ multicolor:true, }),
            TextStyle,
            FontFamily,
            Underline,
            Image,
            ImageResize,
            Table,
            TableCell,
            TableHeader,
            TableRow,
            TaskItem.configure({
                nested: true,
            }),
            TaskList, 
        ],
    })
    
    return ( 
        <div className="size-full overflow-x-auto bg-gradient-to-r from-black to-gray-950 px-4 print:p-0 print:bg-white print:overflow-visible">
            <Ruler />
           <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
            <EditorContent editor={editor} />
            <Threads editor={editor} />
            </div> 
        </div>
     );
};