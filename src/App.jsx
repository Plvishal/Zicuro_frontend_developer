// import { Editor } from 'draft-js';
import './App.css';
import Button from './components/Button';
import Title from './components/Title';
// import 'draft-js/dist/Draft.css';

function App() {
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
        <Button />
      </div>
      <div
        style={{
          marginTop: '10px',
          border: '1px solid #ddd',
          minHeight: '300px',
          width: '100%',
        }}
      >
        {/* <Editor /> */}
      </div>
    </main>
  );
}

export default App;
