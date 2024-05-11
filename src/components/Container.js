import React from 'react'

export default function Container(props) {
    let{name, imageUrl, url, description,source} = props;
  return (
    <div className="hover1">
    <div className="card my-3 bg-[#96dadf]">
      <img src={imageUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title font-bold text-xl">{name}</h5>
        <p className="card-text mb-4">{description}</p>
        <a href={url} className="btn bg-[#6FB3B8] hover:bg-[#388087] text-white mr-4" target='_blank' rel='noreferrer'>Click Here</a>
        <a href={source} className='btn bg-[#6FB3B8] hover:bg-[#388087] text-white' target='_blank' rel='noreferrer'>Source Code</a>
      </div>
      <style jsx="true">
        {`
        .hover1 div {
          transition : 0.5s ease;
        }
        .hover1 img:hover{
          -webkit-transform: scale(0.9);
          -ms-transform: scale(0.9);
          transform: scale(0.9);
          transition: 0.5s ease;
        }

        `}
      </style>
      </div>
    </div>
    

  )
}
