import $http from './request'

// export const getBanner = data => {
//     return $http({
//         url: '/banner?type=0',
//         method: 'get',
//         data
//     })
// };
//获取轮播图
export const getBanner = () => $http.get('/banner?type=0')

//获取推荐歌单  可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
export const getPersonalized = params => $http.get(`/personalized`, { params })

// 获取精品歌单
export const getTopPlaylists = (params) => $http.get('/top/playlist', { params })

// 获取音乐详情
export const getSongDetail = ids => $http.get(`/song/detail?ids=${ids}`)

// 最新专辑
export const getNewest = () => $http.get('/album/newest')

//推荐歌单
export const getListDetail = params => $http.get('/playlist/detail', { params })

// 获取音乐url
export const getSongUrl = id => $http.get(`/song/url?id=${id}`)

//获取音乐歌词
export const getSongLyric = id => $http.get(`lyric?id=${id}`)

// 推荐新音乐
export const getPersonalizedNewSong = () => $http.get('/personalized/newsong')

// 获取音乐url
export const getAlbum = id => $http.get(`/album?id=${id}`)

//热搜
export const getSearch = () => $http.get('/search/hot')

//电台
export const getRadioStation = () => $http.get('/dj/banner')
