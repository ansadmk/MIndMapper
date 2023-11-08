
"use client";
import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import { useDispatch, useSelector } from "react-redux";
import {
  changeeditor,
  currentPage,
  editors,
  showPageForm,
} from "@/app/redux/slice";
import { setprofile } from "@/app/redux/Axioses";

const Subpagescomp = () => {
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
    <>
      <div className="container d-flex justify-content-center w-100">
        {showform ? null : (
          <div id="editorjs" className="prose max-w-full min-h-screen"></div>
        )}
      </div>
    </>
  );
};

export default Subpagescomp;
