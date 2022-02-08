import styled, { ThemeProvider } from 'styled-components'

// Components & utils
import { useTheme } from './utils/ThemeManager'
import { device, themes } from './utils/variables'
import Header from './components/Header'

function App() {
    const theme = useTheme()

    return (
        <ThemeProvider theme={{ mode: theme.mode }}>
            <Header />
        </ThemeProvider>
    )
}

export default App
