export default {
    //添加到播放列表
    AddToPlayList(context, currentPlay) {
        let repeatSong = context.state.songList.find(item => item.id == currentPlay.id)
        if (repeatSong) {
            return
        } else {
            context.commit('addToPlayList', currentPlay)
        }
    },
    //移除列表的item
    RemoveSongListItem(context,id){
        let i = context.state.songList.findIndex(x => x.id === id)
        if(i !== -1){
            context.commit('removeItemByIndex',i)
            //移除完成后 ，列表中的下一首播放 ------功能未实现
            context.commit('playLastSong')
        }
        if(context.state.songList.length < 1 ){
            context.state.currentPlay = {
                'name': '歌曲名称',
            },
            context.commit('pause')
        }
    },
    //
    isLoad(context){
        context.commit('setLoad',true)
        setTimeout(() => {
            context.commit('setLoad',false)
        }, 1000);
    }
}