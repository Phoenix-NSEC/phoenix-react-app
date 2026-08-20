import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GalleryGrid } from "../../components/GalleryGrid";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { wingData } from "../../data/wingData";

//icons
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

const Wing = () => {
  const { wingName } = useParams();
  
  const normalizedWingName = wingName === "eloquence" ? "eloquense" : wingName?.toLowerCase();
  const staticWingData = wingData[normalizedWingName] || {};
  
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!normalizedWingName) return;
      setLoading(true);
      try {
        const docRef = doc(db, "wings", normalizedWingName);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().members) {
          setMembers(docSnap.data().members);
        } else {
          setMembers([]);
        }
      } catch (error) {
        console.error("Error fetching wing members from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [normalizedWingName]);

  const name = staticWingData.name || normalizedWingName;
  const aboutExtended = staticWingData.aboutExtended;
  const coverImage = staticWingData.coverImage;
  const gallery = staticWingData.gallery || [];

  // If no data, show fallback
  if (!name) {
    return (
      <div className="text-white text-center py-20">
        <h2 className="text-3xl font-bold">No Wing Data Found</h2>
        <p>Please go back to the Wings page and select a wing again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="pt-20 flex gap-12 justify-start z-1 flex-col md:flex-row px-5 ">
        <div className="w-full md:w-40 text-white">
          <p className="text-[2rem] md:text-[3rem] font-[800]">
            {name[0].toUpperCase() + name.slice(1)}
          </p>
        </div>
      </div>

      {/* cover image */}
      <div className="mt-4 md:px-60">
        <div className="w-full h-56 relative group overflow-hidden flex rounded-lg">
          <img
            src={coverImage}
            alt={`${name} cover`}
            className="absolute w-full h-full inset-0 object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
        </div>
      </div>

      <div className="wing-body px-10 md:px-60">
        {/* about */}
        <div className="about py-8">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">About</h2>
          <p>{aboutExtended}</p>
        </div>

        {/* wing members */}
        <div className="wing-members py-8">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Wing Members
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-cyan-400 font-semibold animate-pulse text-lg">Loading wing members...</p>
            </div>
          ) : members.length > 0 ? (
            <div className="flex gap-6 flex-wrap justify-center">
              {members.map((item, index) => (
                <MemberCard
                  key={index}
                  name={item.name}
                  profileImgUrl={item.profileImgUrl}
                  designation={item.designation}
                  socials={item.socials}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-6">No members found for this wing in Firestore.</p>
          )}
        </div>

        {/* gallery */}
        <div className="gallery py-8">
          <h2 className="text-3xl font-extrabold mb-4">Gallery</h2>
          <GalleryGrid data={gallery} />
        </div>
      </div>
    </div>
  );
};

const MemberCard = ({ name, designation, profileImgUrl, socials }) => {
  return (
    <>
      <style>
        {`
            .our-team {
            padding: 30px 0 60px;
            margin-bottom: 20px;
            background-color: #000000;
            text-align: center;
            overflow: hidden;
            position: relative;
            border-radius: 0.5rem;
            transition: box-shadow 0.3s ease;
            }

            .our-team:hover {
            box-shadow: 0 0 20px #00ffff;
            }

            .our-team .picture {
            display: inline-block;
            height: 150px;
            width: 150px;
            margin-bottom: 30px;
            z-index: 1;
            position: relative;
            }

            .our-team .picture::before {
            content: "";
            width: 100%;
            height: 0;
            border-radius: 50%;
            background-color: #00ffff;
            position: absolute;
            bottom: 135%;
            right: 0;
            left: 0;
            opacity: 0.9;
            transform: scale(3);
            transition: all 0.3s linear 0s;
            }

            .our-team:hover .picture::before {
            height: 100%;
            }

            .our-team .picture::after {
            content: "";
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #00ffff;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            }

            .our-team .picture img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            transform: scale(1);
            transition: all 0.9s ease 0s;
            }

            .our-team:hover .picture img {
            box-shadow: 0 0 0 14px #000000;
            transform: scale(0.7);
            }

            .our-team .social {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            width: 100%;
            background-color: #000000;
            border: 2px solid #00ffff;
            position: absolute;
            bottom: 0;
            left: 0;
            transition: all 0.5s ease 0s;
            }

            .our-team:hover .social {
            bottom: 0;
            }

            .our-team .social li a {
            display: block;
            padding: 10px;
            font-size: 17px;
            color: white;
            transition: all 0.3s ease 0s;
            text-decoration: none;
            }

            .our-team .social li a:hover {
            color: #000000;
            background-color: #00ffff;
            }
        `}
      </style>

      <div className="our-team rounded-lg w-[15rem] flex-shrink-0 border-2 border-cyan-300 shadow-lg shadow-cyan-300">
        <div className="picture">
          <img
            className="img-fluid"
            alt={name || "Member"}
            src={profileImgUrl || "https://via.placeholder.com/150"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        </div>
        <h3 className="name text-2xl font-bold text-cyan-400">{name}</h3>
        <h4 className="title text-cyan-300">{designation}</h4>
        <ul className="social">
          {socials?.insta && (
            <li>
              <a href={socials.insta} target="_blank" rel="noreferrer" aria-label="Instagram">
                <AiFillInstagram size={"1.2rem"} />
              </a>
            </li>
          )}
          {(socials?.linkedin || socials?.linkedIn) && (
            <li>
              <a href={socials.linkedin || socials.linkedIn} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={"1.2rem"} />
              </a>
            </li>
          )}
          {socials?.facebook && (
            <li>
              <a href={socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebook size={"1.2rem"} />
              </a>
            </li>
          )}
          {socials?.github && (
            <li>
              <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub size={"1.2rem"} />
              </a>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Wing;
