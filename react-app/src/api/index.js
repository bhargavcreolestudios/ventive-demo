import axios from 'axios'

const url = process.env.REACT_APP_TARGET_URL
const AuthToken = localStorage.user_token

/**
 * login user with their credentials
 * @param  {object} credentials email and password
 * @return {promise}             returns promise
 */
export function loginUser(credentials){
	const promise = new Promise((res, rej) => {
		axios.post(`${url}/auth/login`, credentials).then((data) => {
			    let responseToken = data.data.data.token
    			localStorage.setItem('user_token', responseToken)
			res(data)
		}).catch((error) => {
			rej(error)
		}); 
	})
	return promise;
}

/**
 * get products list
 * @param  {string} string search key
 * @return {promise}     
 */
export function getProducts(string=null){
	let callUrl = string ? `${url}/product?search=${string}` : `${url}/product`
	const promise = new Promise((res, rej) => {
		var options = { headers: {  "Authorization": `Bearer ${AuthToken}`}};
		axios.get(callUrl, options).then((data) => {
			res(data)
		}).catch((error) => {
			rej(error)
		}); 
	})
	return promise;
}


/**
 * get list of categories
 * @return {promise} 
 */
export function getCategories(){
	const promise = new Promise((res, rej) => {
		var options = { headers: {  "Authorization": `Bearer ${AuthToken}`}};
		axios.get(`${url}/category`, options).then((data) => {
			res(data)
		}).catch((error) => {
			rej(error)
		}); 
	})
	return promise;
}


/**
 * add new product
 * @param {object} data record to be inserted
 */
export function AddNewProduct(data){
	const promise = new Promise((res, rej) => {
		var options = { headers: {  "Authorization": `Bearer ${AuthToken}`}};
		axios.post(`${url}/product/create`, data, options).then((data) => {
			res(data)
		}).catch((error) => {
			rej(error)
		}); 
	})
	return promise;
}


/**
 * update call for product
 * @param  {object} data data to be updated
 * @return {promise} 
 */
export function updateProduct(data){
	const promise = new Promise((res, rej) => {
		var options = { headers: {  "Authorization": `Bearer ${AuthToken}`}};
		axios.post(`${url}/product/update`, data, options).then((data) => {
			res(data)
		}).catch((error) => {
			rej(error)
		}); 
	})
	return promise;
}

/**
 * GET SINGLE PRODUCT DETAIL
 * @param  {integer} id product id
 * @return {promise}
 */
export function getSingleProduct(id){
	const promise = new Promise((res, rej) => {
		var options = { headers: {  "Authorization": `Bearer ${AuthToken}`}};
		axios.get(`${url}/product/${id}`, options).then((data) => {
			res(data)
		}).catch((error) => {
			rej(error)
		}); 
	})
	return promise;
}

/**
 * delete product
 * @param  {integer} id product id
 * @return {promise} 
 */
export function deleteProduct(id){
	const promise = new Promise((res, rej) => {
		var options = { headers: {  "Authorization": `Bearer ${AuthToken}`}};
		axios.delete(`${url}/product/delete/${id}`, options).then((data) => {
			res(data)
		}).catch((error) => {
			rej(error)
		}); 
	})
	return promise;
}