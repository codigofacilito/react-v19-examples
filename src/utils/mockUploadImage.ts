const uploadImage = async (previousState: { success: boolean; result: Record<string, string> }, formData: FormData) => {
    const image = formData.get('file');

    console.log(previousState);

    const result = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                url: 'https://via.placeholder.com/150',
                name: 'image-05'
            });
        }, 2000);
    });

    return { success: true, result };
};

export default uploadImage;