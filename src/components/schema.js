import * as yup from 'yup'

export default yup.object().shape({

name: yup
    .string()
    .required('A name is required.')
    .min(3, 'Name must be at least 3 characters long.'),

username: yup
    .string()
    .required('A username is required.')
    .min(3, 'Username must be at least 3 characters long.'),

email: yup
    .string()
    .email('A valid email address is required.')
    .required('An email address is required.'),

password: yup
    .string()
    .required('A password is required.')
    .min(4, 'Password must be at least 4 characters long.'),

terms: yup
    .boolean()
    .required('You must accept the Terms of Service.')
    .oneOf([true], 'You must accept the Terms of Service.')
})
