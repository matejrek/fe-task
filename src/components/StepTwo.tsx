import { useFormContext } from "react-hook-form"


/*
 Name: At least 5 characters long.
 Email: Must match a valid email format.
 Password: Must include at least one uppercase letter, one lowercase letter, one number, and one special character.
 Checkbox (Terms & Conditions): Must be checked before proceeding
 */
const StepTwo: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
  const { register, trigger, formState: { errors } } = useFormContext();

  const onSubmit = async () => {
    const firstNameValid = await trigger("firstName");
    const emailValid = await trigger("email");
    const passwordValid = await trigger("password");
    const termsValid = await trigger("agreedToTerms");
    const valid = firstNameValid && emailValid && passwordValid && termsValid;
    if (valid) {
      nextStep()
    }
  }

  return (
    <>
      <label>Name</label>
      <input {...register("firstName")} placeholder="Name" />
      {errors.firstName && <p role="error">{errors.firstName?.message?.toString()}</p>}

      <label>Email</label>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <p role="error">{errors.email?.message?.toString()}</p>}

      <label>Password</label>
      <input type="password" {...register("password")} placeholder="Password" />
      {errors.password && <p role="error">{errors.password?.message?.toString()}</p>}


      <input id="agreedToTerms" type="checkbox" {...register("agreedToTerms")} />
      <label htmlFor="agreedToTerms">Terms & Conditions</label>
      {errors.agreedToTerms && <p role="error">{errors.agreedToTerms?.message?.toString()}</p>}

      <button onClick={onSubmit}>Next</button>
    </>
  )
}

export default StepTwo;