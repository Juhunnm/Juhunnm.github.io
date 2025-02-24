import type { GatsbyConfig } from 'gatsby'
import dotenv from 'dotenv'

dotenv.config()

const SITE_URL = 'https://Juhunnm.github.io'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Dev Blog`,
    description: '2025 start!',
    siteUrl: SITE_URL,
  },

  graphqlTypegen: true,
  jsxRuntime: 'automatic',
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: SITE_URL,
        stripQueryString: true,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
  ],
}

export default config
