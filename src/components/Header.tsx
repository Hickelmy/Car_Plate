import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <SearchInput type="text" placeholder="Search..." />
      <Profile>
        <span>John Smith</span>
        <img src="https://via.placeholder.com/40" alt="Profile" />
      </Profile>
    </HeaderContainer>
  );
};

export default Header;
