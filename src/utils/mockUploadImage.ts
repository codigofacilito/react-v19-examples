export type initialStateType = {
    success: boolean;
    result: Record<string, string> | null;
    error: string | null;
  };
  

const uploadImage = async (previousState: initialStateType, formData: FormData) => {
    const image = formData.get('file');

    console.log(image, previousState);

    const result: Record<string, string> = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                url: 'https://via.placeholder.com/150',
                name: 'image-05'
            });
        }, 2000);
    });

    return { success: true, result, error: null };
};

export default uploadImage;