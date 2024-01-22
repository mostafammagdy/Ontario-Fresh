import React, { useRef, useState } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'

import './styles.scss'
import styles from './styles.module.scss'

import { focusError } from '../../../../utils/form-focus-error'
import { caseInsensitiveEquals } from '../../../../utils/case-insensitive-equals'

import FormInputText from '../../../FormInputText'
import FormErrorMessage from '../../../FormErrorMessage'

import { getProductSuggestionsUrl, createProductUrl, deleteProductUrl } from '../../../../containers/editProductsComponent/sagas'

const updateProductsList = (addProduct, allProducts, productCategoriesId, profileId, updateProductList, setAllProducts, product, id) => {
    const newAllProducts = [ ...allProducts ]
    newAllProducts.forEach(nap => {
        if (nap.textId === productCategoriesId) {
            if (addProduct) {
                nap.products[profileId] = [
                    ...nap.products[profileId],
                    {
                        id,
                        name: product
                    }
                ]
            } else {





                
                // const newProductsList = nap.products[profileId].filter(prod => !caseInsensitiveEquals(prod, product))
                const newProductsList = nap.products[profileId].filter(prod => {
                    console.log('%c prod, id:', 'color: maroon; font-weight: bold;')
                    console.log({ prod, id })
                    return prod.id !== id
                })
                nap.products[profileId] = [ ...newProductsList ]









            }
        }
    })
    updateProductList(newAllProducts, setAllProducts)
}

