import { useFormContext, useFieldArray } from "react-hook-form"

const StepFour = () => {
  const { register } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: "additionalMembers"
  });

  const canAddMember = fields.length < 5;

  return (
    <>
      {fields.map((item, index) => (
        <div key={"row" + item.id}>
          <input key={"inp-" + item.id}{...register(`additionalMembers.${index}.additionalMember`)} placeholder={"Email for member " + index} />
          <button key={"btn-" + item.id} type="button" onClick={() => remove(index)}>Delete</button>
        </div>
      ))}
      {canAddMember && <button type="button" onClick={() => append({ additionalMember: "" })}>Add another member</button>}
    </>
  )
}

export default StepFour;