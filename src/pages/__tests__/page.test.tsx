import { useHomepage } from "@/hooks/pages"
import Homepage from ".."
import '@testing-library/jest-dom'
import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react'
import axios from "axios"


describe("Homepage", () => {
  jest.mock('axios')
  beforeEach(() => {
    jest.clearAllMocks()
    render(<Homepage />)
  })

  it('Should have text', () => {
    expect(screen.getByText('BROCCOLI & CO.'))
    expect(screen.getByText('A better way to enjoy everyday.'))
    expect(screen.getByText('Be the first to know when we launch.'))
  })

  it('Should show modal when request button is clicked', () => {

    fireEvent.click(screen.getByText('Request an invite'))
    expect(screen.getByPlaceholderText('Full name')).toBeInTheDocument()
  })

  it ('Should show error when all inputs are empty', () => {
    fireEvent.click(screen.getByText('Request an invite'))
    fireEvent.click(screen.getByText('Send'))

    const { result } = renderHook(() => useHomepage())

    act(() => {
      result.current.validateForms()
    })

    expect(result.current.error).toMatchObject({
      name: "Name should contain at least 3 characters",
      email: "Please enter a valid email",
      confirm: "Email addresses do not match",
    })
  })

  it('Should show errors when send button is clicked with empty inputs', () => {
    const { result } = renderHook(() => useHomepage())

    fireEvent.click(screen.getByText('Request an invite'))
    fireEvent.click(screen.getByText('Send'))

    act(() => result.current.validateForms())

    const mockValidateForms = jest.spyOn(result.current, 'validateForms')

    act(() => {
      result.current.validateForms()
    })

    mockValidateForms.mockReturnValue({
      name: "Name should contain at least 3 characters",
      email: "Please enter a valid email",
      confirm: "Email addresses do not match",
    })

    expect(result.current.error).toMatchObject({
      name: "Name should contain at least 3 characters",
      email: "Please enter a valid email",
      confirm: "Email addresses do not match",
    })
  })

  it('Should get error response from API sending used email', async () => {
    const { result } = renderHook(() => useHomepage())

    fireEvent.click(screen.getByText('Request an invite'))

    act(() => {
      result.current.setName('Name')
      result.current.setEmail('usedemail@airwallex.com')
      result.current.setConfirmEmail('usedemail@airwallex.com')
    })

    const inputName = screen.getByPlaceholderText('Full name')
    const inputEmail = screen.getByPlaceholderText('Email')
    const inputConfirm = screen.getByPlaceholderText('Confirm email')

    fireEvent.change(inputName, { target: { value: 'Name' } })
    fireEvent.change(inputEmail, { target: { value: 'usedemail@airwallex.com' } })
    fireEvent.change(inputConfirm, { target: { value: 'usedemail@airwallex.com' } })

    await waitFor(async () => {
      expect(result.current.name).toBe('Name')
      expect(result.current.email).toBe('usedemail@airwallex.com')
    })

    fireEvent.click(screen.getByText('Send'))

    const err = {
      status: 400,
      errorMessage: 'Bad request'
    }

    axios.post = jest.fn().mockRejectedValueOnce(err)
    await act(async () => {
      try {
        await result.current.submitEmail()
        expect(await screen.findByText('Bad request')).toBeInTheDocument()
      } catch (respError: any) {
        act(() => {
          result.current.validateForms(respError?.errorMessage, 'server')
        })
        expect(respError?.status).toBe(400)
      }
    })
    expect(axios.post).toHaveBeenCalled()
  })

  it('Should call API successfully when all inputs are filled', async () => {
    const { result } = renderHook(() => useHomepage())

    fireEvent.click(screen.getByText('Request an invite'))

    act(() => {
      result.current.setName('Name')
      result.current.setEmail('email@email.com')
      result.current.setConfirmEmail('email@email.com')
    })

    const inputName = screen.getByPlaceholderText('Full name')
    const inputEmail = screen.getByPlaceholderText('Email')
    const inputConfirm = screen.getByPlaceholderText('Confirm email')

    fireEvent.change(inputName, { target: { value: 'Name' } })
    fireEvent.change(inputEmail, { target: { value: 'email@email.com' } })
    fireEvent.change(inputConfirm, { target: { value: 'email@email.com' } })

    await waitFor(async () => {
      expect(result.current.name).toBe('Name')
      expect(result.current.email).toBe('email@email.com')
      expect(result.current.confirmEmail).toBe('email@email.com')
    })

    fireEvent.click(screen.getByText('Send'))

    const response = {
      status: 200,
      data: "Registered"
    }

    await act(async () => result.current.submitEmail())
    axios.post = jest.fn().mockResolvedValueOnce(response)

    expect(await screen.findByText('OK')).toBeInTheDocument()
  })
})