import React, { useEffect, useState } from 'react';
import ErrorPage from './ErrorPage';
import { useSelector } from 'react-redux';
import PostsExplore from '../components/PostsExplore';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';

const Div = styled.div`
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -30px; /* gutter size offset */
    width: auto;
    gap: 0.5rem;
    margin-left: 5px;
  }
  .my-masonry-grid_column {
    padding-left: 30px; /* gutter size */
    background-clip: padding-box;
  }

  /* Style your items */
  .my-masonry-grid_column > div {
    /* change div to reference your elements you put in <Masonry> */
    background: grey;
    margin-bottom: 30px;
  }
`;
const breakpoints = {
  default: 4,
  1700: 3,
  1350: 2,
  700: 1,
};

const Explore = () => {
  let { posts, loading } = useSelector((state) => state.postReducer);

  const [Data, setData] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${user._id}/posts`)
      .then((response) => {
        const results = response.data;

        setData(results);
      });
  }, []);

  return (
    <Div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px',
        width: '100%',
        height: '100vh',
      }}
    >
      {Data.image ? null : (
        <Masonry
          breakpointCols={breakpoints}
          className='my-masonry-grid'
          columnClassName='grid_column'
        >
          {loading
            ? 'Fetching Posts...'
            : Data?.map((post, id) => {
                return <PostsExplore Data={post} setData={setData} />;
              })}
        </Masonry>
      )}
    </Div>
  );
};

export default Explore;
