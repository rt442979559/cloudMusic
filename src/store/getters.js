export default {
    //解决部分url报错403使用的url，会产生跨域
    songUrl(state) {
        let url = `https://music.163.com/song/media/outer/url?id=${state.currentPlay.id}.mp3`
        return url
    }
}