

const StepTwo: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
  return (
    <>
      Step 2
      <button type="button" onClick={nextStep}>Next</button>
    </>
  )
}

export default StepTwo;