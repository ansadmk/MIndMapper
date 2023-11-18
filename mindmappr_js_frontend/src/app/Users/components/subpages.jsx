
"use client";
import { useEffect, useRef, useState } from "react";
import Underline from '@editorjs/underline';
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import InlineCode from '@editorjs/inline-code';
import Paragraph from '@editorjs/paragraph';
import { useDispatch, useSelector } from "react-redux";
import {
  changeeditor,
  currentPage,
  editors,
  showPageForm,
} from "@/app/redux/slice";
import { setprofile } from "@/app/redux/Axioses";
import SubpagescomP from "./pageCreator";
import Checklist from '@editorjs/checklist'
const Subpagescomp = ({subpageRender ,subpage ,handlenext}) => {
  const [state, setState] = useState(null);
  const [show, setShow] = useState(true);
  const reff = useRef(null);
  const dispatch = useDispatch();
  const showform = useSelector(showPageForm);
  const parent = useSelector(currentPage);

  const detect = useSelector(editors);

  const initializeEditor = async () => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        table: Table,
        list: List,
        
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        underline:Underline,
        InlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
        
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          preserveBlank:true
        },
       
      },
      
      
      placeholder: "TYPE HERE",

      data: parent.subpages,
      onReady: () => (reff.current = editor),
      onChange: async () => {
        let data = await editor.saver.save();
        dispatch(setprofile({ pageid: parent._id, test: data }));
      },
    });
  };

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };
    if (detect) {
      init();
      dispatch(changeeditor(false));
      return () => {
        if (reff.current) {
          reff.current.destroy();
        }
      };
    }
  });

  return (
   
          <li id="editorjs" className="  ">
             {subpageRender ? (
                    <form onSubmit={handlenext} className="">
                      <input type="text" id="next" ref={reff} />
                    </form>
                  ) : null}

                  {subpage?.data?.subpages
                    .filter((val) => val.title == parent._id)
                    .map((value) => (
                      <div className="d-flex flex-column w-100">
                        <SubpagescomP value={value} />
                      </div>
                      
                    ))}
          </li>
      
  );
};

export default Subpagescomp;
