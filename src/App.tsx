import { useCallback, useState, useActionState, useRef, /*use*/ } from 'react';
import { useDropzone } from 'react-dropzone';

import mockUploadImage, { initialStateType } from './utils/mockUploadImage';
import SubmitButton from './components/SubmitButton';
import CustomInput from './components/CustomInput';
// import ThemeContext from './context/ThemeContext';
import BlogItem from './components/BlogItem';

import './App.css';

const initialState: initialStateType = {
  success: false,
  result: null,
  error: null,
};

const App = () => {
  // const theme = use(ThemeContext);
  // const myPromise = use(Promise.resolve({ data: [{ id: 1, value: 'one' }] }).catch(undefined));
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // console.log('myPromise:', myPromise);

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
      "image/jpeg": [".jpeg"],
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
      <title>Blog MAIN</title>
      <h2 className='title'>Administrador de archivos</h2>
      <div className='input-area' {...getRootProps()}>
        <input {...getInputProps()} name='file' />
        {renderDropzoneContent()}
        {!success && !!error && <p className='error'>{error}</p>}
      </div>
      {!!file && <SubmitButton />}
      {/*<CustomInput label='Prueba' ref={inputContainerRef} inputRef={inputRef} />*/}
      <BlogItem />
    </form>
  )
}

export default App
