
import { Layout } from '@/components/layouts'
import { Typography } from '@mui/material'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  return (
    <Layout title='OpenJira - Homepage'>
      <Typography variant='h1' color='primary'>Hola</Typography>
    </Layout>
  )
}
