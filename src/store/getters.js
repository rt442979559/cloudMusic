export default {
    songUrl(state) {
        let url = `https://music.163.com/song/media/outer/url?id=${state.currentPlay.id}.mp3`
        return url
    }
}