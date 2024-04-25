import { useFormContext } from "react-hook-form"

const StepOne: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
  const { register, setValue } = useFormContext();

  const handleAccountType = (type: string) => {
    setValue('accountType', type);
    nextStep();
  }

  return (
    <>
      <div className="controls">
        <h1 className="form-title">Join Us!</h1>
        <p className="form-description">
          To begin this journey, tell us what type of account you’d be opening.
        </p>
        <input type="hidden" {...register('accountType')} />
        <button className="type-button individual" type="button" onClick={() => handleAccountType("individual")}>
          <div className="pentagon"></div>
          Individual
          <div className="description">Personal account to manage all you activities.</div>
        </button>
        <button className="type-button business" type="button" onClick={() => handleAccountType("business")}>
          <div className="pentagon"></div>
          Business
          <div className="description">Own or belong to a company, this is for you.</div>
        </button>
      </div>
    </>
  )
}

export default StepOne;