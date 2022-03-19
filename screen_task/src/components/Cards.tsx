// import React, { FC, MouseEvent, useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// // import { selectedId } from "../pages/screen/screenSlice";
// import {
//   Card,
//   CardActions,
//   CardContent,
//   CardActionArea,
//   CardMedia,
// } from "@mui/material";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router-dom";

// interface Props {
//   note: any;
// }

// const Cards: FC<Props> = ({ note }) => {
//   const [btnDisable, setBtnDisable] = useState<boolean>(true);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleClick = (event: MouseEvent) => {
//     if (note.status !== "off") {
//       dispatch(selectedId(note));
//       navigate("/screen2");
//     }
//   };

//   useEffect(() => {
//     if (note.status !== "off") setBtnDisable(false);
//   }, [note.status]);

//   return (
//     <Card sx={{ minWidth: 225 }}>
//       <CardActionArea onClick={handleClick} disabled={btnDisable}>
//         <CardMedia
//           component="img"
//           height="140"
//           image="https://reactjs.org/logo-og.png"
//           alt="green iguana"
//         />
//         <CardContent>
//           <Typography variant="h5" component="div">
//             {note.title}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" onClick={handleClick} disabled={btnDisable}>
//           Learn More
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default Cards;

import React from 'react'

const Cards = () => {
  return (
    <div>Cards</div>
  )
}

export default Cards
