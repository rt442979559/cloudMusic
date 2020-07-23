export default {
    //添加歌曲
    addToCurrentPlay(state, currentPlay) {
        this.state.currentPlay = currentPlay;
    },
    //添加到播放列表
    addToPlayList(state, currentPlay) {
        state.songList.unshift(currentPlay)
    },
    //列表播放
    listToPlay(state, index) {
        //把对应索引传到播放列表中
        state.currentPlay = state.songList[index]
        state.currentIndex = index
    },
    //移除列表的item
    removeItemByIndex(state,id){
        state.songList.splice(id,1)
    },
    //播放上一首
    playLastSong(state){
        state.currentIndex --;
        if (state.currentIndex < 1) {
            state.currentIndex = state.songList.length
        }
        state.currentPlay = state.songList[state.currentIndex - 1]
        state.playing = true
    },
    //播放下一首
    playNextSong(state){
        state.currentIndex ++;
        if (state.currentIndex > state.songList.length) {
            state.currentIndex = 1
        }
        state.currentPlay = state.songList[state.currentIndex - 1]
        state.playing = true
    },

    play(state) {
        state.playing = true
        console.log('play');
    },
    pause(state) {
        state.playing = false
        console.log('pause');
    },

    
    setLoad(state, show) { //设置loading组件是否显示
        state.isLoad = show;
    },

    // navbarindex
    changeNavIndex(state,index){
        state.navCurrentIndex = index;
    }
}