import React from 'react'
import PropTypes from 'prop-types'
import { AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion'

import FormProductSelectorProfileProductsForm from './FormProductSelectorProfileProductsForm'

const FormProductSelectorAccordionItem = props => {
    const { heading, client, ids, category, id, currentProfiles, categoryProducts, updateProductList, allProducts, setAllProducts, currentTooltip, setCurrentTooltip, labels } = props
    /*
    console.log('%c props:', 'color: red; font-weight: bold;')
    console.log({ props })
    */
    const textId = id.split('-')[1]
    /*
    console.log('%c textId:', 'color: red; font-weight: bold;')
    console.log({ textId })
    */
    const profiles = []
    currentProfiles.forEach(profile => {
        if (profile !== 'service_provider') {
            profiles.push({
                id: profile,
                label: labels[textId][profile].label,
                tooltip: labels[textId][profile].tooltip,
                products: categoryProducts[profile]
            })
        }
    })
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton>{heading}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                {/*
                <p>Add all the products you want to sell to other businesses (B2B). You can always add more later.</p>
                */}
                {
                    profiles.map((profile, i) => {
                        return (
                            <FormProductSelectorProfileProductsForm
                                key={`FormProductSelectorProfileProductsForm-${i}`}
                                client={client}
                                ids={ids}
                                category={category}
                                formId={`${id}-${profile.id}`}
                                label={profile.label}
                                // tooltip={profile.tooltip}
                                categoryProfileProducts={profile.products}
                                updateProductList={updateProductList}
                                allProducts={allProducts}
                                setAllProducts={setAllProducts}
                                /*
                                currentTooltip={currentTooltip}
                                setCurrentTooltip={setCurrentTooltip}
                                tooltipOffsetElementId={`${id}-${profile.id}`}
                                */
                               hideColon={true}
                            />
                        )
                    })
                }
            </AccordionItemPanel>
        </AccordionItem>
    )
}

FormProductSelectorAccordionItem.defaultName = 'FormProductSelectorAccordionItem'

