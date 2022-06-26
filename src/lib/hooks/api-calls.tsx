import axios from 'axios'

const KEY_FREE_FOR_PUBLIC = 'ckey_af4bc39b721f48679f60f99f649'

export const getEcosystem = async (chainId: number, dexName: string) => {
	try {
		let response: any
		const url = `https://api.covalenthq.com/v1/${chainId}/xy=k/${dexName}/ecosystem/?key=${KEY_FREE_FOR_PUBLIC}`
		console.log('getEcosystem url', url)
		await axios.get(url).then(res => {
			response = res.data
		})
		return response
	} catch (error) {
		console.log('getEcosystem() error:', error)
	}
}
