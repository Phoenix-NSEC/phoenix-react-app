//cover images
import robonixImg from "../static/img/RobotEvolution.jpg";
import eloquenseImg from "../static/img/speaking-e1513074001193.jpeg";
import cybernixImg from "../static/img/cybernix.jpg";
// import nirmanImg from '../static/img/civil.jpg'
import illustroImg from "../static/img/illustro.jpg";
import virtuixImg from "../static/img/virtuix.jpg";

//gallery image imports
//robonix
import robonix_linetraccer from "../static/images/clubs/robonics/linetraccer.JPG";
import robonix_mazesolver from "../static/images/clubs/robonics/mazesolver.JPG";
import robonix_robbocarrom from "../static/images/clubs/robonics/robbocarrom.JPG";
import robonix_robbosoccer from "../static/images/clubs/robonics/robbosoccer.JPG";
import robonix_terrarover from "../static/images/clubs/robonics/terrarover.JPG";

//eloquence
import eloquence_despute from "../static/images/clubs/Eloquence/despute.JPG";
import eloquence_openmic from "../static/images/clubs/Eloquence/openmic.JPG";
import eloquence_pictopress from "../static/images/clubs/Eloquence/pictopress.JPG";

// //nirmaan
// import nirmaan_bridgeolare from '../static/images/clubs/nirmaan/bridgeolare.JPG'
// import nirmaan_bridgeomania from '../static/images/clubs/nirmaan/bridgeomania.JPG'
// import nirmaan_cityplanning from '../static/images/clubs/nirmaan/cityplanning.JPG'
// import nirmaan_servoolare from '../static/images/clubs/nirmaan/servoolare.JPG'

//cybernix
import cybernix_blindcoding from "../static/images/clubs/cybernix/blindcoding.JPG";
import cybernix_encoding from "../static/images/clubs/cybernix/encoding.JPG";
import cybernix_stacktraccer from "../static/images/clubs/cybernix/stacktraccer.JPG";
import cybernix_webyaward from "../static/images/clubs/cybernix/webyaward.JPG";

//illustro
import illustro_bioscope from "../static/images/clubs/lensified/bioscope.jpg";
import illustro_specrum from "../static/images/clubs/lensified/specrum.JPG";

