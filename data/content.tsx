import type { NextApiRequest, NextApiResponse } from "next"

export interface ContentType {
	name: string
	date: string
	type: "work" | "experience" | "blog"
	links: Array<LinkType>
	desc: Array<string>
}

export interface LinkType {
	name: string
	src: string
}

// const handler = (req: NextApiRequest, res: NextApiResponse) => {
// 	res.status(200).json({data: content})
// }

export const content: Array<ContentType> = [
	{
		name: "MashSong", 
		date: '2022-09-1',
		type: "work",
		links: [
			{
				name: "Github",
				src: ""
			}
		],
		desc: [
			'Python package for splitting songs into stems and blending them together. Built with Spleeter and Soundboard.',
			'Testing'
		]
	},
	{
		name: "InTune", 
		date: "9/1/2022", 
		type: "work",
		links: [
			{
				name: "Github",
				src: ""
			}
		],
		desc: [
			'Python package for splitting songs into stems and blending them together. Built with Spleeter and Soundboard.',
			'Testing'
		]
	},
]

export default content