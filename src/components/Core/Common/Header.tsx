import React from 'react'
import {
	Avatar,
	Button,
	Link as ChakraLink,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Portal,
	Text,
	Box,
} from '@chakra-ui/react'
import { MdArrowDropDown } from 'react-icons/md'
import { RiFileUserFill } from 'react-icons/ri'
import { FiLogOut } from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {}

export const Header: React.FC<Props> = () => {
	const router = useRouter()

	return (
		<>
			<Flex
				minH="3.75rem" // borderBottom="1px solid #E1E1E1"
				justifyContent="space-between"
				alignItems="center"
			>
				{/* <Flex alignItems="center" justifyContent="center" w="5rem" position="relative">
					<Link href="/">
						<ChakraLink
							h="3rem"
							w="12rem"
							display="inline-block"
							position="absolute"
							top="50%"
							left="50%"
							transform="translateY(-50%)"
							bgImage={`/favicon.ico`}
							bgPosition="left"
							bgSize="contain"
							bgRepeat="no-repeat"
							p="0"
						/>
					</Link>
				</Flex> */}
				<Box></Box>
				<Text fontSize={22} color="#ab43fff">
					Dex-Info
				</Text>
				<Box></Box>
			</Flex>
		</>
	)
}
