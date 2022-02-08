import styled, { ThemeProvider } from 'styled-components'

// Components & utils
import { useTheme } from './utils/ThemeManager'
import { device, themes } from './utils/variables'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
    const theme = useTheme()

    return (
        <ThemeProvider theme={{ mode: theme.mode }}>
            <Header />
            <Main />
            <Footer />
        </ThemeProvider>
    )
}

export default App
