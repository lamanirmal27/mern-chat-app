import React, { useEffect, useState } from "react";

const Gender = ({ onChange, gender }) => {
  return (
    <div className="flex ">
      <div className="form-control">
        <label htmlFor="male" className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input
            name="gender"
            type="radio"
            onChange={() => onChange("male")}
            className="radio border-slate-900"
            defaultChecked
          />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="female" className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            name="gender"
            type="radio"
            onChange={() => onChange("female")}
            className="radio border-slate-900"
          />
        </label>
      </div>
    </div>
  );
};

export default Gender;
