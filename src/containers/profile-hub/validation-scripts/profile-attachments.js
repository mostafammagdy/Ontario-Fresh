import Axios from 'axios'
import { uploadFileUrl, deleteFileUrl } from '../../profile/sagas'
import { DEFAULT_MAX_FILE_SIZE_IN_BYTES } from '../../../utils/constants-unmutables'

const deleteAttachment = async (endpoint, clientToken, attachments, attachmentsToDelete, setAttachments, setFormValidatedMessage, formId) => {
    /*
    console.log('%c dataToPost:', 'color: maroon; font-weight: bold;')
    console.log({ dataToPost })
    */
    return await fetch(endpoint , {
        method: "DELETE",
        headers: {
            "Authorization": clientToken ? "Bearer " + clientToken : undefined
        }
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
        /*
        console.log('%c newAttachments:', 'color: purple; font-weight: bold;')
        console.log({ newAttachments })
        */
        setAttachments([ ...newAttachments ])
        setFormValidatedMessage(`You have successfully deleted the selected files.`)
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1);
    })
}

const updateAttachments = async (endpoint, clientToken, dataToPost, setAttachments, attachments, setFormValidatedMessage, formId) => {
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
        const name = response.data.file_data.split('/')[2]
        const newFile = {
            id: response.data.id,
            name
        }
        setAttachments([ ...attachments, newFile ])
        setFormValidatedMessage(`You have successfully added ${newFile.name}.`)
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1);
        document.getElementById(`${formId}-fileInput`).value = ''
    })
    
}

export const validateProfileAttachmentUploadForm = (event, file, attachments, setAttachments, setFormErrorMessage, setFormValidatedMessage, setSiblingFormErrorMessage, setSiblingFormValidatedMessage, formId, client, ids) => {
    event.preventDefault()
    setFormErrorMessage('')
    setFormValidatedMessage('')
    setSiblingFormErrorMessage('')
    setSiblingFormValidatedMessage('')
    /*
    console.log('%c file:', 'color: purple; font-weight: bold;')
    console.log(file)
    */
    if (!file) {
        setFormErrorMessage('You must select a file to add.')
        setTimeout(() => {
            document.getElementById(`${formId}-errorMessage`).focus()
        }, 1);
        return
    }
    if (file.size > DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
        setFormErrorMessage('You must choose an image that is less than 5 megabytes in file size.')
        document.getElementById(`${formId}-fileInput`).value = ''
        setTimeout(() => {
            document.getElementById(`${formId}-errorMessage`).focus()
        }, 1);
        return
    }
    const filePresent = attachments.filter(att => att.name === file.name)
    if (filePresent.length > 0) {
        setFormErrorMessage('File already exists.')
        setTimeout(() => {
            document.getElementById(`${formId}-errorMessage`).focus()
        }, 1);
    } else {







        const formData = new FormData()
        formData.append('public', true)
        formData.append('file_data', file)

        updateAttachments(uploadFileUrl, client.token, formData, setAttachments, attachments, setFormValidatedMessage, formId)



        /*
        const newFile = {
            id: `${Date.now()}`,
            name: file.name,
            size: file.size
        }
        setAttachments([ ...attachments, newFile ])
        setFormValidatedMessage(`You have successfully added ${newFile.name}.`)
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1);
        document.getElementById(`${formId}-fileInput`).value = ''
    */
    }














}

export const validateManageProfileAttachmentsForm = (event, attachments, setAttachments, selectedAttachments, setSelectedAttachments, setFormErrorMessage, setFormValidatedMessage, setSiblingFormErrorMessage, setSiblingFormValidatedMessage, formId, client, ids) => {
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
        console.log({ attachmentsToDelete })\
        */
       
        attachmentsToDelete.forEach((attachmentId, i) => {
            /*
            console.log('%c attachmentId:', 'color: red; font-weight: bold;')
            console.log({ attachmentId })
            */
            deleteAttachment(`${deleteFileUrl}${attachmentId}`, client.token, attachments, attachmentsToDelete, setAttachments, setFormValidatedMessage, formId)
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
        /*
        console.log('%c newAttachments:', 'color: purple; font-weight: bold;')
        console.log({ newAttachments })
        */
        /*
        setAttachments([ ...newAttachments ])
        setFormValidatedMessage(`You have successfully deleted the selected files.`)
        setTimeout(() => {
            document.getElementById(`${formId}-validatedMessage`).focus()
        }, 1);
        */
   }
}