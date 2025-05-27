import axios from "axios"

export const createImageUrl = (filesList, directory) => new Promise((resolve, reject) => {

    let newList = []

    let iteration = 0

    for (let [index, elem] of filesList.entries()) {


        const reader = new FileReader()
        if (reader) {
            reader.readAsDataURL(elem)
            reader.onloadend = async () => {
                const formData = new FormData()
                formData.append("file", reader.result)
                formData.append("upload_preset", directory)

                axios.post('https://api.cloudinary.com/v1_1/joaoserafinadm/image/upload', formData)
                    .then(res => {
                        let newData = {
                            url: res.data.secure_url,
                            id: res.data.public_id
                            // id: res.data.public_id.substr(-20, 20)
                        }
                        newList.push({ ...elem, ...newData })
                        iteration++
                        if (iteration === filesList.length) resolve(newList)
                    }).catch(e => {
                        let newData = {
                            url: '',
                            id: '',
                            error: e
                        }
                        newList.push({ ...elem, ...newData })
                        iteration++
                        if (iteration === filesList.length) reject(newList)
                    })
            }
        }

    }

})