import React from 'react'
import img1 from '../../static/img/RobotEvolution.jpg'
import img2 from '../../static/img/speaking-e1513074001193.jpeg'
import img3 from '../../static/img/cybernix.jpg'
import img4 from '../../static/img/civil.jpg'
import ZigBox from '../../components/ZigBox'
function Clubs() {
  const data = [
    {
      image: img1,
      title: 'Robonix',
      description: 'Robotics is the discipline of emulating our lives, of wondering how we work. We have walked a long path in its advancement. It gives you a platform where you can sustain your ideas of coding, micro controlling and designing.',
      extraButton:{
          name:'Learn More',
          link: '#'
      }
    },
    {
      image:img2,
      title: 'Eloquense',
      description: '\'Eloquence\', the official literary club of Netaji Subhash Engineering College Under Phoenix. It is a platform where you get to express your thoughts and perspectives. The aim of the club is to let you grow out of your fears, tie up your thoughts and prove your mettle.',
      extraButton:{
        name:'Learn More',
        link: '#'
    }
    },
    {
      image:img3,
      title: 'Cybernix',
      description: 'Don\'t you feel the time has changed its course over the last two decades? From rolling fingers over 140 keys of piano, the world has now come to rushing them on 108 keys of the keyboard. Cybernix provides you time to unleash the coding beast in you out in the world.',
      extraButton:{
        name:'Learn More',
        link: '#'
    }
    },
    {
      image:img4,
      title: 'Nirman',
      description: 'Imagine a world without buildings ,bridges, skyscrapers or monuments? Not possible right!. Nirmaan comes with an opportunity for the Builders of tomorrow to show and sharpen their skills under the guidance of best mentors and experience the best Platform to showcase their talents.',
      extraButton:{
        name:'Learn More',
        link: '/nirman'
    }
    }
  ]
  return (
    <div>
      <div className="intro-secondary flex gap-12 justify-start z-1 flex-col md:flex-row px-5 ">
        <div className="w-full md:w-40 text-white">
          <p className="text-[2rem] md:text-[3rem] font-[800]">Our Clubs</p>
        </div>
      </div>
      <ZigBox data={data}/>
    </div>
  )
}

export default Clubs