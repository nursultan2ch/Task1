import React, { useState } from 'react';
import NGLFile from './NGLFile';

const App: React.FC = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
  };

  return (
    <div className='viewer-container'>
      <input type="file" onChange={handleFileChange} />
      <NGLFile file={file} width="400px" height="400px"/>
    </div>
  );
};

export default App;

