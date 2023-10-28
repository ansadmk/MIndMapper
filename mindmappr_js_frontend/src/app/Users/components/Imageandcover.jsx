import { currentPage } from '@/app/redux/slice'
import { Card } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
const ImageForPages= () => {
  const parent =useSelector(currentPage)
  return (
    <div>
       <Card>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
    </Card>
    </div>
  )
}

export default ImageForPages