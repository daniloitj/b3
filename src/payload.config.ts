import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { buildConfig } from 'payload/config'

import Stock from './collections/stock'
import Users from './collections/users'
import { Icon } from './core/graphics/Icon'
import { Logo } from './core/graphics/Logo'
import swagger from './core/plugins/doc'

export default buildConfig({
  admin: {
    bundler: webpackBundler(),
    components: {
      graphics: {
        Icon,
        Logo,
      },
    },
    meta: {
      favicon: '/assets/favicon.svg',
      ogImage: '/assets/logo.svg',
      titleSuffix: '- Stone Stocks',
    },    
    user: Users.slug,      
  },
  collections: [Users,Stock],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  editor: slateEditor({}),
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud(), swagger({}),],
  serverURL: process.env.SERVER_URL,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },  
})
