import React, { useEffect, useState } from 'react'
import img1 from '../../static/img/RobotEvolution.jpg'
import img2 from '../../static/img/speaking-e1513074001193.jpeg'
import img3 from '../../static/img/cybernix.jpg'
import img4 from '../../static/img/virtuix.jpg'
import img5 from '../../static/img/illustro.jpg'
import img6 from '../../static/img/flagship_wing.jpeg'
import ZigBox from '../../components/ZigBox'
import { wingData } from '../../data/wingData'
import { useNavigate } from 'react-router-dom'

const data = [
  {
    image: img1,
    title: 'Robonix',
    description: 'Robotics is the discipline of emulating our lives, of wondering how we work. We have walked a long path in its advancement. It gives you a platform where you can sustain your ideas of coding, micro controlling and designing.',
    extraButton: {
      name: 'Learn More',
      link: 'robonix'
    },
    isCLub: true
  },
  {
    image: img2,
    title: 'Eloquense',
    description: '\'Eloquence\', the official literary club of Netaji Subhash Engineering College Under Phoenix. It is a platform where you get to express your thoughts and perspectives. The aim of the club is to let you grow out of your fears, tie up your thoughts and prove your mettle.',
    extraButton: {
      name: 'Learn More',
      link: 'eloquence'
    },
    isCLub: true
  },
  {
    image: img3,
    title: 'Cybernix',
    description: 'Don\'t you feel the time has changed its course over the last two decades? From rolling fingers over 140 keys of piano, the world has now come to rushing them on 108 keys of the keyboard. Cybernix provides you time to unleash the coding beast in you out in the world.',
    extraButton: {
      name: 'Learn More',
      link: 'cybernix'
    },
    isCLub: true
  },
  {
    image: img4,
    title: 'Virtuix',
    description: 'We, the gaming wing of Phoenix, bring hardcore gaming to life at the fest. Here’s what we do: We design the tournaments – knockout rounds, leagues, or hybrid systems. We manage brackets, lobbies, and schedules to keep the competition intense and fair. We run the floor – from registrations and player slots to live match coordination, making sure everything flows smoothly. We build the community – creating an esports atmosphere where gamers and fans come together to celebrate competitive gaming. In short, we don’t just host tournaments. We create experiences that test skills.',
    extraButton: {
      name: 'Learn More',
      link: 'virtuix'
    },
    isCLub: true
  },
  {
    image: img5,
    title: 'Illustro',
    description: 'Illustro is the official photography wing of Phoenix - The official Tech club of Netaji Subhash Engineering College. Capturing moments, creating memories. Explore, learn, and share your passion with Illustro. Join us to unleash your creativity through the lens.',
    extraButton: {
      name: 'Learn More',
      link: 'illustro'
    },
    isCLub: true
  },
  {
    image: img6,
    title: 'Flagship',
    description: 'The Flagship Wing is a dynamic community driven by creativity, strategy, leadership, and the pursuit of extraordinary experiences. The wing focuses on conceptualizing and executing innovative events that challenge participants through management simulations, strategic competitions, immersive games, and problem-solving challenges. Flagship provides a platform to transform ideas into engaging experiences, encouraging experimentation, collaboration, and the development of leadership, decision-making, communication, and event-management skills. We aim to create events that are not merely conducted, but remembered. As one of the club’s newer wings, Flagship has the unique opportunity to build its identity from the ground up. Through ambitious ideas and meaningful collaborations, we strive to create a lasting legacy within the club.',
    extraButton: {
      name: 'Learn More',
      link: 'flagship'
    },
    isCLub: true
  }

]


function Clubs() {
  const navigate = useNavigate();
  const [curWing, setCurWing] = useState()
  const [preventFirstRender, setPreventFirstRender] = useState(false)

  const handleNavigation = (title) => {
    const title_lower = title.toLowerCase();
    setPreventFirstRender(true)

    switch (title_lower) {
      case "cybernix":
        setCurWing(wingData.cybernix)
        break;
      case "robonix":
        setCurWing(wingData.robonix)
        break;
      case "virtuix":
        setCurWing(wingData.virtuix)
        break;
      case "eloquense":
        setCurWing(wingData.eloquense)
        break;
      case "illustro":
        setCurWing(wingData.illustro)
        break;
      case "flagship":
        setCurWing(wingData.flagship)
        break;

      default:
        setCurWing()
        break;
    }
  }

  //prevent navigation on first render
  useEffect(() => {
    (preventFirstRender && curWing) ? navigate(`/wings/${curWing.name}`, { state: { ...curWing } }) : navigate("/wings")
  }, [curWing, preventFirstRender, navigate])

  return (
    <div>
      <div className="intro-secondary flex gap-12 justify-start z-1 flex-col md:flex-row px-5 ">
        <div className="w-full md:w-40 text-white">
          <p className="text-[2rem] md:text-[3rem] font-[800] ">Our Wings</p>
        </div>
      </div>
      <ZigBox data={data} handleNavigation={(title) => handleNavigation(title)} />
    </div>
  )
}

export default Clubs