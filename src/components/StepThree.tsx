

const StepThree: React.FC<{ nextStep: () => void }> = ({ nextStep }) => {
  return (
    <>
      Step 3
      <button type="button" onClick={nextStep}>Next</button>
    </>
  )
}

export default StepThree;