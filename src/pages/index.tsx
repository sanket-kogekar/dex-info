import { FC, useEffect, useState } from 'react'
import {
	Box,
	Flex,
	HStack,
	Select,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Text,
} from '@chakra-ui/react'
import { PageWrapper } from '@/components/Core/PageWrapper'
import { Layout } from '@/components/Core/Layout'
import { getEcosystem } from '@/lib/hooks/api-calls'

const chains = [
	{ id: 56, name: 'BSC Mainnet', dexList: ['sushiswap', 'pancakeswap_v2', 'apeswap', 'empiredex', 'moonlift'] },
	{ id: 137, name: 'Matic Mainnet', dexList: ['quickswap', 'sushiswap'] },
	{ id: 1, name: 'Ethereum Mainnet', dexList: ['uniswap_v2', 'sushiswap'] },
	{ id: 4002, name: 'Fantom Testnet', dexList: ['sushiswap'] },
	{ id: 43114, name: 'Avalanche Testnet', dexList: ['sushiswap'] },
	{ id: 43113, name: 'Avalanche Mainnet', dexList: ['sushiswap', 'pangolin', 'traderjoe'] },
	{ id: 80001, name: 'Matic Mumbai', dexList: ['sushiswap'] },
	{ id: 2020, name: 'Axie Mainnet', dexList: ['katana'] },
	{ id: 1284, name: 'Moonbeam Mainnet', dexList: ['stellaswap', 'beamswap'] },
	{ id: 4689, name: 'Iotex Mainnet', dexList: ['mimo'] },
	{ id: 8217, name: 'Klayton Mainnet', dexList: ['claimswap'] },
	{ id: 1313161554, name: 'Aurora Mainnet', dexList: ['wannaswap', 'trisolaris'] },
	{ id: 9001, name: 'Evmos Mainnet', dexList: ['diffusion', 'cronus', 'evmoswap'] },
	{ id: 592, name: 'Astar Mainnet', dexList: ['arthswap'] },
	// { id: 250, name: 'Fantom Mainnet', dexList: ['spookyswap', 'sushiswap', 'spiritswap'] },
	// { id: 56, name: 'Astar Shiden', dexList: ['standard'] },
]

const dexNameMapping = {
	quickswap: 'QuickSwap',
	uniswap_v2: 'Uniswap V2',
	sushiswap: 'Sushiswap',
	pancakeswap_v2: 'Pancakeswap V2',
	spiritswap: 'SpiritSwap',
	spookyswap: 'Spookyswap',
	pangolin: 'Pangolin',
	traderjoe: 'TraderJoe',
	apeswap: 'ApeSwap',
	empiredex: 'EmpireDex',
	moonlift: 'Moonlift',
	katana: 'Katana',
	stellaswap: 'StellaSwap',
	beamswap: 'BeamSwap',
	claimswap: 'Claimswap',
	mimo: 'Mimo',
	wannaswap: 'WannaSwap',
	trisolaris: 'Trisolaris',
	diffusion: 'Diffusion',
	cronus: 'Cronus',
	evmoswap: 'EvmoSwap',
	arthswap: 'ArthSwap',
}

