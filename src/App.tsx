import { useCallback, useState, useActionState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import mockUploadImage from './utils/mockUploadImage';
import './App.css';

const initialState = {
  success: false,
  result: null,
  error: null,
};

const App = () => {
  const [file, setFile] = useState<File>();
  const [{ error, success, result }, submitAction, isPending] = useActionState(mockUploadImage, initialState);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];      

      setFile(file);
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": ["jpeg"],
    }
  });

  const renderDropzoneContent = () => {
    if (file) {
      return <p>{file.name}</p>;
    }

    return (
      <p className='drop-title'>{isDragActive ? 'Suelta aqui' : 'Arrastra aquí tus archivos'}</p>
    );
  };

  return (
    <form className='container' action={submitAction}>
      <h2 className='title'>Administrador de archivos</h2>
      <div className='input-area' {...getRootProps()}>
        <input {...getInputProps()} name='file' />
        {renderDropzoneContent()}
        {!success && !!error && <p className='error'>{error}</p>}
      </div>
      {!!file && <button className='upload-btn'>{isPending ? 'Subiendo...' : 'Subir'}</button>}
    </form>
  )
}

export default App
