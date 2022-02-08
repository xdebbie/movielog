import { useState } from 'react'
import styled from 'styled-components'

// Components & utils
import { device, themes } from '../utils/variables'

// Assets
import Loader from '../assets/loader.svg'

const Wrapper = styled.div`
    align-items: center;
    background: ${themes.background};
    color: ${themes.text};
    display: flex;
    font-family: 'Archivo', sans-serif;
    flex-direction: column;
    min-height: calc(100vh - 21rem);
    padding: 10rem 0 4rem 0;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
`

const Search = styled.div`
    display: flex;
    position: relative;
`

const Input = styled.input`
    border-radius: 10px;
    border: 2px solid ${themes.inputBorder};
    font-family: 'Archivo', sans-serif;
    font-size: 18px;
    font-weight: 500;
    height: 50px;
    padding: 0 1rem;
    width: 200px;
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
    padding: 1rem 2rem;
    transition: all 0.2s;

    &:hover {
        background: ${themes.buttonHover};
        transition: all 0.2s;
    }
`

const LoaderImg = styled.img`
    animation: Loader-spin infinite 20s linear;
    position: absolute;
    right: -80px;
    width: 80px;

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
    margin: 1rem 0;
    text-align: center;

    p {
        margin: 0.5rem auto;

        :nth-of-type(2) {
            font-size: 14px;
            font-style: italic;
        }
    }
`

const Year = styled.div`
    border-radius: 10px;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 1rem;
    width: fit-content;
`

const Cards = styled.div`
    @media ${device.tablet} {
        display: grid;
        grid-gap: 2rem;
        grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
        max-width: 1000px;
    }

    img {
        width: 200px;
    }
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

    const dataURL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${query}`

    const getDataSet = () => {
        setLoading(true)

        fetch(dataURL)
            .then(response => {
                return response.json()
            })
            .then(data => {
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

                // Create a fake loading time of 1s so the loader appears
                setTimeout(function () {
                    setLoading(false)

                    // Show total number of results
                    setTotalResults(data['totalResults'])

                    // Store the new data grouped by descending year
                    setGroupedData(groupedByYear.reverse())
                }, 1000)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Wrapper>
            {/* Search input */}
            <Search>
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
                {loading ? <LoaderImg src={Loader} alt="Loader" /> : ''}
            </Search>
            {/* Results count */}
            {totalResults && (
                <SearchResults>
                    <p>Your search returned {totalResults} results.</p>
                    <p>
                        Can't see what you were looking for? Try being more
                        specific.
                    </p>
                </SearchResults>
            )}
            {/* Cards */}
            {groupedData &&
                groupedData.map((year, index) => (
                    <div key={index}>
                        <Year>{year[0]}</Year>
                        <Cards>
                            {year[1].map((show: any, index: number) => (
                                <div key={index}>
                                    <img src={show.Poster} alt={show.Title} />
                                    <div>
                                        <p>{show.Title}</p>
                                        <p>{show.Year}</p>
                                        <a
                                            href={`https://www.imdb.com/title/${show.imdbID}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            See this title on IMDb
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </Cards>
                    </div>
                ))}
        </Wrapper>
    )
}

export default Main
