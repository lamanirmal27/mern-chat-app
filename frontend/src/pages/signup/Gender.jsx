import React from "react";

const Gender = () => {
  return (
    <div className="flex ">
      <div className="form-control">
        <label htmlFor="" className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input name="gender" type="radio" className="radio border-slate-900" defaultChecked/>
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="" className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input name="gender" type="radio" className="radio border-slate-900" />
        </label>
      </div>
    </div>
  );
};

export default Gender;
