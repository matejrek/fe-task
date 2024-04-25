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

const steps = [
  {
    id: 1,
    quote: "The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software.",
    title: "Initila",
  },
  {
    id: 2,
    quote: "In the late 1970s, this excerpt found new life through its use in the burgeoning field of photocopy art, capturing the imagination of creatives. It gained another round of acclaim in the early 2000s, as web developers began using it as a placeholder in website templates.",
    title: "Personal Info.",
  },
  {
    id: 3,
    quote: "During the early 1980s, the text became a favorite among graphic designers for typesetting in analog layout demonstrations. Its appeal was rekindled in the late 2000s when it became a go-to sample for testing digital fonts and layout software",
    title: "Residency Info.",
  },
  {
    id: 4,
    quote: "The passage experienced a revival in the mid-1980s, as it was prominently featured in academic textbooks on design and typography. This resurgence was mirrored in the mid-2010s, with the advent of mobile app development platforms utilizing it for demo content",
    title: "Team",
  },
  {
    id: 5,
    quote: "In the 1990s, the excerpt was rediscovered by the nascent zine culture, serving as a quirky placeholder in DIY publications. It found relevance again in the early 2020s, as content management systems offered it as default filler text for new users.",
    title: "Success",
  }
];

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
      <div className="layout-wrapper">
        <div className="side">
          <div className="quote">
            {step <= 5 && steps[step - 1].quote}
          </div>
        </div>
        <div className="form-area">
          <div className="step-actions">
            {(step > 1 && step < 5) && <button type="button" onClick={handleStepback}><span className="material-symbols-outlined">keyboard_arrow_left</span> Back</button>}
            {(step != 1 && step < 5) && <div className="step-info">
              <span className="step">Step {step}/{steps.length - 1}</span> {steps[step - 1].title}
            </div>
            }
            {step == 1 && <div className="sign-in">Already have an account? <a href="#">Sign In</a></div>}
          </div>
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
              {step == 4 && <button className="button-1 mt" type="submit" >Save & continue</button>}

              {/*SUCCESS SCREEN */}
              {step == 5 && <SuccessMsg />}
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  )
}

export default StepForm;