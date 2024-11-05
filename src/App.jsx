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

  const handleBeforeInput = (chars) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const start = selection.getStartOffset();
    const blockKey = selection.getStartKey();
    const blockText = currentContent.getBlockForKey(blockKey).getText();

    if (chars === ' ' && start === 1) {
      let updatedContent;
      if (blockText.startsWith('#')) {
        updatedContent = Modifier.applyInlineStyle(
          currentContent,
          selection,
          'BOLD'
        );
        setEditorState(
          EditorState.push(editorState, updatedContent, 'change-inline-style')
        );
        return 'handled';
      }
    }
    return 'not-handled';
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
          handleBeforeInput={handleBeforeInput}
        />
      </div>
    </main>
  );
}

export default App;
