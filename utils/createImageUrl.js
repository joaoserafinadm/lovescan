export const createImageUrl = async (filesList, directory) => {
    const uploadPromises = filesList.map(async (elem) => {
        const formData = new FormData()
        formData.append("file", elem)
        formData.append("upload_preset", directory)

        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/joaoserafinadm/image/upload', formData)
            return { 
                ...elem, 
                url: res.data.secure_url,
                id: res.data.public_id
            }
        } catch (e) {
            return { 
                ...elem, 
                url: '', 
                id: '', 
                error: e 
            }
        }
    })

    return Promise.allSettled(uploadPromises).then(results => 
        results.map(result => result.status === 'fulfilled' ? result.value : result.reason)
    )
}