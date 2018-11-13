export interface UserInfo {
    highscores: {
        [index: number]: {
            gameName: string,
            score: number
        }
    },
    profilePicture: string,
    description: string
}

export interface UserLoginInfo {
    username: string,
    auth: string,
    userID: string,
    picturePath: string,
    error: string
}

export interface UsernameAvailable {
    available: string
}

export interface GetHighscoresForGame {
    [index: number]: {
        username: string,
        score: number
    }
}

export interface HighscoreSave {
    userHighscore: string,
    allHighscore: string,
}

export interface GetHighscore {
    allHighscore: string
}