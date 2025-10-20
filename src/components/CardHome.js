import React from 'react'

const CardHome = (props) => {

  return (
    <>
      <style>
        {`
                .card{
                    border-radius: 25px;
                    background-color: #FFF;
                    // width: 300px;
                  }
                  .image-content,
                  .card-content{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 25px 14px;
                  }
                  .image-content{
                    position: relative;
                    row-gap: 5px;
                    padding: 25px 0;
                  }
                  .overlay{
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 100%;
                    background-color: #4070F4;
                    border-radius: 25px 25px 0 25px;
                  }
                  .overlay::before,
                  .overlay::after{
                    content: '';
                    position: absolute;
                    right: 0;
                    bottom: -40px;
                    height: 40px;
                    width: 40px;
                    background-color: #4070F4;
                  }
                  .overlay::after{
                    border-radius: 0 25px 0 0;
                    background-color: #FFF;
                  }
                  .card-image{
                    position: relative;
                    height: 150px;
                    width: 150px;
                    border-radius: 50%;
                    background: #FFF;
                    padding: 3px;
                  }
                  .card-image .card-img{
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 4px solid #4070F4;
                  }
                  .name{
                    font-size: 16px;
                    font-weight: 500;
                    color: #333;
                  }
                  .description{
                    font-size: 14px;
                    color: #707070;
                    text-align: center;
                  }
                  .button{
                    border: none;
                    font-size: 16px;
                    color: #FFF;
                    padding: 8px 16px;
                    background-color: #4070F4;
                    border-radius: 6px;
                    margin: 14px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                  }
                  .button:hover{
                    background: #265DF2;
                  }
                  
                  .swiper-navBtn{
                    color: #6E93f7;
                    transition: color 0.3s ease;
                  }
                  .swiper-navBtn:hover{
                    color: #4070F4;
                  }
                  .swiper-navBtn::before,
                  .swiper-navBtn::after{
                    font-size: 35px;
                  }
                  .swiper-button-next{
                    right: 0;
                  }
                  .swiper-button-prev{
                    left: 0;
                  }
                  .swiper-pagination-bullet{
                    background-color: #6E93f7;
                    opacity: 1;
                  }
                  .swiper-pagination-bullet-active{
                    background-color: #4070F4;
                  }
                  
                  @media screen and (max-width: 768px) {
                    .slide-content{
                      margin: 0 10px;
                    }
                    .swiper-navBtn{
                      display: none;
                    }
                  }
                   
            `}
      </style>
      <div className="card swiper-slide  w-[170px] md:w-[250px] border border-red-600">
        <div className="image-content">
          <span className="overlay"></span>
          <div className="card-image">
            <img src={props.photo} alt="" className="card-img rounded-full" />
          </div>
        </div>

        <div className="card-content flex flex-col mt-2">
          <h2 className="name text-center">{props.name}</h2>
          <p className="description mt-2 font-semibold">{props.designation.toUpperCase()}</p>

{/* 
          <ul className="flex justify-center mt-4 space-x-4">
            {props.media.facebook && (
              <li>
                <a href={props.media.facebook} target='_blank' rel="noopener noreferrer" className="text-[#39569c] hover:text-gray-900 ">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
              </li>
            )}
            {props.media.linkedin && (
              <li>
                <a href={props.media.linkedin} target='_blank' rel="noopener noreferrer" className="text-[#00acee] hover:text-gray-900 ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className='w-6 h-6'><path fill="#0078d4" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z" /><path d="M30,35v-9c0-1.103-0.897-2-2-2s-2,0.897-2,2v9h-6V18h6v1.027C27.04,18.359,28.252,18,29.5,18	c3.584,0,6.5,2.916,6.5,6.5V35H30z M13,35V18h2.966C14.247,18,13,16.738,13,14.999C13,13.261,14.267,12,16.011,12	c1.696,0,2.953,1.252,2.989,2.979C19,16.733,17.733,18,15.988,18H19v17H13z" opacity=".05" /><path d="M30.5,34.5V26c0-1.378-1.121-2.5-2.5-2.5s-2.5,1.122-2.5,2.5v8.5h-5v-16h5v1.534	c1.09-0.977,2.512-1.534,4-1.534c3.309,0,6,2.691,6,6v10H30.5z M13.5,34.5v-16h5v16H13.5z M15.966,17.5	c-1.429,0-2.466-1.052-2.466-2.501c0-1.448,1.056-2.499,2.511-2.499c1.436,0,2.459,1.023,2.489,2.489	c0,1.459-1.057,2.511-2.512,2.511H15.966z" opacity=".07" /><path fill="#fff" d="M14,19h4v15h-4V19z M15.988,17h-0.022C14.772,17,14,16.11,14,14.999C14,13.864,14.796,13,16.011,13	c1.217,0,1.966,0.864,1.989,1.999C18,16.11,17.228,17,15.988,17z M35,24.5c0-3.038-2.462-5.5-5.5-5.5	c-1.862,0-3.505,0.928-4.5,2.344V19h-4v15h4v-8c0-1.657,1.343-3,3-3s3,1.343,3,3v8h4C35,34,35,24.921,35,24.5z" /></svg>
                </a>
              </li>
            )}
            {props.media.instagram && (
              <li>
                <a href={props.media.instagram} target='_blank' rel="noopener noreferrer" className="text-[#00acee] hover:text-gray-900 ">
                  <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" className="svg-inline--fa fa-instagram fa-w-14 w-6 h-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg>
                </a>
              </li>
            )}
          </ul> */}




        </div>
      </div >
    </>
  )
}

export default CardHome