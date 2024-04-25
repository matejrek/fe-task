

const StepOne: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
  return (
    <>
      Step 1
      <button type="button" onClick={nextStep}>Next</button>
    </>
  )
}

export default StepOne;