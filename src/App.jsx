import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';
import Title from './components/Title';
import 'draft-js/dist/Draft.css';

function App() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const savedData = localStorage.getItem('editorContent');
    if (savedData) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(savedData)))
      );
    }
  }, []);
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleBeforeInput = (chars, editorState) => {
    const selection = editorState.getSelection();
    const start = selection.getStartOffset();
    const blockKey = selection.getStartKey();
    const block = editorState.getCurrentContent().getBlockForKey(blockKey);
    const blockText = block.getText();

    let updatedState = editorState;
    console.log(start, chars);
       if (start === 1 && chars === ' ') {
      // Detect formatting triggers
      if (blockText.startsWith('#')) {
        updatedState = applyBlockStyle(editorState, 'header-one'); // Heading
      } else if (blockText.startsWith('* ') && blockText.length === 2) {
        updatedState = applyInlineStyle(editorState, 'BOLD'); // Bold
      } else if (blockText.startsWith('** ') && blockText.length === 3) {
        updatedState = applyInlineStyle(editorState, 'RED'); // Red color
      } else if (blockText.startsWith('*** ') && blockText.length === 4) {
        updatedState = applyInlineStyle(editorState, 'UNDERLINE'); // Underline
      }

      // Remove the trigger characters (#, *, **, ***)
      const contentState = Modifier.replaceText(
        updatedState.getCurrentContent(),
        selection.merge({ anchorOffset: 0, focusOffset: start }),
        ''
      );
      setEditorState(
        EditorState.push(updatedState, contentState, 'remove-range')
      );
      return 'handled';
    }
    return 'not-handled';
  };

  // Helper function to apply block styles (like "heading")
  const applyBlockStyle = (editorState, blockType) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const newContentState = Modifier.setBlockType(
      contentState,
      selection,
      blockType
    );
    return EditorState.push(editorState, newContentState, 'change-block-type');
  };

  // Helper function to apply inline styles (like "bold", "red", "underline")
  const applyInlineStyle = (editorState, style) => {
    return RichUtils.toggleInlineStyle(editorState, style);
  };

  // Custom inline style map
  const customStyleMap = {
    RED: { color: 'red' },
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    localStorage.setItem(
      'editorContent',
      JSON.stringify(convertToRaw(contentState))
    );
    alert('Content saved to local storage!');
  };
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        margin: 'auto',
        padding: '10px',
      }}
    >
      <Title />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        <Button onClick={handleSave} />
      </div>
      <div
        style={{
          marginTop: '10px',
          border: '1px solid #ddd',
          minHeight: '300px',
          width: '100%',
        }}
      >
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          handleBeforeInput={(chars) => handleBeforeInput(chars, editorState)}
          customStyleMap={customStyleMap}
        />
      </div>
    </main>
  );
}

export default App;
