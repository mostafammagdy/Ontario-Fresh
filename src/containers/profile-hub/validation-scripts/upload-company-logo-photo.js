import Axios from 'axios'
import { updateProfileImageUrl } from '../../editImageModal/sagas'

const updateProfilePhoto = async (endpoint, clientToken, dataToPost, setFinalLogoImage, previewCanvasRef, formId, setUpImg, setCompletedCrop) => {
    console.log('%c clientToken, dataToPost:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
    console.log({ clientToken, body: dataToPost })
    
    /*
    return await fetch(endpoint , {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": clientToken ? "Bearer " + clientToken : undefined
        },
        body: dataToPost
    }).then(response => {
        console.log('%c response:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
        console.log({ response })
    })
    */

    
    return Axios({
        url: endpoint,
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": clientToken ? "Bearer " + clientToken : undefined
        },
        data: dataToPost
    }).then(response => {
        console.log('%c response:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
        console.log({ response })

        setFinalLogoImage(previewCanvasRef.current.toDataURL('image/png'))
        document.getElementById(`${formId}-fileInput`).value = ''
        setUpImg()
        setCompletedCrop(null)
        setTimeout(() => {
            document.getElementById(`${formId}-currentLogoPhoto`).focus()
        }, 1);
    })
    
}

export const validateUploadCompanyLogoPhotoForm = (event, completedCrop, previewCanvasRef, setFormErrorMessage, setFinalLogoImage, setUpImg, setCompletedCrop, formId, client, ids) => {
    event.preventDefault()
    setFormErrorMessage('')
    if (!completedCrop || !previewCanvasRef.current) {
        // Error messaging.
        setFormErrorMessage('You must select a file to add.')
        setTimeout(() => {
            document.getElementById(`${formId}-errorMessage`).focus()
        }, 1);
        return
    } else {


        previewCanvasRef.current.toBlob(file => {
            console.log('%c file:', 'color: red; font-weight: bold;')
            console.log({ file })



            
            const formData = new FormData()
            formData.append('profile_id', ids.profile_current_id)
            formData.append('picture', file)
            // formData.append('photo_usage', 'profile')
            /*
            console.log('%c formData:', 'color: red; font-weight: bold;')
            console.log({ formData })
            */

            updateProfilePhoto(updateProfileImageUrl, client.token, formData, setFinalLogoImage, previewCanvasRef, formId, setUpImg, setCompletedCrop)
            

            // profileImageUpdateApi(client, { id: ids.profile_current_id, file })
            
        })

        /*
        setFinalLogoImage(previewCanvasRef.current.toDataURL('image/png'))
        document.getElementById(`${formId}-fileInput`).value = ''
        setUpImg()
        setCompletedCrop(null)
        setTimeout(() => {
            document.getElementById(`${formId}-currentLogoPhoto`).focus()
        }, 1);
        */
    }
}