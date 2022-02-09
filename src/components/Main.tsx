import { useState } from 'react'
import styled from 'styled-components'

// Components & utils
import { device, themes } from '../utils/variables'

// Assets
import Loader from '../assets/loader.svg'
import Placeholder from '../assets/placeholder.png'

const Wrapper = styled.div`
    align-items: center;
    background: ${themes.background};
    color: ${themes.text};
    display: flex;
    font-family: 'Archivo', sans-serif;
    flex-direction: column;
    min-height: calc(100vh - 21rem);
    padding: 10rem 2rem 4rem 2rem;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
`

const Search = styled.div`
    position: relative;
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const Input = styled.input`
    border-radius: 10px;
    border: 2px solid ${themes.inputBorder};
    font-family: 'Archivo', sans-serif;
    font-size: 16px;
    font-weight: 500;
    height: 40px;
    padding: 0 1rem;
    width: 100%;

    ::placeholder {
        font-size: 14px;
    }

    @media ${device.tablet} {
        font-size: 18px;
        height: 50px;
        width: 200px;

        ::placeholder {
            font-size: 16px;
        }
    }
`

const Button = styled.button`
    background: ${themes.backgroundButton};
    border-radius: 10px;
    border: transparent;
    color: black;
    cursor: pointer;
    font-family: 'Archivo', sans-serif;
    font-size: 16px;
    font-weight: 500;
    margin-left: 1rem;
    padding: 0 2rem;
    transition: all 0.2s;

    &:hover {
        background: ${themes.buttonHover};
        transition: all 0.2s;
    }
`

const LoaderImg = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;

    img {
        animation: Loader-spin infinite 20s linear;
        width: 100px;
    }

    @media ${device.tablet} {
        margin-top: 0;

        img {
            bottom: -10px;
            position: absolute;
            right: -100px;
        }
    }

    @keyframes Loader-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`

const SearchResults = styled.div`
    font-size: 16px;
    line-height: 18px;
    margin: 1rem 0;
    text-align: center;

    p {
        margin: 0.3rem auto;

        :nth-of-type(2) {
            font-size: 14px;
            font-style: italic;
        }
    }
`

const Results = styled.div`
    @media ${device.tablet} {
        margin-top: 3rem;
    }
`

const Year = styled.div`
    background-color: ${themes.backgroundYear};
    font-size: 24px;
    font-weight: 700;
    margin: 2rem 0;
    padding: 1rem 0;
    text-align: center;
    width: 100vw;

    @media ${device.tablet} {
        border-radius: 10px;
        margin: 1rem 0 2rem 0;
        padding: 1rem 2rem;
        text-align: left;
        width: fit-content;
    }
`

const Cards = styled.div`
    width: 100vw;

    @media ${device.tablet} {
        display: grid;
        grid-gap: 2rem;
        grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
        max-width: 1000px;
        width: 100%;
    }
`

const Card = styled.div`
    background: ${themes.backgroundCard};
    border-radius: 10px;
    box-shadow: 5px 5px 20px ${themes.boxShadowCard};
    display: flex;
    flex-direction: column;
    margin: 1rem auto 2rem auto;
    padding: 1rem;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    width: 240px;

    &:hover {
        background: ${themes.backgroundCardHover};
    }

    img {
        border-radius: 10px;
        width: 240px;
    }

    div {
        margin-top: auto;
    }

    a,
    a:visited {
        color: #979797;
    }

    a:hover,
    a:active {
        color: rgba(2, 156, 167, 1);
    }

    @media ${device.tablet} {
        margin: 0;
        width: 300px;

        img {
            width: 300px;
        }
    }
`

const ShowTitle = styled.p`
    font-size: 20px;
    font-weight: 500;
`

interface MovieInfo {
    readonly imdbID: string
    readonly Poster: string
    readonly Title: string
    readonly Type: 'show'
    readonly Year: string
}

function Main() {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [totalResults, setTotalResults] = useState('')
    const [groupedData, setGroupedData] = useState<any[]>()
    const [isUndefined, setIsUndefined] = useState<boolean>()

    const dataURL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${query}`

    const getDataSet = () => {
        setLoading(true)

        fetch(dataURL)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.Search === undefined) {
                    // Create a fake loading time of 1s so the loader appears
                    setTimeout(function () {
                        setIsUndefined(true)
                        setLoading(false)
                    }, 1000)
                } else {
                    setIsUndefined(false)

                    // Reduce array to group by Year
                    const groupedByYear = Object.entries(
                        data.Search.reduce(
                            (acc: any, curr: any) => {
                                acc[curr.Year] = acc[curr.Year] || []
                                acc[curr.Year].push(curr)
                                return acc
                            },
                            {} as {
                                [Key: string]: Array<MovieInfo>
                            }
                        )
                    )

                    setTimeout(function () {
                        setLoading(false)
                        // Show total number of results
                        setTotalResults(data['totalResults'])
                        // Store the new data grouped by descending year
                        setGroupedData(groupedByYear.reverse())
                    }, 1000)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Wrapper>
            {/* Search input */}
            <Search>
                <InputWrapper>
                    <Input
                        placeholder="Enter the show's title..."
                        onChange={e => setQuery(e.target.value)}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                getDataSet()
                            }
                        }}
                    />
                    <Button onClick={getDataSet}>Search</Button>
                </InputWrapper>
                {loading && (
                    <LoaderImg>
                        <img src={Loader} alt="Loader" />
                    </LoaderImg>
                )}
            </Search>
            {!loading && (
                <>
                    {/* Show message if query is undefined */}
                    {isUndefined ? (
                        <SearchResults>
                            <p>Your search hasn't returned any results.</p>
                            <p>Please try again.</p>
                        </SearchResults>
                    ) : (
                        <>
                            {/* Results count */}
                            {totalResults && (
                                <SearchResults>
                                    <p>
                                        Your search returned {totalResults}{' '}
                                        results.
                                    </p>
                                    <p>
                                        Can't see what you were looking for? Try
                                        being more specific.
                                    </p>
                                </SearchResults>
                            )}
                            {/* Cards */}
                            {groupedData &&
                                groupedData.map((year, index) => (
                                    <Results key={index}>
                                        <Year>{year[0]}</Year>
                                        <Cards>
                                            {year[1].map(
                                                (show: any, index: number) => (
                                                    <Card key={index}>
                                                        {show.Poster ===
                                                        'N/A' ? (
                                                            <img
                                                                src={
                                                                    Placeholder
                                                                }
                                                                alt={show.Title}
                                                            />
                                                        ) : (
                                                            <img
                                                                src={
                                                                    show.Poster
                                                                }
                                                                alt={show.Title}
                                                            />
                                                        )}
                                                        <div>
                                                            <ShowTitle>
                                                                {show.Title}
                                                            </ShowTitle>
                                                            <p>{show.Year}</p>
                                                            <a
                                                                href={`https://www.imdb.com/title/${show.imdbID}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                See this title
                                                                on IMDb
                                                            </a>
                                                        </div>
                                                    </Card>
                                                )
                                            )}
                                        </Cards>
                                    </Results>
                                ))}
                        </>
                    )}
                </>
            )}
        </Wrapper>
    )
}

export default Main
