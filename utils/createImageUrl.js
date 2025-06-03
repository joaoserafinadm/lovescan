export const createImageUrl = (filesList, directory) => new Promise((resolve, reject) => {
    let newList = new Array(filesList.length)
    let completed = 0

    filesList.forEach((elem, index) => {
        const reader = new FileReader()
        reader.readAsDataURL(elem)
        reader.onloadend = async () => {
            const formData = new FormData()
            formData.append("file", reader.result)
            formData.append("upload_preset", directory)

            try {
                const res = await axios.post('https://api.cloudinary.com/v1_1/joaoserafinadm/image/upload', formData)
                newList[index] = { 
                    ...elem, 
                    url: res.data.secure_url,
                    id: res.data.public_id
                }
            } catch (e) {
                newList[index] = { 
                    ...elem, 
                    url: '', 
                    id: '', 
                    error: e 
                }
            }
            
            completed++
            if (completed === filesList.length) {
                resolve(newList)
            }
        }
    })
})