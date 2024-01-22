export function focusError(event, focus) {
    event.preventDefault()
    document.getElementById(focus).focus()
}