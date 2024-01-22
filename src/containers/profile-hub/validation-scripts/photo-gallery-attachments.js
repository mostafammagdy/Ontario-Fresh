import Axios from 'axios'
import { updateGalleryImageUrl } from '../../editImageModal/sagas'
import { deleteProfileGalleryPhotoUrl } from '../../profilePhotos/sagas'

const deleteProfilePhoto = async (endpoint, clientToken, dataToPost, attachments, attachmentsToDelete, setAttachments, setFormValidatedMessage, formId) => {
    /*
    console.log('%c dataToPost:', 'color: maroon; font-weight: bold;')
    console.log({ dataToPost })
    */
    return await fetch(endpoint , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": clientToken ? "Bearer " + clientToken : undefined
        },
        body: JSON.stringify(dataToPost)
    }).then(response => {
        console.log('%c response:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
        console.log({ response })


        const newAttachments = []
        attachments.forEach(att => {
            const matches = []
            attachmentsToDelete.forEach(attDel => {
                if (att.id === attDel)
                    matches.push(att.id)
            })
            if (matches.length < 1)
                newAttachments.push(att)
        })
        
        console.log('%c newAttachments:', 'color: purple; font-weight: bold;')
        console.log({ newAttachments })

        
        setAttachments([ ...newAttachments ])
        setFormValidatedMessage(`You have successfully updated the selected images.`)
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1);
    })
}

const updateGalleryPhoto = async (endpoint, clientToken, dataToPost, setAttachments, attachments, setFormValidatedMessage, formId, setUpImg, setCompletedCrop) => {
    /*
    console.log('%c clientToken, dataToPost:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
    console.log({ clientToken, body: dataToPost })
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

        // Got to give the new file a name
        const newFile = {
            id: response.data.id,
            src: response.data.photo_file_name/*,
            showInGallery: {
                b2b: false,
                vendor: false
            }*/
        }
        // You will need an src path though.
        setAttachments([ ...attachments, newFile ])
        setFormValidatedMessage(`You have successfully added your photo.`)
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1);
        setUpImg()
        setCompletedCrop(null)
        document.getElementById(`${formId}-fileInput`).value = ''
    })
    
}

export const validatePhotoGalleryAttachmentUploadForm = (event, completedCrop, previewCanvasRef, attachments, setAttachments, setFormErrorMessage, setFormValidatedMessage, setSiblingFormErrorMessage, setSiblingFormValidatedMessage, setUpImg, setCompletedCrop, formId, client, ids) => {
    event.preventDefault()
    setFormErrorMessage('')
    setFormValidatedMessage('')
    setSiblingFormErrorMessage('')
    setSiblingFormValidatedMessage('')
    /*
    console.log('%c file:', 'color: purple; font-weight: bold;')
    console.log(file)
    */
   /*
    if (!file) {
        setFormErrorMessage('You must select a file to add.')
        setTimeout(() => {
            document.getElementById(`${formId}-errorMessage`).focus()
        }, 1);
        return
    }
    */


    if (!completedCrop || !previewCanvasRef.current) {
        // Error messaging.
        setFormErrorMessage('You must select a file to add.')
        setTimeout(() => {
            document.getElementById(`${formId}-errorMessage`).focus()
        }, 1);
        return
    }

    else if (attachments.length === 6) {
        // Error messaging.
        setFormErrorMessage('You are limited to a maximum of 6 images.')
        setTimeout(() => {
            document.getElementById(`${formId}-errorMessage`).focus()
        }, 1);
        return
    }



    // Don't need to check for this, user can crop the same file any number of ways they want.
    /*
    const filePresent = attachments.filter(att => att.name === file.name)
    if (filePresent.length > 0) {
        setFormErrorMessage('File already exists.')
        setTimeout(() => {
            document.getElementById(`${formId}-errorMessage`).focus()
        }, 1);
    }*/ else {


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

            updateGalleryPhoto(updateGalleryImageUrl, client.token, formData, setAttachments, attachments, setFormValidatedMessage, formId, setUpImg, setCompletedCrop)
            

            // profileImageUpdateApi(client, { id: ids.profile_current_id, file })
            
        })




    }
}

export const validateManagePhotoGalleryAttachmentsForm = (event, attachments, setAttachments, selectedAttachments, setSelectedAttachments, setFormErrorMessage, setFormValidatedMessage, setSiblingFormErrorMessage, setSiblingFormValidatedMessage, formId, client, ids) => {
    event.preventDefault()
    setFormErrorMessage('')
    setFormValidatedMessage('')
    setSiblingFormErrorMessage('')
    setSiblingFormValidatedMessage('')
    /*
    console.log('%c selectedAttachments:', 'color: red; font-weight: bold;')
    console.log({ selectedAttachments })
    */
    const isAttachmentSelected = attachments.filter(att => selectedAttachments[att.id])
    /*
    console.log('%c isAttachmentSelected:', 'color: purple; font-weight: bold;')
    console.log({ isAttachmentSelected })
    */
    if (isAttachmentSelected.length === 0) {
        setFormErrorMessage('You must select at least one file to delete.')
            setTimeout(() => {
                document.getElementById(`${formId}-errorMessage`).focus()
            }, 1);
    } else {
            const attachmentsToDelete = isAttachmentSelected.map(att => att.id)
            /*
            console.log('%c attachmentsToDelete:', 'color: purple; font-weight: bold;')
            console.log({ attachmentsToDelete })
            */

            attachmentsToDelete.forEach((attachmentId, i) => {
                /*
                console.log('%c attachmentId:', 'color: red; font-weight: bold;')
                console.log({ attachmentId })
                */
                const photo_id = attachmentId
                const formData = {
                    photo_id
                }
                deleteProfilePhoto(deleteProfileGalleryPhotoUrl, client.token, formData, attachments, attachmentsToDelete, setAttachments, setFormValidatedMessage, formId)
            })




















            /*
            const newAttachments = []
            attachments.forEach(att => {
                const matches = []
                attachmentsToDelete.forEach(attDel => {
                    if (att.id === attDel)
                        matches.push(att.id)
                })
                if (matches.length < 1)
                    newAttachments.push(att)
            })
            
            console.log('%c newAttachments:', 'color: purple; font-weight: bold;')
            console.log({ newAttachments })
















            
            setAttachments([ ...newAttachments ])
            setFormValidatedMessage(`You have successfully updated the selected images.`)
            setTimeout(() => {
                document.getElementById(`${formId}-validatedMessage`).focus()
            }, 1);
            */
    }
}