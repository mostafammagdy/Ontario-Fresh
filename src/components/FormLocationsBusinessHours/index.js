import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './styles.scss'
import styles from './styles.module.scss'

import { LOCATIONS_BUSINESS_HOURS_DEFAULT, LOCATIONS_BUSINESS_HOURS_ERROR_MESSAGES_DEFAULT } from '../../utils/constants-unmutables'
import { validateLocationsBusinessHoursForm } from './validation-scripts/locations-business-hours'

import FormErrorList from '../FormErrorList'
import FormCheckbox from '../FormCheckboxesGroup/FormCheckbox'
import FormInputText from '../FormInputText'
import FormCheckboxesGroup from '../FormCheckboxesGroup'

const env = process.env.REACT_APP_API_URL

const removeLocationDetails = async (endpoint, clientToken, dataToPost, locations, setLocations) => {
    return await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": clientToken ? "Bearer " + clientToken : undefined
        },
        body: JSON.stringify(dataToPost)
    }).then(response => {
        console.log('%c response:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
        console.log({ response })

        let updatedLocations = locations.filter((location, i) => {
            console.log('%c location.id => dataToPost.id:', 'color: red; font-weight: bold;')
            console.log({ locationId: location.id, dataToPostId: dataToPost.id })
            return location.id !== dataToPost.id
        })

        console.log('%c updatedLocations:', 'color: blue; font-weight: bold;')
        console.log({ updatedLocations })

        /*
        if (isPrimaryLocation && updatedLocations.length > 0)
            updatedLocations[0].primaryLocation = true
        */

        console.log('%c updatedLocations.length:', 'color: red; font-weight: bold;')
        console.log({ updatedLocationsLength: updatedLocations.length })

        if (updatedLocations.length < 1)
            updatedLocations = [ LOCATIONS_BUSINESS_HOURS_DEFAULT ]
        setLocations([ ...updatedLocations ])
        /*
        setTimeout(() => {
            if (updatedLocations.length === 1) {
                document.getElementById('locationBusinessHours_0-description').value = ''
                document.getElementById('locationBusinessHours_0-address_1').value = ''
                document.getElementById('locationBusinessHours_0-address_2').value = ''
                document.getElementById('locationBusinessHours_0-city').value = ''
                document.getElementById('locationBusinessHours_0-postal_code').value = ''
                document.getElementById('locationBusinessHours_0-phone').value = ''
            }
        }, 10);
        */
    })
}

const removeLocation = (event, setErrorMessages, setFormValidatedMessage, setFormRemovedMessage, locations, formInt, setLocations, client) => {
    event.preventDefault()
    /*
    NOW you need to write a script that will remove set the primaryLocation
    value to the first location in the array if this location that's being 
    removed is the current primary location.
    */
    setErrorMessages({ ...LOCATIONS_BUSINESS_HOURS_ERROR_MESSAGES_DEFAULT })
    setFormValidatedMessage('')


    const postData = {
        id: locations[formInt].id
    }

    removeLocationDetails(`${env}/accounts/delete_address/`, client.token, postData, locations, setLocations)

















    setFormRemovedMessage('Location has been removed.')
    // const focusForm = formInt > 0 ? formInt - 1 : formInt
    setTimeout(() => {
        document.getElementById('formRemovedMessage').focus()
    }, 1);

    // const isPrimaryLocation = locations[formInt].primaryLocation
    
    /*
    console.log('%c locations, formInt:', 'color: red; font-weight: bold;')
    console.log({ locations, formInt })

    let updatedLocations = locations.filter((location, i) => i !== formInt)

    console.log('%c updatedLocations:', 'color: blue; font-weight: bold;')
    console.log({ updatedLocations })

    /*
    if (isPrimaryLocation && updatedLocations.length > 0)
        updatedLocations[0].primaryLocation = true
    *

    if (updatedLocations.length < 1)
        updatedLocations = [ LOCATIONS_BUSINESS_HOURS_DEFAULT ]
    setLocations([ ...updatedLocations ])
    */
}

