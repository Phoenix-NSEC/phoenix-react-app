import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { db } from "../../firebase-config";
import { getDocs, collection } from "firebase/firestore";

function Coreteam() {
  let d = new Date();
  const [memberList, setMemberList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const membersCollectionRef = collection(db, "core-team");
  const [activeButton, setActiveButton] = useState();

  const onButtonHandle = (id, year) => {
    setActiveButton(year);
    let updatedData = memberList.filter((e) => e.id === id);
    setYearList(updatedData);
  };
  const getMemberList = async () => {
    try {
      const data = await getDocs(membersCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Sort by the starting year (before the dash)
      filteredData.sort((a, b) => {
        return parseInt(a.year.split("-")[0]) - parseInt(b.year.split("-")[0]);
      });

      // Filter data for the year 2024-25 as default
      let defaultYearData = filteredData.filter(
        (element) => parseInt(element.year.split("-")[0]) === d.getFullYear()
      );
      console.log(defaultYearData);

      // If there is no data for 2024-25, fallback to the last year
      if (defaultYearData.length === 0) {
        defaultYearData = filteredData.filter(
          (element) =>
            parseInt(element.year.split("-")[0]) + 1 === d.getFullYear()
        );
      }

      setYearList(defaultYearData);
      setMemberList(filteredData.reverse());

      // Set the default active button to 2024-25
      setActiveButton(defaultYearData[0].year);

      console.log("---->", defaultYearData);
      console.log("---->", activeButton);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMemberList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <div className="intro-secondary flex gap-12 justify-start z-1 flex-col md:flex-row px-5 ">
          <div className="w-full md:w-40 text-white">
            <p className="text-[2rem] md:text-[3rem] font-[800]">Core Team</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mb-5">
          <div className="flex w-full  md:justify-center px-4 gap-2 overflow-x-auto no-scrollbar">
            {memberList.map((element) => {
              return (
                <button
                  key={element.id}
                  onClick={() => {
                    onButtonHandle(element.id, element.year);
                  }}
                  className={
                    element.year === activeButton
                      ? "  border-2 border-blue-700 bg-blue-700 focus:outline-0 text-white font-bold rounded-lg px-4 py-2 uppercase text-sm mt-5 flex-shrink-0 whitespace-nowrap"
                      : "text-black border-2 border-blue-700  font-bold rounded-lg px-4 py-2 uppercase text-sm mt-5 flex-shrink-0 whitespace-nowrap"
                  }
                >
                  {element.year}
                </button>
              );
            })}
          </div>
          <div className=" px-4 grid md:grid-cols-2 sm:grid-cols-1 gap-x-5 w-45 mx-auto justify-center items-center">
            {yearList.map((element) => {
              return element.members.map((e, index) => {
                return (
                  <Cards
                    name={e.name}
                    designation={e.designation}
                    photo={e.photo}
                    index={index}
                  />
                );
              });
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Coreteam;
