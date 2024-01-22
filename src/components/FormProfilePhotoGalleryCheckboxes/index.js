import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { PROFILES } from '../../utils/constants-unmutables'

import FormCheckboxesGroup from '../FormCheckboxesGroup'

const FormProfilePhotoGalleryCheckboxes = props => {
    const { imageId, imageName, usersProfiles, parentAttachments, setParentAttachments, formId } = props
    /*
    console.log('%c FormProfilePhotoGalleryCheckboxes parentAttachments:', 'color: turquoise; font-weight: bold;')
    console.log({ parentAttachments })
    */
    let showInGallery = {}
    parentAttachments.forEach(pga => {
        for (const [ key, value ] of Object.entries(pga)) {
            if (key === 'id' && value === imageId) {
                showInGallery = { ...pga.showInGallery }
            }
        }
    })
    /*
    console.log('%c showInGallery:', 'color: purple; font-weight: bold;')
    console.log({ showInGallery })
    */

    /*
    const checkboxes = usersProfiles.map((up, i) => {
        let label = ''
        PROFILES.some(pr => {
            if (pr.value === up)
                label = pr.label
            return pr.value === up
        })
        return {
            label,
            value: up
        }
    })
    */
    const checkboxes = []
    usersProfiles.some(up => {
        if (up === 'vendor')
            checkboxes.push({ label: 'Vendor Gallery', value: 'vendor' })
        return up === 'vendor'
    })
    usersProfiles.some(up => {
        if (up !== 'vendor')
            checkboxes.push({ label: 'B2B Gallery', value: 'b2b' })
        return up !== 'vendor'
    })
    /*
    console.log('%c checkboxes:', 'color: green; font-weight: bold;')
    console.log({checkboxes})
    */

    const setShowInGallery = (value, formId) => {
        /*
        console.log('%c setShowInGallery value, formId:', 'color: red; font-weight: bold;')
        console.log({ value, formId })
        */
        const imgId = formId.split('-')[1]
        /*
        console.log('%c imgId:', 'color: red; font-weight: bold;')
        console.log({ imgId })
        */
        const attachmentObjIndex = parentAttachments.findIndex(pa => pa.id === imgId)
        const newParentAttachments = [ ...parentAttachments ]
        if (!parentAttachments[attachmentObjIndex].showInGallery[value])
            newParentAttachments[attachmentObjIndex].showInGallery[value] = true
        else
            newParentAttachments[attachmentObjIndex].showInGallery[value] = false
        setParentAttachments([ ...newParentAttachments ])
    }




    return (
        <FormCheckboxesGroup
            label={`Select the galleries you’d like ${imageName} to appear in:`}
            id={`${formId}-${imageId}-showInGalleries`}
            checkboxes={checkboxes}
            selectedCheckboxes={showInGallery}
            setCheckboxStates={setShowInGallery}
            customSetCheckboxStates={true}
            formId={`${formId}-${imageId}`}
        />
    )
}

FormProfilePhotoGalleryCheckboxes.defaultName = 'FormProfilePhotoGalleryCheckboxes'

FormProfilePhotoGalleryCheckboxes.defaultProps = {}

FormProfilePhotoGalleryCheckboxes.propTypes = {
    imageId: PropTypes.string.isRequired,
    imageName: PropTypes.string.isRequired,
    usersProfiles: PropTypes.arrayOf(PropTypes.string).isRequired,
    parentAttachments: PropTypes.array.isRequired,
    setParentAttachments: PropTypes.func.isRequired,
    formId: PropTypes.string.isRequired
}

export default FormProfilePhotoGalleryCheckboxes