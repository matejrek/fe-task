import successLogo from '../assets/success.svg';

const SuccessMsg = () => {
  return (
    <>
      <div className="success-page">
        <img src={successLogo} alt="Success" />
        <h1 className="title">Success</h1>
        <p className="description">
          You have received an email where you can read more about your account and setup your password.
        </p>
      </div>
    </>
  )
}

export default SuccessMsg;