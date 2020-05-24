var url = 'http://152.136.126.31'
const getRequst = function(urlget){
	return new Promise((reslove,reject)=>{
		let user = uni.getStorageSync('userInfo');
		let userID = '';
		if(user){
			userID = user.ID
		}
		uni.request({
			url :url+urlget,
			method: 'GET',
			header: {
				token : userID
			},
			success(res){
				if(res.data.result==1){
					reslove(res.data);
				}else{
					reject(res);
				}
			},
			fail(err) {
				reject(err);
			}
		});
	})
}
const postRequst = function(urlget,urlpost){
	return new Promise((reslove,reject)=>{
		let user = uni.getStorageSync('userInfo');
		let userID = '';
		if(user){
			userID = user.ID
		}
		uni.request({
			url : url+urlget,
			method: 'POST',
			data: urlpost,
			header: {
				token : userID
			},
			success(res) {
				if(res.data.result==1){
					reslove(res.data);
				}else{
					reject(res);
				}
			},
			fail(err) {
				reject(err);
			}
		})
	});
}



export default {getRequst,postRequst}