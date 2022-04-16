import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { MetaInfo } from './styles'
import { Link } from 'gatsby';

const DexItem = ({ id }) => {
	return (
		<StaticQuery
			query={graphql`
				query {
					allMarkdownRemark {
						nodes {
							frontmatter {
								id
								g
								group
								title
								slug
								category
							}
						}
					}
				}`
			}
			render={data => {
				const selection = data.allMarkdownRemark.nodes.find(
					node => node.frontmatter.id === id
				)
				return (
					<Link to={
						selection ? selection.frontmatter.g + '/' + selection.frontmatter.slug : `#`
					}>
						<MetaInfo>
							<h4>
								{selection ? 
									selection.frontmatter.title 
									: 
									`Unknown (id: ${id})`
								}
							</h4>
							<p>
								{selection ? 
									`${selection.frontmatter.group} - ${selection.frontmatter.category}` 
									: 
									`Unrecognized ID`
								}
							</p>
						</MetaInfo>
					</Link>
				)
			}}
		/>
	)
}
 
export default DexItem