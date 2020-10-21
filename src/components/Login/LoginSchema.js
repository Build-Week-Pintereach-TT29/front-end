import * as yup from 'yup'

export default yup.object().shape({

name: yup
    .string()
    .required('A name is required.'),

password: yup
    .string()
    .required('A password is required.')

})