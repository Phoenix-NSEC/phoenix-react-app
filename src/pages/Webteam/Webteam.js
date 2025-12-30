import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { instaicon } from "../../static/icons/icons";

function Webteam() {
  const [webTeam, setWebTeams] = useState([]);

  useEffect(() => {
    async function getTeam() {
      const docRef = doc(db, "web-team", "web_team_2025");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWebTeams([...docSnap.data().members]);
      } else {
        console.log("No such document!");
      }
    }
    getTeam();
  }, []);

  return (
    <section className="relative w-full bg-black py-20 px-4 border-t border-cyan-500/30">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 heading-glow mb-4">
            Web Team
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Teamwork is the secret that makes common people achieve uncommon
            results
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
          {webTeam.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-gray-300 bg-black/40 border border-cyan-400/30 rounded-xl p-6 transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/40"
            >
              {/* Image */}
              <img
                className="w-40 h-40 object-cover object-center rounded-full mb-6 border-2 border-cyan-400/60"
                src={member.avatar}
                alt={`${member.name}'s avatar`}
              />

              {/* Name */}
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                <a
                  href={member.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors duration-300"
                >
                  {member.name}
                </a>
              </h3>

              {/* Designation */}
              <p className="text-gray-400 text-sm mb-4">{member.designation}</p>

              {/* Social Links */}
              <ul className="flex justify-center space-x-4 mt-2">
                {member?.facebook && (
                  <li>
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:brightness-125"
                    >
                      <img src={instaicon} alt="facebook" className="w-6" />
                    </a>
                  </li>
                )}
                {member?.instagram && (
                  <li>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:brightness-125"
                    >
                      <img src={instaicon} alt="instagram" className="w-6" />
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <i className="fa-brands fa-linkedin text-xl"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <i className="fa-brands fa-github text-xl"></i>
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Webteam;
