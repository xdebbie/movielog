import styled, { ThemeProvider } from 'styled-components'

// Components & utils
import { useTheme } from '../utils/ThemeManager'
import { device, themes } from '../utils/variables'

// Assets
import { ReactComponent as Github } from '../assets/github.svg'
import { ReactComponent as Medium } from '../assets/medium.svg'
import { ReactComponent as Twitter } from '../assets/twitter.svg'

const Wrapper = styled.footer`
    background: ${themes.backgroundHeader};
    color: ${themes.footer};
    flex-shrink: 0;
    padding: 2rem 0;
    text-align: center;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
`

const Links = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 5px;

    .github,
    .twitter,
    .medium {
        fill: ${themes.footer};
        height: 25px;
        margin-right: 5px;
        transition: 200ms all ease;
        width: 25px;

        &:hover {
            fill: ${themes.footerHover};
        }
    }
`

const Text = styled.div`
    font-size: 12px;
`

function Footer() {
    const theme = useTheme()
    return (
        <ThemeProvider theme={{ mode: theme.mode }}>
            <Wrapper>
                <Links>
                    <a
                        href="https://github.com/xdebbie"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github className="github" />
                    </a>
                    <a
                        href="https://twitter.com/gitdebbie"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Twitter className="twitter" />
                    </a>
                    <a
                        href="https://medium.com/@ithos"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Medium className="medium" />
                    </a>
                </Links>
                <Text>© 2022 kotka&bowie</Text>
            </Wrapper>
        </ThemeProvider>
    )
}

export default Footer
