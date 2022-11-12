import React from "react";
import { useNavigate } from "react-router-dom";

function ZigBox({ title, description, data }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="header text-center">
        {title && <h2 className="text-[2.5rem] font-bold">{title}</h2>}
        {description && (
          <p className="text-[1rem] mt-2 font-semibold text-slate-500">
            {description}
          </p>
        )}
      </div>
      <div className="zigBody w-full md:w-70 ">
        {data.map(({ title, description, image ,extraButton }, index) => {
          return (
            <div
              className={`flex ${
                index % 2 ? "flex-col-reverse md:flex-row" : "flex-col-reverse md:flex-row-reverse"
              } justify-evenly my-5 items-center`}
            >
              <div className="text w-80 md:w-50">
                <h2 className="text-[1.2rem] md:text-[1.5rem] font-[700]">{title}</h2>
                <p className="text-[.8rem] md:text-[1rem] font-[500] mt-3 text-slate-500">{description}</p>
                {extraButton && <button className="border-2 rounded-full px-3 my-3  hover:bg-[#1d50c3] hover:border-white hover:text-white" onClick={()=>navigate(extraButton.link)}>{extraButton.name}</button>}
              </div>
              <div className="image mb-4 md:mb-0">
                <img
                  src={image}
                  alt=""
                  height="200px"
                  width="300px"
                  className="bg-red-600"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ZigBox;
