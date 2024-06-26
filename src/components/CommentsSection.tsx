import { useOptimistic, useRef, useState } from "react";

type Comment = {
    text: string;
    isSending?: boolean;
};

const CommentsSection = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [optimisticState, updateOptimistic] = useOptimistic(comments, (currentState: Comment[], optimisticValue: string) => {
        return [
            ...currentState,
            {
                text: optimisticValue,
                isSending: true,
            }
        ]
    });

    const handlePostComment = async (formData: FormData) => {
        const comment = formData.get('comment')?.toString();

        if (!comment) {
            return;
        }

        formRef.current && formRef.current.reset();

        // Actualizacion optimista
        updateOptimistic(comment);

        const postComment: Comment = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    text: comment || '',
                    isSending: false
                });
            }, 3000);
        });

        setComments((comments) => [...comments, postComment]);
    };

    console.log(optimisticState);

    return (
        <form ref={formRef} action={handlePostComment}>
            <label>
                <input type="text" name="comment" />
            </label>
            <button type="submit">Agregar</button>
            <button onClick={() => formRef.current?.reset()}>Limpiar</button>
            <div>
                {optimisticState.map((comment, index) => (
                    <p key={index}>
                        {comment.text}
                    </p>
                ))}
            </div>
        </form>
    );
};

export default CommentsSection;