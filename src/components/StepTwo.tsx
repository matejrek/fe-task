import { useFormContext } from "react-hook-form"

const StepTwo: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
  const { register, trigger, formState: { errors } } = useFormContext();

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
      <label>Name</label>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <p role="error">{errors.name?.message?.toString()}</p>}

      <label>Email</label>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <p role="error">{errors.email?.message?.toString()}</p>}

      <label>Password</label>
      <input type="password" {...register("password")} placeholder="Password" />
      {errors.password && <p role="error">{errors.password?.message?.toString()}</p>}


      <input id="terms" type="checkbox" {...register("terms")} />
      <label htmlFor="terms">Terms & Conditions</label>
      {errors.terms && <p role="error">{errors.terms?.message?.toString()}</p>}

      <button onClick={onSubmit}>Next</button>
    </>
  )
}

export default StepTwo;