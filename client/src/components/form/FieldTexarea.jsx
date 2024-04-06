import { Textarea } from "@material-tailwind/react";
import React from "react";

const FieldTexarea = ({ labelText, register, name, errorMessage }) => {
  return (
    <>
      <Textarea
        size="lg"
        {...register(`${name}`)}
        label={labelText}
        className="min-h-[150px] "
      />

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </>
  );
};

export default FieldTexarea;
