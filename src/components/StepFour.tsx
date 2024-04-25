import { useFormContext, useFieldArray } from "react-hook-form"

const StepFour = () => {
  const { register } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: "team"
  });

  const canAddMember = fields.length < 5;

  return (
    <>
      {fields.map((item, index) => (
        <div key={"row" + item.id}>
          <input key={"inp-" + item.id}{...register(`team.${index}`)} placeholder={"Email for member"} />
          <button key={"btn-" + item.id} type="button" onClick={() => remove(index)}>Delete</button>
        </div>
      ))}
      {canAddMember && <button type="button" onClick={() => append("")}>Add another member</button>}
    </>
  )
}

export default StepFour;