import { currentPage, fetchpageres } from '@/app/redux/slice';
import { IconButton } from '@mui/material';
import React from 'react'
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import EditNoteIcon from '@mui/icons-material/EditNote';
const Subpagescomp = () => {
    const subpage = useSelector(fetchpageres);
    const parent = useSelector(currentPage);
  return (
    <div>{subpage?.data?.subpages.map(value=>value.title == parent.content ?<li><Button variant=''>{value.content}</Button><IconButton aria-label="delete"><EditNoteIcon/></IconButton></li>  : null)}</div>
  )
}

export default Subpagescomp