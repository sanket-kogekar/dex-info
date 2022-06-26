import React, { ReactNode } from 'react'
import Head from 'next/head'
// import { SITE_DESCRIPTION, SITE_TITLE } from '../../../lib/constants'
import { Box } from '@chakra-ui/react'

interface Props {
	children: ReactNode
	pageTitle: string
}

const SITE_DESCRIPTION = 'DEX Info'
const SITE_TITLE = 'DexInfo'

export const PageWrapper: React.FC<Props> = ({ children, pageTitle }) => {
	return (
		<>
			<Head>
				<title>
					{pageTitle} - {SITE_TITLE}
				</title>
				<meta name="description" content={SITE_DESCRIPTION} />
			</Head>
			<Box>{children}</Box>
		</>
	)
}
