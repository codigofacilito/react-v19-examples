import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import mockUploadImage from './utils/mockUploadImage';
import './App.css';

const App = () => {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');

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

  const handleUploadImage = async () => {
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const response = await mockUploadImage(file);
      console.log(response);
    } catch (error) {
      setError('Error al subir la imagen');
    } finally {
      setLoading(false);
      setFile(undefined);
    }
  };

  const renderDropzoneContent = () => {
    if (file) {
      return <p>{file.name}</p>;
    }

    return (
      <p className='drop-title'>{isDragActive ? 'Suelta aqui' : 'Arrastra aquí tus archivos'}</p>
    );
  };

  return (
    <div className='container'>
      <h2 className='title'>Administrador de archivos</h2>
      <div className='input-area' {...getRootProps()}>
        <input {...getInputProps()} />
        {renderDropzoneContent()}
        {!!error && <p className='error'>{error}</p>}
      </div>
      {!!file && <button onClick={handleUploadImage} className='upload-btn'>{loading ? 'Subiendo...' : 'Subir'}</button>}
    </div>
  )
}

export default App
