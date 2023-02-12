import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function Coreteam() {
  const [memberList, setMemberList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const membersCollectionRef = collection(db, "core-team");
  const [activeButton, setActiveButton] = useState("");

  let d = new Date();

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
      
      let newFilteredData = filteredData.filter(
        (e) => parseInt(e.year.split("-")[0]) + 1 != d.getFullYear()
      );
      let lastYearData = newFilteredData.filter(
        (element) =>
          parseInt(element.year.split("-")[0]) + 2 === d.getFullYear()
      );
      setYearList(lastYearData);
      setMemberList(newFilteredData);
      setActiveButton(lastYearData[0].year);

 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMemberList();
  }, []);

  return (
    <>
      <div>
        <div className="intro-secondary flex gap-12 justify-start z-1 flex-col md:flex-row px-5 ">
          <div className="w-full md:w-40 text-white">
            <p className="text-[2rem] md:text-[3rem] font-[800]">Core Teams</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mb-5">
          <div className="flex flex-row space-x-4">
            {memberList.map((element) => {
              return (
                <button
                  key={element.id}
                  onClick={() => {
                    onButtonHandle(element.id, element.year);
                  }}
                 
                  className={
                    element.year === activeButton
                      ? "  border-2 border-blue-700 bg-blue-700 focus:outline-0 text-white font-bold rounded-lg px-4 py-2 uppercase text-sm mt-5"
                      : "text-black border-2 border-blue-700  font-bold rounded-lg px-4 py-2 uppercase text-sm mt-5"
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
