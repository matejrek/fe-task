import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form"
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({

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