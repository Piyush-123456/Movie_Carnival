import React, { useState, useEffect } from 'react'
import './style.scss'
import {useNavigate} from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import {useSelector} from 'react-redux'

import Img from '../../../component/lazyLoadImage/Img'
import ContentWrapper from '../../../component/contentWrapper/ContentWrapper'
const HeroBanner = () => {
  const [background,setbackground] = useState("");
  const [query,setQuery] = useState("");
  const navigate = useNavigate();
  const {data,loading} = useFetch("/movie/upcoming")
  const {url} = useSelector((state)=> state.home);
  useEffect(()=>{
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setbackground(bg);
  },[data])
  
  const searchQueryHandler = (event)=>{
    if(event.key === 'Enter' && query.length>0){
        navigate(`/search/${query}`)
    }
  }

  return (
    <div className='heroBanner'>
    {!loading && <div className="backdrop-img">
      <Img src ={background}/>
    </div>}
    <div className="opacity-layer">

    </div>
    <ContentWrapper>
          <div className="heroBannerContent">
            <span className = 'title'> 
              Welcome.
            </span>
            <span>
                Millions of movies, TV shows and people to discover.
                Explore now.
            </span>
            <div className='searchInput'>
                <input type="text" placeholder='Search for a Movie or TV show' onChange={(e)=>setQuery(e.target.value)} onKeyUp={searchQueryHandler}/>
                <button>
                  Search 
                </button> 
            </div>
          </div>
      </ContentWrapper>
      </div>
  )
}

export default HeroBanner