const uploadImage = async (file: File) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                url: 'https://via.placeholder.com/150',
                name: file.name
            });
        }, 2000);
    });
};

export default uploadImage;