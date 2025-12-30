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
      <div className="relative w-full bg-black py-20 px-4 border-t border-cyan-500/30">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-cyan-400 heading-glow">
              Core Team
            </h2>
          </div>

          {/* Year Filter Buttons */}
          <div className="flex flex-col justify-center items-center mb-12">
            <div className="flex w-full md:justify-center px-4 gap-2 overflow-x-auto no-scrollbar">
              {memberList.map((element) => {
                return (
                  <button
                    key={element.id}
                    onClick={() => {
                      onButtonHandle(element.id, element.year);
                    }}
                    className={
                      element.year === activeButton
                        ? "border-2 border-cyan-400 bg-cyan-400 text-black focus:outline-0 font-bold rounded-lg px-4 py-2 uppercase text-sm mt-5 flex-shrink-0 whitespace-nowrap hover:bg-cyan-300 hover:border-cyan-300 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50"
                        : "text-gray-300 border-2 border-cyan-400/50 font-bold rounded-lg px-4 py-2 uppercase text-sm mt-5 flex-shrink-0 whitespace-nowrap hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-300"
                    }
                  >
                    {element.year}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Members Grid */}
          <div className="px-4 grid md:grid-cols-2 sm:grid-cols-1 gap-8 w-full max-w-5xl mx-auto justify-center items-center">
            {yearList.map((element) => {
              return element.members.map((e, index) => {
                return (
                  <Cards
                    key={index}
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