const FormLocationBusinessHours = props => {
    // const { formInt, primaryLocation, locationName, ontarioAddress, cityTown, postalCode, directions, seasons, businessHoursLink, furtherDetails, openToPublic, submitValue, removeLocationValue, locations, setLocations, setFormRemovedMessage, currentTooltip, setCurrentTooltip } = props
    const { client, ids, formInt, id, description, address_1, address_2, city, province, postal_code, country, phone, submitValue, removeLocationValue, locations, setLocations, setFormRemovedMessage, currentTooltip, setCurrentTooltip } = props
    /*
    console.log('%c formInt, locationName:', 'color: pink; font-weight: bold;')
    console.log({ formInt, locationName })
    */
    /*
    console.log('%c seasons:', 'color: green; font-weight: bold;')
    console.log(seasons)
    */
    /*
    const [ checkboxPrimaryLocation, setCheckboxPrimaryLocation ] = useState({
        primaryLocation: false
    })
    */
    const [ inputDescription, setInputDescription ] = useState('')
    const [ inputAddress1, setInputAddress1 ] = useState('')
    const [ inputAddress2, setInputAddress2 ] = useState('')
    const [ inputCity, setInputCity ] = useState('')
    const [ inputPostalCode, setInputPostalCode ] = useState('')
    const [ inputPhone, setInputPhone ] = useState('')
    
    /*
    console.log('%c selectedTermsConditions:', 'color: red; font-weight: bold;')
    console.log(selectedTermsConditions)
    */
    // useState() hook for the form’s error messages.
    const [ errorMessages, setErrorMessages ] = useState({ ...LOCATIONS_BUSINESS_HOURS_ERROR_MESSAGES_DEFAULT })
    /*
    console.log('%c errorMessages:', 'color: red; font-weight: bold;')
    console.log(errorMessages)
    */
   /*
   useState() hook to display the Location and Business Hours form’s validation confirmation message when the form is being/has been submitted.
   */
   const [ formValidatedMessage, setFormValidatedMessage ] = useState('')

    const formId = `locationBusinessHours_${formInt}`
    // const [ seasonsCheckboxes, setSeasonsCheckboxes ] = useState([])
    /*
    console.log('%c seasonsCheckboxes:', 'color: blue; font-weight: bold;')
    console.log(seasonsCheckboxes)
    */
    useEffect(() => {
        // setCheckboxPrimaryLocation({ primaryLocation })
        setInputDescription(description)
        setInputAddress1(address_1)
        setInputAddress2(address_2)
        setInputCity(city)
        setInputPostalCode(postal_code)
        setInputPhone(phone)
        /*
        const createSeasonsCheckboxes = []
        for (const [ key ] of Object.entries(seasons)) {
            const label = key === 'yearRound' ? 'Year Round' : `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
            const value = key;
            createSeasonsCheckboxes.push({
                label,
                value
            });
        }
        setSeasonsCheckboxes(createSeasonsCheckboxes)
        */
    }, [])
    return (
        <form
            className={`formLocations ${styles.formLocations}`}
            id={formId}
            noValidate
            onSubmit={e => validateLocationsBusinessHoursForm(e, {
                // checkboxPrimaryLocation,
                id,
                inputDescription,
                inputAddress1,
                inputAddress2,
                inputCity,
                province,
                inputPostalCode,
                country,
                inputPhone
            }, setErrorMessages, setFormValidatedMessage, setFormRemovedMessage, formId, formInt, locations, setLocations, client, ids)}
        >
            <FormErrorList
                formId={formId}
                errorMessages={errorMessages.messageList}
            />
            {
                !!formValidatedMessage &&
                    <p
                        className={`formLocations__validated ${styles.formLocations__validated}`}
                        id={`${formId}-validatedMessage`}
                        tabIndex='-1'
                    >
                        {formValidatedMessage}
                    </p>
            }
            {/*
            <fieldset className={`formLocations__fieldset ${styles.formLocations__fieldset}`}>
                <FormCheckbox
                    label={locations[formInt].primaryLocation ? 'Primary location' : 'Make primary location'}
                    value='primaryLocation'
                    checkboxState={checkboxPrimaryLocation}
                    setCheckboxState={setCheckboxPrimaryLocation}
                    disabled={locations[formInt].primaryLocation}
                    formId={formId}
                />
            </fieldset>
            */}
            <fieldset className={`formLocations__fieldset ${styles.formLocations__fieldset}`}>
                <div className={`formLocations__flex ${styles.formLocations__flex}`}>
                    <FormInputText
                        label='Location Name'
                        id={`${formId}-description`}
                        type='text'
                        value={inputDescription}
                        setInputState={setInputDescription}
                        required={true}
                        errorMessage={errorMessages['description']}
                    />
                    <FormInputText
                        label='Ontario Address'
                        id={`${formId}-address_1`}
                        type='text'
                        value={inputAddress1}
                        setInputState={setInputAddress1}
                        required={true}
                        errorMessage={errorMessages['address_1']}
                    />
                    <FormInputText
                        label='Ontario Address (Line 2)'
                        id={`${formId}-address_2`}
                        type='text'
                        value={inputAddress2}
                        setInputState={setInputAddress2}
                        required={false}
                        errorMessage={errorMessages['address_2']}
                    />
                    <FormInputText
                        label='City/Town'
                        id={`${formId}-city`}
                        type='text'
                        value={inputCity}
                        setInputState={setInputCity}
                        required={true}
                        errorMessage={errorMessages['city']}
                    />
                    <FormInputText
                        label='Postal Code'
                        id={`${formId}-postal_code`}
                        type='text'
                        value={inputPostalCode}
                        setInputState={setInputPostalCode}
                        required={true}
                        errorMessage={errorMessages['postal_code']}
                    />
                    <FormInputText
                        label='Phone Number'
                        id={`${formId}-phone`}
                        type='tel'
                        value={inputPhone}
                        setInputState={setInputPhone}
                        required={false}
                        errorMessage={errorMessages['phone']}
                    />
                </div>
            </fieldset>
            <fieldset className={`formLocations__fieldset ${styles.formLocations__fieldset}`}>
                <input
                    className={`formLocations__button ${styles.formLocations__button}`}
                    type='submit'
                    value={submitValue}
                />
                {
                    !!locations[formInt].description &&
                        <input
                            className={`formLocations__button ${styles.formLocations__button}`}
                            type='button'
                            value={removeLocationValue}
                            onClick={e => removeLocation(e, setErrorMessages, setFormValidatedMessage, setFormRemovedMessage, locations, formInt, setLocations, client)}
                        />
                }
            </fieldset>
        </form>
    )
}

FormLocationBusinessHours.defaultName = 'FormLocationBusinessHours'

FormLocationBusinessHours.defaultProps = {
    submitValue: 'Save'
}

export default FormLocationBusinessHours