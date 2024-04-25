import { useFormContext } from "react-hook-form"

const StepOne: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
  const { register, setValue } = useFormContext();

  const handleAccountType = (type: string) => {
    setValue('accountType', type);
    nextStep();
  }

  return (
    <>
      <input type="hidden" {...register('accountType')} />
      <button type="button" onClick={() => handleAccountType("individual")}>
        Individual
      </button>
      <button type="button" onClick={() => handleAccountType("business")}>
        Business
      </button>
    </>
  )
}

export default StepOne;