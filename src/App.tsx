import { useCallback, useState, useActionState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

import mockUploadImage, { initialStateType } from './utils/mockUploadImage';
import './App.css';
import SubmitButton from './components/SubmitButton';
import CustomInput from './components/CustomInput';

const initialState: initialStateType = {
  success: false,
  result: null,
  error: null,
};

const App = () => {
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File>();
  const [{ error, success }, submitAction] = useActionState(mockUploadImage, initialState);
  

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    console.log(inputContainerRef.current, 'inputContainerRef');

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
      {!!file && <SubmitButton />}
      <CustomInput label='Prueba' ref={inputContainerRef} inputRef={inputRef} />
    </form>
  )
}

export default App
