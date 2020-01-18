// import axios from 'axios';

export default {
    uploadImg
};

function uploadImg(ev) {
    const CLOUD_NAME = 'dehbor36y'
    const PRESET_NAME = 'lbupv3ly'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', PRESET_NAME);

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            console.log(res.secure_url)
            return res.secure_url
        })
        .catch(err => console.error(err))
}