import { useFormContext } from "react-hook-form"

const StepTwo: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
  const { register, watch, trigger, formState: { errors } } = useFormContext();

  const selectedAccType = watch("accountType");

  const onSubmit = async () => {
    const nameValid = await trigger("name");
    const emailValid = await trigger("email");
    const passwordValid = await trigger("password");
    const termsValid = await trigger("terms");
    const valid = nameValid && emailValid && passwordValid && termsValid;

    if (valid) {
      nextStep()
    }
  }

  return (
    <>
      <div className="controls">
        <h1 className="form-title">Register {selectedAccType} account!</h1>
        <p className="form-description">
          For the purpose of industry regulation, your details are required.
        </p>
        <label>Name *</label>
        <input {...register("name")} placeholder="Name" className="control" />
        {errors.name && <p className="error">{errors.name?.message?.toString()}</p>}

        <label>Email *</label>
        <input {...register("email")} placeholder="Email" className="control" />
        {errors.email && <p className="error">{errors.email?.message?.toString()}</p>}

        <label>Password *</label>
        <input type="password" {...register("password")} placeholder="Password" className="control" />
        {errors.password && <p className="error">{errors.password?.message?.toString()}</p>}

        <div className="checkbox-wrapper">
          <input id="terms" type="checkbox" {...register("terms")} />
          <label htmlFor="terms">I agree to <a href="#">terms & Conditions</a></label>
        </div>
        {errors.terms && <p className="error">{errors.terms?.message?.toString()}</p>}

        <button className="button-1" onClick={onSubmit}>Register Account</button>

        <div className="safety-notice">
          <span className="material-symbols-outlined">lock</span> Your info is safely secured
        </div>

      </div>
    </>
  )
}

export default StepTwo;