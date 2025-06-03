export const createImageUrl = async (filesList, directory) => {
    const uploadPromises = filesList.map(elem => 
        new Promise((resolve) => {
            const reader = new FileReader()
            reader.readAsDataURL(elem)
            reader.onloadend = async () => {
                const formData = new FormData()
                formData.append("file", reader.result)
                formData.append("upload_preset", directory)

                try {
                    const res = await axios.post('https://api.cloudinary.com/v1_1/joaoserafinadm/image/upload', formData)
                    resolve({ 
                        ...elem, 
                        url: res.data.secure_url,
                        id: res.data.public_id
                    })
                } catch (e) {
                    resolve({ 
                        ...elem, 
                        url: '', 
                        id: '', 
                        error: e 
                    })
                }
            }
        })
    )

    return Promise.allSettled(uploadPromises).then(results => 
        results.map(result => result.value)
    )
}