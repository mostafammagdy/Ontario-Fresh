import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion'

// import 'react-accessible-accordion/dist/fancy-example.css'
import './styles.scss'
import styles from './styles.module.scss'

import { LOCATIONS_BUSINESS_HOURS_DEFAULT } from '../../utils/constants-unmutables'
import FormLocationBusinessHours from '../FormLocationsBusinessHours'

const addAnotherLocation = (event, locations, setLocations) => {
    event.preventDefault()
    const locationsLength = locations.length
    /*
    console.log('%c LOCATIONS_BUSINESS_HOURS_DEFAULT:', 'color: blue; font-weight: bold;')
    console.log(LOCATIONS_BUSINESS_HOURS_DEFAULT)
    */
    const newLocations = [
        ...locations,
        LOCATIONS_BUSINESS_HOURS_DEFAULT
    ]
    setLocations([ ...newLocations ])
    setTimeout(() => {
        document.getElementById(`locationBusinessHours_${locationsLength}-description`).focus()
    }, 1);
}

const renderFormLocationsBusinessHoursComponents = (client, ids, locations, setLocations, setFormRemovedMessage, currentTooltip, setCurrentTooltip) => {
    /*
    console.log('%c locations:', 'color: blue; font-weight: bold;')
    console.log(locations)
    */
    const formLocationsBusinessHoursComponents = locations.map((location, i) => {
        /*
        console.log('%c location, i:', 'color: green; font-weight: bold;')
        console.log({ location, i })
        */
        // const { primaryLocation, locationName, streetName, streetNumber, concessionRr, cityTown, postalCode, directions, seasons, businessHoursLink, furtherDetails, openToPublic } = location
        const { id, description, address_1, address_2, city, province, postal_code, country, phone } = location
        /*
        console.log('%c primaryLocation:', 'color: purple; font-weight: bold;')
        console.log({ primaryLocation })
        */
        return (
            <FormLocationBusinessHours
                key={`formLocationBusinessHours-${i}`}
                client={client}
                ids={ids}
                formInt={i}
                id={id}
                // primaryLocation={primaryLocation}
                description={description}
                address_1={address_1}
                address_2={address_2}
                city={city}
                province={province}
                postal_code={postal_code}
                country={country}
                phone={phone}
                submitValue='Save'
                removeLocationValue = 'Remove this location'
                locations={locations}
                setLocations={setLocations}
                setFormRemovedMessage={setFormRemovedMessage}
                currentTooltip={currentTooltip}
                setCurrentTooltip={setCurrentTooltip}
            />
        )
    })
    return formLocationsBusinessHoursComponents
}

const FormProfileAccordianMultipleItems = props => {
    const { heading, intro, client, ids, locations, setLocations, currentTooltip, setCurrentTooltip } = props
    const [ formRemovedMessage, setFormRemovedMessage ] = useState('')
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton>{heading}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                {
                    intro &&
                        intro.map((para, i) => {
                            return (
                                <p key={`introPara-${i}`}>{para}</p>
                            )
                        })
                }
                {
                    !!formRemovedMessage &&
                        <p
                            className={`formProfileAccordionMultipleItems__validated ${styles.formProfileAccordionMultipleItems__validated}`}
                            id='formRemovedMessage'
                            tabIndex='-1'
                        >
                            {formRemovedMessage}
                        </p>
                }
                {
                    renderFormLocationsBusinessHoursComponents(client, ids, locations, setLocations, setFormRemovedMessage, currentTooltip, setCurrentTooltip)
                }
                {
                    !!locations[locations.length - 1].description &&
                        <button
                            className={`formProfileAccordionMultipleItems__button ${styles.formProfileAccordionMultipleItems__button}`}
                            onClick={e => addAnotherLocation(e, locations, setLocations)}
                        >
                            Add another location
                        </button>
                }
            </AccordionItemPanel>
        </AccordionItem>
    )
}

FormProfileAccordianMultipleItems.defaultName = 'FormProfileAccordianMultipleItems'

export default FormProfileAccordianMultipleItems