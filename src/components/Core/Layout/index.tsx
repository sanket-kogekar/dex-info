import React, { ReactNode } from 'react'
import { Flex, Box } from '@chakra-ui/react'
// import { SideBar } from "../../Common";
import { useRouter } from 'next/router'
import { Header } from '../Common/Header'
// import { useOnlyAuth } from "../../../lib/hooks/useOnlyAuth";
// import { SideBar } from "../../Common/Sidebar";

interface Props {
	children: ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
	// const router = useRouter()

	return (
		/////////////
		// <Flex h="100vh" direction="column">
		// 	<Header />
		// 	<Flex flex="1 0 0px" bg="#F5F5F5">
		// 		{/* <SideBar /> */}
		// 		<Flex
		// 			justifyContent="space-between"
		// 			maxW="1920"
		// 			w="100%"
		// 			margin="0 auto"
		// 			px="2"
		// 			boxSizing="content-box"
		// 		>
		// 			{children}
		// 		</Flex>
		// 	</Flex>
		// </Flex>
		/////////////
		<Flex h="100vh" direction="column">
			<Flex justifyContent="space-between">
				<Box
					maxW="1600"
					w="100%"
					margin="0 auto"
					px="2"
					boxSizing="content-box"
					// borderColor="green"
					borderWidth="2px"
				>
					<Header />
				</Box>
			</Flex>
			<Flex flex="1 0 0px" bg="#F5F5F5">
				<Flex overflowY="auto" overflowX="hidden" w="100%">
					<Box
						maxW="1600"
						w="100%"
						margin="0 auto"
						px="2"
						boxSizing="content-box"
						// borderColor="red"
						borderWidth="2px"
					>
						<Flex justifyContent="center" alignItems="flex-start">
							<Box>{children}</Box>
						</Flex>
					</Box>
				</Flex>
			</Flex>
		</Flex>
	)
}
