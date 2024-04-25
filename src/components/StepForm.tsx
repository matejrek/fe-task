import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form"
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import SuccessMsg from "./SuccessMsg";
import Loading from "./Loading";
import "./form.scss";

const schema = yup.object({
  accountType: yup.string().required(),
  name: yup.string().required("Name is required!").min(5, "Must be min. 5 characters long!"),
  email: yup.string().email().required("Email is required!"),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*()_+\-=\[\]{};':\\|,.<>/?`~]/, 'Password must contain at least one special character'),
  terms: yup.boolean().oneOf([true], "Required to accept terms"),
  address: yup.string().required("Address is required!"),
  country: yup.string().required("Please select a country!"),
  team: yup.array(),
}).required();
type FormData = yup.InferType<typeof schema>;


const StepForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      //Should handle the response in a real scenario
      //const responseData = await response.json();
    } catch (error) {
      //should handle error and display a error message to the user, in this case due to the task im showing the next aka. success screen step.
      handleNextStep();
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      {(step > 1) && <button type="button" onClick={handleStepback}>Back</button>}
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

          {/*SUCCESS SCREEN */}
          {step == 5 && <SuccessMsg />}
        </form>
      </FormProvider>
    </>
  )
}

export default StepForm;