import moment from 'moment'

export const checkRequired = value => value || value === 0 ? undefined : 'Required'
export const checkRequiredSilent = value => !value
export const checkEmail = value =>
  (value &&
    !(/^([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) /* eslint-disable-line */
    ? 'Invalid email'
    : undefined)
export const checkLength = value => (value && value.length < 8 ? 'Minimum 8 characters' : undefined)
export const checkPhoneLength = value => (value && value.length < 10 ? 'Minimum 10 characters' : undefined)
export const checkCheckbox = value => (value === true ? undefined : 'Please read and accept the Terms of Use and Personal Information Policy to register.')
export const checkEmptyArray = value => (value && Array.isArray(value) && value.length < 1 ? 'Please select at least one User Type' : undefined)
//export const customUrlValdiation = value => (value && !/^(?:(http[s]?:)\/\/)?([^:\/\s]+\.[^:\/\s]+)([^#?\s]+)[^.]$/i.test(value) ? 'Please enter a valid URL.' : undefined) // eslint-disable-line
export const customUrlValdiation = () => undefined //the restriction was too strict for migrated profiles with websitess
export const minDateToToday = value => {
  const today = moment().format('YYYY-MM-DD');
  const selectedDate = moment(value, 'YYYY-MM-DD', true);
  return selectedDate.isBefore(today) ? 'You cannot select a date in the past.' : undefined;
}

export const checkPassword = value => (
  /*
  Test on the password string is for a minimum of eight characters, at least one letter, one number and one special character.
  */
  value && !(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)) /* eslint-disable-line */ ?
      'Invalid password'
    : undefined
)