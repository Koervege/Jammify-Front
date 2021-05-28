import styled from 'styled-components'

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 50px;
  background: linear-gradient(120deg, #2980B9 5%, #0D476E 55%, #52BAFF 100%);
  font-size: 1.5em;
  color: #fefefe;
  text-transform: capitalize;
    @media (max-width: 768px) {
      padding: 12px 20px;
      justify-content: center;
    } 
`;