export const wingData = {
  cybernix: {
    name: "cybernix",
    coverImage: cybernixImg,
    aboutBrief:
      "The official Coding Club under Phoenix – The Official Tech Club of Netaji Subhash Engineering College. A vibrant community for cyber enthusiasts, fostering learning, collaboration, and innovation in the realm of cybersecurity and technology.",
    aboutExtended:
      "Cybernix Club serves as a dynamic hub for coding and cybersecurity enthusiasts, offering a platform where members can engage in learning, collaboration, and innovation within the cybersecurity and technology spheres. Through workshops, seminars, real-time projects and hands-on activities, participants hone their skills and stay updated on the latest trends and developments in the ever-evolving cyber landscape. The club fosters a supportive community where members share insights, exchange ideas, and work together on projects to tackle real-world cybersecurity challenges. With a focus on fostering curiosity, creativity, and excellence, Cybernix Club empowers its members to thrive in the fast-paced and critical field of cybersecurity.",
    members: [
      {
        name: "Sukalyan Roy",
        designation: "Wing Lead",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958339/Wing/xvs6asbbvel42clmsith.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/adverb_adjective?igsh=ZWp5c3FvZnB1dzFh",
          // facebook: null,
          // github: " ",
          // linkedin: " ",
        },
      },
      {
        name: "Sebanti Dasgupta",
        designation: "Wing Lead",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958198/Wing/rltocgasaik2i7po1rgg.jpg",
        // profileImgUrl: " ",
        socials: {
          insta: "https://www.instagram.com/sdasgupta39?igsh=ZDZ6eWNpNjEwMDNn",
          // facebook: null,
          // github: " ",
          // linkedin: " ",
        },
      },
      {
        name: "Anindita Dey",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958200/Wing/um8whfetignt9foriqxu.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/__pastel_hues__?igsh=MXgzNXFzbjZkbmk2NQ==",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Gourab Das",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958202/Wing/nelf7rzgh9yo6m8o113n.jpg",
        // profileImgUrl: " ",
        socials: {
          insta: "https://www.instagram.com/mrdot_it?igsh=MXgxdzBteDg0YWR1bQ==",
          // facebook: null,
          // github: " ",
          // linkedin: " ",
        },
      },
    ],

    gallery: [
      {
        url: cybernix_blindcoding,
        caption: "blindcoding",
      },
      {
        url: cybernix_encoding,
        caption: "encoding",
      },
      {
        url: cybernix_stacktraccer,
        caption: "stacktraccer",
      },
      {
        url: cybernix_webyaward,
        caption: "webyaward",
      },
    ],
  },
  eloquense: {
    name: "eloquense",
    coverImage: eloquenseImg,
    aboutBrief:
      "'Eloquence', the official literary club of Netaji Subhash Engineering College Under Phoenix. Fostering articulate expression through public speaking, debate, communication skills development, inspiring confidence and persuasive prowess in students.",
    aboutExtended:
      "Eloquence Club is a dynamic gathering of individuals passionate about mastering the art of communication. Through workshops, debates, and speeches, members refine their oratory skills, from persuasive rhetoric to captivating storytelling. The club fosters an environment of mutual support and constructive feedback, encouraging members to overcome stage fright and hone their confidence. With diverse topics and formats, Eloquence Club cultivates versatility in expression, empowering members to articulate ideas with clarity and impact. Whether polishing professional presentations or perfecting personal narratives, participants find a welcoming space to sharpen their eloquence and connect with like-minded communicators on a journey of continuous improvement.The Robonix Club is a student community dedicated to advancing skills and knowledge in utilizing modern technology for scientific endeavors. The club focuses on automation, artificial intelligence, and robotics. It provides a platform for students to explore these fields, turning innovative ideas into reality. The club organizes workshops, events, and technical sessions to enhance students’ understanding and practical experience in robotics, mechatronics, and related areas, fostering creativity and passion for technological advancements.",
    members: [
      {
        name: "Ritam Bhattacharya",
        designation: "Wing Lead",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958204/Wing/gd39x5jm867dkwmwqfaa.jpg",
        // profileImgUrl: " ",
        socials: {
          insta: "https://www.instagram.com/ritam.333?igsh=bjVua2hld3lwa2Fi",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Arpan Biswas",
        designation: "Wing Lead",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958211/Wing/liqbu7oi94rs3ayz62tu.jpg",
        // profileImgUrl: " ",
        socials: {
          insta: null,
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Ayushman Dutta",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958226/Wing/uvhgcapurarucrktmhlu.jpg",
        // profileImgUrl: " ",
        socials: {
          insta: "https://www.instagram.com/4yushm4n?igsh=MW44amdpdXJmd2JxcQ==",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Ivana Baidya",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958230/Wing/glvqsmvvok9jwstismc9.jpg",
        // profileImgUrl: " ",
        socials: {
          insta: "https://www.instagram.com/ivanaa_na?igsh=eG52MGtyMzFzMWt5",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Meghmallar Hazra",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958235/Wing/jhtmw9sk4983iu1d3eob.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/h0joborolo?igsh=MTk2a3k5cXFiMmdvMA==",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Krish Kumar ",
        designation: "Wing coordinator",
        profileImgUrl: 
        "https://res.cloudinary.com/dlbiliyzy/image/upload/v1771868901/Wing/WhatsApp_Image_2026-02-22_at_21.04.04_tjh7er.jpg",
        socials: {
          insta:
            "https://www.instagram.com/itz.krish.kk?igsh=MXJ1YzRoNHUzdXcwdg==",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Swapnil Guha",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958251/Wing/g3lpov1vltjw5rn2mvcp.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/swg.okbutnotsook?igsh=MWhpd29jM2poYjRiOA==",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
    ],

    gallery: [
      {
        url: eloquence_despute,
        caption: "despute",
      },
      {
        url: eloquence_openmic,
        caption: "openmic",
      },
      {
        url: eloquence_pictopress,
        caption: "pictopress",
      },
    ],
  },
  virtuix: {
    name: "virtuix",
    coverImage: virtuixImg,
    aboutBrief:
      "'Virtuix', the official gaming wing of Netaji Subhash Engineering College Under Phoenix.We bring hardcore gaming to life at the fest.",
    aboutExtended:
      " We design the tournaments, knockout rounds, leagues, or hybrid systems. We manage brackets, lobbies, and schedules to keep the competition intense and fair.We run the floor – from registrations and player slots to live match coordination, making sure everything flows smoothly.We build the community – creating an esports atmosphere where gamers and fans come together to celebrate competitive gaming.In short, we don’t just host tournaments. We create experiences that test skills.",

    members: [
      {
        name: "Himaghna Ghosh",
        designation: "Wing Lead",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958273/Wing/ko47rdigggxktx2rmmmj.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/himaghna_ghosh_official?igsh=dHhnd2EweHdhODZ2",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Debjit",
        designation: "Wing Lead",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958313/Wing/fvkcnt05llzmpzm75lwm.jpg",
        // profileImgUrl: " ",
        socials: {
          insta: null,
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Arya Poddar",
        designation: "Wing Lead",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958329/Wing/grjavreqj76pe7wnyngt.jpg",
        // profileImgUrl: " ",
        socials: {
          insta: null,
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Souharda Banerjee",
        designation: "Wing Lead",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958335/Wing/fcfq8xiqjmez9oyplqen.jpg",
        // profileImgUrl: " ",
        socials: {
          insta: null,
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Soujatya Banerjee",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958355/Wing/kpa1due6nfvjzchdxw88.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/ifeeldrake?igsh=MTRycWU5MngxNnFqYg==",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Srayin Senapati",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958359/Wing/unrwoszjvlfkgt1juz2r.png",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/srayin_senapati?igsh=b2RudGFiaTJjeW9r",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Swapnil Bhowal",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958366/Wing/ymgpbwhwbfyrgna3icdm.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/co2xdangerop?igsh=MWJyeTZ1aGJ5dDdueQ==",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Rajendra Kumar",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958372/Wing/utztqvqkgm6to82kqfjq.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/_rajendra_kumar_07?igsh=MXBmMng1bGYyZXB2eA==",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
    ],

    // gallery: [
    //     {
    //         url: eloquence_despute,
    //         caption: "despute"
    //     },
    //     {
    //         url: eloquence_openmic,
    //         caption: "openmic"
    //     },
    //     {
    //         url: eloquence_pictopress,
    //         caption: "pictopress"
    //     },
    // ]
  },
  robonix: {
    name: "robonix",
    coverImage: robonixImg,
    aboutBrief:
      "Robonix is the robotics wing of Phoenix – The official Tech Club of Netaji Subhash Engineering College. Innovating robotics, fostering creativity. Explore the future of technology with hands-on projects and collaborative learning experiences with Robonix.",
    aboutExtended:
      "The Robonix Club is a student community dedicated to advancing skills and knowledge in utilizing modern technology for scientific endeavors. The club focuses on automation, artificial intelligence, and robotics. It provides a platform for students to explore these fields, turning innovative ideas into reality. The club organizes workshops, events, and technical sessions to enhance students’ understanding and practical experience in robotics, mechatronics, and related areas, fostering creativity and passion for technological advancements.",
    members: [
      {
        name: "Anushka Tarafdar",
        designation: "Wing Lead",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958383/Wing/idsmkfxajz7qmevedwhi.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/anushka_tarafdar?igsh=cXl3eDV5Z2doMWlt",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Soumyarup Chakraborty",
        designation: "Wing Lead",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958388/Wing/brlqiumipbhe3bml5ame.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/soumyarup_chakraborty?igsh=YmxnMnBpdTBvdG40",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Sayandip Mondal",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958392/Wing/ra3achurpciwks1h71lu.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/sayan_m_777?igsh=MTNzeWIyMWUxMWdkcw==",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Arijit Ghosh",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958438/Wing/oxzj3sftpl7npjqu700p.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/arijit_ghosh_acg?igsh=MTBxc2NnZ2pyNnZxYQ==",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Sumit Dey",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958441/Wing/ym8yx2ee2tk17xxipdnc.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/sumitt_official__?igsh=MTQ1dTkwZmFhY3V4MA==",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
    ],

    gallery: [
      {
        url: robonix_linetraccer,
        caption: "linetraccer",
      },
      {
        url: robonix_mazesolver,
        caption: "mazesolver",
      },
      {
        url: robonix_robbocarrom,
        caption: "robbocarrom",
      },
      {
        url: robonix_robbosoccer,
        caption: "robbosoccer",
      },
      {
        url: robonix_terrarover,
        caption: "terrarover",
      },
    ],
  },
  illustro: {
    name: "illustro",
    coverImage: illustroImg,
    aboutBrief:
      "Illustro is the official photography wing of Phoenix - The official Tech club of Netaji Subhash Engineering College. Capturing moments, creating memories. Explore, learn, and share your passion with Illustro. Join us to unleash your creativity through the lens.",
    aboutExtended:
      "Illustro is a vibrant community of photography enthusiasts dedicated to capturing moments and exploring the artistry of visual storytelling. From amateur hobbyists to seasoned professionals, members share techniques, critique each other's work, and organize exhibitions to showcase their talents. Regular workshops and guest lectures by industry experts foster skill development and creativity. Through outings and photo walks, members discover new perspectives and subjects, enriching their photographic journeys. With a supportive atmosphere and a passion for imagery, Illustro serves as a hub for fostering talent and camaraderie among photographers of all levels.",
    members: [
      {
        name: "Anusuya Pan",
        designation: "Wing Lead",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958445/Wing/odd1vobr4svdx4is5bt1.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/misssbrightsidee?igsh=Z2t1b2h6cHdlZzZ2",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Tania Choudhury",
        designation: "Wing Lead",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958450/Wing/yur5ck0te1ajmvdcnd7q.jpg",
        // profileImgUrl: " ",
        socials: {
          insta: "https://www.instagram.com/a_i_n_a_t?igsh=dXpnaTAzcDk1YXFx",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Amaratya Ray",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958453/Wing/ranxohiiwhvapsci4vad.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/amartyarayy__?igsh=aHNkZnFvbDRtdGth",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Srijit Sahoo",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958454/Wing/xddbwajxnsdypxiyhssc.jpg",
        // profileImgUrl: " ",
        socials: {
          insta: "https://www.instagram.com/silly_jit?igsh=OWNyN2x1b2ptcmY0",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Sneha Sharma",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958456/Wing/as5er0ijkxaiqkm3nlhn.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/snehuuuu_1313?igsh=NDVscjIxMzhwcmhh",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
      {
        name: "Nilesh Karmakar",
        designation: "Wing coordinator",
        profileImgUrl:
          "https://res.cloudinary.com/dlbiliyzy/image/upload/f_auto,q_auto,w_auto/v1760958460/Wing/ypbf1ohpjzbbrlbseqn5.jpg",
        // profileImgUrl: " ",
        socials: {
          insta:
            "https://www.instagram.com/nilesh_karmakar1?igsh=OWcyNTlwb3Njdzg=",
          // facebook: null,
          // github: null,
          // linkedin: null,
        },
      },
    ],

    gallery: [
      {
        url: illustro_bioscope,
        caption: "bioscope",
      },
      {
        url: illustro_specrum,
        caption: "specrum",
      },
    ],
  },

};
