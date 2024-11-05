import { Editor } from 'draft-js';
import './App.css';
import Button from './components/Button';
import Title from './components/Title';
import 'draft-js/dist/Draft.css';

function App() {
  return (
    <main>
      <Title />
      <Button />
      <div
        style={{
          border: '1px solid #ddd',
          padding: '10px',
          minHeight: '200px',
        }}
      >
        <Editor />
      </div>
    </main>
  );
}

export default App;
