import { useState } from 'react'
import styled from 'styled-components'

// Components & utils
import { device, themes } from '../utils/variables'

const Wrapper = styled.div`
    align-items: center;
    background: ${themes.background};
    color: ${themes.text};
    display: flex;
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

const Cards = styled.div`
    @media ${device.tablet} {
        display: grid;
        grid-gap: 2rem;
        grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
        max-width: 1000px;
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
    const [totalResults, setTotalResults] = useState('')
    const [groupedData, setGroupedData] = useState<any[]>()

    const dataURL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${query}`

    const getDataSet = () => {
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
                // Show total number of results
                setTotalResults(data['totalResults'])
                // Store the new data grouped by descending year
                setGroupedData(groupedByYear.reverse())
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Wrapper>
            {/* Search input */}
            <Search>
                <input
                    placeholder="Enter the show's title..."
                    onChange={e => setQuery(e.target.value)}
                />
                <button onClick={getDataSet}>Search</button>
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
                        <div>{year[0]}</div>
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
