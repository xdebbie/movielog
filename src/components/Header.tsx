import styled from 'styled-components'

// Components & utils
import { useTheme } from '../utils/ThemeManager'
import { device, themes } from '../utils/variables'

const Nav = styled.header`
    background: ${themes.backgroundHeader};
    color: ${themes.text};
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    position: fixed;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    width: -webkit-fill-available;
    z-index: 1;
`

const Logo = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Zilla Slab Highlight', cursive;
    font-size: 30px;
    font-weight: 600;

    span {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 500;
        margin-top: 0.3rem;
    }

    @media ${device.tablet} {
        display: block;

        span {
            margin-left: 0.6rem;
            margin-top: 0;
        }
    }
`

const Switch = styled.label`
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;

    input {
        height: 0;
        opacity: 0;
        width: 0;

        :checked + .slider {
            background-color: rgba(2, 156, 167, 1);
        }

        :focus + .slider {
            box-shadow: 0 0 1px rgba(2, 156, 167, 1);
        }

        :checked + .slider:before  {
            -ms-transform: translateX(26px);
            -webkit-transform: translateX(26px);
            transform: translateX(26px);
        }
    }
`

const Slider = styled.span`
    background-color: #ccc;
    border-radius: 20px;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;

    :before {
        background-color: white;
        border-radius: 20px;
        bottom: 4px;
        content: '';
        height: 26px;
        left: 4px;
        position: absolute;
        -webkit-transition: all 0.4s;
        transition: all 0.4s;
        width: 26px;
    }
`

function Header() {
    const theme = useTheme()

    return (
        <Nav>
            <Logo>
                movielog
                <span>an IMDb show catalogue</span>
            </Logo>
            <Switch className="switch">
                <input type="checkbox" onClick={() => theme.toggle()} />
                <Slider className="slider" />
            </Switch>
        </Nav>
    )
}

export default Header
