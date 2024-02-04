import {
  Avatar,
  Card,
  Chip,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Stack, styled } from "@mui/system";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// import StarIcon from "@mui/icons-material/Star";
import React from "react";
import { Repo } from "../interfaces/repo";

const StyledCard = styled(Card)({
  borderRadius: "16px",
  "& .MuiListItem-root": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight : "115px",
  },
  "& .MuiListItemAvatar-root": {
    margin: "0 10px 0 0",
  },
  "& .MuiAvatar-root": {
    width: "48px!important",
    height: "48px!important",
  },
  "& .MuiStack-root":{
    marginTop:"10px"
  },
  "& .MuiListItemText-primary" :{
    fontWeight : "600"
  }
});

interface RepoProps {
    item: Repo;
}

const RepoCard: React.FC<RepoProps> = ({item}) => {
  return (
    <StyledCard>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={item?.name} src={item?.owner?.avatar_url} />
        </ListItemAvatar>
        <ListItemText
          primary={item?.full_name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{     
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "300px",
                display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item?.description || ""}
              </Typography>
              <Stack direction="row" spacing={1} sx={{overflowX:"scroll"}}>
                {item?.topics?.map((topic)=><Chip label={topic} />)}
            </Stack>
            </React.Fragment>
          }
        />
        <IconButton>
          <StarBorderIcon />
        </IconButton>
      </ListItem>
    </StyledCard>
  );
};

export default RepoCard;