const Home: FC = () => {
	const [chainId, setChainId] = useState<any>(chains[0].id)
	const [results, setResults] = useState<any[]>([])

	const handleRes = async () => {
		console.log('chain ID', chainId)

		const chain = chains.find((item: any) => item.id == chainId)

		console.log('chain', chain)

		if (!chain) {
			return undefined
		}

		let i = 0
		for (i = 0; i < chain.dexList.length; i++) {
			const dexId = chain.dexList[i]
			const res = await getEcosystem(chainId, dexId)
			if (!!res && typeof res.error === 'boolean' && !res.error && !!res.data.items[0]) {
				const priorResults = [...results]
				const ecosystemData = res.data.items[0]

				let initVal1: number,
					initVal2: number = 0

				priorResults.push({
					name: !!dexNameMapping[ecosystemData.dex_name]
						? dexNameMapping[ecosystemData.dex_name]
						: ecosystemData.dex_name,
					totalActivePairs: ecosystemData.total_active_pairs_7d,
					totalFees24hr: ecosystemData.total_fees_24h,
					totalSwaps24hr: ecosystemData.total_swaps_24h,
					swapCountLast24hr: !!ecosystemData.volume_chart_7d[0].swap_count_24
						? ecosystemData.volume_chart_7d[0].swap_count_24
						: 'Not Availalbe',
					volume24hr: ecosystemData.volume_chart_7d[0].volume_quote,
					volume7d: ecosystemData.volume_chart_7d.reduce(
						(totalValue: number, item: any) => totalValue + item.volume_quote,
						initVal1
					),
					liquidity24hr: ecosystemData.liquidity_chart_7d[0].liquidity_quote,
					liquidity7d: ecosystemData.liquidity_chart_7d.reduce(
						(totalValue: number, item: any) => totalValue + item.liquidity_quote,
						initVal2
					),
				})

				setResults(priorResults)
			}
		}
	}

	useEffect(() => {
		console.log('My chainId', chainId)
		handleRes()
	}, [chainId])

	return (
		<PageWrapper pageTitle="DexInfo">
			<Layout>
				<Box>
					<Flex justifyContent="center" alignItems="center">
						<Box>
							<HStack justifyContent="center" alignItems="center" mt="6">
								<Select
									placeholder="Select Chain"
									size="lg"
									maxW="450px"
									onChange={e => {
										console.log('e.target.value', e.target.value)
										setResults([])
										setChainId(e.target.value)
									}}
									borderColor="green"
									value={chainId}
								>
									{chains.map(chain => (
										<option key={chain.id} value={chain.id}>
											{chain.name}
										</option>
									))}
								</Select>
							</HStack>
							<Flex justifyContent="center" alignItems="center">
								<Box
									bg="white"
									my="35px"
									py="20px"
									borderRadius={10}
									px="30px"
									boxShadow="0px 4px 14px rgba(0, 0, 0, 0.15)"
									borderWidth="10px"
								>
									<TableContainer borderColor="black" borderRadius="10px">
										<Table variant="striped" borderColor="black" borderRadius="10px">
											<TableCaption placement="top">
												<Flex justifyContent="center" px="10" pb="10">
													<Text
														h="40px"
														fontWeight="bold"
														px="10"
														color="#2D3436"
														fontSize="19px"
													>
														Values fetched from Covalent API
													</Text>
												</Flex>
											</TableCaption>
											<Thead justifyContent="center" alignItems="center">
												<Tr
													h="50px"
													borderBottomWidth="1px"
													color="#707070"
													fontSize="17px"
													borderRadius="10px"
												>
													<Th
														color="#707070"
														borderLeftWidth="1px"
														borderColor="#E7E7E7"
														w="200px"
														px="5"
													>
														<Flex justifyContent="center">Name</Flex>
													</Th>
													<Th
														color="#707070"
														borderLeftWidth="1px"
														borderColor="#E7E7E7"
														w="200px"
														px="5"
													>
														<Flex justifyContent="center">Total Swaps (24hr)</Flex>
													</Th>
													<Th
														color="#707070"
														borderLeftWidth="1px"
														borderColor="#E7E7E7"
														w="200px"
														px="5"
													>
														<Flex justifyContent="center">Total Active Pairs (24Hr)</Flex>
													</Th>
													<Th
														color="#707070"
														borderLeftWidth="1px"
														borderColor="#E7E7E7"
														w="200px"
														px="5"
													>
														<Flex justifyContent="center">Total Fees (24hr)</Flex>
													</Th>
													<Th
														color="#707070"
														borderLeftWidth="1px"
														borderColor="#E7E7E7"
														w="200px"
														px="5"
													>
														<Flex justifyContent="center">Volume (24hr)</Flex>
													</Th>
													<Th
														color="#707070"
														borderLeftWidth="1px"
														borderColor="#E7E7E7"
														w="200px"
														px="5"
													>
														<Flex justifyContent="center">Volume (7d)</Flex>
													</Th>
													<Th
														color="#707070"
														borderLeftWidth="1px"
														borderColor="#E7E7E7"
														w="200px"
														px="5"
													>
														<Flex justifyContent="center">Swap Count (Last 24hr)</Flex>
													</Th>
													<Th
														color="#707070"
														borderLeftWidth="1px"
														borderColor="#E7E7E7"
														w="200px"
														px="5"
													>
														<Flex justifyContent="center">Liquidity (24Hr)</Flex>
													</Th>
													<Th
														color="#707070"
														borderLeftWidth="1px"
														borderColor="#E7E7E7"
														w="200px"
														px="5"
													>
														<Flex justifyContent="center">Liquidity (7d)</Flex>
													</Th>
												</Tr>
											</Thead>
											<Tbody>
												{results.map((item: any) => (
													<Tr
														h="50px"
														borderBottomWidth="1px"
														borderColor="#DFE6E9"
														color="#707070"
														fontSize="16px"
													>
														<Td
															color="#2D3436"
															w="200px"
															px="5"
															borderBottomWidth="1px"
															borderColor="#DFE6E9"
														>
															<Flex justifyContent="center">{item.name}</Flex>
														</Td>
														<Td color="black" fontWeight="500" w="200px" px="5">
															<Flex justifyContent="center">{item.totalActivePairs}</Flex>
														</Td>
														<Td color="black" fontWeight="500" w="200px" px="5">
															<Flex justifyContent="center">${item.totalFees24hr}</Flex>
														</Td>
														<Td color="black" fontWeight="500" w="200px" px="5">
															<Flex justifyContent="center">{item.totalSwaps24hr}</Flex>
														</Td>
														<Td
															color="#2D3436"
															w="200px"
															px="5"
															borderBottomWidth="1px"
															borderColor="#DFE6E9"
														>
															<Flex justifyContent="center">
																{item.swapCountLast24hr}
															</Flex>
														</Td>
														<Td color="black" fontWeight="500" w="200px" px="5">
															<Flex justifyContent="center">{item.volume24hr}</Flex>
														</Td>
														<Td color="black" fontWeight="500" w="200px" px="5">
															<Flex justifyContent="center">{item.volume7d}</Flex>
														</Td>
														<Td color="black" fontWeight="500" w="200px" px="5">
															<Flex justifyContent="center">${item.liquidity24hr}</Flex>
														</Td>
														<Td color="black" fontWeight="500" w="200px" px="5">
															<Flex justifyContent="center">${item.liquidity7d}</Flex>
														</Td>
													</Tr>
												))}
											</Tbody>
										</Table>
									</TableContainer>
								</Box>
							</Flex>
						</Box>
					</Flex>
				</Box>
			</Layout>
		</PageWrapper>
	)
}

export default Home
