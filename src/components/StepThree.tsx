import { useFormContext } from "react-hook-form"

const StepThree: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
  const { register, trigger, formState: { errors } } = useFormContext();

  const onSubmit = async () => {
    const addressValid = await trigger("address");
    const countrValid = await trigger("country");
    const valid = addressValid && countrValid
    if (valid) {
      nextStep()
    }
  }
  return (
    <>
      <div className="controls">
        <h1 className="form-title">Complete Your Profile!</h1>
        <p className="form-description">
          For the purpose of industry regulation, your details are required.
        </p>
        <label>Address</label>
        <input {...register("address")} placeholder="Address" className="control" />
        {errors.address && <p className="error">{errors.address?.message?.toString()}</p>}

        <label>Country</label>
        <select {...register("country")} className="control" >
          <option value="">Select Country</option>
          <option value="SL">Slovenia</option>
          <option value="US">USA</option>
          <option value="EN">England</option>
        </select>
        {errors.country && <p className="error">{errors.country?.message?.toString()}</p>}

        <button className="button-1 mt" onClick={onSubmit}>Save & continue</button>

        <div className="safety-notice">
          <span className="material-symbols-outlined">lock</span> Your info is safely secured
        </div>

      </div>
    </>
  )
}

export default StepThree;