const addProduct = (endpoint, clientToken, dataToPost, allProducts, productCategoriesId, profileId, updateProductList, setAllProducts, newProduct, setFormValidatedMessage, validatedMessage, setNewProduct, setProductSuggestions) => {
    return Axios({
        url: endpoint,
        method: 'post',
        headers: { Authorization: "Bearer " + clientToken || undefined },
        data: dataToPost
    }).then(response => {
        
        console.log('%c response:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
        console.log({ response: response.data })
        
        const id = response.data.id
        
        updateProductsList(true, allProducts, productCategoriesId, profileId, updateProductList, setAllProducts, newProduct, id)
        setFormValidatedMessage(`You have successfully added ${newProduct} to your list of products.`)
        setTimeout(() => {
            validatedMessage.current.focus()
        }, 1);
        setNewProduct('')
        setProductSuggestions([])



    })
}

const validateNewProductForm = (event, newProduct, setNewProduct, setProductSuggestions, categoryProfileProducts, setFormErrorMessage, errorMessageAnchor, productCategoriesId, profileId, updateProductList, allProducts, setAllProducts, setFormValidatedMessage, validatedMessage, client, ids, category) => {
    event.preventDefault()
    setFormErrorMessage('')
    setFormValidatedMessage('')
    if (!newProduct) {
        setFormErrorMessage('You must enter a product name.')
        setTimeout(() => {
            // document.getElementById(`${formId}-errorMessage`).focus()
            errorMessageAnchor.current.focus()
        }, 1);
        return
    }
    const charactersTest = /^.*[,].*$/
    /*
    console.log('%c charactersTest:', 'color: teal; font-weight: bold;')
    console.log({ charactersTest: charactersTest.test(newProduct) })
    */
    if (charactersTest.test(newProduct)) {
        setFormErrorMessage('You can’t include commas in your product’s name.')
        setTimeout(() => {
            errorMessageAnchor.current.focus()
        }, 1);
        return
    }
    const productExists = categoryProfileProducts.filter(product => caseInsensitiveEquals(product, newProduct))
    /*
    console.log('%c productExists:', 'color: red; font-weight: bold;')
    console.log({ productExists })
    */
    if (productExists.length > 0) {
        setFormErrorMessage('Product already exists. Please provide a new product name.')
        setTimeout(() => {
            // document.getElementById(`${formId}-errorMessage`).focus()
            errorMessageAnchor.current.focus()
        }, 1);
    } else {
        /*
        console.log('%c profileId, category:', 'color: lime; font-weight: bold;')
        console.log({ profileId, category })
        */
        const role_id = profileId === 'vendor' ?
                ids.vendor_role_id
            : profileId === 'buyer' ?
                    ids.buyer_role_id
                : profileId === 'seller' ?
                        ids.seller_role_id
                    : ids.processor_role_id

        
        const dataToPost = {
            role_id,
            category_id: category,
            name: newProduct
        }

        addProduct(createProductUrl, client.token, dataToPost, allProducts, productCategoriesId, profileId, updateProductList, setAllProducts, newProduct, setFormValidatedMessage, validatedMessage, setNewProduct, setProductSuggestions)
        

        /*
        updateProductsList(true, allProducts, productCategoriesId, profileId, updateProductList, setAllProducts, newProduct)
        setFormValidatedMessage(`You have successfully added ${newProduct} to your list of products.`)
        setTimeout(() => {
            validatedMessage.current.focus()
        }, 1);
        setNewProduct('')
        setProductSuggestions([])
        */
    }
}

const removeProductFromList = (event, setFormErrorMessage, setFormValidatedMessage, allProducts, productCategoriesId, profileId, updateProductList, setAllProducts, product, validatedMessage, client) => {
    event.preventDefault()
    setFormErrorMessage('')
    setFormValidatedMessage('')



    const dataToPost = {
        product_id: product.id
    }


    return Axios({
        url: deleteProductUrl,
        method: 'post',
        headers: { Authorization: "Bearer " + client.token || undefined },
        data: dataToPost
    }).then(response => {
        
        console.log('%c response:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
        console.log({ response: response.data })
        
        



        updateProductsList(false, allProducts, productCategoriesId, profileId, updateProductList, setAllProducts, null, product.id)
        setFormValidatedMessage(`You have successfully removed ${product.name} from your list of products.`)
        setTimeout(() => {
            validatedMessage.current.focus()
        }, 1);



    })
}

const createCategoryProfileProductsListItems = (categoryProfileProducts, styles, setFormErrorMessage, setFormValidatedMessage, allProducts, accordionCategories, updateProductList, setAllProducts, validatedMessage, client, formId) => {
    /*
    console.log('%c categoryProfileProducts:', 'color: MediumOrchid; font-weight: bold;')
    console.log({ categoryProfileProducts })
    */
    const ids = categoryProfileProducts.map(obj => obj.id)
    const filteredCategoryProfileProducts = categoryProfileProducts.filter(({id}, index) => !ids.includes(id, index + 1))
    /*
    console.log('%c filteredCategoryProfileProducts:', 'color: MediumTurquoise; font-weight: bold;')
    console.log({ filteredCategoryProfileProducts })
    */
    const categoryProfileProductsListItems = filteredCategoryProfileProducts.map((product, i) => {
        return (
            <li
                key={`categoryProfileProducts-${i}`}
                className={styles.formProductSelectorProfileProducts__categories__item}
            >
                <span className={styles.formProductSelectorProfileProducts__categories__textButtonWrapper}>
                    <span>{product.name}</span>
                    <button
                        className={`formProductSelectorProfileProducts__categories__button ${styles.formProductSelectorProfileProducts__categories__button}`}
                        type='button'
                        onClick={e => removeProductFromList(e, setFormErrorMessage, setFormValidatedMessage, allProducts, accordionCategories[1], accordionCategories[2], updateProductList, setAllProducts, product, validatedMessage, client)}
                        aria-describedby={`${formId}-${i}-desc`}
                    >
                        <span
                            aria-hidden='true'
                        >
                            X
                        </span>
                        {/*
                    <p
                        className='visually-hidden'
                        id={`${formId}-${i}-desc`}
                        aria-hidden='true'
                    >
                        Remove {product} from the product list.
                    </p>
                    */}
                    </button>
                </span>
            </li>
        )
    })
    return categoryProfileProductsListItems
}

const FormProductSelectorProfileProducts = props => {
    const { client, ids, category, formId, label, tooltip, categoryProfileProducts, updateProductList, allProducts, setAllProducts, currentTooltip, setCurrentTooltip, tooltipOffsetElementId, hideColon } = props
    /*
    console.log('%c FormProductSelectorProfileProducts props:', 'color: green; font-weight: bold;')
    console.log({ props })
    */
    const errorMessageAnchor = useRef(null)
    const validatedMessage = useRef(null)
    const searchContainer = useRef(null)
    const [ newProduct, setNewProduct ] = useState('')
    const [ productSuggestions, setProductSuggestions ] = useState([])
    const [ showSuggestions, setShowSuggestions ] = useState(false)
    /*
    console.log('%c productSuggestions:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
    console.log({ productSuggestions })
    */
    const [ formErrorMessage, setFormErrorMessage ] = useState('')
    const [ formValidatedMessage, setFormValidatedMessage ] = useState('')


    const accordionCategories = formId.split('-')

    const getProductSuggestions = (endpoint, clientToken, dataToPost) => {
        return Axios({
            url: endpoint,
            method: 'post',
            headers: { Authorization: "Bearer " + clientToken || undefined },
            data: dataToPost
        }).then(response => {
            /*
            console.log('%c response:', 'color: turquoise; font-weight: bold, font-style: italic; text-decoration: underline;')
            console.log({ response: response.data })
            */
            setProductSuggestions([ ...response.data ])
        })
    }

    const showSuggestionsFocus = event => {
        /*
        console.log('%c event:', 'color: red; font-weight: bold;')
        console.log({ event })
        */
        if (event.keyCode !== 9 && productSuggestions.length > 0 && newProduct)
            setShowSuggestions(true)
    }

    const blurSuggestionsContainer = () => {
        setTimeout(() => {
            if (!searchContainer.current?.contains(document.activeElement)) {
                setShowSuggestions(false)
                setProductSuggestions([])
            }
        }, 150)
    }

    const applySuggestion = (event, formId, suggestion) => {
        event.preventDefault()
        setNewProduct(suggestion)
        document.getElementById(`${formId}-textInput`).focus()
        setProductSuggestions([])
        setShowSuggestions(false)
    }

    if (newProduct.length > 0) {
        /*
        console.log('%c newProduct:', 'color: red; font-weight: bold;')
        console.log({ newProduct })
        */
        const postData = {
            query: `${category} ${newProduct}`
        }
        getProductSuggestions(getProductSuggestionsUrl, client.token, postData)
    }

    let categoryProfileProductsWithoutCategories = []
    
    if (categoryProfileProducts.length > 0) {
        /*
        console.log('%c categoryProfileProducts:', 'color: LightSeaGreen; font-weight: bold;')
        console.log({ categoryProfileProducts })
        */
        categoryProfileProductsWithoutCategories = categoryProfileProducts.filter(product => !product.name.startsWith('__'))
        /*
        console.log('%c categoryProfileProductsWithoutCategories:', 'color: LightSeaGreen; font-weight: bold;')
        console.log({ categoryProfileProductsWithoutCategories })
        */
    }

    return (
        <div
            className={`formProductSelectorProfileProducts ${styles.formProductSelectorProfileProducts}${categoryProfileProducts.length > 0 ? ' ' + styles['formProductSelectorProfileProducts--withProduct'] : ''}`}
        >
            <form
                className={categoryProfileProducts.length > 0 ? styles.formProductSelectorProfileProducts__form : ''}
                id={formId}
                noValidate
                onSubmit={e => validateNewProductForm(e, newProduct, setNewProduct, setProductSuggestions, categoryProfileProducts, setFormErrorMessage, errorMessageAnchor, accordionCategories[1], accordionCategories[2], updateProductList, allProducts, setAllProducts, setFormValidatedMessage, validatedMessage, client, ids, category)}
            >
                {
                    !!formErrorMessage &&
                        <p className={`formProductSelectorProfileProducts__errorParagraph ${styles.formProductSelectorProfileProducts__errorParagraph}`}>
                            <a
                                href={`#${formId}-textInput`}
                                className={`formProductSelectorProfileProducts__errorAnchor ${styles.formProductSelectorProfileProducts__errorAnchor}`}
                                ref={errorMessageAnchor}
                                id={`${formId}-errorMessage`}
                                onClick={e => focusError(e, `${formId}-textInput`)}
                            >
                                {formErrorMessage}
                            </a>
                            
                        </p>
                }
                {
                    !!formValidatedMessage &&
                        <p
                            className={`formProductSelectorProfileProducts__validated ${styles.formProductSelectorProfileProducts__validated}`}
                            ref={validatedMessage}
                            id={`${formId}-validatedMessage`}
                            tabIndex='-1'
                        >
                            {formValidatedMessage}
                        </p>
                }
                <div
                    className={styles.formProductSelectorProfileProducts__suggestionsContainer}
                    ref={searchContainer}
                    onBlur={blurSuggestionsContainer}
                >
                    <FormInputText
                        label={label}
                        tooltip={tooltip}
                        id={`${formId}-textInput`}
                        type='text'
                        setInputState={setNewProduct}
                        placeholder='Select to add product'
                        value={newProduct}
                        errorMessage={formErrorMessage}
                        currentTooltip={currentTooltip}
                        setCurrentTooltip={setCurrentTooltip}
                        tooltipOffsetElementId={tooltipOffsetElementId}
                        onFocusFunc={showSuggestionsFocus}
                        hideColon={hideColon}
                    />
                    {
                        showSuggestions && productSuggestions.length > 0 &&
                            <div className={styles.formProductSelectorProfileProducts__suggestionsList}>
                                <div className={styles.formProductSelectorProfileProducts__suggestionsUlWrap}>
                                    <ul className={styles.formProductSelectorProfileProducts__suggestionsUl}>
                                        {
                                            productSuggestions.map((suggestion, i) => {
                                                return (
                                                    <li
                                                        key={`suggestion-${i}`}
                                                        className={styles.formProductSelectorProfileProducts__suggestionsLi}
                                                    >
                                                        <button
                                                            className={styles.formProductSelectorProfileProducts__suggestion}
                                                            onClick={e => applySuggestion(e, formId, suggestion)}
                                                        >
                                                            {suggestion}
                                                        </button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                    }
                </div>
                {/*
                    formErrorMessage &&
                        <FormErrorMessage
                            id={`${formId}-textInput`}
                            errorMessage={formErrorMessage}
                        />
                */}
                <input
                    className={`formProductSelectorProfileProducts__button ${styles.formProductSelectorProfileProducts__button}`}
                    type='submit'
                    value='Add'
                />
            </form>
            {
                categoryProfileProductsWithoutCategories.length > 0 &&
                    <ul className={styles.formProductSelectorProfileProducts__categories__list}>
                        {
                            createCategoryProfileProductsListItems(categoryProfileProductsWithoutCategories, styles, setFormErrorMessage, setFormValidatedMessage, allProducts, accordionCategories, updateProductList, setAllProducts, validatedMessage, client, formId)
                        }
                    </ul>
            }
        </div>
    )
}

FormProductSelectorProfileProducts.defaultName = 'FormProductSelectorProfileProducts'

FormProductSelectorProfileProducts.defaultProps = {
    hideColon: false
}

FormProductSelectorProfileProducts.propTypes = {
    hideColon: PropTypes.bool
}

export default FormProductSelectorProfileProducts