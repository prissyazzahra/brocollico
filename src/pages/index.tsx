import { useHomepage } from "@/hooks/pages"
import { Modal, Input, Header, ModalActions, Button } from "semantic-ui-react"

const Homepage = () => {
  const {
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
   } = useHomepage()

  return (
    <>
      <Modal className="!w-100" open={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Content>
          <Header>
            <h2>Request an invite</h2>
          </Header>
          <div className="flex flex-box flex-col">
            <Input className="mb-2" value={name} onChange={(e: any) => setName(e?.target?.value)} placeholder="Full name"/>
            { error.name && <div className="text-red-500 mb-2">{error.name}</div> }
            <Input className="mb-2" value={email} onChange={(e: any) => setEmail(e?.target?.value)} placeholder="Email"/>
            { error.email && <div className="text-red-500 mb-2">{error.email}</div> }
            <Input className="mb-2" value={confirmEmail} onChange={(e: any) => setConfirmEmail(e?.target?.value)} placeholder="Confirm email"/>
            { error.confirm && <div className="text-red-500 mb-2">{error.confirm}</div> }
            <ModalActions>
              <Button disabled={loading} className={`${loading ? '' : 'main-button'} w-full`} onClick={() => {
                const errors: Record<string, string> = validateForms()
                if (Object.keys(errors).length < 1) {
                    setLoading(true)
                    submitEmail().then(() => {
                      clearValues()
                      setOpenModal(false)
                      setIsSuccess(true)
                      setLoading(false)
                    }).catch((err) => {
                      const respError = err?.response?.data?.errorMessage
                      validateForms(respError, 'server')
                      setLoading(false)
                    })
                  }
                }}>
                {loading ? 'Sending, please wait...' : 'Send'}
              </Button>
            </ModalActions>
            { error.server && <div className="text-red-500 mt-2">{error.server}</div> }
          </div>
        </Modal.Content>
      </Modal>
      <Modal className="!w-100" open={isSuccess} onClose={() => setIsSuccess(false)}>
        <Modal.Content>
          <Header>
            <h2>All done!</h2>
          </Header>
          <div className="flex flex-box flex-col items-center justify-center">
            <p>You will be one of the first to experience Broccoli & Co. when we launch.</p>
            <ModalActions>
              <Button className="main-button w-full" onClick={() => setIsSuccess(false)}>
                OK
              </Button>
              { error.server && <div className="text-red-500 mb-2">{error.server}</div> }
            </ModalActions>
          </div>
        </Modal.Content>
      </Modal>
      <div className="w-full flex flex-col justify-center">
        <div className="shadow-lg p-4">
          <p className="font-bold">BROCCOLI & CO.</p>
        </div>
        <div className="center-wrapper">
          <h1 className="m-2">A better way to enjoy everyday.</h1>
          <p className="m-2">Be the first to know when we launch.</p>
          <Button className="main-button" onClick={() => setOpenModal(true)}>Request an invite</Button>
        </div>
        <div className="p-4 w-full text-center border-t-[1px] border-gray-300 inset-shadow-sm fixed bottom-[0]">
          Made with ❤️ in Melbourne.
          © 2016 Broccoli & Co. All rights reserved.
        </div>
      </div>
    </>
  )
}

export default Homepage