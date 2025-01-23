import { Link } from 'gatsby'
import styled from 'styled-components'
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiFillLinkedin,
} from 'react-icons/ai'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`

const Title = styled(Link)`
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  color: inherit;
`

const Menu = styled.div`
  display: flex;
  gap: 15px;
  font-size: 25px;

  & > a {
    display: flex;
    color: initial;
  }
`

export default function Header() {
  return (
    <Wrapper>
      <Title to="/">Developer Juhun</Title>

      <Menu>
        <a href="https://github.com/Juhunnm" target="_blank" rel="noreferrer">
          <AiFillGithub />
        </a>
        <a href="#" target="_blank">
          <AiOutlineInstagram />
        </a>
        <a href="www.linkedin.com/in/min-juhun-56ab9a302" target="_blank">
          <AiFillLinkedin />
        </a>
      </Menu>
    </Wrapper>
  )
}
