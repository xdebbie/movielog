/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production'
        PUBLIC_URL: string
        REACT_APP_HASH: string
        REACT_APP_API_URI: string
        REACT_APP_WS_URI: string
        REACT_APP_OMDB_KEY: string
    }
}
interface Window {
    Stripe: any
}
