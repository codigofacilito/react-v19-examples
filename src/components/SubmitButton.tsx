import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <button className='upload-btn'>{pending ? 'Subiendo...' : 'Subir'}</button>
    );
};

export default SubmitButton;