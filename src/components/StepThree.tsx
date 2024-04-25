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
      <label>Address</label>
      <input {...register("address")} placeholder="Address" />
      {errors.address && <p role="error">{errors.address?.message?.toString()}</p>}

      <label>Country</label>
      <select {...register("country")} className="control" >
        <option value="">Select Country</option>
        <option value="SL">Slovenia</option>
        <option value="US">USA</option>
        <option value="EN">England</option>
      </select>
      {errors.country && <p role="error">{errors.country?.message?.toString()}</p>}

      <button onClick={onSubmit}>Next</button>
    </>
  )
}

export default StepThree;