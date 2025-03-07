import axios from "axios"
import { useState } from "react"

export const useHomepage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [confirmEmail, setConfirmEmail] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<boolean>(false)

  const submitEmail = async () => {
    const payload = {
      name,
      email,
    }
    const url = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth'
    return axios.post(url, payload)
  }

  const validateForms = (errorMessage?: string, key?: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const errors: Record<string, string> = {}
    if (name.length < 3) {
      errors.name = "Name should contain at least 3 characters"
    }

    if (!regex.test(email)) {
      errors.email = "Please enter a valid email"
    }

    if ((email === '' && confirmEmail === '') || email !== confirmEmail) {
      errors.confirm = "Email addresses do not match"
    }

    if (errorMessage && key) {
      errors[key] = errorMessage
    }

    setError(errors)
    return errors
  }

  const clearValues = () => {
    setName('')
    setEmail('')
    setConfirmEmail('')
    setError({})
  }

  return {
    name,
    setName,
    email,
    setEmail,
    confirmEmail,
    setConfirmEmail,
    openModal,
    setOpenModal,
    isSuccess,
    setIsSuccess,
    error,
    submitEmail,
    validateForms,
    clearValues,
    loading,
    setLoading
  }
}