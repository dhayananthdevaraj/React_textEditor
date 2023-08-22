import React, { useState, useRef } from "react";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
  AiOutlineRollback,
} from "react-icons/ai";

const Editor = () => {
  const [text, setText] = useState("");
  const [bold, setBold] = useState(false);
  const [italian, setItalian] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [font, setFont] = useState(16);
  const [align, setAlign] = useState("left");
  const [quotes, setQuotes] = useState(false);
  const [currCase, setCurrCase] = useState("capitalize");
  const [analysis, setAnalysis] = useState({});
  

  const textareaRef = useRef(null);

  // const boldHandler = () => {
  //   setBold(!bold);
  // };
  const boldHandler = () => {
    setBold(prevBold => !prevBold);
  };

  const italicHandler = () => {
    setItalian(!italian);
  };

  const underlineHandler = () => {
    setUnderline(!underline);
  };

  const changeFont = (operation) => {
    if (operation === "increase") {
      setFont((prevFont) => prevFont + 1);
    } else if (operation === "decrease") {
      setFont((prevFont) => prevFont - 1);
    }
  };

  const changeAlign = (alignment) => {
    setAlign(alignment);
  };

  const quotesHandler = () => {
    setQuotes(!quotes);
  };

  const caseChange = (c) => {
    if (c === "u") {
      setCurrCase("uppercase");
    } else if (c === "l") {
      setCurrCase("lowercase");
    } else if (c === "c") {
      setCurrCase("capitalize");
    }
  };

  const reset = () => {
    setText("");
    setBold(false);
    setItalian(false);
    setUnderline(false);
    setFont(16);
    setAlign("left");
    setQuotes(false);
    setCurrCase("capitalize");
    setAnalysis({});
  };

  const analyse = () => {
    const no_of_letters = text.replace(/[^a-zA-Z]/g, "").length;
    const no_of_words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const no_of_integers = text.replace(/[^0-9]/g, "").length;
    const no_of_spaces = text === "" ? 0 : text.split(" ").length - 1;
    const no_of_specialsymbols = text.replace(/[\w\s]/g, "").length;
  
    setAnalysis({
      no_of_letters,
      no_of_words,
      no_of_integers,
      no_of_spaces,
      no_of_specialsymbols,
      bold,
      italian,
      underline,
      quotes,
      currCase,
      align,
      font,
    });
  };


  return (
    <div className="editorcomp">
      <div className="button">
      <button className={bold ? "bold active" : "bold"} onClick={boldHandler} data-testid="bold-button">
      <AiOutlineBold />
     </button>
      <button className={italian ? "italian active" : "italian"} onClick={italicHandler} data-testid="italic-button">
       <AiOutlineItalic />
      </button>
<      button className={underline ? "underline active" : "underline"} onClick={underlineHandler} data-testid="underline-button">
      <AiOutlineUnderline />
       </button>
        <button className="size" onClick={() => changeFont("increase")}>
          A+
        </button>
        <button className="size" onClick={() => changeFont("decrease")}>
          A-
        </button>
        <button className={align === "left" ? "align active" : "align"} onClick={() => changeAlign("left")}>
          <AiOutlineAlignLeft />
        </button>
        <button className={align === "center" ? "align active" : "align"} onClick={() => changeAlign("center")}>
          <AiOutlineAlignCenter />
        </button>
        <button className={align === "right" ? "align active" : "align"} onClick={() => changeAlign("right")}>
          <AiOutlineAlignRight />
        </button>
        <button className={quotes ? "quotes active" : "quotes"} onClick={quotesHandler}>
          "
        </button>
        <button className="caseChange" onClick={() => caseChange("u")}>
          UC
        </button>
        <button className="caseChange" onClick={() => caseChange("l")}>
          LC
        </button>
        <button className="caseChange" onClick={() => caseChange("c")}>
          C
        </button>
        <button className="Empty" onClick={reset}>
          <AiOutlineRollback />
        </button>
        <button className="analyse" onClick={analyse}>
          Analyse
        </button>
      </div>
      <textarea
        ref={textareaRef}
        cols="30"
        rows="10"
        placeholder="type Something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        style={{
          fontWeight: bold ? "bold" : "normal",
          fontStyle: italian ? "italic" : "normal",
          textDecoration: underline ? "underline" : "none",
          fontSize: font + "px",
          textAlign: align,
          quotes: quotes ? "double" : "none",
          textTransform: currCase,
        }}
      ></textarea>
      <textarea
        className="analysis"
        disabled
        value={JSON.stringify(analysis, null, 2)}
        placeholder="ANALYSIS"
      ></textarea>
    </div>
  );
};

export default Editor;
