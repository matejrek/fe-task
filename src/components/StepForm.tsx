import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form"
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  accountType: yup.string().required(),
  firstName: yup.string().required("First name is required!").min(5, "Must be min. 5 characters long!"),
  email: yup.string().email().required("Email is required!"),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*()_+\-=\[\]{};':\\|,.<>/?`~]/, 'Password must contain at least one special character'),
  agreedToTerms: yup.boolean().oneOf([true], "Required to accept terms"),
  address: yup.string().required("Address is required!"),
  country: yup.string().required("Please select a country!"),
  additionalMembers: yup.array(),
}).required();
type FormData = yup.InferType<typeof schema>;


const StepForm = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  }

  const handleStepback = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  const methods = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: FormData) => console.log(data)

  return (
    <>
      {step > 1 && <button type="button" onClick={handleStepback}>Back</button>}
      Current step: {step}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/*STEP 1 - initial screen*/}
          {step == 1 && <StepOne nextStep={handleNextStep} />}

          {/*STEP 2 - personal info*/}
          {step == 2 && <StepTwo nextStep={handleNextStep} />}

          {/*STEP 3 - residency info*/}
          {step == 3 && <StepThree nextStep={handleNextStep} />}

          {/*STEP 4 - team*/}
          {step == 4 && <StepFour />}
          {step == 4 && <input type="submit" />}
        </form>
      </FormProvider>
    </>
  )
}

export default StepForm;