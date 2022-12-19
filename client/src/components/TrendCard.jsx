import React from 'react';
import styled from 'styled-components';
import { TrendData } from '../Data/TrendData';
const TrendCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme }) => theme.cardColor};
  padding: 1rem;
  border-radius: 10px;

  .trend {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    span:nth-of-type(1) {
      font-weight: bold;
    }
    span:nth-of-type(2) {
      font-size: 13px;
    }
  }
`;

const TrendCard = () => {
  return (
    <TrendCardDiv>
      {TrendData.map((trend) => {
        return (
          <div className='trend'>
            <span>#{trend.name}</span>
            <span>#{trend.shares}k</span>
          </div>
        );
      })}
    </TrendCardDiv>
  );
};

export default TrendCard;
