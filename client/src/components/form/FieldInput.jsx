import { Input } from "@material-tailwind/react";
import React from "react";

const FieldInput = ({ labelText, register, name, errorMessage }) => {
  return (
    <div>
      <Input size="lg" {...register(`${name}`)} label={labelText} />
      {errorMessage && (
        <p className="mt-1 text-red-500 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default FieldInput;
