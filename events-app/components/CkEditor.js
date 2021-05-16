import React, { useEffect, useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Link from "@ckeditor/ckeditor5-link/src/link";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import List from "@ckeditor/ckeditor5-list/src/list";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";

const Editor = ({ data }) => {
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
  }, []);

  return (
    <div>
      {isLayoutReady ? (
        <CKEditor
          data={data}
          onInit={(editor) => {
            console.log("Editor is ready", editor);
          }}
          onChange={(event, editor) => {
            console.log("Change", { event, editor });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", { event, editor });
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", { event, editor });
          }}
          config={{
            plugins: [
              Essentials,
              Paragraph,
              Bold,
              Italic,
              Heading,
              Indent,
              IndentBlock,
              Underline,
              Strikethrough,
              BlockQuote,
              Font,
              Alignment,
              List,
              Link,
              MediaEmbed,
              PasteFromOffice,
              Image,
              ImageStyle,
              ImageToolbar,
              ImageUpload,
              ImageResize,
              Base64UploadAdapter,
              Table,
              TableToolbar,
              TextTransformation,
            ],
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "|",
              "fontSize",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "alignment",
              "outdent",
              "indent",
              "bulletedList",
              "numberedList",
              "blockQuote",
              "|",
              "link",
              "insertTable",
              "imageUpload",
              "mediaEmbed",
              "|",
              "undo",
              "redo",
            ],
            heading: {
              options: [
                {
                  model: "paragraph",
                  view: "p",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
              ],
            },
            fontSize: {
              options: [
                9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 27,
                29, 31, 33, 35,
              ],
            },
            alignment: {
              options: ["justify", "left", "center", "right"],
            },
            table: {
              contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
            },
            image: {
              resizeUnit: "px",
              toolbar: [
                "imageStyle:alignLeft",
                "imageStyle:full",
                "imageStyle:alignRight",
                "|",
                "imageTextAlternative",
              ],
              styles: ["full", "alignLeft", "alignRight"],
            },
            typing: {
              transformations: {
                remove: [
                  "enDash",
                  "emDash",
                  "oneHalf",
                  "oneThird",
                  "twoThirds",
                  "oneForth",
                  "threeQuarters",
                ],
              },
            },
            placeholder: "Click here to start typing",
          }}
          editor={ClassicEditor}
        />
      ) : null}
    </div>
  );
};

export default Editor;

// import React, { useContext } from "react";
// import CKeditor from "@ckeditor/ckeditor5-react";

// // NOTE: Use the editor from source (not a build)!
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
// import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment.js";
// import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat.js";
// import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
// import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder.js";
// // import CKFinderUploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js";
// import Code from "@ckeditor/ckeditor5-basic-styles/src/code.js";
// import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock.js";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
// import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js";
// import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js";
// import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily.js";
// import FontSize from "@ckeditor/ckeditor5-font/src/fontsize.js";
// import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
// import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight.js";
// import Image from "@ckeditor/ckeditor5-image/src/image.js";
// // import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js";
// // import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize.js";
// // import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle.js";
// // import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar.js";
// // import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js";
// import Indent from "@ckeditor/ckeditor5-indent/src/indent.js";
// import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock.js";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
// import Link from "@ckeditor/ckeditor5-link/src/link.js";
// import List from "@ckeditor/ckeditor5-list/src/list.js";
// // import ListStyle from "@ckeditor/ckeditor5-list/src/liststyle.js";
// // import MathType from "@wiris/mathtype-ckeditor5";
// // import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed.js";
// // import Mention from "@ckeditor/ckeditor5-mention/src/mention.js";
// // import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak.js";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
// import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
// // import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat.js";
// import SpecialCharacters from "@ckeditor/ckeditor5-special-characters/src/specialcharacters.js";
// import SpecialCharactersArrows from "@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows.js";
// import SpecialCharactersCurrency from "@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency.js";
// import SpecialCharactersEssentials from "@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js";
// import SpecialCharactersMathematical from "@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical.js";
// import SpecialCharactersText from "@ckeditor/ckeditor5-special-characters/src/specialcharacterstext.js";
// import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough.js";
// import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript.js";
// import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript.js";
// import Table from "@ckeditor/ckeditor5-table/src/table.js";
// // import TableCellProperties from "@ckeditor/ckeditor5-table/src/tablecellproperties";
// // import TableProperties from "@ckeditor/ckeditor5-table/src/tableproperties";
// import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js";
// import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation.js";
// // import Title from "@ckeditor/ckeditor5-heading/src/title.js";
// import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline.js";
// import TodoList from "@ckeditor/ckeditor5-list/src/todolist";

