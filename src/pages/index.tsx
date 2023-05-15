
import { Layout } from '@/components/layouts'
import { EntriesList, NewEntry } from '@/components/ui'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })


export default function HomePage() {

  return (
    <Layout title='OpenJira - Homepage'>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" />
            <CardContent>
              <NewEntry />
              <EntriesList status='pending' />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En proceso" />
            <CardContent>
              <EntriesList status='in-progress' />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completadas" />
            <CardContent>
              <EntriesList status='finished' />
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  )
}
