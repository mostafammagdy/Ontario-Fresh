import React from 'react'
import PropTypes from 'prop-types'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion'

import FormProductSelectorAccordionItem from './FormProductSelectorAccordionItem'

const FormProductSelector = props => {
    const { heading, intro, client, ids, id, currentProfiles, updateProductList, products, setProducts, currentTooltip, setCurrentTooltip } = props
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
                <Accordion
                    allowMultipleExpanded={true}
                    allowZeroExpanded={true}
                >
                    {
                        products.map((product, i) => {
                            return (
                                <FormProductSelectorAccordionItem
                                    key={`formProductSelectorAccordionItem-${i}`}
                                    heading={product.name}
                                    client={client}
                                    ids={ids}
                                    category={product.id}
                                    id={`${id}-${product.textId}`}
                                    currentProfiles={currentProfiles}
                                    categoryProducts={product.products}
                                    updateProductList={updateProductList}
                                    allProducts={products}
                                    setAllProducts={setProducts}
                                    currentTooltip={currentTooltip}
                                    setCurrentTooltip={setCurrentTooltip}
                                />
                            )
                        })
                    }
                </Accordion>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

FormProductSelector.defaultName = 'FormProductSelector'

FormProductSelector.defaultProps = {}

FormProductSelector.propTypes = {}

export default FormProductSelector