// const editorConfiguration = {
//   heading: {
//     options: [
//       { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
//       {
//         model: "heading1",
//         view: "h1",
//         title: "Heading 1",
//         class: "ck-heading_heading1",
//       },
//       {
//         model: "heading2",
//         view: "h2",
//         title: "Heading 2",
//         class: "ck-heading_heading2",
//       },
//       {
//         model: "heading3",
//         view: "h3",
//         title: "Heading 3",
//         class: "ck-heading_heading3",
//       },
//       {
//         model: "heading4",
//         view: "h4",
//         title: "Heading 4",
//         class: "ck-heading_heading4",
//       },
//       {
//         model: "heading5",
//         view: "h5",
//         title: "Heading 5",
//         class: "ck-heading_heading5",
//       },
//       {
//         model: "heading6",
//         view: "h6",
//         title: "Heading 6",
//         class: "ck-heading_heading6",
//       },
//     ],
//   },
//   table: {
//     contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
//   },

//   plugins: [
//     Bold,
//     Italic,
//     Underline,
//     Superscript,
//     FontBackgroundColor,
//     FontColor,
//     FontFamily,
//     BlockQuote,
//     Highlight,
//     Heading,
//     FontSize,
//     SpecialCharacters,
//     SpecialCharactersEssentials,
//     SpecialCharactersArrows,
//     SpecialCharactersCurrency,
//     SpecialCharactersEssentials,
//     SpecialCharactersMathematical,
//     SpecialCharactersText,
//     List,
//     Link,
//     Autoformat,
//     Subscript,
//     Indent,
//     IndentBlock,
//     PasteFromOffice,
//     Image,
//     Alignment,
//     // ImageUpload,
//     Paragraph,
//     TextTransformation,
//     Table,
//     Code,
//     CodeBlock,
//     TableToolbar,
//     CKFinder,
//     Essentials,
//     SpecialCharacters,
//     TodoList,
//   ],
//   toolbar: [
//     "bold",
//     "italic",
//     "underline",
//     "superscript",
//     "subscript",
//     "heading",
//     "|",
//     "link",
//     "code",
//     "codeBlock",
//     "pasteFromOffice",
//     "autoFormat",
//     "blockQuote",
//     "|",
//     "bulletedList",
//     "numberedList",
//     "|",
//     // 'imageUploader',
//     // 'image',
//     // 'ckfinder',
//     // 'imageUpload',
//     // '|',
//     "fontFamily",
//     "fontColor",
//     "fontSize",
//     "fontBackgroundColor",
//     "highlight",
//     "|",
//     "textTransformation",
//     "indent",
//     "indentBlock",
//     "alignment",
//     "insertTable",
//     "specialCharacters",
//     "todolist",
//     "|",
//     "Undo",
//     "Redo",
//   ],
//   ckfinder: {
//     // Upload the images to the server using the CKFinder QuickUpload command.
//     uploadUrl:
//       "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",
//   },
// };

// const UP = -1;
// const DOWN = 1;
// export default function CkEditor({ component, index }) {
//   // const { changeSubtopic, handleMove, RemoveComponent } =
//   //   useContext(subtopicContext);

//   const onChange = (data) => {
//     // changeSubtopic(index, data ,"ed")
//     console.log(data);
//   };

//   // const content = (
//   //   <div className={IconClasses.moreIcons}>
//   //     <ArrowUpOutlined
//   //       onClick={() => handleMove(index, UP)}
//   //       className={IconClasses.moreIcon}
//   //     />
//   //     <CloseCircleOutlined
//   //       onClick={() => RemoveComponent(index)}
//   //       className={IconClasses.moreIcon}
//   //     />
//   //     <ArrowDownOutlined
//   //       onClick={() => handleMove(index, DOWN)}
//   //       className={IconClasses.moreIcon}
//   //     />
//   //   </div>
//   // );
//   return (
//     <div
//       style={{
//         padding: "1rem",
//         backgroundColor: "#fafafa",
//         borderRadius: "10px",
//       }}>
//       <CKeditor
//         config={editorConfiguration}
//         editor={ClassicEditor}
//         data={"<h1>hello<h1/>"}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           console.log(data);
//         }}
//         style={{ padding: "201px" }}
//       />
//     </div>
//   );
// }