/*
    ALERT: You can add your tooltips in for each profile type here!
*/
FormProductSelectorAccordionItem.defaultProps = {
    labels: {
        fruit: {
            vendor: {
                label: 'As a Vendor, what Ontario grown fruit do you sell to consumers?',
                tooltip: 'aaa'
            },
            seller: {
                label: 'As a Seller, what Ontario grown fruit do you sell in wholesale quantities?',
                tooltip: 'aaa'
            },
            processor: {
                label: 'As a Processor, what Ontario grown fruit do you process?',
                tooltip: 'aaa'
            },
            buyer: {
                label: 'As a Buyer, what Ontario grown fruit are you looking for?',
                tooltip: 'aaa'
            }
        },
        vegetables: {
            vendor: {
                label: 'As a Vendor, what Ontario grown vegetables do you sell to consumers?',
                tooltip: 'aaa'
            },
            seller: {
                label: 'As a Seller, what Ontario grown vegetables do you sell in wholesale quantities?',
                tooltip: 'aaa'
            },
            processor: {
                label: 'As a Processor, what Ontario grown vegetables do you process?',
                tooltip: 'aaa'
            },
            buyer: {
                label: 'As a Buyer, what Ontario grown vegetables are you looking for?',
                tooltip: 'aaa'
            }
        },
        meat: {
            vendor: {
                label: 'As a Vendor, what Ontario raised meat and poultry products do you sell to consumers?',
                tooltip: 'aaa'
            },
            seller: {
                label: 'As a Seller, what Ontario raised meat and poultry products do you sell in wholesale quantities?',
                tooltip: 'aaa'
            },
            processor: {
                label: 'As a Processor, what Ontario raised meat and poultry products do you process?',
                tooltip: 'aaa'
            },
            buyer: {
                label: 'As a Buyer, what Ontario raised meat and poultry products are you looking for?',
                tooltip: 'aaa'
            }
        },
        dairyEggs: {
            vendor: {
                label: 'As a Vendor, what Ontario produced dairy and egg products do you sell to consumers?',
                tooltip: 'aaa'
            },
            seller: {
                label: 'As a Seller, what Ontario produced dairy and egg products do you sell in wholesale quantities?',
                tooltip: 'aaa'
            },
            processor: {
                label: 'As a Processor, what Ontario dairy and egg products do you process?',
                tooltip: 'aaa'
            },
            buyer: {
                label: 'As a Buyer, what Ontario produced dairy and egg products are you looking for?',
                tooltip: 'aaa'
            }
        },
        fish: {
            vendor: {
                label: 'As a Vendor, what Ontario produced fish do you sell to consumers?',
                tooltip: 'aaa'
            },
            seller: {
                label: 'As a Seller, what Ontario produced fish do you sell in wholesale quantities?',
                tooltip: 'aaa'
            },
            processor: {
                label: 'As a Processor, what Ontario fish do you process?',
                tooltip: 'aaa'
            },
            buyer: {
                label: 'As a Buyer, what Ontario produced fish are you looking for?',
                tooltip: 'aaa'
            }
        },
        preparedFoodCondiments: {
            vendor: {
                label: 'As a Vendor, what prepared foods and condiments made from Ontario ingredients do you sell to consumers?',
                tooltip: 'aaa'
            },
            seller: {
                label: 'As a Seller, what prepared foods and condiments made from Ontario ingredients do you sell in wholesale quantities?',
                tooltip: 'aaa'
            },
            processor: {
                label: 'As a Processor, what prepared foods and condiments do you process?',
                tooltip: 'aaa'
            },
            buyer: {
                label: 'As a Buyer, what kind of Ontario prepared food and condiments are you looking for?',
                tooltip: 'aaa'
            }
        },
        grains: {
            vendor: {
                label: 'As a Vendor, what Ontario grown grains do you sell to consumers?',
                tooltip: 'aaa'
            },
            seller: {
                label: 'As a Seller, what Ontario grains do you sell in wholesale quantities?',
                tooltip: 'aaa'
            },
            processor: {
                label: 'As a Processor, what Ontario grains do you process?',
                tooltip: 'aaa'
            },
            buyer: {
                label: 'As a Buyer, what Ontario grains are you looking for?',
                tooltip: 'aaa'
            }
        },
        nutsSeedsHerbs: {
            vendor: {
                label: 'As a Vendor, what Ontario grown nuts, seeds or herbs do you sell to consumers?',
                tooltip: 'aaa'
            },
            seller: {
                label: 'As a Seller, what Ontario grown nuts, seeds or herbs do you sell in wholesale quantities?',
                tooltip: 'aaa'
            },
            processor: {
                label: 'As a Processor, what Ontario grown nuts, seeds or herbs do you process?',
                tooltip: 'aaa'
            },
            buyer: {
                label: 'As a Buyer, what Ontario grown nuts, seeds or herbs are you looking for?',
                tooltip: 'aaa'
            }
        },
        alcoholicBeverages: {
            vendor: {
                label: 'As a Vendor, what alcoholic beverages made from Ontario ingredients do you sell to consumers?',
                tooltip: 'aaa'
            },
            seller: {
                label: 'As a Seller, what alcoholic beverages made from Ontario ingredients do you sell in wholesale quantities?',
                tooltip: 'aaa'
            },
            processor: {
                label: 'As a Processor, what alcoholic beverages made from Ontario ingredients do you process?',
                tooltip: 'aaa'
            },
            buyer: {
                label: 'As a Buyer, what alcoholic beverages made from Ontario ingredients are you looking for?',
                tooltip: 'aaa'
            }
        },
        nonAlcoholicBeverages: {
            vendor: {
                label: 'As a Vendor, what non-alcoholic beverages made from Ontario ingredients do you sell to consumers?',
                tooltip: 'aaa'
            },
            seller: {
                label: 'As a Seller, what non-alcoholic beverages made from Ontario ingredients do you sell in wholesale quantities?',
                tooltip: 'aaa'
            },
            processor: {
                label: 'As a Processor, what non-alcoholic beverages made from Ontario ingredients do you process?',
                tooltip: 'aaa'
            },
            buyer: {
                label: 'As a Buyer, what non-alcoholic beverages made from Ontario ingredients are you looking for?',
                tooltip: 'aaa'
            }
        },
        other: {
            vendor: {
                label: 'As a Vendor, what products using Ontario ingredients do you sell to consumers?',
                tooltip: 'aaa'
            },
            seller: {
                label: 'As a Seller, what other Ontario products do you sell in wholesale quantities?',
                tooltip: 'aaa'
            },
            processor: {
                label: 'As a Processor, what other Ontario products do you process?',
                tooltip: 'aaa'
            },
            buyer: {
                label: 'As a Buyer, what other Ontario products are you looking for?',
                tooltip: 'aaa'
            }
        }
    }
}

FormProductSelectorAccordionItem.propTypes = {}

export default FormProductSelectorAccordionItem