import { useState, useCallback } from 'react'
import jsonp from 'jsonp'

/*
    Breakdown of the useMailChimp hook is available here:
    https://jfelix.info/blog/kick-start-your-newsletter-mailchimp-custom-form-with-react
*/

export const STATUS = {
    idle: 'IDLE',
    loading: 'LOADING',
    success: 'SUCCESS',
    error: 'ERROR'
}

function toQueryString(params) {
    return Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&')
}

export function useMailChimp(url) {
    const [ status, setStatus ] = useState(STATUS.idle)
    const [ error, setError ] = useState(null)
    const [ value, setValue ] = useState(null)

    const subscribe = useCallback(data => {
        const params = toQueryString(data)
        // const ajaxUrl = url.replace('/post?', '/post-json?')
        const newUrl = `${url}&${params}`

        setError(null)
        setStatus(STATUS.loading)

        jsonp(newUrl, { param: 'c' }, (err, data) => {
            if (err) {
                setStatus(STATUS.error)
                setError(err)
            } else if (data.result !== 'success') {
                setStatus(STATUS.error)
                setError(data.msg)
            } else {
                setStatus(STATUS.success)
                setValue(data.msg)
            }
        })
    }, [])

    return { subscribe, status, error, value }
}