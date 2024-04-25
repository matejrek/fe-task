import { useFormContext, useFieldArray } from "react-hook-form"

const StepFour = () => {
  const { register } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: "team"
  });

  const canAddMember = fields.length < 5;

  return (
    <>
      <div className="controls">
        {fields.map((item, index) => (
          <div key={"row" + item.id} className="member-row">
            <input key={"inp-" + item.id}{...register(`team.${index}`)} placeholder={"Email for member"} className="control" />
            <button className="button-delete" key={"btn-" + item.id} type="button" onClick={() => remove(index)}>
              <span className="material-symbols-outlined">
                delete
              </span>
            </button>
          </div>
        ))}
        {canAddMember && <button className="button-add" type="button" onClick={() => append("")}><span className="material-symbols-outlined">add_circle</span> Add teammate</button>}
      </div>
    </>
  )
}

export default StepFour;