import { useCallback, useState } from "react"

function useFormValidation() {
const [values, setValues] = useState({})
const [error, setError] = useState({})
const [isInputValid, setIsInputValid] = useState({})
const [isValid, setIsValid] = useState(false) //form 

function handleChange(e) {

    setValues((props) => {
     return { ...props, [e.target.name]: e.target.value}   
    })

    setError((props) => {
        return {...props, [e.target.name]: e.target.validationMessage }  
    })

    setIsInputValid ((props) => {
        return {...props, [e.target.name]: e.target.validity.valid }  
    })

    setIsValid(e.target.form.checkValidity())
}

    function reset(data={}) {
        setValues(data)
        setError({})
        setIsInputValid({})
        setIsValid(false)
    }

   const setValue = useCallback((name, value) => {
        setValues((props) => {
            return { ...props, [name]: value}   
           })
    }, [])

return {handleChange, values, error,isInputValid,isValid, reset, setValue}
}

export default useFormValidation